/**
 * Created by Administrator on 2017/4/15.
 * 广告管理
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var SoftSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    name: String,
    ip: String,//通信ip
    port: { type: Number, default: 8888 }, // 通信端口
    comments: String, // 描述
});




var Soft = mongoose.model("Soft", SoftSchema);
module.exports = Soft;
