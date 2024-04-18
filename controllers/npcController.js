const npcModel = require("../Schema/NPC_Schema");

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

module.exports = {
    getNPCInfo
}