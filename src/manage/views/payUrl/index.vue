<template>
    <div class="adminUser">
        <Form :dialogState="formState"></Form>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="qrcode" :pageInfo="PayUrlList.pageInfo"></TopBar>
                <DataTable :pageInfo="PayUrlList.pageInfo" :dataList="PayUrlList.docs"></DataTable>
                <Pagination :pageInfo="PayUrlList.pageInfo" pageType="PayUrlList"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Form from './form.vue'
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
            Pagination
        },
        methods: mapActions([

        ]),
        computed: {
            ...mapGetters([
                'PayUrlList'
            ]),
            formState() {
                return this.$store.getters.PayUrlListFormState
            }
        },
        mounted() {
            this.$store.dispatch('getPayUrlList');
        }
    }
</script>

<style lang="">

</style>