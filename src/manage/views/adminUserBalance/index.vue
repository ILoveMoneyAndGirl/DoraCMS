<template>
    <div class="adminUser">
        <Form :dialogState="formState"></Form>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <DataTable :pageInfo="AdminUserBalanceList.pageInfo" :dataList="AdminUserBalanceList.docs"></DataTable>
                <Pagination :pageInfo="AdminUserBalanceList.pageInfo" pageType="AdminUserBalanceList"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Form from './form.vue'


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
            Form,
            Pagination,
        },
        methods: mapActions([

        ]),
        computed: {
            ...mapGetters([
                'AdminUserBalanceList'
            ]),
            formState() {
                return this.$store.getters.AdminUserBalanceListFormState
            },
        }
    
        mounted() {
            this.$store.dispatch('getAdminUserBalanceList');
        }
    
    }
</script>

<style lang="">

</style>