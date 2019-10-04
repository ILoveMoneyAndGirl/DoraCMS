
const BaseComponent = require('../prototype/baseComponent');
const PayRecordModel = require("../models").PayRecord;
// const AdminUserModel = require("../models").AdminUser;


const formidable = require('formidable');
const _ = require("lodash");
const {
    service,
    validatorUtil,
    siteFunc
} = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator')


// //发起请求参数:
var msg={
    appId:"xxxx",
    targePrice:0,
    transactionId:"sdsdsdsd",
    data:"得到的",
    time:"xxxx",
    signature:"MD5",
    callBack:"",
    channel:"",
}

// var bcakMsg={
//     price:0,
//     transactionId:"",
//     comment:"",
//     time:"",
//     signature:"",
//     timeOut:"",
//     isAny:"",
//     takeOff:"",
//     qrcode:"", 
// }
                   

class PayRecord {
    constructor() {
        // super()
    }


    async GetList(req, res, next) {
        try {

            let modules = req.query.modules;
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            let model = req.query.model; // 查询模式 full/simple
            let searchkey = req.query.searchkey,
             queryObj = {};
                          queryObj.adminUser=req.session.adminUserInfo._id

            let useClient = req.query.useClient;

            if (model === 'full') {
                pageSize = 100;
            }

            if (searchkey) {
                let reKey = new RegExp(searchkey, 'i')
                queryObj.orderId = {
                    $regex: reKey
                }
            }
            console.log("________________")

            console.log(queryObj)


            // <el-table-column prop="_id" :label="$t('payRecord._id')">
            // </el-table-column>
            //  <el-table-column prop="appID" :label="$t('payRecord.appID')">
            // </el-table-column>

            // <el-table-column prop="tagPrice" :label="$t('payRecord.tagPrice')">
            // </el-table-column>
            // <el-table-column prop="price" :label="$t('payRecord.price')">
            // </el-table-column>
            // <el-table-column prop="rate" :label="$t('payRecord.rate')">
            // </el-table-column>
            // <el-table-column prop="takeOff" :label="$t('payRecord.takeOff')">
            // </el-table-column>
            // <el-table-column prop="channel" :label="$t('payRecord.channel')">
            //  <template slot-scope="scope">{{scope.row.channel === 0?'支付宝':(scope.row.channel ===1?'微信':'其它')}}</template>
            // </el-table-column>
            // <el-table-column prop="payUrl" :label="$t('payRecord.payUrl')">
            // </el-table-column>
            // <el-table-column prop="callBackUrl" :label="$t('payRecord.callBackUrl')">
            // </el-table-column>
            // <el-table-column prop="transactionId" :label="$t('payRecord.transactionId')">
            // </el-table-column>
            // <el-table-column prop="comment" :label="$t('payRecord.comment')">
            // </el-table-column>

            // <el-table-column prop="createDate" :label="$t('payRecord.createDate')">
            // </el-table-column>
            // <el-table-column prop="flishDate" :label="$t('payRecord.flishDate')">
            // </el-table-column>
            // <el-table-column prop="timeOutDate" :label="$t('payRecord.timeOutDate')">
            // </el-table-column>


            let data = await PayRecordModel.find(queryObj).sort({
                state: 1,
                flishDate:1
            }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize));
            const totalItems = await PayUrlModel.count(queryObj);


                        console.log(data)

            let sendData = {
                docs: data,
                pageInfo: {
                    count:totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                    searchkey: searchkey || ''
                }
            };
            let rendeData = siteFunc.renderApiData(req, res, 200, 'PayRecord', sendData);
            if (modules && modules.length > 0) {
                return rendeData.data;
            } else {
                if (useClient == '2') {

                    res.send(siteFunc.renderApiData(req, res, 200, 'PayRecord', data));
                } else {
                    res.send(rendeData);
                }

            }
        } catch (err) {


            res.send(siteFunc.renderApiErr(req, res, 500, err, 'getlist'))

        }
        
    }

    async Update(req, res, next) {

        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                checkFormData(req, res, fields);
            } catch (err) {
                console.log(err.message, err);
                res.send(siteFunc.renderApiErr(req, res, 500, err, 'checkform'));
            }

            const obj = {
                price: fields.price,
                tag: fields.tag,
                url: fields.url,
                isAny: fields.isAny,
                tagPrice: fields.tagPrice,
                channel:fields.channel,
            }
            const item_id = fields._id;
            try {
                await PayUrlModel.findOneAndUpdate({
                    _id: item_id
                }, {
                    $set: obj
                });
                res.send(siteFunc.renderApiData(req, res, 200, 'PayRecord', {}, 'update'))

            } catch (err) {

                res.send(siteFunc.renderApiErr(req, res, 500, err, 'update'));
            }
        })

        
    }


    async Delete(req, res, next) {

        try {
            let errMsg = '';
            if (!siteFunc.checkCurrentId(req.query.ids)) {
                errMsg = res.__("validate_error_params");
            }
            if (errMsg) {
                throw new siteFunc.UserException(errMsg);
            }
            await PayUrlModel.remove({
                _id: req.query.ids
            });
            res.send(siteFunc.renderApiData(req, res, 200, 'PayRecord', {}, 'delete'))

        } catch (err) {

            res.send(siteFunc.renderApiErr(req, res, 500, err, 'delete'));
        }

    }


}

module.exports = new PayRecord();