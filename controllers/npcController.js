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

// Define npcFields array and functions for each field
async function getNPCFields() {
  try {
      // Get a single document from the collection to inspect its fields
      const npcDocument = await npcModel.findOne();
      
      // Extract field names dynamically from the document
      const fieldNames = Object.keys(npcDocument.toObject());
      return fieldNames;
  } catch (err) {
      console.error('Error:', err);
      throw err;
  }
}

// Function to fetch and push NPC fields to array
async function fetchDataAndPushFieldsToArray() {
  try {
      // Call the function to fetch the fields
      const npcFields = await getNPCFields();

      // Now npcFields array contains the field names
      // console.log("NPC fields: ", npcFields);
      return npcFields;
  } catch (err) {
      console.error('Error:', err);
      // Handle error
  }
}

// Define npcFunctions object
async function generateNPCFunctions() {
  const npcFields = await fetchDataAndPushFieldsToArray();
  const npcFunctions = {};
  console.log("NPC fields: ", npcFields);

  // Define async function for each field
  for (let i = 0; i < npcFields.length; i++) {
    const fieldName = npcFields[i];
    npcFunctions[`getNPCBy${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`] = async function (req, res) {
        const searchQuery = req.query.field;
        console.log("Search query:", searchQuery);
        console.log("Field name:", fieldName);
        
        try {
            let query = {};
            // For boolean fields, handle differently
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



module.exports = {
  getNPCInfo,
  generateNPCFunctions
};



