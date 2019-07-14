
const BaseComponent = require('../prototype/baseComponent');
const ContentTagModel = require("../models").ContentTag;

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



                   

class HelloOperation {
    constructor() {
        // super()
    }

    async GetGoods(req, res, next) {
        try {

             console.log("HelloOperation.          ...?GetGoods")
            let modules = req.query.modules;
            let current = req.query.current || 1;
            let pageSize = req.query.pageSize || 10;
            let model = req.query.model; // 查询模式 full/simple
            let searchkey = req.query.searchkey,
            let queryObj = {};
            let useClient = req.query.useClient;

            if (model === 'full') {
                pageSize = 100;
            }

            if (searchkey) {
                let reKey = new RegExp(searchkey, 'i')
                queryObj.name = {
                    $regex: reKey
                }
            }

            // let contentTags = await ContentTagModel.find(queryObj).sort({
            //     date: -1
            // }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize));
            const totalItems = await ContentTagModel.count(queryObj);

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

            let data= [ { _id: 'HJ0aDsOhz',price: 10,days: 10,des: 'xx'}]


            let tagsData = {
                docs: data,
                pageInfo: {
                    count:1,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                    searchkey: searchkey || ''
                }
            };
            let renderGoodsData = siteFunc.renderApiData(req, res, 200, 'goods', tagsData);
            if (modules && modules.length > 0) {
                console.log("renderGoodsData.data--------->",renderGoodsData.data)
                return renderGoodsData.data;
            } else {
                if (useClient == '2') {
                console.log("res.send(siteFunc.renderApiData(req, res, 200--------->",data)

                    res.send(siteFunc.renderApiData(req, res, 200, 'goods', data));
                } else {
                    res.send(renderGoodsData);
                }

            }
        } catch (err) {

                            console.log("res.send(siteFunc.renderApiData(req, res, 500--------->")

            res.send(siteFunc.renderApiErr(req, res, 500, err, 'getlist'))

        }
        
    }

    async UpdateGoods(req, res, next) {

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
    async AddGoods(req, res, next) {
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
    async DeleteGoods(req, res, next) {

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

    async AddTime(req, res, next) {
        
    }

    // async AddTime(req, res, next) {
        
    // }

    async GetSetting(req, res, next) {

        // var responseData={"callback":"","data":"","disptch":true,"msg":"","status":500};

        
    }
    async UpdateSetting(req, res, next) {
        
    }

}

module.exports = new HelloOperation();