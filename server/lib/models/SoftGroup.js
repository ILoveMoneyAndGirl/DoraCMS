/**
 * Created by Administrator on 2015/4/15.
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var Soft = require('./Soft');

var SoftGroupSchema = new Schema({
    _id: {
        type: String,
        
        'default': shortid.generate
    },
    name: String,
    Softs: [{
        type: String,
        ref: "Soft"
    }],
    date: {
        type: Date,
        default: Date.now
    }
});


var SoftGroup = mongoose.model("SoftGroup", SoftGroupSchema);

module.exports = SoftGroup;