
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
const PostData=require('../tool/postData')

const AdminUserBalance = require("../models").AdminUserBalance;
const PayRecord = require("../models").PayRecord;

function checkFormData(req, res, fields) {
    let errMsg = '';

    if (!fields.price) {
        errMsg = res.__("validate_selectNull", {
            label:  "价格"
        });
    }


    if (!fields.days) {
        errMsg = res.__("validate_selectNull", {
            label:  "天数"
        });
    }


    if (!fields.des) {
        errMsg = res.__("validate_selectNull", {
            label:  "描述"
        });
    }



    if (errMsg) {
        throw new siteFunc.UserException(errMsg);
    }

}


function checkFormAddTime(req, res, fields) {
    let errMsg = '';

    if (!fields.goodsId) {
        errMsg = res.__("validate_selectNull", {
            label:  "商品Id"
        });
    }


    if (!fields.userName) {
        errMsg = res.__("validate_selectNull", {
            label:  "用户名"
        });
    }


    if (errMsg) {
        throw new siteFunc.UserException(errMsg);
    }

}


function checkFormDataHost(req, res, fields) {
    let errMsg = '';

    if (!fields.head) {
        errMsg = res.__("validate_selectNull", {
            label:  "协议"
        });
    }


    if (!fields.host) {
        errMsg = res.__("validate_selectNull", {
            label:  "主机地址"
        });
    }


    if (!fields.port) {
        errMsg = res.__("validate_selectNull", {
            label:  "端口"
        });
    }

    if (!fields.type) {
        errMsg = res.__("validate_selectNull", {
            label:  "类型"
        });
    }


    if (!fields.name) {
        errMsg = res.__("validate_selectNull", {
            label:  "别名"
        });
    }

    if (!fields.status) {
        errMsg = res.__("validate_selectNull", {
            label:  "状态"
        });
    }





    if (errMsg) {
        throw new siteFunc.UserException(errMsg);
    }

}



                   

class HelloOperation {
    constructor() {
        // super()
    }

    async GetGoods(req, res, next) {
        try {

             // console.log("HelloOperation.          ...?GetGoods")
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
            }

            let data={
                queryObj:queryObj,
                pageSize:pageSize,
                current:current,
                pageSize:pageSize
            }
            data.action="GetGoods"
            PostData.PostDataByUrl(req.session.vpnServer,data,function(err,d)
            {
                if(err)
                    res.send(siteFunc.renderApiErr(req, res, 500, err, 'getlist'))
                else{
                    let sendData = {
                        docs: d.data,
                        pageInfo: {
                            count:d.totalItems,
                            current: Number(current) || 1,
                            pageSize: Number(pageSize) || 10,
                            searchkey: searchkey || ''
                        }
                    };

                     let rendeData = siteFunc.renderApiData(req, res, 200, 'getlist', sendData);
                     if (modules && modules.length > 0) {
                        return rendeData.data;
                     } else {
                         if (useClient == '2') {
                             res.send(siteFunc.renderApiData(req, res, 200, 'getlist', data));
                         } else {
                             res.send(rendeData);
                        }
                    }
                 }

            })
            

        } catch (err) {
            res.send(siteFunc.renderApiErr(req, res, 500, err, 'getlist'))

        }
        
    }
    async UpdateGoods(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                checkFormData(req, res, fields);


                const tagObj = {
                    price: fields.price,
                    days: fields.days,
                    des: fields.des
                }

                let sendData={}
                sendData.action="UpdateGoods"
                sendData.id=fields.id
                sendData.set=tagObj

                PostData.PostDataByUrl(req.session.vpnServer,sendData,function(err,d)
                {
                    if(err)
                        res.send(siteFunc.renderApiErr(req, res, 500, err, 'update'))
                    else
                        res.send(siteFunc.renderApiData(req, res, 200, 'Goods', {}, 'update'))

                })

            } catch (err) {
                res.send(siteFunc.renderApiErr(req, res, 500, err, 'update'))
            }
        })
        
    }
    async AddGoods(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                checkFormData(req, res, fields);


                const tagObj = {
                    price: fields.price,
                    days: fields.days,
                    des: fields.des
                }
                let sendData={}
                sendData.newData=tagObj
                sendData.action="AddGoods"
            PostData.PostDataByUrl(req.session.vpnServer,sendData,function(err,d)
            {
                if(err)
                    res.send(siteFunc.renderApiErr(req, res, 500, err, 'save'))
                else
                     res.send(siteFunc.renderApiData(req, res, 200, 'goods', {
                    id: d.id
                    }, 'save'))

            })

            } catch (err) {

                res.send(siteFunc.renderApiErr(req, res, 500, err, 'save'));
            }
        })

        
    }
    async DeleteGoods(req, res, next) {

         try {
         
            PostData.PostDataByUrl(req.session.vpnServer,{id:req.query.ids,action:"deleteGoods"},function(err,d){
            if(err)
                    res.send(siteFunc.renderApiErr(req, res, 500, err, 'delete'))
                else
                      res.send(siteFunc.renderApiData(req, res, 200, 'goods', {}, 'delete'))

            })

        } catch (err) {
            res.send(siteFunc.renderApiErr(req, res, 500, err, 'delete'));
        }
    }





    async GetHost(req, res, next) {
        try {

             // console.log("HelloOperation.          ...?GetGoods")
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
            }

            let data={
                queryObj:queryObj,
                pageSize:pageSize,
                current:current,
                pageSize:pageSize
            }
            data.action="GetHost"
            PostData.PostDataByUrl(req.session.vpnServer,data,function(err,d)
            {
                if(err)
                    res.send(siteFunc.renderApiErr(req, res, 500, err, 'getlist'))
                else{
                    let sendData = {
                        docs: d.data,
                        pageInfo: {
                            count:d.totalItems,
                            current: Number(current) || 1,
                            pageSize: Number(pageSize) || 10,
                            searchkey: searchkey || ''
                        }
                    };

                     let rendeData = siteFunc.renderApiData(req, res, 200, 'getlist', sendData);
                     if (modules && modules.length > 0) {
                        return rendeData.data;
                     } else {
                         if (useClient == '2') {
                             res.send(siteFunc.renderApiData(req, res, 200, 'getlist', data));
                         } else {
                             res.send(rendeData);
                        }
                    }
                 }

            })
            

        } catch (err) {
            res.send(siteFunc.renderApiErr(req, res, 500, err, 'getlist'))

        }
        
    }
    async UpdateHost(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                checkFormDataHost(req, res, fields);


                const tagObj = {
                    head: fields.head,
                    host: fields.host,
                    port: fields.port,
                    type: fields.type,
                    status: fields.status,
                    name: fields.name,
                }

                let sendData={}
                sendData.action="UpdateHost"
                sendData.id=fields.id
                sendData.set=tagObj

                PostData.PostDataByUrl(req.session.vpnServer,sendData,function(err,d)
                {
                    if(err)
                        res.send(siteFunc.renderApiErr(req, res, 500, err, 'update'))
                    else
                        res.send(siteFunc.renderApiData(req, res, 200, 'Host', {}, 'update'))

                })

            } catch (err) {
                res.send(siteFunc.renderApiErr(req, res, 500, err, 'update'))
            }
        })
        
    }
    async AddHost(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                checkFormDataHost(req, res, fields);
                const tagObj = {
                    head: fields.head,
                    host: fields.host,
                    port: fields.port,
                    type: fields.type,
                    status: fields.status,
                    name: fields.name,
                }
                let sendData={}
                sendData.newData=tagObj
                sendData.action="AddHost"
            PostData.PostDataByUrl(req.session.vpnServer,sendData,function(err,d)
            {
                if(err)
                    res.send(siteFunc.renderApiErr(req, res, 500, err, 'save'))
                else
                     res.send(siteFunc.renderApiData(req, res, 200, 'host', {
                    id: d.id
                    }, 'save'))

            })

            } catch (err) {

                res.send(siteFunc.renderApiErr(req, res, 500, err, 'save'));
            }
        })

        
    }
    async DeleteGoods(req, res, next) {

         try {
         
            PostData.PostDataByUrl(req.session.vpnServer,{id:req.query.ids,action:"deleteHost"},function(err,d){
            if(err)
                    res.send(siteFunc.renderApiErr(req, res, 500, err, 'delete'))
                else
                      res.send(siteFunc.renderApiData(req, res, 200, 'host', {}, 'delete'))

            })

        } catch (err) {
            res.send(siteFunc.renderApiErr(req, res, 500, err, 'delete'));
        }
    }


    // async AddTime(req, res, next) {
    //     const form = new formidable.IncomingForm();
    //     form.parse(req, async (err, fields, files) => {
    //         try {
    //                 checkFormAddTime(req, res, fields);
    //                 const tagObj = {
    //                     goodsId: fields.goodsId,
    //                     userName: fields.userName,
    //                 }
    //                 let sendData={}
    //                 sendData.newData=tagObj
    //                 sendData.action="addUserTime"

    //                 let userInfo=await AdminUserBalance.findOne({adminUser:req.session.adminUserInfo._id})

    //                 if(userInfo.state==1)
    //                 {
    //                     let now=new Date()
    //                     let deadLine=userInfo.createDate
    //                     deadLine.setDate(deadLine.getDate()+userInfo.tryDay);
    //                     if((now-deadLine)>0&&(userInfo.money<-userInfo.tryAmountMoney))
    //                     {
    //                         res.send(siteFunc.renderApiErr(req, res, 500, err, 'Add'));
    //                         return 
    //                     }
    //                 }

    //                 PostData.PostDataByUrl(req.session.vpnServer,sendData,function(err,d)
    //                 {

    //                     if(err)
    //                         res.send(siteFunc.renderApiErr(req, res, 500, err, 'Add'))
    //                     else
    //                     {
    //                         let takeOff=d.price*req.session.vpnRate
    //                         takeOff=parseFloat(takeOff).toFixed(3)

    //                      //  await AdminUserBalance.findOneAndUpdate({adminUser:req.session.adminUserInfo._id},{"$inc":{"money":-takeOff}})
    //                         const obj = {
    //                               state: 3,
    //                               payProduct:req.session.vpnServer,
    //                               payUrl: "",
    //                               adminUser: req.session.adminUserInfo._id,
    //                               callBackUrl:"",
    //                               orderId: "",
    //                               income:d.price,
    //                               takeOff:takeOff,
    //                               goodsName:fields.goodsId,
    //                               uId:fields.userName,
    //                               appToken:"",
    //                           }
    //                          const newObj = new PayRecord(obj)
    //                          // let info= await newObj.save()

    //                          res.send(siteFunc.renderApiData(req, res, 200, 'addTime', {
    //                             id: "info._id"
    //                             }, 'Add'))
    //                      }

    //                 })

    //             } catch (err) {

    //                 res.send(siteFunc.renderApiErr(req, res, 500, err, 'Add'));
    //             }
    //     })
    // }

    async GetSetting(req, res, next) {

        console.log("GetSettingGetSetting.....",req.query.softId)

         try {
                const totalItems = await ContentTagModel.count();
                let tagsData = {
                    name: "test1",
                    port: 8888,
                    comments:"test1_comments",
                    type:0,
                    ip:"123.123.123.11"
                };
                 res.send(siteFunc.renderApiData(req, res, 200, 'softArg', tagsData));

             } catch (err) {

                res.send(siteFunc.renderApiErr(req, res, 500, err, 'softArg'))

            }

        
    }
    async UpdateSetting(req, res, next) {

        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {
                checkFormData(req, res, fields);
            } catch (err) {
                console.log(err.message, err);
                res.send(siteFunc.renderApiErr(req, res, 500, err, 'checkform'));
            }

            // const userObj = {
            //     name: fields.name,
            //     alias: fields.alias,
            //     comments: fields.comments
            // }
            // const item_id = fields._id;
             const totalItems = await ContentTagModel.count();
             
            try {
                // await ContentTagModel.findOneAndUpdate({
                //     _id: item_id
                // }, {
                //     $set: userObj
                // });
                res.send(siteFunc.renderApiData(req, res, 200, 'softArg', {}, 'update'))

            } catch (err) {

                res.send(siteFunc.renderApiErr(req, res, 500, err, 'update'));
            }
        })
        
    }

}

module.exports = new HelloOperation();