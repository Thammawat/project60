const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Float = require('mongoose-float').loadType(mongoose, 13)

var busDataSchema = new Schema({
    path: String,
    busID: String,
    speed: Number,
    lat: { type: Float },
    lng: { type: Float },
    time: Date,
});

var BusData = mongoose.model('BusData',busDataSchema);
module.exports = BusData;