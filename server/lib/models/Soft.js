/**
 * Created by Administrator on 2017/4/15.
 * 软件ip
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var AdminUser = require('./AdminUser');
const settings = require('../../../configs/settings');

var SoftSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    name: String,
    ip: String,//通信ip
    port: { type: Number, default: 8888 }, // 通信端口
    comments: String, // 描述
    type:{ type: Number, default: 1},//产品类型
    adminUser: {
        type: String,
        ref: 'AdminUser'
    },

    rate:{
         type: Number,
         "default":settings.vpnRate,
    },
});




var Soft = mongoose.model("Soft", SoftSchema);
module.exports = Soft;
