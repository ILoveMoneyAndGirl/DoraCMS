const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  count(state) {
    return state.count
  },
  loginState: state => state.app.loginState,
  adminUserFormState: state => state.app.adminUser.formState,
  adminUserList: state => state.app.adminUser.userList,
  adminGroupFormState: state => state.app.adminGroup.formState,
  adminGroupRoleFormState: state => state.app.adminGroup.roleFormState,
  adminGroupList: state => state.app.adminGroup.roleList,
  adminResourceFormState: state => state.app.adminResource.formState,
  adminResourceList: state => state.app.adminResource.resourceList,
  systemConfig: state => state.app.systemConfig,
  contentCategoryFormState: state => state.app.contentCategory.formState,
  contentCategoryList: state => state.app.contentCategory.categoryList,
  contentFormState: state => state.app.content.formState,
  contentList: state => state.app.content.contentList,
  contentTagFormState: state => state.app.contentTag.formState,
  contentTagList: state => state.app.contentTag.tagList,
  contentMessageFormState: state => state.app.contentMessage.formState,
  contentMessageList: state => state.app.contentMessage.messageList,
  regUserFormState: state => state.app.regUser.formState,
  regUserList: state => state.app.regUser.userList,
  bakDataList: state => state.app.bakDataList,
  systemOptionLogs: state => state.app.systemOptionLogs,
  systemNotify: state => state.app.systemNotify,
  systemAnnounce: state => state.app.systemAnnounce,
  systemAnnounceFormState: state => state.app.announceFormState,
  adsList: state => state.app.ads.list,
  adsInfoForm: state => state.app.ads.infoFormState,
  adsItemForm: state => state.app.ads.itemFormState,
  basicInfo: state => state.app.basicInfo,
  adminTemplateList: state => state.app.adminTemplate.templateList,
  templateConfigList: state => state.app.myTemplates.templateList,
  templateConfigFormState: state => state.app.myTemplates.formState,
  templateItemForderList: state => state.app.myTemplates.templateItemForderList,
  tempShoplist: state => state.app.tempShoplist,
  
  siteMessageFormState: state => state.app.siteMessage.formState,
  siteMessageList: state => state.app.siteMessage.list,
  
  helpCenterFormState: state => state.app.helpCenter.formState,
  helpCenterList: state => state.app.helpCenter.list,

  directUserFormState: state => state.app.directUser.formState,
  directSpecialFormState: state => state.app.directSpecial.formState,

  versionManageFormState: state => state.app.versionManage.formState,
  versionManage: state => state.app.versionManage,
  versionManageIos: state => state.app.versionManageIos,



  //------------------------------------------

    UserList: state => state.app.user.userList,


    GoodsList: state => state.app.goods.goodsList,
    GoodsListFormState: state => state.app.goods.formState,

    NoticeList: state => state.app.notice.noticeList,
    NoticeListFormState: state => state.app.notice.formState,


    PayUrlList: state => state.app.payUrl.payUrlList,
    //PayUrlTreeList: state => state.app.payUrl.payUrlTreeList,
    PayUrlListFormState: state => state.app.payUrl.formState,

    SoftList: state => state.app.soft.softList,
    SoftListFormState: state => state.app.soft.formState,
    SoftArgFormState: state => state.app.softArg.formState,
    SoftSetting: state => state.app.soft.setting,



    PayProductList: state => state.app.payProduct.payProductList,
    PayProductListFormState: state => state.app.payProduct.formState,

    PayRecordList: state => state.app.payRecord.payRecordList,
    PayRecordListFormState: state => state.app.payRecord.formState,

    HostList: state => state.app.host.hostList,
    HostListFormState: state => state.app.host.formState,


    AdminUserBalanceList: state => state.app.adminUserBalance.adminUserBalanceList,
    AdminUserBalanceListFormState: state => state.app.adminUserBalance.formState,

  
  //StoreGetterEnd
}
export default getters
