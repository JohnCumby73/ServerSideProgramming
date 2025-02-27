const Iceberg = require("../models/berg.model.js");

const createBerg = async (req, res) => {
    try {
        const berg = await Iceberg.create(req.body);
        res.status(200).json(berg);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
const bergSplit = async (req, res) => {
    // bergId is found in params.req.bergId
    try {
        const iceberg = await Iceberg.findOne({bergId:req.params.bergId});
        // Get all information about iceberg that was passed
        const mission = iceberg.mission;
        const aircraft = iceberg.aircraft;
        const latitude = iceberg.latitude;
        const longitude = iceberg.longitude;
        const altitude = iceberg.altitude;
        const timestamp = iceberg.timestamp;
        const bergId = iceberg.bergId;
        const iceType = iceberg.iceType;
        const iceSize = iceberg.iceSize;
        const seaState = iceberg.seaState;
        const seaTemp = iceberg.seaTemp;
        const iceGrounded = iceberg.iceGrounded;
        const comment = iceberg.comment;


        console.log(mission, aircraft, latitude, longitude, altitude,
            timestamp, bergId, iceType, iceSize, seaState, seaTemp, iceGrounded, comment
        )

        // Create the IDs for the two new icebergs
        const newBergIdA = bergId + "A";
        const newBergIdB = bergId + "B";

        // Create and push the new ones
        try {
            await Iceberg.create([{
                mission: mission,
                aircraft: aircraft,
                latitude: latitude,
                longitude: longitude,
                altitude: altitude,
                timestamp: timestamp,
                bergId: newBergIdA,
                iceType: iceType,
                iceSize: iceSize,
                seaState: seaState,
                seaTemp: seaTemp,
                iceGrounded: iceGrounded,
                comment: comment
            },
            {
                mission: mission,
                aircraft: aircraft,
                latitude: latitude,
                longitude: longitude,
                altitude: altitude,
                timestamp: timestamp,
                bergId: newBergIdB,
                iceType: iceType,
                iceSize: iceSize,
                seaState: seaState,
                seaTemp: seaTemp,
                iceGrounded: iceGrounded,
                comment: comment
        }])
        res.status(200).json("Successful");
        } catch (err) {
            res.status(500).json(({message: err.message}));
        }

    // Delete the old one
    try {
        await Iceberg.findOneAndDelete({bergId:req.params.bergId});
    } catch (err) {
        res.status(500).json({message: err.message});
    }

    } catch (err) {
        res.status(500).json({message: err.message});
    }
};
module.exports = {
    bergSplit,
    createBerg
}