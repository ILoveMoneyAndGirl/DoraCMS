const {
    AdminResource
} = require('../server/lib/controller');
const _ = require('lodash');
module.exports = (req, res, next) => {
    req.query.resourcefiles = "_id api";
    AdminResource.getAllResource(req, res, {
        type: '1'
    }).then((resouce) => {
        let hasPower = false;
        let targetApi = (req.originalUrl).replace('/manage/', '').split("?")[0];
             console.log("targetApi:->",targetApi)
        for (let i = 0; i < resouce.length; i++) {
            let resourceObj = resouce[i];
            if (!_.isEmpty(req.session.adminUserInfo)) {
                let adminPower = req.session.adminPower;
                if (resourceObj.api === targetApi && adminPower && adminPower.indexOf(resourceObj._id) > -1) {
                    hasPower = true;
                     console.log("hasPower:->True")
                    break;
                }
                console.log("resourceObj.api:->",resourceObj.api)
                console.log("adminPower.indexOf:->",adminPower.indexOf(resourceObj._id))
            } else {
                break;
            }
        }
        if (!hasPower) {
               console.log("hasPower:->false")
            res.send({
                status: 500,
                message: res.__('label_systemnotice_nopower')
            });
        } else {
            return next();
        }

    }).catch((err) => {
        res.send({
            status: 500,
            message: res.__('label_systemnotice_nopower')
        });
    });
}