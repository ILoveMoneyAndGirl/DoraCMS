<template>
    <div class="dr-payProductUrlForm">
        <el-dialog :xs="20" :sm="20" :md="6" :lg="6" :xl="6" size="small" :title="$t('com.infoTree')" :visible.sync="dialogState.showUrl" :close-on-click-modal="false">
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
          if (item._id !=item.price) {
            currentArr.push(item._id);
          }
        });

      let params = this.dialogState.formData;
      params.url = currentArr;
            console.log("savePower")

      console.log(params.url)
      services.updatePayProduct(params).then(result => {
        if (result.data.status === 200) {
            this.$store.dispatch("showPayProductForm", {
               showUrl: false,
               showName:false,
            });
            this.$store.dispatch("getPayUrlList");

          this.$message({
            message: this.$t("com.update"),
            type: "success"
          });
          console.log("-----------------------------------------------*****")
             console.log(this.treeData)
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
    console.log("renderContent0")
        console.log(node)
          console.log(data)
             console.log(store)
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.data.lable}</span>
          </span>
        </span>
      );
    },
  },

  updated() {
    console.log("types.updated,updated0")
          console.log(this.treeData)

     this.$refs.tree &&
    this.$refs.tree.setCheckedKeys(this.dialogState.formData.url);
   }

};
</script>
