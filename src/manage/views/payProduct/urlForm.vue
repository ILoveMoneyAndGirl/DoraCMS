<template>
    <div class="dr-payProductUrlForm">
        <el-dialog :xs="20" :sm="20" :md="6" :lg="6" :xl="6" size="small" :title="$t('payProduct.priceTree')" :visible.sync="dialogState.showUrl" :close-on-click-modal="false">
            <el-tree :data="treeData" show-checkbox node-key="_id" ref="tree" highlight-current :props="defaultProps" :render-content="renderContent">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button size="medium" @click="closeTree">{{$t("main.cancelBtnText")}}</el-button>
                <el-button size="medium" type="primary" @click="savePower">{{$t("main.confirmBtnText")}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import services from "../../store/services.js";
import _ from "lodash";

export default {
  props: {
    dialogState: Object,
    treeData: Array
  },
  data() {
    return {
      channel:{
          0:"支付宝",
          1:"微信",
        },
      defaultProps: {
        children: "children",
        lable: "lable"
      }
    };
  },
  methods: {
    savePower() {
      let currentNodes = this.$refs.tree.getCheckedNodes();
      let currentArr = [];
      currentNodes.length > 0 &&
        currentNodes.map((item, index) => {
          if (item.type =="price") {
            currentArr.push(item._id);
          }
        });

      let params = this.dialogState.formData;
      params.url = currentArr;

      services.updatePayProduct(params).then(result => {
        if (result.data.status === 200) {
            this.$store.dispatch("showPayProductForm", {
               showUrl: false,
               showName:false,
            });
            this.$store.dispatch("getPayProductList");

          this.$message({
            message: this.$t("com.update"),
            type: "success"
          });
        } else {
          this.$message.error(result.data.message);
        }
      });
    },
    closeTree() {
      this.$store.dispatch("showPayProductForm", {
         showUrl: false,
         showName:false,
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

        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{data.lable}</span>
            </span>
          </span>
        );
    },
  },

  updated() {
     this.$refs.tree &&
    this.$refs.tree.setCheckedKeys(this.dialogState.formData.url);
   }

};
</script>
