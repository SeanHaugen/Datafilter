const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');

import npcModel from "./Schema/NPC_Schema";


dotenv.config({ path: "./config.env"});

const DATABASE_PASSWORD = 'v06zH7KmMP7ubXLF'
const DATABASE=`mongodb+srv://seanhaugen560:${DATABASE_PASSWORD}@cluster0.0pufj0a.mongodb.net/VTT_Sample_data?retryWrites=true&w=majority`;

const DB = DATABASE

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connected to MongoDB");
})

const port = process.env.PORT || 4000;

app.use(express.json());

app.use(cors());


app.get("/npc_info", async (req, res) => {
    try {
        const npcInfo = await npcModel.find();
        console.log(npcInfo)
        res.send(npcInfo);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal server error");
    }
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})