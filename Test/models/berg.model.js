const mongoose = require('mongoose');

const IcebergSchema = mongoose.Schema ({
    mission: {
        type: String,
        required: [true, "Please enter the mission identifier"],
    },
    aircraft: {
        type: String,
        default: "C-GCNA",
        required: [true, "Please enter the callsign of the aircraft"]
    },
    latitude: {
        type: String,
        required: [true, "Please enter latitude"]
    },
    longitude: {
        type: String,
        required: [true, "Please enter longitude"]
    },
    altitude: {
        type: Number,
        required: [true, "Please enter altitude"]
    },
    timestamp: {
        type: String,
        required: [true, "Please enter timestamp in 'YYYY/MM/DD HH:MM:SS Z' format"]
    },
    bergId: {
        type: String,
        required: [true, "Please enter the ID of the iceberg"]
    },
    iceType: {
        type: String,
        default: "Tabular",
        required: false
    },
    iceSize: {
        type: Number,
        required: false
    },
    seaState: {
        type: String,
        default: "Calm",
        required: false
    },
    seaTemp: {
        type: Number,
        required: false
    },
    iceGrounded: {
        type: Boolean,
        default: false,
        required: false
    },
    comment: {
        type: String,
        required: false
    }
},
{
    timestamps: true
});

const Iceberg = mongoose.model("Iceberg", IcebergSchema);
module.exports = Iceberg;