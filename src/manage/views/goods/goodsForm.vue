<template>
    <div class="dr-goodsForm">
        <el-dialog :xs="20" :sm="20" :md="6" :lg="6" :xl="6" size="small" :title="$t('goods.form_title')" :visible.sync="dialogState.show" :close-on-click-modal="false">
            <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item :label="$t('goods.price')" prop="price">
                    <el-input size="small" v-model="dialogState.formData.price"></el-input>
                </el-form-item>
                <el-form-item :label="$t('goods.days')" prop="days">
                    <el-input size="small"  v-model="dialogState.formData.days"></el-input>
                </el-form-item>
                <el-form-item :label="$t('goods.des')" >
                    <el-input size="small" type="textarea" v-model="dialogState.formData.des"></el-input>
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
        price: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("goods.price")
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
        days: [
          {
            required: true,
            message: this.$t("validate.inputNull", {
              label: this.$t("goods.days")
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
            services.updateGoods(params).then(result => {
              if (result.data.status === 200) {
                this.$store.dispatch("hideGoodsForm");
                this.$store.dispatch("getGoodsList");
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
            services.addGoods(params).then(result => {
              if (result.data.status === 200) {
                this.$store.dispatch("hideGoodsForm");
                this.$store.dispatch("getGoodsList");
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