<template>
    <div class="dr-payUrlForm">
        <el-dialog :xs="20" :sm="20" :md="6" :lg="6" :xl="6" size="small" :title="$t('payUrl.form_title')" :visible.sync="dialogState.show" :close-on-click-modal="false">
            <el-form :model="dialogState.formData" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">

                <el-form-item v-show="dialogState.formData.type==='tag'" :label="$t('payUrl.tag')" prop="tag">
                    <el-input size="small"  v-model="dialogState.formData.tag"></el-input>
                </el-form-item>

        


                <el-form-item v-show="dialogState.formData.type==='channel'" :label="$t('payUrl.channel')" prop="channel">
                <el-select size="small" v-model="dialogState.formData.channel" :placeholder="$t('validate.selectNull', {label: this.$t('payUrl.channel')})">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>

                <el-form-item v-show="dialogState.formData.type==='tagPrice'&& !dialogState.formData.isAny" :label="$t('payUrl.tagPrice')" prop="tagPrice">
                    <el-input size="small"  v-model="dialogState.formData.tagPrice"></el-input>
                </el-form-item>



                <el-form-item v-show="dialogState.formData.type==='tagPrice'" :label="$t('payUrl.isAny')">
                  <el-switch
                    :on-text="$t('main.radioOn')"
                    :off-text="$t('main.radioOff')"
                    v-model="dialogState.formData.isAny"
                  ></el-switch>
                </el-form-item>




                <el-form-item v-show="dialogState.formData.type==='price'&& !dialogState.formData.isAny" :label="$t('payUrl.price')" prop="price">
                    <el-input size="small"  v-model="dialogState.formData.price"></el-input>

                </el-form-item>



  
                <el-form-item class="upSimg" v-show="dialogState.formData.type==='price'" :label="$t('payUrl.qrCode')" prop="url">
                      <el-upload
                        class="avatar-uploader"
                        action="/api/v0/upload/files?type=images"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                      >
                        <img v-if="dialogState.formData.url" :src="dialogState.formData.url" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                     <el-input size="small"  v-model="dialogState.formData.timeOut"></el-input>
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
const validatorUtil = require("../../../../utils/validatorUtil.js");
export default {
  props: {
    dialogState: Object
  },
  data() {
    return {
      options: [{
          value: 0,
          label: '支付宝'
        }, {
          value: 1,
          label: '微信'
        }],

      rules: {

         url: [
          {
            required: this.dialogState.formData.type==='price',
            message: this.$t("validate.inputNull", {
              label: this.$t("payUrl.qrCode")
            }),
            trigger: "blur"
          }       
          ],
          tag: [
          {
            required: this.dialogState.formData.type==='tag',
            message: this.$t("validate.inputNull", {
              label: this.$t("payUrl.tag")
            }),
            trigger: "blur"
          },
          {
            min: 2,
            max: 50,
            message: this.$t("validate.rangelength", { min: 1, max: 50 }),
            trigger: "blur"
          }
        ],

          price: [
          {
            required: this.dialogState.formData.type==='price',
            message: this.$t("validate.inputNull", {
              label: this.$t("payUrl.price")
            }),
            trigger: "blur"
          }
        ],

        tagPrice: [
          {
            required: this.dialogState.formData.type==='tagPrice',
            message: this.$t("validate.inputNull", {
              label: this.$t("payUrl.price")
            }),
            trigger: "blur"
          }
        ],

        channel: [
          {
            required: this.dialogState.formData.type==='channel',
            message: this.$t("validate.inputNull", {
              label: this.$t("payUrl.channel")
            }),
            trigger: "blur"
          }],
      },
      green: { color: "#13CE66" },
      red: { color: "#FF4949" },
    };
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
    changeType(value) {},
    confirm() {
       this.$store.dispatch("hidePayUrlForm");
    },

    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        //if (!valid) {
          let params = this.dialogState.formData;
          // 更新
          if (this.dialogState.edit) {
            services.updatePayUrl(params).then(result => {
              if (result.data.status === 200) {
                this.$store.dispatch("hidePayUrlForm");
                this.$store.dispatch("getPayUrlList");
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
        //} 
        /*else {
          console.log("error submit!!");
          return false;
        }*/
      });
    },

    handleAvatarSuccess(res, file) {
      let imageUrl = res.data.path;
            console.log("imageUrl")

      console.log(imageUrl)
       console.log(this.dialogState);

      this.$store.dispatch("showPayUrlForm", {
        edit: this.dialogState.edit,
        formData: Object.assign({}, this.dialogState.formData, {
          url: imageUrl
        })
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isGIF = file.type === "image/gif";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG && !isPNG && !isGIF) {
        this.$message.error(this.$t("validate.limitUploadImgType"));
      }
      if (!isLt2M) {
        this.$message.error(
          this.$t("validate.limitUploadImgSize", { size: 2 })
        );
      }
      return (isJPG || isPNG || isGIF) && isLt2M;
    },
  }
};
</script>