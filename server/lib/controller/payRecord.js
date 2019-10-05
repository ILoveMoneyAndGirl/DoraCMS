
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
          

            let data = await PayRecordModel.find(queryObj).sort({
                state: 1,
                flishDate:1
            }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize));


            const totalItems = await PayRecordModel.count(queryObj);



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
            // try {
            //     checkFormData(req, res, fields);
            // } catch (err) {
            //     console.log(err.message, err);
            //     res.send(siteFunc.renderApiErr(req, res, 500, err, 'checkform'));
            // }


            const obj = {
                state: fields.state
            }
            const item_id = fields._id;
            try {
                await PayRecordModel.findOneAndUpdate({
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
            console.log(req.query.ids)
            // await PayRecordModel.remove({
            //     _id: req.query.ids
            // });

            await ContentModel.remove({
                '_id': {
                    $in: req.query.ids
                }
            });

            res.send(siteFunc.renderApiData(req, res, 200, 'PayRecord', {}, 'delete'))

        } catch (err) {

            res.send(siteFunc.renderApiErr(req, res, 500, err, 'delete'));
        }

    }


}

module.exports = new PayRecord();