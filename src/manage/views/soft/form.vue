<template>
    <div class="dr-softForm">
        <el-dialog :xs="20" :sm="20" :md="6" :lg="6" :xl="6" size="small" :title="$t('payUrl.form_title')" :visible.sync="dialogState.show" :close-on-click-modal="false">
            <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            
                <el-form-item :label="$t('soft.name')" prop="name">
                    <el-input size="small" v-model="dialogState.formData.name"></el-input>
                </el-form-item>

       

                <el-form-item :label="$t('soft.ip')" prop="ip">
                    <el-input size="small" type="textarea" v-model="dialogState.formData.ip"></el-input>
                </el-form-item>


                <el-form-item :label="$t('soft.port')" prop="port">
                    <el-input size="small" type="textarea" v-model="dialogState.formData.port"></el-input>
                </el-form-item>

                <el-form-item :label="$t('soft.comments')" prop="comments">
                    <el-input size="small" type="textarea" v-model="dialogState.formData.comments"></el-input>
                </el-form-item>


                <el-form-item :label="$t('soft.type')" prop="type">
                    <el-input size="small" type="textarea" v-model="dialogState.formData.type"></el-input>
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
          name: [
          {
            required: true,
            message: this.$t("validate.selectNull", {
              label: this.$t("soft.name")
            }),
            trigger: "blur"
          }       
          ],
          ip: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("soft.ip")
            }),
            trigger: "blur"
          },
          {
            min: 8,
            max: 50,
            message: this.$t("validate.rangelength", { min: 8, max: 50 }),
            trigger: "blur"
          }
        ],

          port: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("soft.port")
            }),
            trigger: "blur"
          },
          {
            min: 3,
            max: 10,
            message: this.$t("validate.rangelength", { min: 3, max: 10 }),
            trigger: "blur"
          }
        ],


        type: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("soft.type")
            }),
            trigger: "blur"
          }
        ],

        comments: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("soft.comments")
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
      this.$store.dispatch("hideSoftForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.dialogState.formData;
          // 更新
          if (this.dialogState.edit) {
            services.updatePayUrl(params).then(result => {
              if (result.data.status === 200) {
                this.$store.dispatch("hideSoftForm");
                this.$store.dispatch("getSoftList");
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
                this.$store.dispatch("hideSoftForm");
                this.$store.dispatch("getSoftList");
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
    },
  }
};
</script>