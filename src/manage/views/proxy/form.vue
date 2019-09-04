<template>
    <div class="dr-goodsForm">
        <el-dialog :xs="20" :sm="20" :md="6" :lg="6" :xl="6" size="small" :title="$t('goods.form_title')" :visible.sync="dialogState.show" :close-on-click-modal="false">
            <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

                <el-form-item :label="$t('host.head')" prop="head">
                    <el-input size="small" v-model="dialogState.formData.head"></el-input>
                </el-form-item>

                <el-form-item :label="$t('host.host')" prop="host">
                    <el-input size="small" v-model="dialogState.formData.host"></el-input>
                </el-form-item>


                <el-form-item :label="$t('host.port')" prop="port">
                    <el-input size="small" v-model="dialogState.formData.port"></el-input>
                </el-form-item>


               <el-form-item :label="$t('host.type')" prop="type">
                    <el-input size="small" v-model="dialogState.formData.type"></el-input>
                </el-form-item>

                <el-form-item :label="$t('host.name')" prop="name">
                    <el-input size="small" v-model="dialogState.formData.name"></el-input>
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
        head: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("host.head")
            }),
            trigger: "blur"
          },
          {
            min: 1,
            max: 12,
            message: this.$t("validate.rangelength", { min: 1, max: 12 }),
            trigger: "blur"
          }
        ],
        host: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("host.host")
            }),
            trigger: "blur"
          },
          {
            min: 1,
            max: 10,  
            message: this.$t("validate.rangelength", { min: 1, max: 12 }),
            trigger: "blur"
          }
        ],
          port: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("host.port")
            }),
            trigger: "blur"
          },
          {
            min: 1,
            max: 10,  
            message: this.$t("validate.rangelength", { min: 1, max: 12 }),
            trigger: "blur"
          }
        ],

          type: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("host.type")
            }),
            trigger: "blur"
          },
          {
            min: 1,
            max: 10,  
            message: this.$t("validate.rangelength", { min: 1, max: 12 }),
            trigger: "blur"
          }
        ],
          name: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("host.name")
            }),
            trigger: "blur"
          },
          {
            min: 1,
            max: 10,  
            message: this.$t("validate.rangelength", { min: 1, max: 12 }),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    confirm() {
      this.$store.dispatch("hideGoodsForm");
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.dialogState.formData;
          // 更新
          if (this.dialogState.edit) {
            services.updateHost(params).then(result => {
              if (result.data.status === 200) {
                this.$store.dispatch("hideHostForm",{
                    show:false,
                    edit:false,
                });
                this.$store.dispatch("getHostList");
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
            services.addHost(params).then(result => {
              if (result.data.status === 200) {
              this.$store.dispatch("hideHostForm",{
                    show:false,
                    edit:false,
                });                
                this.$store.dispatch("getHostList");
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