<template>
    <div class="adminUser">
        <Form :dialogState="formState"></Form>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="host" :pageInfo="HostList.pageInfo"></TopBar>
                <DataTable :pageInfo="HostList.pageInfo" :dataList="HostList.docs"></DataTable>
                <Pagination :pageInfo="HostList.pageInfo" pageType="HostList"></Pagination>
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
                'HostList'
            ]),
            formState() {
                var formData=this.$store.getters.HostListFormState
                return formData
            }
        },
        mounted() {
            this.$store.dispatch('getHostList');
        }
    }
</script>

<style lang="">

</style>