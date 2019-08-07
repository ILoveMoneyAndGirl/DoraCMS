/**
 * Created by Administrator on 2017/4/15.
 * 产品
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var AdminUser = require('./AdminUser');
var PayUrl = require('./PayUrl');
const settings = require('../../../configs/settings');


var PayProductSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    name: String,//名称
    adminUser: {
        type: String,
        ref: 'AdminUser'
    },

    api: {
        type: String,
        'default': settings.payApiRoute
    },

    rate:{
         type: Number,
         "default":settings.payRate,
    },

    url: [{
        type: String,
        ref: "PayUrl"
    }]
});


var PayProduct = mongoose.model("PayProduct", PayProductSchema);
module.exports = PayProduct;
