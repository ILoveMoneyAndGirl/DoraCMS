
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

    async GetPayUrl(req, res, next) {
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

            // let userInfo = req.session.user || {};
            // if (useClient == '2') {
            //     contentTags = JSON.parse(JSON.stringify(contentTags));
            //     for (const tagItem of contentTags) {
            //         tagItem.hadWatched = false;
            //         if (userInfo._id) {
            //             let targetUser = await UserModel.findOne({
            //                 _id: userInfo._id
            //             }, siteFunc.getAuthUserFields('session'));
            //             if (!_.isEmpty(targetUser)) {
            //                 // 本人是否已添加该标签
            //                 if (targetUser.watchTags && targetUser.watchTags.indexOf(tagItem._id) >= 0) {
            //                     tagItem.hadWatched = true;
            //                 }
            //             }
            //         }
            //     }
            // }

            // let msg={
            //     current:current,
            //     queryObj:queryObj,
            //     pageSize:pageSize,
            // }



            let sendData = {
                docs: data,
                pageInfo: {
                    count:totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                    searchkey: searchkey || ''
                }
            };
            let rendeData = siteFunc.renderApiData(req, res, 200, 'goods', sendData);
            if (modules && modules.length > 0) {
                return rendeData.data;
            } else {
                if (useClient == '2') {

                    res.send(siteFunc.renderApiData(req, res, 200, 'goods', data));
                } else {
                    res.send(rendeData);
                }

            }
        } catch (err) {


            res.send(siteFunc.renderApiErr(req, res, 500, err, 'getlist'))

        }
        
    }

    async UpdatePayUrl(req, res, next) {

        // const form = new formidable.IncomingForm();
        // form.parse(req, async (err, fields, files) => {
        //     try {
        //         checkFormData(req, res, fields);
        //     } catch (err) {
        //         console.log(err.message, err);
        //         res.send(siteFunc.renderApiErr(req, res, 500, err, 'checkform'));
        //     }

        //     const userObj = {
        //         name: fields.name,
        //         alias: fields.alias,
        //         comments: fields.comments
        //     }
        //     const item_id = fields._id;
        //     try {
        //         await ContentTagModel.findOneAndUpdate({
        //             _id: item_id
        //         }, {
        //             $set: userObj
        //         });
        //         res.send(siteFunc.renderApiData(req, res, 200, 'contentTag', {}, 'update'))

        //     } catch (err) {

        //         res.send(siteFunc.renderApiErr(req, res, 500, err, 'update'));
        //     }
        // })

         res.send(siteFunc.renderApiData(req, res, 200, 'contentTag', {}, 'update'))
        
    }
    async AddPayUrl(req, res, next) {
                        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                checkFormData(req, res, fields);


                const tagObj = {
                    name: fields.name,
                    alias: fields.alias,
                    comments: fields.comments
                }

                const newContentTag = new ContentTagModel(tagObj);

                await newContentTag.save();

                res.send(siteFunc.renderApiData(req, res, 200, 'contentTag', {
                    id: newContentTag._id
                }, 'save'))

            } catch (err) {

                res.send(siteFunc.renderApiErr(req, res, 500, err, 'save'));
            }
        })

        
    }
    async DeletePayUrl(req, res, next) {

        //         try {
        //     let errMsg = '';
        //     if (!siteFunc.checkCurrentId(req.query.ids)) {
        //         errMsg = res.__("validate_error_params");
        //     }
        //     if (errMsg) {
        //         throw new siteFunc.UserException(errMsg);
        //     }
        //     await ContentTagModel.remove({
        //         _id: req.query.ids
        //     });
        //     res.send(siteFunc.renderApiData(req, res, 200, 'contentTag', {}, 'delete'))

        // } catch (err) {

        //     res.send(siteFunc.renderApiErr(req, res, 500, err, 'delete'));
        // }

        res.send(siteFunc.renderApiData(req, res, 200, 'contentTag', {}, 'delete'))
    }


}

module.exports = new HelloOperation();