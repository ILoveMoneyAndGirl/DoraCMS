<template>
    <div>
        <el-table align="center" v-loading="loading" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%">

            <el-table-column prop="userName" :label="$t('user.userName')">
            </el-table-column>
            <el-table-column prop="password" :label="$t('user.password')">
            </el-table-column>
            <el-table-column prop="bornDate" :label="$t('user.bornDate')">
            </el-table-column>
          <el-table-column prop="deadLine" :label="$t('user.deadLine')">
            </el-table-column>
              <el-table-column prop="enable" :label="$t('user.enable')">
            </el-table-column>
              <el-table-column prop="ip" :label="$t('user.ip')">
            </el-table-column>

            <el-table-column :label="$t('main.dataTableOptions')" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" plain round icon="el-icon-delete" @click="delete(scope.$index, dataList)"></el-button>
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
      multipleSelection: []
    };
  },

  methods: {
    delete(index, rows) {
       console.log("///////////------------------>")
       console.log(index,rows)
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
          return services.deleteUser({
            ids: rows[index].id
          });
        })
        .then(result => {
          if (result.data.status === 200) {
            this.$store.dispatch("getUserList", this.pageInfo);
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
    },
  },
};
</script>