const npcModel = require('../Schema/NPC_Schema');

// Function to fetch all NPC info
async function getNPCInfo(req, res) {
  try {
      const npcInfo = await npcModel.find();
      console.log(npcInfo);
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
      console.log("NPC fields: ", npcFields);
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

  // Define async function for each field
  for (let i = 0; i < npcFields.length; i++) {
    const fieldName = npcFields[i];
    npcFunctions[`getNPCBy${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`] = async function (req, res) {
        const searchQuery = req.query.npc;
        try {
            let query = {};
            // For boolean fields, handle differently
            if (fieldName === 'Shop_Owner') {
                query[fieldName] = (searchQuery.toLowerCase() === 'true');
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

module.exports = {
  getNPCInfo,
  generateNPCFunctions
};


























// const mongoose = require('mongoose');
// const npcModel = require('../Schema/NPC_Schema'); 

// const npcFields = [];
// const npcFunctions = {};

// // async function getNPCInfo(req, res) {
// //     try {
// //         const npcInfo = await npcModel.find();
// //         console.log(npcInfo);
// //         res.send(npcInfo);
// //     } catch (err) {
// //         console.error(err);
// //         res.status(500).send("Internal server error");
// //     }
// // }


// async function getNPCFields() {
//     try {
//         // Get a single document from the collection to inspect its fields
//         const npcDocument = await npcModel.findOne(); // Using npcModel here
        
//         // Extract field names dynamically from the document
//         const fieldNames = Object.keys(npcDocument.toObject());
//         npcFields.push(...fieldNames);
        
//         return npcFields;
//     } catch (err) {
//         console.error('Error:', err);
//         throw err;
//     }
// }

// async function fetchDataAndPushFieldsToArray() {
//     try {
//         // Call the function to fetch the fields
//         const npcFields = await getNPCFields();
  
//         // Now npcFields array contains the field names
//         console.log("NPC fields: ", npcFields);
//         // You can use the array however you like
//     } catch (err) {
//         console.error('Error:', err);
//         // Handle error
//     }
// }

// fetchDataAndPushFieldsToArray();



// for (let i = 0; i < npcFields.length; i++) {
//     const fieldName = npcFields[i];

//     // Define async function for each field
//     npcFunctions[`getNPCBy${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}`] = async function (req, res) {
//         const searchQuery = req.query.npc;
//         try {
//             const npcInfo = await npcModel.find({ [fieldName]: { $regex: searchQuery, $options: 'i' } });
//             console.log(npcInfo);
//             res.send(npcInfo);
//         } catch (err) {
//             console.log("Error searching NPC info:", err);
//             res.status(500).json({ error: "An error occurred while searching" });
//         }
//     };
// }

// // async function getNPCByName(req, res) {
// //     const searchQuery = req.query.npc;
// //     try {   
// //         const npcName = await npcModel.find({ Name: { $regex: searchQuery, $options: 'i' } });
// //         console.log(npcName);
// //         res.send(npcName);
// //     }
// //     catch(err){
// //         console.log("error searching npc info")
// //         res
// //             .status(500)
// //             .json({error: "An error occurred while searching"});
// //     }
// // }

// // async function getNPCByAncestry(req, res) {
// //     const searchQuery = req.query.npc;
// //     try {   
// //         const npcAncestry = await npcModel.find({ Ancestry: { $regex: searchQuery, $options: 'i' } });
// //         console.log(npcAncestry);
// //         res.send(npcAncestry);
// //     }
// //     catch(err){
// //         console.log("error searching npc info")
// //         res
// //             .status(500)
// //             .json({error: "An error occurred while searching"});
// //     }
// // }

// // async function getNPCByLocation(req, res) {
// //     const searchQuery = req.query.npc;
// //     try {   
// //         const npcLocation = await npcModel.find({ Location: { $regex: searchQuery, $options: 'i' } });
// //         console.log(npcLocation);
// //         res.send(npcLocation);
// //     }
// //     catch(err){
// //         console.log("error searching npc info")
// //         res
// //             .status(500)
// //             .json({error: "An error occurred while searching"});
// //     }
// // }

// // async function getNPCByShop(req, res) {
// //     try {   

// //         const npcShopOwner = await npcModel.find({Shop_Owner: true});
// //         console.log(npcShopOwner);
// //         res.send(npcShopOwner);
// //     }
// //     catch(err){
// //         console.log("error searching npc info")
// //         res
// //             .status(500)
// //             .json({error: "An error occurred while searching"});
// //     }
// // }

// // async function getOnlyName(req, res) {
// //     const searchQuery = req.query.npc;
// //     try {   
// //         const projection = {Name: 1}
// //         const npcNames = await npcModel.find({ Name: { $regex: searchQuery, $options: 'i' }}, projection);
// //         console.log(npcNames);
// //         res.send(npcNames);
// //     }
// //     catch(err){
// //         console.log("error searching npc info")
// //         res
// //             .status(500)
// //             .json({error: "An error occurred while searching"});
// //     }
// // }

// module.exports = {
//     npcFunctions
//     // getNPCInfo,
//     // getNPCByName,
//     // getNPCByAncestry,
//     // getNPCByLocation,
//     // getNPCByShop,
//     // getOnlyName,
//     // getNPCFields
// }