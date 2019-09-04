<template>
    <div class="adminUser">
        <Form :dialogState="formState"></Form>
        <UrlForm :dialogState="formState" :treeData="PayUrlList.docs"></UrlForm>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="payProduct" :pageInfo="PayProductList.pageInfo"></TopBar>
                <DataTable :pageInfo="PayProductList.pageInfo" :dataList="PayProductList.docs"></DataTable>
                <Pagination :pageInfo="PayProductList.pageInfo" pageType="PayProductList"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Form from './form.vue'
    import UrlForm from './urlForm.vue'
    import DataTable from './dataTable.vue';
    import TopBar from '../common/TopBar.vue';
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
            TopBar,
            Form,
            Pagination,
            UrlForm,
        },
        methods: mapActions([

        ]),
        computed: {
            ...mapGetters([
                'PayProductList',
                'PayUrlList'
            ]),
            formState() {
                return this.$store.getters.PayProductListFormState
            }
        },
        mounted() {
            this.$store.dispatch('getPayProductList');
            this.$store.dispatch('getPayUrlList');
        }
    }
</script>

<style lang="">

</style>