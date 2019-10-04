<template>
    <div class="adminUser">
        <el-row class="dr-datatable">
            <el-col :span="24">
                <DataTable :pageInfo="PayRecordList.pageInfo" :dataList="PayRecordList.docs"></DataTable>
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

            }
        },
        components: {
            DataTable,
            Pagination
        },
        methods: mapActions([

        ]),
        computed: {
            ...mapGetters([
                'PayRecordList'
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