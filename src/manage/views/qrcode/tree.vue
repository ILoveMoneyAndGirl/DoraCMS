<template>
<el-tree :data="treeData" :props="defaultProps" node-key="_id" default-expand-all :expand-on-click-node="false" :render-content="renderContent">
  </el-tree>
</template>

<script>
let id = 1000;
import services from "../../store/services.js";
export default {
  props: {
    treeData: Array
  },
  data() {
    return {
        channel:{
          0:"支付宝",
          1:"微信",
        },
        dataType:{
          "tag":"channel",
          "channel":"tagPrice",
          "tagPrice":"price",
          "price":"",
        },

      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },

  methods: {
    append(store, data) {
      let formData = {};

      console.log(this.dataType);
      formData.parentId = data._id;
      formData.type=this.dataType[data.type]
      formData.isAny=data.isAny;
      formData.channel=data.channel;
      formData.tag=data.tag;
      formData.tagPrice=data.tagPrice;

      formData.parent = {
        label: data[data.type]
      };

      
      this.$store.dispatch("showPayUrlForm", {
        edit: false,
        type: "children",
        formData: formData
      });

    },

    edit(store, data) {
      this.$store.dispatch("showPayUrlForm", {
        edit: true,
        type: "children",
        formData: data
      });

    },

     findIds(obj,ids){
        ids.push(obj._id)
        if(obj.children){
            for(var i in obj.children){
                ids=this.findIds(obj.children[i],ids)
            }
        }
        return ids;
     },

    remove(store, data) {
      this.$confirm(
        this.$t("main.del_notice"),
        this.$t("main.scr_modal_title"),
        {
          confirmButtonText: this.$t("main.confirmBtnText"),
          cancelButtonText: this.$t("main.cancelBtnText"),
          type: "warning"
        }
      )
        .then(() => {
          let ids=[]
          ids=this.findIds(data,ids)
            console.log(ids)
          return services.deletePayUrl({
            ids:ids
          });

     
        })
        .then(result => {
          if (result.data.status === 200) {
            this.$store.dispatch("getPayUrlList");
            this.$message({
              message: this.$t("main.scr_modal_del_succes_info"),
              type: "success"
            });
          } else {
            this.$message.error(result.data.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("main.scr_modal_del_error_info")
          });
        });
    },




    renderContent(h, { node, data, store }) {


      if(data.type=="channel"){
        data.lable=this.channel[data.channel]
      }else if(data.type=="tagPrice"&&data.isAny){
          data.lable="任意金额:("+data._id+")"
      }else if(data.type=="price"&&data.isAny){
        data.lable=data.url
      }else{
        data.lable=data[data.type]
      }

      if(data.type !="price"){
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{data.lable}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button type="text" on-click={() => this.append(store, data)}>
                <i class="fa fa-plus-circle" aria-hidden="true" />
              </el-button>
              <el-button type="text" on-click={() => this.remove(store, data)}>
                <i class="fa fa-trash-o" />
              </el-button>
            </span>
          </span>
        );
      }else {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{data.lable}</span>
            </span>
            <span style="float: right; margin-right: 20px">
    
              <el-button type="text" on-click={() => this.edit(store, data)}>
                <i class="fa fa-edit" />
              </el-button>
              <el-button type="text" on-click={() => this.remove(store, data)}>
                <i class="fa fa-trash-o" />
              </el-button>
            </span>
          </span>
        );
      }
    }
  }
};
</script>