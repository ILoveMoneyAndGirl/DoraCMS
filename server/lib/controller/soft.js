const SoftModel = require("../models").Soft;
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

     console.log("a1")

    if (!fields.name) {
        errMsg = res.__("validate_selectNull", {
            label: "名称"
        });
    }

    if (!fields.ip) {
        errMsg = res.__("validate_selectNull", {
            label: "ip"
        });
    }

    if (!fields.port) {
        errMsg = res.__("validate_selectNull", {
            label: "端口"
        });
    }

    if (!fields.type) {
        errMsg = res.__("validate_selectNull", {
            label: "类型"
        });
    }
    if (!fields.comments) {
        errMsg = res.__("validate_selectNull", {
            label: "描述"
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

            if (searchkey) {
                let reKey = new RegExp(searchkey, 'i')
                queryObj.name = {
                    $regex: reKey
                }
                queryObj.adminUser=req.session.adminUserInfo._id
                
            }

            let data = await SoftModel.find(queryObj).sort({
                price: -1
            }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize));
            const totalItems = await SoftModel.count(queryObj);


            let sendData = {
                docs: data,
                pageInfo: {
                    count:totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                    searchkey: searchkey || ''
                }
            };
            let rendeData = siteFunc.renderApiData(req, res, 200, 'Soft', sendData);
            if (modules && modules.length > 0) {
                return rendeData.data;
            } else {
                if (useClient == '2') {

                    res.send(siteFunc.renderApiData(req, res, 200, 'Soft', data));
                } else {
                    res.send(rendeData);
                }

            }
        } catch (err) {
            res.send(siteFunc.renderApiErr(req, res, 500, err, 'getlist'))

        }
        
    }

    async Update(req, res, next) {


        console.log("XXXXXXXXSOFT Update")

        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                checkFormData(req, res, fields);
            } catch (err) {
                console.log(err.message, err);
                res.send(siteFunc.renderApiErr(req, res, 500, err, 'checkform'));
            }

            const obj = {
                name: fields.name,
                ip: fields.ip,
                port: fields.port,
                type: fields.type,
                comments: fields.comments
            }
            const item_id = fields._id;
            try {
                await SoftModel.findOneAndUpdate({
                    _id: item_id
                }, {
                    $set: obj
                });
                res.send(siteFunc.renderApiData(req, res, 200, 'soft', {}, 'update'))

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
                    ip: fields.ip,
                    port: fields.port,
                    type: fields.type,
                    comments: fields.comments,
                    adminUser:req.session.adminUserInfo._id
                }
                const newObj = new SoftModel(obj);
                await newObj.save();

                res.send(siteFunc.renderApiData(req, res, 200, 'soft', {
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
            await SoftModel.remove({
                _id: req.query.ids
            });
            res.send(siteFunc.renderApiData(req, res, 200, 'soft', {}, 'delete'))

        } catch (err) {

            res.send(siteFunc.renderApiErr(req, res, 500, err, 'delete'));
        }
    }

    async Select(req, res, next) {

        try {
             const item =await SoftModel.findOne({
                    _id: softId
                });

             if(item){
                req.session.vpnServer="http://"+item.ip+":"+item.port+setting.vpnPath
                res.send(siteFunc.renderApiData(req, res, 200, 'soft', {}, 'Select'))
             }else
                 res.send(siteFunc.renderApiErr(req, res, 500, err, 'Select'));
               

            } catch (err) {
                res.send(siteFunc.renderApiErr(req, res, 500, err, 'Select'));
            }

    }


    
}

module.exports = new Soft();