<template>
    <div>
        <el-table align="center" v-loading="loading" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

            <el-table-column prop="head" :label="$t('host.head')">
            </el-table-column>

            <el-table-column prop="host" :label="$t('host.host')">
            </el-table-column>

            <el-table-column prop="port" :label="$t('host.port')">
            </el-table-column>

            <el-table-column prop="type" :label="$t('host.type')">
            </el-table-column>

            <el-table-column prop="name" :label="$t('host.name')">
            </el-table-column>

            <el-table-column prop="status" :label="$t('host.status')">
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
      multipleSelection: []
    };
  },

  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    edit(index, rows) {
      let rowData = rows[index];
      this.$store.dispatch("showHostForm", {
        edit: true,
        show: true,
        formData: rowData
      });
    },
    deleteOne(index, rows) {
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
          return services.deleteHost({
            ids: rows[index].id
          });
        })
        .then(result => {
          if (result.data.status === 200) {
            this.$store.dispatch("getHostList", this.pageInfo);
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