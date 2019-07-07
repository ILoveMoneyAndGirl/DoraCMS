const SoftUserModel = require("../models").Soft;

function checkFormData(req, res, fields) {
    let errMsg = '';
    if (fields._id && !siteFunc.checkCurrentId(fields._id)) {
        errMsg = res.__("validate_error_params");
    }
    if (!validatorUtil.checkUserName(fields.userName)) {
        errMsg = res.__("validate_rangelength", {
            min: 5,
            max: 12,
            label: res.__("label_user_userName")
        });
    }
    if (!validatorUtil.checkName(fields.name)) {
        errMsg = res.__("validate_rangelength", {
            min: 2,
            max: 6,
            label: res.__("label_name")
        });
    }
    if (fields.password !== fields.confirmPassword) {
        errMsg = res.__("validate_error_pass_atypism");
    }
    if (!validatorUtil.checkPhoneNum(fields.phoneNum)) {
        errMsg = res.__("validate_inputCorrect", {
            label: res.__("label_user_phoneNum")
        });
    }
    if (!fields.countryCode) {
        errMsg = res.__("validate_selectNull", {
            label: res.__("label_user_countryCode")
        });
    }
    if (!validatorUtil.checkEmail(fields.email)) {
        errMsg = res.__("validate_inputCorrect", {
            label: res.__("label_user_email")
        });
    }
    if (fields.comments && !validator.isLength(fields.comments, 5, 30)) {
        errMsg = res.__("validate_rangelength", {
            min: 5,
            max: 30,
            label: res.__("label_comments")
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

    async addSoft(req, res, next) {
        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
             try {
                checkFormData(req, res, fields);
                const softObj = {
                    ip: fields.ip,
                    name: fields.name,
                    port: fields.port,
                    comments: fields.comments,
                }

                const softData = new SoftUserModel(softObj);

                await softData.save();

                let renderSendData = siteFunc.renderApiData(req, res, 200, res.__('restful_api_response_success', {
                    label: res.__('user_action_type_creat_Soft')
                }), {
                    id: softData._id
                })

                res.send(renderSendData);

             } catch (err) {

                res.send(siteFunc.renderApiErr(req, res, 500, err, 'save'))
            }

        }

    }


    async updateSoft(req, res, next) {

        const form = new formidable.IncomingForm();
        form.parse(req, async (err, fields, files) => {
            try {

                const softObj = {
                    ip: fields.ip,
                    name: fields.name,
                    port: fields.port,
                    comments: fields.comments,
                }

                const item_id = fields._id;

                await SoftUserModel.findOneAndUpdate({
                    _id: item_id
                }, {
                    $set: softObj
                });

                res.send(siteFunc.renderApiData(req, res, 200, 'soft', {}, 'update'))

            } catch (err) {

                res.send(siteFunc.renderApiErr(req, res, 500, err, 'update'));
            }
        })

    }



    async delSoft(req, res, next) {
        try {

            await SoftUserModel.remove({
                '_id': {
                    $in:  req.query._id
                }
            });
            res.send(siteFunc.renderApiData(req, res, 200, 'content', {}, 'delete'))

        } catch (err) {

            res.send(siteFunc.renderApiErr(req, res, 500, err, 'delete'));
        }
    }

}

module.exports = new Soft();