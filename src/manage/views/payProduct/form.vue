<template>
    <div class="dr-payProductForm">
        <el-dialog :xs="20" :sm="20" :md="6" :lg="6" :xl="6" size="small" :title="$t('com.info')" :visible.sync="dialogState.showName" :close-on-click-modal="close">
            <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item :label="$t('payProduct.name')" prop="name">
                    <el-input size="small" v-model="dialogState.formData.name"></el-input>
                </el-form-item>

                  <el-form-item>
                    <el-button size="medium" type="primary" @click="submitForm('ruleForm')">{{dialogState.showName ? $t('main.form_btnText_save') : $t('main.form_btnText_save')}}</el-button>
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
      close:false,
      rules: {
          name: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("payProduct.name")
            }),
            trigger: "blur"
          }       
          ],
      },
      green: { color: "#13CE66" },
      red: { color: "#FF4949" },
    };
  },
  methods: {
    confirm() {
      this.$store.dispatch("showPayProductForm", {
         showUrl: false,
         showName:false,
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.dialogState.formData;
            // 新增
            services.addPayProduct(params).then(result => {
              if (result.data.status === 200) {
                this.$store.dispatch("showPayProductForm", {
                    showUrl: false,
                    showName:false,
                });
                this.$store.dispatch("getPayProductList");
                this.$message({
                  message: this.$t("main.addSuccess"),
                  type: "success"
                });
              } else {
                this.$message.error(result.data.message);
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>