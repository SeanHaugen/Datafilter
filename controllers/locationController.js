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



module.exports = {
    getLocationInfo
};
