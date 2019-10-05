<template>
    <div class="payRecord">
        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="payRecord" :ids="selectlist" :pageInfo="PayRecordList.pageInfo"></TopBar>
                <DataTable :pageInfo="PayRecordList.pageInfo" :dataList="PayRecordList.docs"  @changeContentSelectList="changeSelect"></DataTable>
                <Pagination :pageInfo="PayRecordList.pageInfo" pageType="PayRecordList"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>




<script>
    import DataTable from './dataTable.vue';
    import Pagination from '../common/Pagination.vue';
    import {
        mapGetters,
        mapActions
    } from 'vuex'

    export default {
        name: 'index',
        data() {
            return {
              selectlist: []
            };
        },
        components: {
            DataTable,
            Pagination
        },
         methods: {
            changeSelect(ids) {
                this.selectlist = ids;
            }
        },        computed: {
            ...mapGetters([
                'PayRecordList','PayRecordListFormState'
            ]),
            formState() {
                return this.$store.getters.PayRecordListFormState
            }
        },
        mounted() {
            this.$store.dispatch('getPayRecordList');
        }
    }
</script>

<style lang="">

</style>