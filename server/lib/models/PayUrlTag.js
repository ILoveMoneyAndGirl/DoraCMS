var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var AdminUser = require('./AdminUser');


var PayUrlTagSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    tag: String,//标记
    adminUser: {
        type: String,
        ref: 'AdminUser'
    },
});


var PayUrlTag = mongoose.model("PayUrlTag", PayUrlTagSchema);
module.exports = PayUrlTag;