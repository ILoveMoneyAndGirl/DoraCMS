


<template>
    <div class="dr-contentTagForm">
        <el-dialog :xs="20" :sm="20" :md="6" :lg="6" :xl="6" size="small" :title="$t('payUrl.form_title')" :visible.sync="dialogState.showxx" :close-on-click-modal="false">
            <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item :label="$t('payUrl.price')" prop="price">
                    <el-input size="small" v-model="dialogState.formData.price"></el-input>
                </el-form-item>
                <el-form-item :label="$t('payUrl.url')" prop="url">
                    <el-input size="small" type="textarea" v-model="dialogState.formData.url"></el-input>
                </el-form-item>

                <el-form-item :label="$t('payUrl.tag')" prop="tag">
                    <el-input size="small" type="textarea" v-model="dialogState.formData.tag"></el-input>
                </el-form-item>


                <el-form-item :label="$t('payUrl.isAny')" prop="tisAnyag">
                    <el-input size="small" type="textarea" v-model="dialogState.formData.isAny"></el-input>
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
      this.$store.dispatch("hidePayUrlForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.dialogState.formData;
          // 更新
          if (this.dialogState.edit) {
            services.updatePayUrl(params).then(result => {
              if (result.data.status === 200) {
                this.$store.dispatch("hidePayUrl");
                this.$store.dispatch("getPayUrl");
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
            services.addPayUrl(params).then(result => {
              if (result.data.status === 200) {
                this.$store.dispatch("hidePayUrlForm");
                this.$store.dispatch("getPayUrlList");
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