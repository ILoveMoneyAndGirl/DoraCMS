
const BaseComponent = require('../prototype/baseComponent');
const PayUrlModel = require("../models").PayUrl;
const AdminUserModel = require("../models").AdminUser;


const formidable = require('formidable');
const _ = require("lodash");
const {
    service,
    validatorUtil,
    siteFunc
} = require('../../../utils');
const shortid = require('shortid');
const validator = require('validator')

function checkFormData(req, res, fields) {



}



                   

class PayUrl {
    constructor() {
        // super()
    }

    async GetList(req, res, next) {
        try {

             console.log("HelloOperation.          ...?GetGoods")
            let modules = req.query.modules;
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            let model = req.query.model; // 查询模式 full/simple
            let searchkey = req.query.searchkey,
             queryObj = {};
            let useClient = req.query.useClient;

            if (model === 'full') {
                pageSize = 100;
            }

            if (searchkey) {
                let reKey = new RegExp(searchkey, 'i')
                queryObj.tag = {
                    $regex: reKey
                }
                queryObj.adminUser=req.session.adminUserInfo._id
                
            }

            let data = await PayUrlModel.find(queryObj).sort({
                price: -1
            }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize));
            const totalItems = await PayUrlModel.count(queryObj);




            let sendData = {
                docs: data,
                pageInfo: {
                    count:totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                    searchkey: searchkey || ''
                }
            };
            let rendeData = siteFunc.renderApiData(req, res, 200, 'PayUrl', sendData);
            if (modules && modules.length > 0) {
                return rendeData.data;
            } else {
                if (useClient == '2') {

                    res.send(siteFunc.renderApiData(req, res, 200, 'PayUrl', data));
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

            }
            const item_id = fields._id;
            try {
                await PayUrlModel.findOneAndUpdate({
                    _id: item_id
                }, {
                    $set: obj
                });
                res.send(siteFunc.renderApiData(req, res, 200, 'payUrl', {}, 'update'))

            } catch (err) {

                res.send(siteFunc.renderApiErr(req, res, 500, err, 'update'));
            }
        })

         res.send(siteFunc.renderApiData(req, res, 200, 'payUrl', {}, 'update'))
        
    }


    async Add(req, res, next) {
        
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                checkFormData(req, res, fields);


                const obj = {
                price: fields.price,
                tag: fields.tag,
                url: fields.url,
                isAny: fields.isAny,
                adminUser:req.session.adminUserInfo._id
            }

                const newObj = new PayUrlModel(obj);

                await newObj.save();

                res.send(siteFunc.renderApiData(req, res, 200, 'payUrl', {
                    id: newObj._id
                }, 'save'))

            } catch (err) {

                res.send(siteFunc.renderApiErr(req, res, 500, err, 'save'));
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
            res.send(siteFunc.renderApiData(req, res, 200, 'payUrl', {}, 'delete'))

        } catch (err) {

            res.send(siteFunc.renderApiErr(req, res, 500, err, 'delete'));
        }

        res.send(siteFunc.renderApiData(req, res, 200, 'payUrl', {}, 'delete'))
    }


}

module.exports = new PayUrl();