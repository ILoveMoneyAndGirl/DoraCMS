
function checkFormData(req, res, fields) {



}



                   

class HelloOperation {
    constructor() {
        // super()
    }

    async GetGoods(req, res, next) {
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
            }

            // let contentTags = await ContentTagModel.find(queryObj).sort({
            //     date: -1
            // }).skip(Number(pageSize) * (Number(current) - 1)).limit(Number(pageSize));
            // const totalItems = await ContentTagModel.count(queryObj);

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

            let tagsData = {
                docs: contentTags,
                pageInfo: {
                    totalItems,
                    current: Number(current) || 1,
                    pageSize: Number(pageSize) || 10,
                    searchkey: searchkey || ''
                }
            };
            let renderTagsData = siteFunc.renderApiData(req, res, 200, 'goods', tagsData);
            if (modules && modules.length > 0) {
                return renderTagsData.data;
            } else {
                if (useClient == '2') {
                    res.send(siteFunc.renderApiData(req, res, 200, 'goods', contentTags));
                } else {
                    res.send(renderTagsData);
                }

            }
        } catch (err) {

            res.send(siteFunc.renderApiErr(req, res, 500, err, 'getlist'))

        }
        
    }

    async UpdateGoods(req, res, next) {
        
    }
    async AddGoods(req, res, next) {
        
    }
    async DeleteGoods(req, res, next) {
        
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