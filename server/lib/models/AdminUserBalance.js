/**
 * Created by Administrator on 2017/4/15.
 * 产品
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var AdminUser = require('./AdminUser');


var AdminUserBalanceSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    money:Number,//充值金额
    createDate: {
        type: Date,
        default: Date.now
    },
    flishDate: {
        type: Date,
        default: Date.now
    },
    adminUser: {
        type: String,
        ref: 'AdminUser'
    },
    tryMinute: {    //试用时间
        type: Number,
        default: 0
    },

    tryAmountMoney: {    //试用金额
        type: Number,
        default: 0
    },
});


var AdminUserBalance = mongoose.model("AdminUserBalance", AdminUserBalanceSchema);
module.exports = AdminUserBalance;
