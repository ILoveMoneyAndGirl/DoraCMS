
<template>
    <div>
        <el-table align="center" v-loading="loading" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

            <el-table-column prop="price" :label="$t('payUrl.price')">
            </el-table-column>

            <el-table-column prop="tagPrice" :label="$t('payUrl.tagPrice')">
            </el-table-column>

            <el-table-column  prop="url":label="$t('payUrl.url')">
            </el-table-column>

            <el-table-column prop="tag" :label="$t('payUrl.tag')">
            </el-table-column>

            <el-table-column prop="timeOut" :label="$t('payUrl.timeOut')">
            </el-table-column>

            <el-table-column prop="channel" :label="$t('payUrl.channel')">
             <template slot-scope="scope">{{scope.row.channel === 0?'支付宝':(scope.row.channel ===1?'微信':'其它')}}</template>
            </el-table-column>

            <el-table-column  :label="$t('payUrl.isAny')" show-overflow-tooltip>
              <template slot-scope="scope">
                <i
                  :class="scope.row.isAny ? 'fa fa-check-circle' : 'fa fa-minus-circle'"
                  :style="scope.row.isAny ? green : red"
                ></i>
              </template>
          </el-table-column>

            <el-table-column :label="$t('main.dataTableOptions')" width="150">
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