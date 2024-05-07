const locationModel = require('../Schema/Location_Schema');

async function getLocationInfo(req, res) {
    try {
        const location = await locationModel.find();
        console.log(location);
        res.send(location);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
}

async function getLocationFields() {
    try {
        const locationsDocument = await locationModel.findOne();
        
        // Extract field names from document
        const fieldNames = Object.keys(locationsDocument.toObject());
        return fieldNames;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
  }
  
  async function fetchDataAndPushFieldsToArray() {
    try {
        const locationFields = await getLocationFields();
        return locationFields;
    } catch (err) {
        console.error('Error:', err);
    }
  }
  
  async function generateLocationFunctions() {
    const locationFields = await fetchDataAndPushFieldsToArray();
    const locationFunctions = {};
    console.log("Location fields: ", locationFields);
  
    for (let i = 0; i < locationFields.length; i++) {
      const fieldName = locationFields[i];
      locationFunctions[`getLocationBy${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`] = async function (req, res) {
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
              const locationInfo = await locationModel.find(query);
              console.log(locationInfo);
              res.send(locationInfo);
          } catch (err) {
              console.log("Error searching NPC info:", err);
              res.status(500).json({ error: "An error occurred while searching" });
          }
      };
    }
  
    return locationFunctions;
  }
  
  
  async function isBooleanField(fieldName) {
    try {
      const schema = locationModel.schema;
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
    getLocationInfo,
    generateLocationFunctions
};
