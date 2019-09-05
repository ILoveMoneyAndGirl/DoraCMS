const AdminUserBalanceModel = require("../models").AdminUserBalance;
const setting=require('../../../configs/settings')

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
    if (fields._id && !siteFunc.checkCurrentId(fields._id)) {
        errMsg = res.__("validate_error_params");
    }


    if (!fields.money) {
        errMsg = res.__("validate_selectNull", {
            label: "余额"
        });
    }

    if (!fields.tryDay) {
        errMsg = res.__("validate_selectNull", {
            label: "试用时限"
        });
    }

    if (!fields.tryAmountMoney) {
        errMsg = res.__("validate_selectNull", {
            label: "试用金额"
        });
    }

    if (!fields.state) {
        errMsg = res.__("validate_selectNull", {
            label: "状态"
        });
    }

    if (errMsg) {
        throw new siteFunc.UserException(errMsg);
    }
}

function getCacheValueByKey(key) {
    return new Promise((resolve, reject) => {
        cache.get(key, (targetValue) => {
            if (targetValue) {
                resolve(targetValue)
            } else {
                resolve('');
            }
        })
    })
}

class Soft {
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

                  //     let  data =await PayProduct.findOne({_id:msg.appId}).populate([{
                  //     path: 'adminUser',
                  //     select: 'userName'
                  // }]).exec();

            let data = await AdminUserBalanceModel.find(queryObj).sort({
                state: 1
            }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize)).populate([{
                      path: 'adminUser',
                      select: 'userName'
                  }]).exec();

            console.log(">>>>>>><<<<<<<<?????<<<<<>>>>AdminUserBalanceModel")
            console.log(data)

            const totalItems = await AdminUserBalanceModel.count(queryObj);


            let sendData = {
                docs: data,
                pageInfo: {
                    count:totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                    searchkey: searchkey || ''
                }
            };
            let rendeData = siteFunc.renderApiData(req, res, 200, 'AdminUserBalance', sendData);
            if (modules && modules.length > 0) {
                return rendeData.data;
            } else {
                if (useClient == '2') {

                    res.send(siteFunc.renderApiData(req, res, 200, 'AdminUserBalance', data));
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
                money: fields.money,
                tryDay: fields.tryDay,
                tryAmountMoney: fields.tryAmountMoney,
                state: fields.state,
            }
            const item_id = fields._id;
            try {
                await AdminUserBalanceModel.findOneAndUpdate({
                    _id: item_id
                }, {
                    $set: obj
                });
                res.send(siteFunc.renderApiData(req, res, 200, 'adminUserBalance', {}, 'update'))

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
            await AdminUserBalanceModel.remove({
                _id: req.query.ids
            });
            res.send(siteFunc.renderApiData(req, res, 200, 'adminUserBalance', {}, 'delete'))

        } catch (err) {

            res.send(siteFunc.renderApiErr(req, res, 500, err, 'delete'));
        }
    }




    
}

module.exports = new AdminUserBalance();