const express = require('express')
const router = express.Router()
router.caseSensitive = true
router.strict = true
const {
  AdminUser,
  AdminGroup,
  AdminResource,
  ContentCategory,
  Content,
  ContentTag,
  User,
  Message,
  SystemConfig,
  DataOptionLog,
  SystemOptionLog,
  UserNotify,
  Notify,
  Ads,
  ContentTemplate,
  SiteMessage,
  HelpCenter,
  VersionManage,
  HelloOperation,
  PayUrl,
  Soft,
  PayProduct,
  AdminUserBalance,
  PayRecord,

  //MgRoutersController
} = require('../lib/controller');
const {
  service,
  authSession,
  authToken,
  authPower,
  validatorUtil
} = require('../../utils');

const generalFun = require("../lib/utils/generalFun");

// 管理员退出
router.get('/logout', (req, res) => {
  req.session.adminlogined = false;
  req.session.adminPower = '';
  req.session.adminUserInfo = '';
  res.send({
    status: 200
  });
});

// 获取管理员信息
router.get('/getUserSession', (req, res, next) => {
  if (req.session.adminlogined) {
    next()
  } else {
    res.send({
      data: {
        state: false,
        userInfo: {}
      }
    });
  }
}, AdminUser.getUserSession)

// 获取后台基础信息
router.get('/getSitBasicInfo', authSession, authPower, AdminUser.getBasicSiteInfo)

/**
 * 管理员管理
 */
router.get('/adminUser/getList', authToken, authPower, AdminUser.getAdminUsers)

router.post('/adminUser/addOne', authToken, authPower, AdminUser.addAdminUser)

router.post('/adminUser/updateOne', authToken, authPower, AdminUser.updateAdminUser)

router.get('/adminUser/deleteUser', authToken, authPower, AdminUser.delAdminUser)


/**
 * 角色管理
 */
router.get('/adminGroup/getList', authToken, authPower, AdminGroup.getAdminGroups)

router.post('/adminGroup/addOne', authToken, authPower, AdminGroup.addAdminGroup)

router.post('/adminGroup/updateOne', authToken, authPower, AdminGroup.updateAdminGroup)

router.get('/adminGroup/deleteGroup', authToken, authPower, AdminGroup.delAdminGroup)


/**
 * 资源管理
 * 
 */

router.get('/adminResource/getList', authToken, authPower, AdminResource.getAdminResources)

router.post('/adminResource/addOne', authToken, authPower, AdminResource.addAdminResource)

router.post('/adminResource/updateOne', authToken, authPower, AdminResource.updateAdminResource)

router.get('/adminResource/deleteResource', authToken, authPower, AdminResource.delAdminResource)

/**
 * 系统配置
 * 此api名称尽量不要改
 */
router.get('/systemConfig/getConfig', authToken, authPower, SystemConfig.getSystemConfigs)

router.post('/systemConfig/updateConfig', authToken, authPower, SystemConfig.updateSystemConfig)


/**
 * 文档类别管理
 * 
 */

router.get('/contentCategory/getList', authToken, authPower, ContentCategory.getContentCategories)

router.post('/contentCategory/addOne', authToken, authPower, ContentCategory.addContentCategory)

router.post('/contentCategory/updateOne', authToken, authPower, ContentCategory.updateContentCategory)

router.get('/contentCategory/deleteCategory', authToken, authPower, ContentCategory.delContentCategory)

/**
 * 文档管理
 * 
 */

router.get('/content/getList', authToken, authPower, Content.getContents)

router.get('/content/getContent', authToken, authPower, Content.getOneContent)

router.post('/content/addOne', authToken, authPower, Content.addContent)

router.post('/content/updateOne', authToken, authPower, Content.updateContent)

router.post('/content/topContent', authToken, authPower, Content.updateContentToTop)

router.post('/content/roofContent', authToken, authPower, Content.roofPlacement)
router.get('/content/deleteContent', authToken, authPower, Content.delContent)
// 给文章分配用户
router.post('/content/redictContentToUsers', authToken, authPower, Content.redictContentToUsers)

/**
 * tag管理
 */
router.get('/contentTag/getList', authToken, authPower, ContentTag.getContentTags)

router.post('/contentTag/addOne', authToken, authPower, ContentTag.addContentTag)

router.post('/contentTag/updateOne', authToken, authPower, ContentTag.updateContentTag)

router.get('/contentTag/deleteTag', authToken, authPower, ContentTag.delContentTag)

/**
 * 留言管理
 */
router.get('/contentMessage/getList', authToken, authPower, Message.getMessages)

router.post('/contentMessage/addOne', authToken, authPower, Message.postMessages)

router.get('/contentMessage/deleteMessage', authToken, authPower, Message.delMessage)

/**
 * 注册用户管理
 */
router.get('/regUser/getList', authToken, authPower, User.getUsers)

router.post('/regUser/updateOne', authToken, authPower, User.updateUser)

router.get('/regUser/deleteUser', authToken, authPower, User.delUser)


/**
 * 数据备份
 */

//获取备份数据列表
router.get('/backupDataManage/getBakList', authToken, authPower, DataOptionLog.getDataBakList);

//备份数据库执行
router.post('/backupDataManage/backUp', authToken, authPower, DataOptionLog.backUpData);

//删除备份数据
router.get('/backupDataManage/deleteDataItem', authToken, authPower, DataOptionLog.delDataItem);

/**
 * 系统操作日志
 */

router.get('/systemOptionLog/getList', authToken, authPower, SystemOptionLog.getSystemOptionLogs);

//删除操作日志
router.get('/systemOptionLog/deleteLogItem', authToken, authPower, SystemOptionLog.delSystemOptionLogs);

// 清空日志
router.get('/systemOptionLog/deleteAllLogItem', authToken, authPower, (req, res, next) => {
  req.query.ids = 'all';
  next()
}, SystemOptionLog.delSystemOptionLogs);


/**
 * 系统消息
 */

router.get('/systemNotify/getList', authToken, authPower, (req, res, next) => {
  req.query.systemUser = req.session.adminUserInfo._id;
  next()
}, UserNotify.getUserNotifys);

//删除操作日志
router.get('/systemNotify/deleteNotifyItem', authToken, authPower, UserNotify.delUserNotify);

// 设为已读消息
router.get('/systemNotify/setHasRead', authToken, authPower, (req, res, next) => {
  req.query.systemUser = req.session.adminUserInfo._id;
  next()
}, UserNotify.setMessageHasRead);

/**
 * 系统公告
 */

router.get('/systemAnnounce/getList', authToken, authPower, (req, res, next) => {
  req.query.type = '1';
  next()
}, Notify.getNotifys);

// 删除公告
router.get('/systemAnnounce/deleteItem', authToken, authPower, Notify.delNotify);

//发布系统公告
router.post('/systemAnnounce/addOne', authToken, authPower, Notify.addOneSysNotify);


/**
 * 广告管理
 */

router.get('/ads/getList', authToken, authPower, Ads.getAds);

// 获取单个广告
router.get('/ads/getOne', authToken, authPower, Ads.getOneAd);

// 新增广告
router.post('/ads/addOne', authToken, authPower, Ads.addAds);

// 更新单个广告
router.post('/ads/updateOne', authToken, authPower, Ads.updateAds);

// 删除广告
router.get('/ads/delete', authToken, authPower, Ads.delAds);

// 获取模板文件列表
router.get('/template/getTemplateForderList', authToken, authPower, ContentTemplate.getContentDefaultTemplate);

// 读取文件内容
router.get('/template/getTemplateFileText', authToken, authPower, ContentTemplate.getFileInfo);

// 更新文件内容
router.post('/template/updateTemplateFileText', authToken, authPower, ContentTemplate.updateFileInfo);

// 获取已安装的模板列表
router.get('/template/getMyTemplateList', authToken, authPower, ContentTemplate.getMyTemplateList);

// 新增模板单元
router.post('/template/addTemplateItem', authToken, authPower, ContentTemplate.addTemplateItem);

// 删除模板单元
router.get('/template/delTemplateItem', authToken, authPower, ContentTemplate.delTemplateItem);

// 获取默认模板的模板单元列表
router.get('/template/getTemplateItemlist', authToken, authPower, ContentTemplate.getTempItemForderList);

// 获取模板市场中的模板列表
router.get('/template/getTempsFromShop', authToken, authPower, ContentTemplate.getTempsFromShop);

// 安装模板
router.get('/template/installTemp', authToken, authPower, ContentTemplate.installTemp);


//上传自定义模板
router.post('/template/uploadCMSTemplate', authToken, authPower, ContentTemplate.uploadCMSTemplate);


// 启用模板
router.get('/template/enableTemp', authToken, authPower, ContentTemplate.enableTemp);

// 卸载模板
router.get('/template/uninstallTemp', authToken, authPower, ContentTemplate.uninstallTemp);

router.post('/siteMessage/updateOne', authToken, authPower, SiteMessage.updateSiteMessage);

router.get('/siteMessage/delete', authToken, authPower, SiteMessage.delSiteMessage);

router.get('/helpCenter/getList', authToken, authPower, HelpCenter.getHelpCenters);

router.post('/helpCenter/addOne', authToken, authPower, HelpCenter.addHelpCenter);

router.post('/helpCenter/updateOne', authToken, authPower, HelpCenter.updateHelpCenter);

router.get('/helpCenter/delete', authToken, authPower, HelpCenter.delHelpCenter);

router.get('/versionManage/getList', authToken, authPower, VersionManage.getVersionManages);

router.post('/versionManage/updateOne', authToken, authPower, VersionManage.updateVersionData);



//---------------------------------------------------------------------

//商品管理
router.get('/goods/getList', authToken, authPower, HelloOperation.GetGoods);
router.post('/goods/updateOne', authToken, authPower, HelloOperation.UpdateGoods);
router.get('/goods/delete', authToken, authPower, HelloOperation.DeleteGoods);

router.post('/goods/add', authToken, authPower, HelloOperation.AddGoods);

router.get('/notice/getList', authToken, authPower, HelloOperation.GetNotice);
router.post('/notice/updateOne', authToken, authPower, HelloOperation.UpdateNotice);
router.get('/notice/delete', authToken, authPower, HelloOperation.DeleteNotice);
router.post('/notice/add', authToken, authPower, HelloOperation.AddNotice);


router.get('/user/delete', authToken, authPower, HelloOperation.DeleteUser);

router.post('/time/add', authToken, authPower, HelloOperation.AddTime);

router.get('/user/getList', authToken, authPower, HelloOperation.GetUser);



router.get('/host/getList', authToken, authPower, HelloOperation.GetHost);
router.post('/host/updateOne', authToken, authPower, HelloOperation.UpdateHost);
router.get('/host/delete', authToken, authPower, HelloOperation.DeleteHost);
router.post('/host/add', authToken, authPower, HelloOperation.AddHost);

//支付管理

router.get('/payUrl/getList', authToken, authPower, PayUrl.GetList);
router.post('/payUrl/updateOne', authToken, authPower, PayUrl.Update);
router.get('/payUrl/delete', authToken, authPower, PayUrl.Delete);
router.post('/payUrl/add', authToken, authPower, PayUrl.Add);


router.get('/payRecord/getList', authToken, authPower, PayRecord.GetList);
router.post('/payRecord/updateOne', authToken, authPower, PayRecord.Update);
router.get('/payRecord/delete', authToken, authPower, PayRecord.Delete);



router.get('/soft/getList', authToken, authPower, Soft.GetList);
router.post('/soft/updateOne', authToken, authPower, Soft.Update);
router.get('/soft/delete', authToken, authPower, Soft.Delete);
router.post('/soft/add', authToken, authPower, Soft.Add);
router.post('/soft/select', authToken, authPower, Soft.Select);

router.get('/soft/setArg', authToken, authPower, HelloOperation.UpdateSetting);
router.get('/soft/getArg', authToken, authPower, HelloOperation.GetSetting);



router.get('/adminUserBalance/getList', authToken, authPower, AdminUserBalance.GetList);
router.post('/adminUserBalance/updateOne', authToken, authPower, AdminUserBalance.Update);
router.get('/adminUserBalance/delete', authToken, authPower, AdminUserBalance.Delete);

//
// router.get('/softArg/get', authToken, authPower, HelloOperation.GetSetting);
// router.post('/softArg/set', authToken, authPower, HelloOperation.UpdateSetting);

router.get('/payProduct/getList', authToken, authPower, PayProduct.GetList);
router.post('/payProduct/updateOne', authToken, authPower, PayProduct.Update);
router.get('/payProduct/delete', authToken, authPower, PayProduct.Delete);
router.post('/payProduct/add', authToken, authPower, PayProduct.Add);



//ManageRouters
module.exports = router