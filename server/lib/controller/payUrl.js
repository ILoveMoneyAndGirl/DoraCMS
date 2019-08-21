
const BaseComponent = require('../prototype/baseComponent');
const PayUrlModel = require("../models").PayUrl;
const PayUrlTagModel = require("../models").PayUrlTag;

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

    if (fields.type=="tag"&&(!fields.tag)) {
        errMsg = res.__("validate_selectNull", {
            label: "标记"
        });
    }

    if (fields.type=="price"&&(!fields.price)) {
        errMsg = res.__("validate_selectNull", {
            label: "价格"
        });
    }

    if (fields.type=="tagPrice"&&(!fields.tagPrice)&&(!fields.isAny)) {
        errMsg = res.__("validate_selectNull", {
            label: "价格"
        });
    }


    if (fields.type=="price"&&(!fields.url)) {
        errMsg = res.__("validate_selectNull", {
            label:  "二维码"
        });
    }


    if (fields.type=="channel"&&(!fields.channel)) {
        errMsg = res.__("validate_selectNull", {
            label:  "聚到"
        });
    }



    if (errMsg) {
        throw new siteFunc.UserException(errMsg);
    }
}



                   

class PayUrl {
    constructor() {
        // super()
    }


    async GetList(req, res, next) {
        try {

            let modules = req.query.modules;
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            // let model = req.query.model; // 查询模式 full/simple
            // let searchkey = req.query.searchkey,
            //  queryObj = {};
            // let useClient = req.query.useClient;

            // if (model === 'full') {
            //     pageSize = 100;
            // }

            // if (searchkey) {
            //     let reKey = new RegExp(searchkey, 'i')
            //     queryObj.tag = {
            //         $regex: reKey
            //     }
            //     queryObj.adminUser=req.session.adminUserInfo._id
                
            // }

            // let tagInfo=await PayUrlTagModel.find({adminUser:req.session.adminUserInfo._id})

            let data = await PayUrlModel.find({adminUser:req.session.adminUserInfo._id}).sort({
                tagPrice: 1,price:1
            })


            // let tagPrice={}
            // let tag={}
            // for (var i = 0; i < data.length; i++) {
            //     data[i]
            // }


 



            // for (var i = 0; i < tagInfo.length; i++) {
            //     tagInfo[i].type="tag"
            //     tagInfo[i].lable=tagInfo[i].tag
            //     tagInfo[i].children=[]
              
            //     for (var j = 0; j < 2; j++) {
            //         let t={}
            //         t.type="channel"
            //         t.lable=i
            //         t.channel=i
            //         t.children=[]
            //           tagInfo[i].children.push(t)
            //     }

            //       tag[tagInfo[i].tag]=tagInfo[i]
               
            // }

            // let tagPrice={}

            // for (var i = 0; i < data.length; i++) {
            //     tag[data[i].tag].children[data[i].channel].push(data[i])
            // }

   


            const totalItems = await PayUrlModel.count({adminUser:req.session.adminUserInfo._id});

            let sendData = {
                docs: data,
                pageInfo: {
                    count:totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                }
            };
            res.send(siteFunc.renderApiData(req, res, 200, 'PayUrl', sendData, 'getlist'))
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
                res.send(siteFunc.renderApiData(req, res, 200, 'payUrl', {}, 'update'))

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
                price: fields.price,
                tag: fields.tag,
                url: fields.url,
                isAny: fields.isAny,
                tagPrice: fields.tagPrice,
                parentId: fields.parentId,
                type:fields.type,
                channel:fields.channel,
                adminUser:req.session.adminUserInfo._id
            }
                const newObj = new PayUrlModel(obj);
                await newObj.save();

                res.send(siteFunc.renderApiData(req, res, 200, 'payUrl', {
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
            await PayUrlModel.remove({
                _id: req.query.ids
            });
            res.send(siteFunc.renderApiData(req, res, 200, 'payUrl', {}, 'delete'))

        } catch (err) {

            res.send(siteFunc.renderApiErr(req, res, 500, err, 'delete'));
        }

    }


}

module.exports = new PayUrl();