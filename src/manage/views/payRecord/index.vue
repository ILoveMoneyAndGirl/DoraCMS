<template>
    <div class="adminUser">
        <el-row class="dr-datatable">
            <el-col :span="24">
                <DataTable :pageInfo="payRecordList.pageInfo" :dataList="payRecordList.docs"></DataTable>
                <Pagination :pageInfo="payRecordList.pageInfo" pageType="payRecordList"></Pagination>
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
                'payRecordList'
            ]),
            formState() {
                return this.$store.getters.PayRecordListFormState
            }
        },
        mounted() {
            this.$store.dispatch('payRecordList');
        }
    }
</script>

<style lang="">

</style>