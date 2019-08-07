/**
 * Created by Administrator on 2017/4/15.
 * 产品
 */
var mongoose = require('mongoose');
var shortid = require('shortid');
var Schema = mongoose.Schema;
var AdminUser = require('./AdminUser');


var AdminUserRechargeSchema = new Schema({
    _id: {
        type: String,
        'default': shortid.generate
    },
    money:Number,//充值金额
    createDate: {
        type: Date,
        default: Date.now
    },
    adminUser: {
        type: String,
        ref: 'AdminUser'
    },
});


var AdminUserRecharge = mongoose.model("AdminUserRecharge", AdminUserRechargeSchema);
module.exports = AdminUserRecharge;
