/**
 * Created by Administrator on 2017/4/15.
 * 支付统计
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var AdminUser = require('./AdminUser');
var PayProduct = require('./PayProduct');
var PayUrl = require('./PayUrl');



var PayRecordSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    
    state: {
        type: Number,
        default: 0
    }, // 0待完成 1手动完成 2自动完成,3自充
    payProduct: {
        type: String,
        ref: 'PayProduct'
    },
    payUrl: {
        type: String,
        ref: 'PayUrl'
    },
    adminUser: {
        type: String,
        ref: 'AdminUser'
    },

    callBackUrl:String,
    createDate: {
        type: Date,
        default: Date.now
    },
    flishDate: {
        type: Date,
        default: Date.now
    },
    orderId:String,
    takeOff:{
        type: Number,
        default: 0
    },
    income:{
        type: Number,
        default: 0
    },
    uId:String,
    goodsName:String,
    appToken:String,
    channel: {
        type: Number,
        'default': 3
    },
});


var PayRecord = mongoose.model("PayRecord", PayRecordSchema);
module.exports = PayRecord;

   