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
    }, // 0待完成 1自动完成 2手动完成
    PayProduct: {
        type: String,
        ref: 'PayProduct'
    },
    PayUrl: {
        type: String,
        ref: 'PayUrl'
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
    tagPrice:Number,
    price:Number,
    timeOutDate: {
        type: Date,
        default: Date.now
    }, //失效时间
    transactionId:String,

});


var PayRecord = mongoose.model("PayRecord", PayRecordSchema);
module.exports = PayRecord;

   