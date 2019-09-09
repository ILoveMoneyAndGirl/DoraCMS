


<template>
    <div class="dr-adminUserBalanceForm">
        <el-dialog :xs="20" :sm="20" :md="6" :lg="6" :xl="6" size="small" :title="$t('com.info')" :visible.sync="dialogState.show" :close-on-click-modal="false">
            <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
            


                <el-form-item :label="$t('adminUserBalance.money')" prop="money">
                    <el-input size="small" type="textarea" v-model="dialogState.formData.money"></el-input>
                </el-form-item>


                <el-form-item :label="$t('adminUserBalance.tryDay')" prop="tryDay">
                    <el-input size="small" type="textarea" v-model="dialogState.formData.tryDay"></el-input>
                </el-form-item>

         


                <el-form-item :label="$t('adminUserBalance.tryAmountMoney')" >
                    <el-input size="small" type="textarea" v-model="dialogState.formData.tryAmountMoney"></el-input>
                </el-form-item>


                <el-form-item :label="$t('adminUserBalance.state')" prop="state">
                <el-select size="small" v-model="dialogState.formData.state" :placeholder="$t('validate.selectNull', {label: this.$t('adminUserBalance.state')})">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

                <el-form-item>
                    <el-button size="medium" type="primary" @click="submitForm('ruleForm')">{{$t('main.form_btnText_update')}}</el-button>
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
      options: [{
          value: 0,
          label: '永久免费'
        }, {
          value: 1,
          label: '普通会员'
        },{
          value: 3,
          label: '冻结'
          },
        ],
      rules: {
          money: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("adminUserBalance.money")
            }),
            trigger: "blur"
          }       
          ],
          tryDay: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("adminUserBalance.tryDay")
            }),
            trigger: "blur"
          }
        ],

          tryAmountMoney: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("adminUserBalance.tryAmountMoney")
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
        this.$store.dispatch("showAdminUserBalanceForm",{
                  show:false,
                  edit:false,
                });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = this.dialogState.formData;
          // 更新
              services.updateAdminUserBalance(params).then(result => {
              if (result.data.status === 200) {
                this.$store.dispatch("showAdminUserBalanceForm",{
                  show:false,
                  edit:false,
                });
                this.$store.dispatch("getAdminUserBalanceList");
                this.$message({
                  message: this.$t("main.updateSuccess"),
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