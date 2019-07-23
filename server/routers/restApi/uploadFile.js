/**
 * Created by Administrator on 2018年12月06日09:31:07
 * 系统支持功能
 */
const express = require('express');
const router = express.Router();
router.caseSensitive = true;
router.strict = true
//文件上传类
const formidable = require('formidable');
const util = require('util');
const fs = require('fs');
const axios = require('axios');
const qiniu = require('qiniu');


const mime = require('../../../utils/mime').types;
const service = require('../../../utils/service');


//站点配置
const settings = require("../../../configs/settings");
const siteFunc = require('../../../utils/siteFunc')

const _ = require('lodash');
let checkPathNum = 0;


let confirmPath = (path) => {
    return new Promise(function (resolve, reject) {
        let waitCheck = () => {
            setTimeout(() => {
                if (!fs.existsSync(path)) {
                    if (checkPathNum == 3) {
                        resolve(fs.existsSync(path));
                    } else {
                        checkPathNum++;
                        waitCheck();
                    }
                } else {
                    resolve(fs.existsSync(path));
                }
            }, 200);
        }
        waitCheck();
    })
}

let checkFilePath = async function (path) {
    checkPathNum = 0;
    return await confirmPath(path);
};

router.post('/files', siteFunc.checkUserSessionForApi, function (req, res, next) {

    let form = new formidable.IncomingForm();
    console.log('start upload');
    //存放目录
    let updatePath = "public/upload/images/";
    let updateVideoPath = "public/upload/videos/";
    let updateApkPath = "public/upload/apks/";
    let newFileName = "",
        fileType = '';
    let uploadType = req.query.type;
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.uploadDir = updatePath;

    if (uploadType == 'appPackage') {
        form.maxFileSize = 50 * 1024 * 1024; // 最大100M
    } else {
        form.maxFileSize = 5 * 1024 * 1024; // 最大5M
    }

    form.parse(req, async function (err, fields, files) {

        try {

            // await siteFunc.checkPostToken(req, res, fields.token);

            //校验文件的合法性
            let realFileType = service.getFileMimeType(files.file.path);
            let contentType = mime[realFileType.fileType] || 'unknown';
            if (contentType == 'unknown') {
                res.end(settings.system_error_imageType);
            }

            let typeKey = "others";
            let thisType = files.file.name.split('.')[1];
            let ms = (new Date()).getTime().toString();
            // console.log('--realFileType.fileType---', realFileType.fileType)
            if (realFileType.fileType == 'jpg' || realFileType.fileType == 'jpeg' || realFileType.fileType == 'png' || realFileType.fileType == 'gif') {
                fileType = 'images'
            } else if (realFileType.fileType == 'ogg' ||
                realFileType.fileType == 'mp4' ||
                realFileType.fileType == 'avi' ||
                realFileType.fileType == 'flv' ||
                realFileType.fileType == 'wmv') {
                fileType = 'videos'
            } else if (realFileType.fileType == 'zip') {
                if (uploadType == 'appPackage') {
                    fileType = 'apks'
                }
            }

            if (fileType == 'images') {
                typeKey = "img"
            } else if (fileType == 'videos') {
                typeKey = "video"
            } else if (fileType == 'apks') {
                typeKey = "apk"
            }

            newFileName = typeKey + ms + "." + thisType;

            if (fileType == 'images') {
                fs.renameSync(files.file.path, updatePath + newFileName)
            } else if (fileType == 'videos') {
                fs.renameSync(files.file.path, updateVideoPath + newFileName)
            } else if (fileType == 'apks') {
                fs.renameSync(files.file.path, updateApkPath + newFileName)
            }

            let addPath = process.cwd() + '/public/upload/images/' + newFileName;
            if (fileType == 'videos') {
                addPath = process.cwd() + '/public/upload/videos/' + newFileName;
            } else if (fileType == 'apks') {
                addPath = process.cwd() + '/public/upload/apks/' + newFileName;
            }

            if (await checkFilePath(addPath)) {

                // let fileInfo = await updateFileForApi(fileType, newFileName, addPath);
                    console.log('uploadToQiniu ---0');
                 try {

                    let url=await uploadToQiniu(addPath,newFileName)
                        console.log('uploadToQiniu ---url',url);

                    fs.unlink(addPath)

                    res.send(siteFunc.renderApiData(req, res, 200, 'get data success', {
                        path: url
                    }, 'save'));
                 } catch (err) {

                    res.send(siteFunc.renderApiErr(req, res, 500, err, 'upload'));
                 }

            } else {
                throw new siteFunc.UserException(settings.system_error_upload);
            }
        } catch (error) {
            res.send(siteFunc.renderApiErr(req, res, 500, error, 'ossUpload'))
        }

    });

});

async function uploadToQiniu(file,imgkey) {

     console.log('uploadToQiniu ---enter',file,imgkey);


    return new Promise(function (resolve, reject) {
     console.log('uploadToQiniu ---Promise',file,imgkey);

            // 鉴权凭证
        let { openqn, accessKey, secretKey, bucket, origin, fsizeLimit } = settings;
        console.log('0')
        let config = new qiniu.conf.Config();
          console.log('1')
        // 空间对应的机房
        config.zone = qiniu.zone.Zone_z0;
                  console.log('2')

        // 是否使用https域名
        //config.useHttpsDomain = true;
        // 上传是否使用cdn加速
        config.useCdnDomain = true;
          console.log('3')

        let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
          console.log('4')
        let options = {
            scope: bucket,
            fsizeLimit: fsizeLimit,
            mimeLimit: 'image/*'
        };
          console.log('5')
        let putPolicy = new qiniu.rs.PutPolicy(options);
          console.log('6')
        let uploadToken = putPolicy.uploadToken(mac);
          console.log('7')

        let formUploader = new qiniu.form_up.FormUploader(config);
          console.log('8')
        let putExtra = new qiniu.form_up.PutExtra();
          console.log('9')

        // 文件上传
        formUploader.putFile(uploadToken, imgkey, file, putExtra, function (respErr,
            respBody, respInfo) {
              console.log(' formUploader.putFile ---Promise10',file,imgkey,uploadToken,putExtra);
            if (respErr) {
                 console.log("respErr");
                  console.log(respErr);
                reject(respErr);
            }
            if (respInfo.statusCode == 200) {
                console.log(respBody);
                resolve(origin + '/' + respBody.key);
            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
                 reject(respInfo.statusCode);
            }
        });
    })
}


// router.post('/files', siteFunc.checkUserSessionForApi, function (req, res, next) {

//     let form = new formidable.IncomingForm();
//     console.log('start upload');
//     //存放目录
//     let updatePath = "public/upload/images/";
//     let updateVideoPath = "public/upload/videos/";
//     let updateApkPath = "public/upload/apks/";
//     let newFileName = "",
//         fileType = '';
//     let uploadType = req.query.type;
//     form.encoding = 'utf-8';
//     form.keepExtensions = true;
//     form.uploadDir = updatePath;

//     if (uploadType == 'appPackage') {
//         form.maxFileSize = 50 * 1024 * 1024; // 最大100M
//     } else {
//         form.maxFileSize = 5 * 1024 * 1024; // 最大5M
//     }

//     form.parse(req, async function (err, fields, files) {

//         try {

//             // await siteFunc.checkPostToken(req, res, fields.token);

//             //校验文件的合法性
//             let realFileType = service.getFileMimeType(files.file.path);
//             let contentType = mime[realFileType.fileType] || 'unknown';
//             if (contentType == 'unknown') {
//                 res.end(settings.system_error_imageType);
//             }

//             let typeKey = "others";
//             let thisType = files.file.name.split('.')[1];
//             let ms = (new Date()).getTime().toString();
//             // console.log('--realFileType.fileType---', realFileType.fileType)
//             if (realFileType.fileType == 'jpg' || realFileType.fileType == 'jpeg' || realFileType.fileType == 'png' || realFileType.fileType == 'gif') {
//                 fileType = 'images'
//             } else if (realFileType.fileType == 'ogg' ||
//                 realFileType.fileType == 'mp4' ||
//                 realFileType.fileType == 'avi' ||
//                 realFileType.fileType == 'flv' ||
//                 realFileType.fileType == 'wmv') {
//                 fileType = 'videos'
//             } else if (realFileType.fileType == 'zip') {
//                 if (uploadType == 'appPackage') {
//                     fileType = 'apks'
//                 }
//             }

//             if (fileType == 'images') {
//                 typeKey = "img"
//             } else if (fileType == 'videos') {
//                 typeKey = "video"
//             } else if (fileType == 'apks') {
//                 typeKey = "apk"
//             }

//             newFileName = typeKey + ms + "." + thisType;

//             if (fileType == 'images') {
//                 fs.renameSync(files.file.path, updatePath + newFileName)
//             } else if (fileType == 'videos') {
//                 fs.renameSync(files.file.path, updateVideoPath + newFileName)
//             } else if (fileType == 'apks') {
//                 fs.renameSync(files.file.path, updateApkPath + newFileName)
//             }

//             let addPath = process.cwd() + '/public/upload/images/' + newFileName;
//             if (fileType == 'videos') {
//                 addPath = process.cwd() + '/public/upload/videos/' + newFileName;
//             } else if (fileType == 'apks') {
//                 addPath = process.cwd() + '/public/upload/apks/' + newFileName;
//             }

//             if (await checkFilePath(addPath)) {

//                 // let fileInfo = await updateFileForApi(fileType, newFileName, addPath);



//                 res.send(siteFunc.renderApiData(req, res, 200, 'get data success', {
//                     path: '/upload/images/' + newFileName
//                 }, 'save'));

//             } else {
//                 throw new siteFunc.UserException(settings.system_error_upload);
//             }
//         } catch (error) {
//             res.send(siteFunc.renderApiErr(req, res, 500, error, 'ossUpload'))
//         }

//     });

// });


module.exports = router;