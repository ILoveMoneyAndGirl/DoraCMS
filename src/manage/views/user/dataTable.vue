<template>
    <div>
        <el-table align="center" v-loading="loading" ref="multipleTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">

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

  }
};
</script>