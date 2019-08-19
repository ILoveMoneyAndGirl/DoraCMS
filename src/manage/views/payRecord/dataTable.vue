<template>
    <div>
        <el-table align="center" v-loading="loading" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

            <el-table-column type="selection" width="55">
            </el-table-column>

            <el-table-column prop="state" :label="$t('payRecord.state')">
              <template slot-scope="scope">{{scope.row.state === 0?'过期待处理':(scope.row.state ===1?'手动完成':'自调完成')}}</template>
            </el-table-column>

            <el-table-column prop="_id" :label="$t('payRecord._id')">
            </el-table-column>
             <el-table-column prop="appID" :label="$t('payRecord.appID')">
            </el-table-column>

            <el-table-column prop="tagPrice" :label="$t('payRecord.tagPrice')">
            </el-table-column>
            <el-table-column prop="price" :label="$t('payRecord.price')">
            </el-table-column>
            <el-table-column prop="rate" :label="$t('payRecord.rate')">
            </el-table-column>
            <el-table-column prop="takeOff" :label="$t('payRecord.takeOff')">
            </el-table-column>
            <el-table-column prop="channel" :label="$t('payRecord.channel')">
             <template slot-scope="scope">{{scope.row.channel === 0?'支付宝':(scope.row.channel ===1?'微信':'其它')}}</template>
            </el-table-column>
            <el-table-column prop="payUrl" :label="$t('payRecord.payUrl')">
            </el-table-column>
            <el-table-column prop="callBackUrl" :label="$t('payRecord.callBackUrl')">
            </el-table-column>
            <el-table-column prop="transactionId" :label="$t('payRecord.transactionId')">
            </el-table-column>
            <el-table-column prop="comment" :label="$t('payRecord.comment')">
            </el-table-column>

            <el-table-column prop="createDate" :label="$t('payRecord.createDate')">
            </el-table-column>
            <el-table-column prop="flishDate" :label="$t('payRecord.flishDate')">
            </el-table-column>
            <el-table-column prop="timeOutDate" :label="$t('payRecord.timeOutDate')">
            </el-table-column>

            <el-table-column :label="$t('main.dataTableOptions')" width="150" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" plain round @click="edit(scope.$index, dataList)"><i class="fa fa-edit"></i></el-button>
                    <el-button size="mini" type="danger" plain round icon="el-icon-delete" @click="deleteOne(scope.$index, dataList)"></el-button>
                </template>
            </el-table-column>
            
        </el-table>
    </div>
</template>

<script>
import services from "../../store/services.js";
export default {
  props: {
    dataList: Array,
    pageInfo: Object
  },
  data() {
    return {
      loading: false,
      multipleSelection: [],
      yellow: {
        color: "#F7BA2A"
      },
      gray: {
        color: "#CCC"
      },
      green: { color: "#13CE66" },
      red: { color: "#FF4949" }
    };
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    edit(index, rows) {
      let rowData = rows[index];
      this.$store.dispatch("showPayUrlForm", {
        edit: true,
        formData: rowData
      });
    },
    deleteOne(index, rows) {
      console.log("delete")
      this.$confirm(
        this.$t("main.del_notice"),
        this.$t("main.scr_modal_title"),
        {
          confirmButtonText: this.$t("main.confirmBtnText"),
          cancelButtonText: this.$t("main.cancelBtnText"),
          type: "warning"
        }
      )
        .then(() => {
              console.log("then")

          return services.deletePayUrl({
            ids: rows[index]._id
          });
        })
        .then(result => {
          if (result.data.status === 200) {
            this.$store.dispatch("getPayUrlList", this.pageInfo);
            this.$message({
              message: this.$t("main.scr_modal_del_succes_info"),
              type: "success"
            });
          } else {
            this.$message.error(result.data.message);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("main.scr_modal_del_error_info")
          });
        });
    }
  }
};
</script>