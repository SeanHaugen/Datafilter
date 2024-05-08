const npcModel = require('../Schema/NPC_Schema');

// Function to fetch all NPC info
async function getNPCInfo(req, res) {
  try {
      const npcInfo = await npcModel.find();
      res.send(npcInfo);
  } catch (err) {
      console.error(err);
      res.status(500).send("Internal server error");
  }
}

async function getNPCFields() {
  try {
      const npcDocument = await npcModel.findOne();
      
      // Extract field names from document
      const fieldNames = Object.keys(npcDocument.toObject());
      return fieldNames;
  } catch (err) {
      console.error('Error:', err);
      throw err;
  }
}

async function fetchDataAndPushFieldsToArray() {
  try {
      const npcFields = await getNPCFields();
      return npcFields;
  } catch (err) {
      console.error('Error:', err);
  }
}

async function generateNPCFunctions() {
  const npcFields = await fetchDataAndPushFieldsToArray();
  const npcFunctions = {};
  console.log("NPC fields: ", npcFields);

  for (let i = 0; i < npcFields.length; i++) {
    const fieldName = npcFields[i];
    npcFunctions[`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`] = async function (req, res) {
        const searchQuery = req.query.field;
        console.log("Search query:", searchQuery);
        console.log("Field name:", fieldName);
        
        try {
            let query = {};
            console.log(isBooleanField(fieldName));
            if (await isBooleanField(fieldName)) {
              query[fieldName] = searchQuery.toLowerCase() === 'true';
            } else {
                query[fieldName] = { $regex: searchQuery, $options: 'i' };
            }
            const npcInfo = await npcModel.find(query);
            console.log(npcInfo);
            res.send(npcInfo);
        } catch (err) {
            console.log("Error searching NPC info:", err);
            res.status(500).json({ error: "An error occurred while searching" });
        }
    };
  }

  return npcFunctions;
}


async function isBooleanField(fieldName) {
  try {
    const schema = npcModel.schema;
    console.log("Schema:", schema);
    const path = schema.path(fieldName);
    console.log("Path:", path);
    return path && path.instance === 'Boolean';
  } catch (error) {
    console.error('Error checking field type:', error);
    return false; // or handle the error accordingly
  }
}


//To do: 
//Create api to get all of the fields so that i can list them all as buttons for querying other results



module.exports = {
  getNPCInfo,
  generateNPCFunctions
};



