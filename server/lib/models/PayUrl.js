/**
 * Created by Administrator on 2017/4/15.
 * 二维码
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var AdminUser = require('./AdminUser');


var PayUrlSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    price: Number,//价格
    tag: String,//标记
    url:String,//二维码链接
    adminUser: {
        type: String,
        ref: 'AdminUser'
    },
    tagPrice:Number,//目标价格
    isAny:Boolean,
    timeOut:{
        type: Number,
        'default': 15 //默认15分钟后失效
    },
});


var PayUrl = mongoose.model("PayUrl", PayUrlSchema);
module.exports = PayUrl;

   