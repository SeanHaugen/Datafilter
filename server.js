const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');
//Controllers
const locationController = require('./controllers/locationController');
// const npcController = require('./controllers/npcController');
// const npcFunctions = require('./controllers/npcController');
const { getNPCInfo, generateNPCFunctions } = require('./controllers/npcController'); 


const DATABASE = 'mongodb+srv://seanhaugen560:v06zH7KmMP7ubXLF@cluster0.7uip2sz.mongodb.net/VTT_Sample_data';

const DB = `${DATABASE}`;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Connected to MongoDB");
  }).catch(err => {
    console.error("Error connecting to MongoDB:", err);
  });

const port = process.env.PORT || 4000;

app.use(express.json());

app.use(cors());

//requests

//Location
app.get("/location_info", locationController.getLocationInfo);


//NPC INFO
app.get("/npc", getNPCInfo);
generateNPCFunctions().then(npcFunctions => {
  for (const funcName in npcFunctions) {
    app.get(`/npc/${funcName}`, npcFunctions[funcName]);
  }
});




//launch application server
app.listen(port, () => {
    console.log(`server running on port ${port}`);
})