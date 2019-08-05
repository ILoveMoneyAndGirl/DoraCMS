
const BaseComponent = require('../prototype/baseComponent');
const PayProductModel = require("../models").PayProduct;
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
    let errMsg = '';

    // console.log('--fields---', fields)
    if (fields._id && !siteFunc.checkCurrentId(fields._id)) {
        errMsg = res.__("validate_error_params");
    }

    if (!fields.name) {
        errMsg = res.__("validate_selectNull", {
            label: "名称"
        });
    }

    if (errMsg) {
        throw new siteFunc.UserException(errMsg);
    }
}



                   

class PayProduct {
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
            let useClient = req.query.useClient;

            if (model === 'full') {
                pageSize = 100;
            }

            if (searchkey) {
                let reKey = new RegExp(searchkey, 'i')
                queryObj.name = {
                    $regex: reKey
                }
                queryObj.adminUser=req.session.adminUserInfo._id
                
            }

            let data = await PayProductModel.find(queryObj).sort({
                price: -1
            }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize));
            const totalItems = await PayProductModel.count(queryObj);

    


            let sendData = {
                docs: data,
                pageInfo: {
                    count:totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                    searchkey: searchkey || ''
                }
            };
            let rendeData = siteFunc.renderApiData(req, res, 200, 'PayProduct', sendData);
            if (modules && modules.length > 0) {
                return rendeData.data;
            } else {
                if (useClient == '2') {

                    res.send(siteFunc.renderApiData(req, res, 200, 'PayProduct', data));
                } else {

                    console.log("rendeData------------")
                     console.log(rendeData)
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
            const obj = {
                url: fields.url
            }
            const item_id = fields._id;
            try {
                await PayProductModel.findOneAndUpdate({
                    _id: item_id
                }, {
                    $set: obj
                });
                res.send(siteFunc.renderApiData(req, res, 200, 'PayProduct', {}, 'update'))

            } catch (err) {
                res.send(siteFunc.renderApiErr(req, res, 500, err, 'update'));
            }
        })

        
    }


    async Add(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                checkFormData(req, res, fields);

                const obj = {
                name: fields.name,
                url: [],
                adminUser:req.session.adminUserInfo._id
            }
                const newObj = new PayProductModel(obj);
                await newObj.save();

                res.send(siteFunc.renderApiData(req, res, 200, 'PayProduct', {
                    id: newObj._id
                }, 'save'))

            } catch (err) {
                console.log(err)
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
            await PayProductModel.remove({
                _id: req.query.ids
            });
            res.send(siteFunc.renderApiData(req, res, 200, 'PayProduct', {}, 'delete'))

        } catch (err) {

            res.send(siteFunc.renderApiErr(req, res, 500, err, 'delete'));
        }

    }


}

module.exports = new PayProduct();