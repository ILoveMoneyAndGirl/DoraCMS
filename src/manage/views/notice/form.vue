<template>
    <div class="dr-goodsForm">
        <el-dialog :xs="20" :sm="20" :md="6" :lg="6" :xl="6" size="small" :title="$t('goods.form_title')" :visible.sync="dialogState.show" :close-on-click-modal="false">
            <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item :label="$t('notice.title')" >
                    <el-input size="small" v-model="dialogState.formData.title"></el-input>
                </el-form-item>
                <el-form-item :label="$t('notice.content')">
                    <el-input size="small"  v-model="dialogState.formData.content"></el-input>
                </el-form-item>
                <el-form-item :label="$t('notice.enable')" >
                    <el-input size="small"  v-model="dialogState.formData.enable"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="medium" type="primary" @click="submitForm('ruleForm')">{{dialogState.edit ? $t('main.form_btnText_update') : $t('main.form_btnText_save')}}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import services from "../../store/services.js";
import _ from "lodash";
export default {
  props: {
    dialogState: Object,
    groups: Array
  },
  data() {
    return {
      rules: {

      }
    };
  },
  methods: {
    confirm() {
      this.$store.dispatch("hideNoticeForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.dialogState.formData;
          // 更新
          if (this.dialogState.edit) {
            services.updateNotice(params).then(result => {
              if (result.data.status === 200) {
                this.$store.dispatch("hideNoticeForm");
                this.$store.dispatch("getNoticeList");
                this.$message({
                  message: this.$t("main.updateSuccess"),
                  type: "success"
                });
              } else {
                this.$message.error(result.data.message);
              }
            });
          } else {
            // 新增
            services.addNotice(params).then(result => {
              if (result.data.status === 200) {
                this.$store.dispatch("hideNoticeForm");
                this.$store.dispatch("getNoticeList");
                this.$message({
                  message: this.$t("main.addSuccess"),
                  type: "success"
                });
              } else {
                this.$message.error(result.data.message);
              }
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>