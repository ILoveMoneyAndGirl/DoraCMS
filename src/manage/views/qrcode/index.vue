<template>
    <div class="qrcode">
        <Form :dialogState="formState"></Form>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="qrcode"></TopBar>
                <Tree :treeData="PayUrlList.docs" pageType="qrcode"></Tree>
                <el-tooltip placement="top" content="tooltip">
                    <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade"/>
                </el-tooltip>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Form from "./form";
import Tree from "./tree";
import TopBar from "../common/TopBar.vue";
import BackToTop from "@/components/BackToTop";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "index",
  data() {
    return {
      myBackToTopStyle: {
        right: "0px",
        bottom: "50px",
        width: "40px",
        height: "40px",
        "border-radius": "4px",
        "line-height": "45px", // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
        background: "#e7eaf1" // 按钮的背景颜色 The background color of the button
      }
    };
  },
  components: {
    TopBar,
    Form,
    Tree,
    BackToTop
  },
  methods: mapActions([]),
  computed: {
    ...mapGetters(["PayUrlList"]),
    formState() {
        return this.$store.getters.PayUrlListFormState
    }
  },
  mounted() {
      this.$store.dispatch('getPayUrlList');
  }
};
</script>

<style lang="">
</style>