<template>
    <div class="dr-addTimeForm">
        <el-dialog :xs="20" :sm="20" :md="6" :lg="6" :xl="6" size="small" :title="$t('goods.userName')" :visible.sync="dialogState.addTime" :close-on-click-modal="false">
            <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item :label="$t('goods.userName')" >
                    <el-input size="small" v-model="dialogState.userName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button size="medium" type="primary" @click="submitForm('ruleForm')">{{$t('main.form_btnText_save')}}</el-button>
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
        userName: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("goods.userName")
            }),
            trigger: "blur"
          },
          {
            min: 1,
            max: 12,
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
                      // 新增
            services.addTime(params).then(result => {
              if (result.data.status === 200) {
                this.$store.dispatch("hideGoodsForm");
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
    }
  }
};
</script>