/**
 * Created by Administrator on 2017/4/15.
 * 收费统计　
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;

var PaymentSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    price: Number,//价格
    softId: String,//产品ID
    date: { type: Date, default: Date.now },
    url:String,//支付链接
    state: { type: Number, default:0},
});


var Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;

   