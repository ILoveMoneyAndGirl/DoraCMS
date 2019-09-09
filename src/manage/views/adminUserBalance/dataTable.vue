

<template>
    <div>
        <el-table align="center" v-loading="loading" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>

            <el-table-column prop="adminUser.userName" :label="$t('adminUserBalance.userName')">
            </el-table-column>

            <el-table-column  prop="money":label="$t('adminUserBalance.money')">
            </el-table-column>

              <el-table-column prop="createDate" :label="$t('adminUserBalance.createDate')">
            </el-table-column>

            <el-table-column prop="tryDay" :label="$t('adminUserBalance.tryDay')">
            </el-table-column>

            <el-table-column prop="tryAmountMoney" :label="$t('adminUserBalance.tryAmountMoney')">
            </el-table-column>

            <el-table-column prop="state" :label="$t('adminUserBalance.state')">
             <template slot-scope="scope">{{scope.row.state === 0?'永久免费':(scope.row.state ===1?'普通会员':'冻结')}}</template>
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
      this.$store.dispatch("showAdminUserBalanceForm", {
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

          return services.deleteAdminUserBalance({
            ids: rows[index]._id
          });
        })
        .then(result => {
          if (result.data.status === 200) {
            this.$store.dispatch("getAdminUserBalanceList", this.pageInfo);
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