import Cookies from 'js-cookie'
import * as types from '../types.js';
import services from '../services.js';
import _ from 'lodash';

export function renderTreeData(result) {
  let newResult = result;
  let treeData = newResult.docs;
  let childArr = _.filter(treeData, (doc) => {
    return doc.parentId != '0'
  });

  for (let i = 0; i < childArr.length; i++) {
    let child = childArr[i];
    for (let j = 0; j < treeData.length; j++) {
      let treeItem = treeData[j];
      if (treeItem._id == child.parentId || treeItem.id == child.parentId) {
        if (!treeItem.children) treeItem.children = [];
        treeItem.children.push(child);
        break;
      }
    }
  }

  newResult.docs = _.filter(treeData, (doc) => {
    return doc.parentId == '0'
  });
  return newResult;
}


export function payUrlTreeData(result) {
  console.log("payUrlTreeData---->")
  let treeData = result.docs;
  let parent=[]
  let tempData={}
  let index=0;

  for (let j = 0; j < treeData.length; j++) {
      let treeItem = treeData[j];
      let key=treeItem.tagPrice
      if(treeItem.isAny){
          if(!tempData.isAny){
              tempData.isAny=index
              
              let item={}
              item.children=[]
              item._id=key
              item.tag=""
              item.price=key
              item.isAny=true
              item.lable="任意金额"
              parent[index]=item
              index++
           }
          let i=tempData.isAny
          treeItem.lable="实际金额:<font color=‘#FF0000’>任意</font>描述:<font color=‘#FF0000’>"+treeItem.tag+"</font>"
          parent[i].children.push(treeItem)

       }else{
          if(!tempData[key]){
            tempData[key]=index

            let item={}
            item.children=[]
            item._id=key
            item.tag=""
            item.price=key
            item.isAny=false
            parent[index]=item
            item.lable=key+"元"
            index++
          }
          let i=tempData[key]
           treeItem.lable="实际金额:<font color=‘#FF0000’>"+treeItem.price+"元</font>   描述:<font color=‘#FF0000’>"+treeItem.tag+"</font>"
          parent[i].children.push(treeItem)
         } 
    }
     console.log(parent)
  return parent;
}

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus'),
      withoutAnimation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'en',
    size: Cookies.get('size') || 'medium',
    count: 20,
    loginState: {
      state: false,
      userInfo: {
        userName: '',
        email: '',
        logo: '',
        group: []
      },
      noticeCounts: 0
    },
    adminUser: {
      formState: {
        show: false,
        edit: false,
        formData: {
          name: '',
          userName: '',
          password: '',
          confirmPassword: '',
          group: '',
          email: '',
          comments: '',
          phoneNum: '',
          countryCode: '',
        }
      },
      userList: {
        pageInfo: {},
        docs: []
      },
      addUser: {
        state: '',
        err: {}
      }
    },
    adminGroup: {
      formState: {
        show: false,
        edit: false,
        formData: {
          name: '',
          comments: '',
          enable: false,
          power: []
        }
      },
      roleFormState: {
        show: false,
        edit: true,
        formData: {
          name: '',
          comments: '',
          enable: false,
          power: []
        }
      },
      roleList: {
        pageInfo: {},
        docs: []
      },
      addGroup: {
        state: '',
        err: {}
      }
    },
    adminResource: {
      formState: {
        type: 'root',
        show: false,
        edit: false,
        formData: {
          label: '',
          type: '',
          api: '',
          icon: '',
          routePath: '',
          componentPath: '',
          enable: true,
          parentId: '',
          sortId: 0,
          comments: '',
          parent: {
            id: '',
            label: ''
          }
        }
      },
      resourceList: {
        pageInfo: {},
        docs: []
      },
      addResource: {
        state: '',
        err: {}
      }
    },
    adminTemplate: {
      formState: {

      },
      templateList: {
        pageInfo: {},
        docs: []
      }
    },
    myTemplates: {
      formState: {
        show: false,
        edit: false,
        formData: {

        }
      },
      templateList: {
        pageInfo: {},
        docs: []
      },
      templateItemForderList: {}
    },
    tempShoplist: {
      pageInfo: {},
      docs: []
    },
    systemConfig: {
      configs: {
        siteName: '',
        ogTitle: '',
        siteDomain: '',
        siteDiscription: '',
        siteKeywords: '',
        siteEmailServer: '',
        siteEmail: '',
        siteEmailPwd: '',
        mongoDBPath: '',
        databackForderPath: '',
        poseArticlScore: '',
        postMessageScore: '',
        shareArticlScore: '',
        bakDataRate: '1',
        bakDatabyTime: false
      }
    },
    contentCategory: {
      formState: {
        type: 'root',
        show: false,
        edit: false,
        formData: {
          label: '',
          enable: false,
          defaultUrl: '',
          parentId: '',
          contentTemp: '',
          parentObj: '',
          sortId: 0,
          comments: '',
          type: '1'
        }
      },
      categoryList: {
        pageInfo: {},
        docs: []
      },
      addContentCategory: {
        state: '',
        err: {}
      }
    },
    content: {
      formState: {
        edit: false,
        formData: {
          targetUser: '',
          title: '',
          stitle: '',
          type: '1',
          categories: [],
          keywords: '',
          sortPath: '',
          tags: [],
          keywords: '',
          sImg: '/upload/images/defaultImg.jpg',
          discription: '',
          author: {},
          uAuthor: '',
          markDownComments: '',
          state: '1',
          isTop: 0,
          roofPlacement: '0',
          clickNum: 0,
          comments: '',
          simpleComments: '',
          commentNum: 0,
          likeNum: 0,
          dismissReason: '',

        }
      },
      contentList: {
        pageInfo: {},
        docs: []
      },
      addContent: {
        state: '',
        err: {}
      }
    },
    contentTag: {
      formState: {
        show: false,
        edit: false,
        formData: {
          name: '',
          alias: '',
          comments: ''
        }
      },
      tagList: {
        pageInfo: {},
        docs: []
      },
      addTag: {
        state: '',
        err: {}
      }
    },
    directUser: {
      formState: {
        show: false,
        edit: false,
        formData: {
          name: '',
          alias: '',
          targetUser: ''
        }
      }
    },
    contentMessage: {
      formState: {
        show: false,
        edit: false,
        formData: {
          contentId: '',
          content: '',
          author: '',
          replyId: '',
          relationMsgId: ''
        },
        parentformData: {
          contentId: '',
          content: '',
          author: '',
          replyId: '',
          relationMsgId: ''
        }
      },
      messageList: {
        pageInfo: {},
        docs: []
      },
      addMessage: {
        state: '',
        err: {}
      }
    },
    regUser: {
      formState: {
        show: false,
        edit: false,
        formData: {
          name: '',
          userName: '',
          group: '',
          watchers: [],
          followers: [],
          category: [],
          email: '',
          comments: '',
          phoneNum: '',
          enable: true,
          integral: 0
        }
      },
      userList: {
        pageInfo: {},
        docs: []
      }
    },
    bakDataList: {
      pageInfo: {},
      docs: []
    },
    systemOptionLogs: {
      pageInfo: {},
      docs: []
    },
    systemNotify: {
      pageInfo: {},
      docs: []
    },
    systemAnnounce: {
      pageInfo: {},
      docs: []
    },
    announceFormState: {
      title: '',
      content: ''
    },
    ads: {
      list: {
        pageInfo: {},
        docs: []
      },
      infoFormState: {
        edit: false,
        formData: {
          name: '',
          type: '1',
          height: '',
          comments: '',
          items: [],
          state: true,
          carousel: true
        }
      },
      itemFormState: {
        show: false,
        edit: false,
        formData: {
          title: '',
          link: '',
          appLink: '',
          appLinkType: '',
          width: '',
          height: '',
          alt: '',
          sImg: ''
        }
      }
    },
    basicInfo: {
      adminUserCount: 0,
      regUserCount: 0,
      contentCount: 0,
      messageCount: 0
    },
    siteMessage: {
      formState: {
        show: false,
        edit: false,
        formData: {
          content: '',
          isRead: false,
          user: {},
          type: '1'
        }
      },
      list: {
        pageInfo: {},
        docs: []
      }
    },
    helpCenter: {
      formState: {
        show: false,
        edit: false,
        formData: {
          name: '',
          type: '',
          lang: '1',
          user: {},
          comments: ''
        }
      },
      list: {
        pageInfo: {},
        docs: []
      }
    },
    versionManage: {
      configs: {
        title: '',
        description: '',
        version: '',
        versionName: '',
        forcibly: false,
        url: ''
      }
    },
    versionManageIos: {
      configs: {
        title: '',
        description: '',
        version: '',
        versionName: '',
        forcibly: false,
        url: ''
      }
    },
    //StoreAppInitState

//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
  goods: {
      formState: {
        show: false,
        edit: false,
        formData: {
          price: 0,
          days: 0,
          des: ''
        }
      },
      goodsList: {
        pageInfo: {},
        docs: []
      },
      goods: {
        state: '',
        err: {}
      }
    },

    payUrl: {
      formState: {
        show: false,
        edit: false,
        formData: {
          tagPrice:0,
          price: 0,
          url: '',
          tag: '',
          isAny: false,

        }
      },
      payUrlList: {
        pageInfo: {},
        docs: []
      },
      payUrlTreeList:[],
      payUrl: {
        state: '',
        err: {}
      }
    },


    soft: {
      formState: {
        show: false,
        edit: false,
        formData: {
          name: '',
          ip: '',
          port: 8888,
          comments: '',
          type:0,

        }
      },
      softList: {
        pageInfo: {},
        docs: []
      },
      soft: {
        state: '',
        err: {}
      }
    },

    softArg: {
      formState: {
        show: false,
        edit: false,
        formData: {
          name: '',
          ip: '',
          port: 8888,
          comments: '',
          type:0,
        }
      },
      softArg: {
        state: '',
        err: {}
      }
    },

    payProduct: {
      formState: {
        showUrl: false,
        showName: false,
        formData: {
          name: 0,
          url: [],
        }
      },
      payProductList: {
        pageInfo: {},
        docs: []
      },
      payProduct: {
        state: '',
        err: {}
      }
    },







  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
    },
    CLOSE_SIDEBAR: (state, withoutAnimation) => {
      Cookies.set('sidebarStatus', 1)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
      Cookies.set('language', language)
    },
    SET_SIZE: (state, size) => {
      state.size = size
      Cookies.set('size', size)
    },
    [types.INCREMENT](state) {
      state.count++
    },
    [types.DECREMENT](state) {
      state.count--
    },
    [types.ADMING_LOGINSTATE](state, params) {
      state.loginState = Object.assign({
        userInfo: {
          userName: '',
          email: '',
          logo: '',
          group: []
        },
        state: false
      }, {
        userInfo: params.userInfo,
        state: params.loginState || false,
        noticeCounts: params.noticeCounts
      });
    },
    [types.ADMINUSERFORMSTATE](state, formState) {
      state.adminUser.formState.show = formState.show;
      state.adminUser.formState.edit = formState.edit;
      if (!_.isEmpty(formState.formData)) {
        state.adminUser.formState.formData = formState.formData
      } else {
        state.adminUser.formState.formData = {
          name: '',
          userName: '',
          password: '',
          confirmPassword: '',
          group: '',
          email: '',
          comments: '',
          phoneNum: '',
          countryCode: '',
        }
      }

    },
    [types.ADMINUSERLIST](state, userlist) {
      state.adminUser.userList = userlist
    },
    [types.ADMINGROUP_FORMSTATE](state, formState) {
      state.adminGroup.formState.show = formState.show;
      state.adminGroup.formState.edit = formState.edit;
      if (!_.isEmpty(formState.formData)) {
        state.adminGroup.formState.formData = formState.formData
      } else {
        state.adminGroup.formState.formData = {
          name: '',
          comments: '',
          enable: false
        }
      }

    },
    [types.ADMINGROUP_ROLEFORMSTATE](state, formState) {
      state.adminGroup.roleFormState.show = formState.show;
      state.adminGroup.roleFormState.edit = formState.edit;
      state.adminGroup.roleFormState.formData = Object.assign({
        name: '',
        comments: '',
        enable: false,
        power: []
      }, formState.formData);
    },
    [types.ADMINGROUP_LIST](state, rolelist) {
      state.adminGroup.roleList = rolelist
    },
    [types.ADMINRESOURCE_FORMSTATE](state, formState) {
      state.adminResource.formState.show = formState.show;
      state.adminResource.formState.edit = formState.edit;
      state.adminResource.formState.type = formState.type;
      state.adminResource.formState.formData = Object.assign({
        label: '',
        type: '',
        api: '',
        icon: '',
        routePath: '',
        componentPath: '',
        enable: true,
        parentId: '',
        sortId: 0,
        comments: '',
        parent: {
          id: '',
          label: ''
        }
      }, formState.formData);

    },
    [types.ADMINRESOURCE_LIST](state, resourceList) {

      console.log("types.ADMINRESOURCE_LIST")

      console.log(resourceList)
      state.adminResource.resourceList = resourceList
    },
    [types.ADMINTEMPLATE_LIST](state, templateList) {
      state.adminTemplate.templateList = templateList
    },
    [types.MYTEMPLATE_LIST](state, templateList) {
      state.myTemplates.templateList = templateList
    },
    [types.TEMPLATECONFIG_FORMSTATE](state, formState) {
      state.myTemplates.formState.show = formState.show;
      state.myTemplates.formState.edit = formState.edit;
      state.myTemplates.formState.formData = Object.assign({
        name: '',
        alias: '',
        comments: ''
      }, formState.formData);
    },
    [types.TEMPLATEITEMFORDER_LIST](state, forderList) {
      state.myTemplates.templateItemForderList = forderList
    },
    [types.DORACMSTEMPLATE_LIST](state, templist) {
      state.tempShoplist = templist
    },
    [types.SYSTEMCONFIG_CONFIGLIST](state, config) {
      state.systemConfig.configs = Object.assign({
        siteName: '',
        ogTitle: '',
        siteDomain: '',
        siteDiscription: '',
        siteKeywords: '',
        siteEmailServer: '',
        siteEmail: '',
        siteEmailPwd: '',
        mongoDBPath: '',
        databackForderPath: '',
        poseArticlScore: '',
        postMessageScore: '',
        shareArticlScore: '',
        bakDataRate: '1',
        bakDatabyTime: false
      }, config)
    },
    [types.CONTENTCATEGORYS_FORMSTATE](state, formState) {
      state.contentCategory.formState.show = formState.show;
      state.contentCategory.formState.edit = formState.edit;
      state.contentCategory.formState.type = formState.type;
      state.contentCategory.formState.formData = Object.assign({
        name: '',
        enable: false,
        defaultUrl: '',
        parentId: '',
        parentObj: {},
        contentTemp: '',
        sortId: 0,
        comments: '',
        type: '1'
      }, formState.formData);

    },
    [types.CONTENTCATEGORYS_LIST](state, categoryList) {
      state.contentCategory.categoryList = categoryList
    },
    [types.CONTENT_FORMSTATE](state, formState) {
      state.content.formState.edit = formState.edit;
      state.content.formState.formData = Object.assign({
        targetUser: '',
        title: '',
        stitle: '',
        type: '1',
        categories: [],
        keywords: '',
        sortPath: '',
        tags: [],
        keywords: '',
        sImg: '/upload/images/defaultImg.jpg',
        discription: '',
        author: {},
        uAuthor: '',
        markDownComments: '',
        state: '1',
        isTop: 0,
        roofPlacement: '0',
        clickNum: 0,
        comments: '',
        simpleComments: '',
        commentNum: 0,
        likeNum: 0
      }, formState.formData);

    },
    [types.CONTENT_LIST](state, contentList) {
      state.content.contentList = contentList
    },
    [types.CONTENT_ONE](state, content) {
      state.content.content = content
    },
    [types.DIRECTUSERFORMSTATE](state, formState) {
      state.directUser.formState.show = formState.show;
      state.directUser.formState.edit = formState.edit;
      state.directUser.formState.type = formState.type;
      state.directUser.formState.formData = Object.assign({
        name: '',
        alias: '',
        targetUser: ''
      }, formState.formData);
    },

    [types.CONTENTTAG_FORMSTATE](state, formState) {
      state.contentTag.formState.show = formState.show;
      state.contentTag.formState.edit = formState.edit;
      state.contentTag.formState.type = formState.type;
      state.contentTag.formState.formData = Object.assign({
        name: '',
        alias: '',
        comments: ''
      }, formState.formData);

    },
    [types.CONTENTTAG_LIST](state, tagList) {
      state.contentTag.tagList = tagList
    },
    [types.CONTENTMESSAGE_FORMSTATE](state, formState) {
      state.contentMessage.formState.show = formState.show;
      state.contentMessage.formState.edit = formState.edit;
      state.contentMessage.formState.type = formState.type;
      state.contentMessage.formState.formData = Object.assign({
        contentId: '',
        content: '',
        replyId: '',
        author: '',
        relationMsgId: ''
      }, formState.formData);
      state.contentMessage.formState.parentformData = Object.assign({
        contentId: '',
        content: '',
        replyId: '',
        author: '',
        relationMsgId: ''
      }, formState.parentformData);
    },
    [types.CONTENTMESSAGE_LIST](state, messageList) {
      state.contentMessage.messageList = messageList
    },
    [types.REGUSERFORMSTATE](state, formState) {
      state.regUser.formState.show = formState.show;
      state.regUser.formState.edit = formState.edit;

      state.regUser.formState.formData = Object.assign({
        name: '',
        userName: '',
        group: '',
        email: '',
        comments: '',
        phoneNum: '',
        enable: true
      }, formState.formData);

    },
    [types.REGUSERLIST](state, userlist) {
      state.regUser.userList = userlist
    },
    [types.BAKUPDATA_LIST](state, list) {
      state.bakDataList = list
    },
    [types.SYSTEMOPTIONLOGS_LIST](state, list) {
      state.systemOptionLogs = list
    },
    [types.SYSTEMNOTIFY_LIST](state, list) {
      state.systemNotify = list
    },
    [types.SYSTEMANNOUNCE_LIST](state, list) {
      state.systemAnnounce = list
    },
    [types.SYSTEMANNOUNCE_FORMSTATE](state, formState) {
      state.announceFormState = Object.assign({
        title: '',
        content: ''
      }, formState.formData);

    },
    [types.ADS_LIST](state, list) {
      state.ads.list = list
    },
    [types.ADS_INFO_FORMSTATE](state, formState) {
      state.ads.infoFormState.edit = formState.edit;
      state.ads.infoFormState.formData = Object.assign({
        name: '',
        type: '1',
        height: '',
        comments: '',
        items: [],
        state: true,
        carousel: true
      }, formState.formData);
    },
    [types.ADS_ITEM_FORMSTATE](state, formState) {
      state.ads.itemFormState.edit = formState.edit;
      state.ads.itemFormState.show = formState.show;
      state.ads.itemFormState.formData = Object.assign({
        title: '',
        link: '',
        width: '',
        height: '',
        alt: '',
        sImg: '',
      }, formState.formData);
    },
    [types.SITEMESSAGE_FORMSTATE](state, formState) {
      state.siteMessage.formState.show = formState.show;
      state.siteMessage.formState.edit = formState.edit;
      state.siteMessage.formState.type = formState.type;
      state.siteMessage.formState.formData = Object.assign({
        content: '',
        isRead: false,
        user: {},
        type: '1'
      }, formState.formData);
    },
    [types.SITEMESSAGE_LIST](state, list) {
      state.siteMessage.list = list
    },

    [types.HELPCENTER_FORMSTATE](state, formState) {
      state.helpCenter.formState.show = formState.show;
      state.helpCenter.formState.edit = formState.edit;
      state.helpCenter.formState.type = formState.type;
      state.helpCenter.formState.formData = Object.assign({
        name: '',
        type: '',
        lang: '1',
        comments: ''
      }, formState.formData);
    },
    [types.HELPCENTER_LIST](state, list) {
      state.helpCenter.list = list
    },

    [types.VERSIONMANAGE_FORMSTATE](state, config) {
      state.versionManage.configs = Object.assign({
        title: '',
        description: '',
        version: '',
        versionName: '',
        forcibly: false,
        url: ''
      }, config)
    },

    [types.VERSIONMANAGEIOS_FORMSTATE](state, config) {
      state.versionManageIos.configs = Object.assign({
        title: '',
        description: '',
        version: '',
        versionName: '',
        forcibly: false,
        url: ''
      }, config)
    },
    [types.MAIN_SITEBASIC_INFO](state, list) {
      state.basicInfo = list
    },
    //StoreAppMutations
//------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------------

    [types.GOODS_LIST](state, goodsList) {
      state.goods.goodsList = goodsList
    },

    [types.GOODS_FORMSTATE](state, formState) {
      state.goods.formState.show = formState.show;
      state.goods.formState.edit = formState.edit;
      state.goods.formState.formData = Object.assign({
        price: 0,
        days: 0,
        des: ''
      }, formState.formData);

    },


    [types.PAYURL_LIST](state, payUrlList) {
      state.payUrl.payUrlList = payUrlList
      state.payUrl.payUrlTreeList=payUrlTreeData(payUrlList)
    },


    [types.PAYURL_FORMSTATE](state, formState) {
      state.payUrl.formState.show = formState.show;
      state.payUrl.formState.edit = formState.edit;
      state.payUrl.formState.formData = Object.assign({
        price: '',
        url: '',
        tag: '',
        isAny:false,
      }, formState.formData);

    },

    [types.SOFT_LIST](state, softList) {
      state.soft.softList = softList
    },


    [types.SOFT_FORMSTATE](state, formState) {
      state.soft.formState.show = formState.show;
      state.soft.formState.edit = formState.edit;
      state.soft.formState.formData = Object.assign({
        name: '',
        ip: '',
        port: '',
        comments: '',
        type:1,
      }, formState.formData);

    },

    [types.SOFTARG](state, formState) {
      state.softArg.formState.show = formState.show;
      state.softArg.formState.edit = formState.edit;
      state.softArg.formState.formData = formState.formData;
    },

    [types.SOFTARG_HIDE](state, formState) {
      state.softArg.formState.show = formState.show;
    },

//
    [types.PAYPRODUCT_LIST](state, softList) {
      state.payProduct.payProductList = softList
    },

     [types.PAYPRODUCT_FORMSTATE](state, formState) {
      state.payProduct.formState.showUrl = formState.showUrl;
      state.payProduct.formState.showName = formState.showName;
      state.payProduct.formState.formData = Object.assign({
        name: '',
        url: [],
      }, formState.formData);

    },


  },
  actions: {
    toggleSideBar({
      commit
    }) {
      commit('TOGGLE_SIDEBAR')
    },
    closeSideBar({
      commit
    }, {
      withoutAnimation
    }) {
      commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({
      commit
    }, device) {
      commit('TOGGLE_DEVICE', device)
    },
    setLanguage({
      commit
    }, language) {
      commit('SET_LANGUAGE', language)
    },
    setSize({
      commit
    }, size) {
      commit('SET_SIZE', size)
    },
    increment: ({
      commit
    }) => {
      console.log(commit);
      commit(types.INCREMENT);
    },
    decrement: ({
      commit
    }) => {
      console.log(commit);
      commit(types.DECREMENT);
    },
    handleOpen: ({
      commit
    }) => {
      console.log(commit);
    },
    handleClose: ({
      commit
    }) => {
      console.log(commit);
    },
    handleSelect: ({
      commit
    }) => {
      console.log(commit);
    },
    loginState: ({
      commit
    }, params = {
      userInfo: {},
      state: false
    }) => {
      services.getUserSession().then((result) => {
        commit(types.ADMING_LOGINSTATE, result.data.data)
      })
    },
    showAdminUserForm: ({
      commit
    }, params = {
      edit: false,
      formData: {}
    }) => {
      commit(types.ADMINUSERFORMSTATE, {
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideAdminUserForm: ({
      commit
    }) => {
      commit(types.ADMINUSERFORMSTATE, {
        show: false
      })
    },
    getAdminUserList({
      commit
    }, params = {}) {
      services.adminUserList(params).then((result) => {
        commit(types.ADMINUSERLIST, result.data.data)
      })
    },
    showAdminGroupForm: ({
      commit
    }, params = {
      edit: false,
      formData: {}
    }) => {
      commit(types.ADMINGROUP_FORMSTATE, {
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideAdminGroupForm: ({
      commit
    }) => {
      commit(types.ADMINGROUP_FORMSTATE, {
        show: false
      })
    },
    showAdminGroupRoleForm: ({
      commit
    }, params = {
      edit: false,
      formData: {}
    }) => {
      commit(types.ADMINGROUP_ROLEFORMSTATE, {
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideAdminGroupRoleForm: ({
      commit
    }) => {
      commit(types.ADMINGROUP_ROLEFORMSTATE, {
        show: false
      })
    },
    getAdminGroupList({
      commit
    }, params = {}) {
      services.adminGroupList(params).then((result) => {
        commit(types.ADMINGROUP_LIST, result.data.data)
      })
    },
    showAdminResourceForm: ({
      commit
    }, params = {
      type: 'root',
      edit: false,
      formData: {}
    }) => {
      commit(types.ADMINRESOURCE_FORMSTATE, {
        show: true,
        type: params.type,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideAdminResourceForm: ({
      commit
    }) => {
      commit(types.ADMINRESOURCE_FORMSTATE, {
        show: false
      })
    },
    getAdminResourceList({
      commit
    }, params = {}) {
      services.adminResourceList(params).then((result) => {
        let treeData = renderTreeData(result.data.data);
        commit(types.ADMINRESOURCE_LIST, treeData)
      })
    },
    getAdminTemplateList({
      commit
    }, params = {}) {
      services.adminTemplateList(params).then((result) => {
        let treeData = renderTreeData(result.data.data);
        commit(types.ADMINTEMPLATE_LIST, treeData)
      })
    },
    getMyTemplateList({
      commit
    }, params = {}) {
      services.getMyTemplateList(params).then((result) => {
        commit(types.MYTEMPLATE_LIST, result.data.data)
      })
    },
    showTemplateConfigForm: ({
      commit
    }, params = {
      edit: false,
      formData: {}
    }) => {
      commit(types.TEMPLATECONFIG_FORMSTATE, {
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideTemplateConfigForm: ({
      commit
    }) => {
      commit(types.TEMPLATECONFIG_FORMSTATE, {
        show: false
      })
    },
    getTemplateItemForderList({
      commit
    }, params = {}) {
      services.getTemplateItemlist(params).then((result) => {
        commit(types.TEMPLATEITEMFORDER_LIST, result.data.data)
      })
    },
    getTempsFromShop({
      commit
    }, params = {}) {
      services.getTemplatelistfromShop(params).then((result) => {
        commit(types.DORACMSTEMPLATE_LIST, result.data.data)
      })
    },
    getSystemConfig({
      commit
    }, params = {}) {
      services.getSystemConfigs(params).then((config) => {
        let currentConfig = (config.data.data && config.data.data.docs) ? config.data.data.docs[0] : {};
        commit(types.SYSTEMCONFIG_CONFIGLIST, currentConfig)
      })
    },
    showContentCategoryForm: ({
      commit
    }, params = {
      type: 'root',
      edit: false,
      formData: {}
    }) => {
      commit(types.CONTENTCATEGORYS_FORMSTATE, {
        show: true,
        type: params.type,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideContentCategoryForm: ({
      commit
    }) => {
      commit(types.CONTENTCATEGORYS_FORMSTATE, {
        show: false
      })
    },
    getContentCategoryList({
      commit
    }, params = {}) {
      services.contentCategoryList(params).then((result) => {
        let treeData = renderTreeData(result.data.data);
        commit(types.CONTENTCATEGORYS_LIST, treeData)
      })
    },

    showContentForm: ({
      commit
    }, params = {
      edit: false,
      formData: {}
    }) => {
      commit(types.CONTENT_FORMSTATE, {
        edit: params.edit,
        formData: params.formData
      })
    },
    showDirectUserForm: ({
      commit
    }, params = {
      edit: false,
      formData: {}
    }) => {
      commit(types.DIRECTUSERFORMSTATE, {
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideDirectUserForm: ({
      commit
    }) => {
      commit(types.DIRECTUSERFORMSTATE, {
        show: false
      })
    },
    getContentList({
      commit
    }, params = {}) {
      services.contentList(params).then((result) => {
        commit(types.CONTENT_LIST, result.data.data)
      })
    },

    getOneContent({
      commit
    }, params = {}) {
      services.contentInfo(params).then((result) => {
        commit(types.CONTENT_ONE, result.data.data)
      })
    },
    showContentTagForm: ({
      commit
    }, params = {
      edit: false,
      formData: {}
    }) => {
      commit(types.CONTENTTAG_FORMSTATE, {
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideContentTagForm: ({
      commit
    }) => {
      commit(types.CONTENTTAG_FORMSTATE, {
        show: false
      })
    },
    getContentTagList({
      commit
    }, params = {}) {
      services.contentTagList(params).then((result) => {
        commit(types.CONTENTTAG_LIST, result.data.data)

                console.log("??????getContentTagList????",result);
                console.log(result)
      })
    },
    showContentMessageForm: ({
      commit
    }, params = {
      edit: false,
      formData: {},
      parentformData: {}
    }) => {
      commit(types.CONTENTMESSAGE_FORMSTATE, {
        show: true,
        edit: params.edit,
        formData: params.formData,
        parentformData: params.parentformData
      })
    },
    hideContentMessageForm: ({
      commit
    }) => {
      commit(types.CONTENTMESSAGE_FORMSTATE, {
        show: false
      })
    },
    getContentMessageList({
      commit
    }, params = {}) {
      services.contentMessageList(params).then((result) => {
        commit(types.CONTENTMESSAGE_LIST, result.data.data)
      })
    },
    showRegUserForm: ({
      commit
    }, params = {
      edit: false,
      formData: {}
    }) => {
      commit(types.REGUSERFORMSTATE, {
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideRegUserForm: ({
      commit
    }) => {
      commit(types.REGUSERFORMSTATE, {
        show: false
      })
    },
    getRegUserList({
      commit
    }, params = {}) {
      services.regUserList(params).then((result) => {
        commit(types.REGUSERLIST, result.data.data)
      })
    },

    getBakDateList({
      commit
    }, params = {}) {
      services.getBakDataList(params).then((result) => {
        commit(types.BAKUPDATA_LIST, result.data.data)
      })
    },

    getSystemLogsList({
      commit
    }, params = {}) {
      services.getSystemOptionLogsList(params).then((result) => {
        commit(types.SYSTEMOPTIONLOGS_LIST, result.data.data)
      })
    },
    getSystemNotifyList({
      commit
    }, params = {}) {
      services.getSystemNotifyList(params).then((result) => {
        commit(types.SYSTEMNOTIFY_LIST, result.data.data)
      })
    },
    getSystemAnnounceList({
      commit
    }, params = {}) {
      services.getSystemAnnounceList(params).then((result) => {
        commit(types.SYSTEMANNOUNCE_LIST, result.data.data)
      })
    },
    showSysAnnounceForm: ({
      commit
    }, params = {}) => {
      commit(types.SYSTEMANNOUNCE_FORMSTATE, {
        formData: params
      })
    },
    getAdsList({
      commit
    }, params = {}) {
      services.getAdsList(params).then((result) => {
        commit(types.ADS_LIST, result.data.data)
      })
    },
    adsInfoForm: ({
      commit
    }, params = {}) => {
      commit(types.ADS_INFO_FORMSTATE, {
        edit: params.edit,
        formData: params.formData
      })
    },
    showAdsItemForm: ({
      commit
    }, params = {
      edit: false,
      formData: {}
    }) => {
      commit(types.ADS_ITEM_FORMSTATE, {
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },
    hideAdsItemForm: ({
      commit
    }) => {
      commit(types.ADS_ITEM_FORMSTATE, {
        show: false
      })
    },
    getSiteBasicInfo({
      commit
    }, params = {}) {
      services.getSiteBasicInfo(params).then((result) => {
        commit(types.MAIN_SITEBASIC_INFO, result.data.data)
      })
    },
    showSiteMessageForm: ({
      commit
    }, params = {
      edit: false,
      formData: {}
    }) => {
      commit(types.SITEMESSAGE_FORMSTATE, {
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },

    hideSiteMessageForm: ({
      commit
    }) => {
      commit(types.SITEMESSAGE_FORMSTATE, {
        show: false
      })
    },

    getSiteMessageList({
      commit
    }, params = {}) {
      services.siteMessageList(params).then((result) => {
        commit(types.SITEMESSAGE_LIST, result.data.data)
      })
    },

    showHelpCenterForm: ({
      commit
    }, params = {
      edit: false,
      formData: {}
    }) => {
      commit(types.HELPCENTER_FORMSTATE, {
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },

    hideHelpCenterForm: ({
      commit
    }) => {
      commit(types.HELPCENTER_FORMSTATE, {
        show: false
      })
    },

    getHelpCenterList({
      commit
    }, params = {}) {
      services.helpCenterList(params).then((result) => {
        commit(types.HELPCENTER_LIST, result.data.data)
      })
    },

    getVersionInfo({
      commit
    }, params = {
      client: '0'
    }) {
      services.versionManageList(params).then((config) => {
        let currentConfig = (config.data && config.data.data.docs) ? config.data.data.docs[0] : {};
        commit(types.VERSIONMANAGE_FORMSTATE, currentConfig)
      })
    },
    getIosVersionInfo({
      commit
    }, params = {
      client: '1'
    }) {
      services.versionManageList(params).then((config) => {
        let currentConfig = (config.data && config.data.data.docs) ? config.data.data.docs[0] : {};
        commit(types.VERSIONMANAGEIOS_FORMSTATE, currentConfig)
      })
    },
    //StoreAppActions



//-------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------

    getGoodsList({
      commit
    }, params = {}) {
      services.goodsList(params).then((result) => {
        commit(types.GOODS_LIST, result.data.data)
      })
    },

    showGoodsForm: ({
      commit
    }, params = {
      edit: false,
      formData: {}
    }) => {
      commit(types.GOODS_FORMSTATE, {
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },

    hideGoodsForm: ({
      commit
    }) => {
      commit(types.GOODS_FORMSTATE, {
        show: false
      })
    },

//
    getPayUrlList({
      commit
    }, params = {}) {
      services.payUrlList(params).then((result) => {
        commit(types.PAYURL_LIST, result.data.data)
      })
    },

    showPayUrlForm: ({
      commit
    }, params = {
      edit: false,
      formData: {}
    }) => {
      commit(types.PAYURL_FORMSTATE, {
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },

    hidePayUrlForm: ({
      commit
    }) => {
      commit(types.PAYURL_FORMSTATE, {
        show: false
      })
    },

//
    getSoftList({
      commit
    }, params = {}) {
      services.softList(params).then((result) => {
        commit(types.SOFT_LIST, result.data.data)
      })
    },

    showSoftForm: ({
      commit
    }, params = {
      edit: false,
      formData: {}
    }) => {
      commit(types.SOFT_FORMSTATE, {
        show: true,
        edit: params.edit,
        formData: params.formData
      })
    },

    hideSoftForm: ({
      commit
    }) => {
      commit(types.SOFT_FORMSTATE, {
        show: false
      })
    },

//
    getSoftArg({
      commit
    }, params = {}) {
      services.getSoftArg(params).then((result) => {
        console.log("services.getSoftArg---",result)
        commit(types.SOFTARG, {
          show: true,
          edit:true,
          formData:result.data.data
        })
      })
    },


    hideSoftArgForm: ({
      commit
    }) => {
      commit(types.SOFTARG_HIDE, {
        show: false
      })
    },
//

    getPayProductList({
      commit
    }, params = {}) {
      services.payProductList(params).then((result) => {
        commit(types.PAYPRODUCT_LIST, result.data.data)
      })
    },

    showPayProductForm: ({
      commit
    }, params = {
      showUrl: false,
      showName: false,
      formData: {}
    }) => {
      commit(types.PAYPRODUCT_FORMSTATE, {
        showUrl: params.showUrl,
        showName: params.showName,
        formData: params.formData
      })
    },

    hidePayProductForm: ({
      commit
    }) => {
      commit(types.PAYPRODUCT_FORMSTATE, {
        show: false
      })
    },


  }
}

export default app