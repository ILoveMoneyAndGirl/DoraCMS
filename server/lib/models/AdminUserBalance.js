/**
 * Created by Administrator on 2017/4/15.
 * 产品
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var AdminUser = require('./AdminUser');
const settings = require('../../../configs/settings');


var AdminUserBalanceSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    money:{ 
        type: Number,
        default:0
    },//余额
    createDate: {
        type: Date,
        default: Date.now
    },
    adminUser: {
        type: String,
        ref: 'AdminUser'
    },
    tryDay: {    //试用时间
        type: Number,
        default: settings.tryMinute
    },

    tryAmountMoney: {    //试用金额
        type: Number,
        default: settings.tryAmountMoney
    },
    state:{
        type:Number,
        default:1   // 0永久免费，1普通用户
    }
});


var AdminUserBalance = mongoose.model("AdminUserBalance", AdminUserBalanceSchema);
module.exports = AdminUserBalance;
