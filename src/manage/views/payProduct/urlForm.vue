<template>
    <div class="dr-payProductUrlForm">
        <el-dialog :xs="20" :sm="20" :md="6" :lg="6" :xl="6" size="small" :title="$t('adminGroup.lb_give_power')" :visible.sync="dialogState.showUrl" :close-on-click-modal="false">
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
        tag: "tag"
      }
    };
  },
  methods: {
    savePower() {

    },
    closeTree() {
    },
    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.tag}</span>
          </span>
        </span>
      );
    }
  },

};
</script>
