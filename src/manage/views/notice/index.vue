<template>
    <div class="adminUser">
        <GoodsForm :dialogState="formState"></GoodsForm>
        <AddTime :dialogState="formState"></AddTime>

        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="notice" :pageInfo="NoticeList.pageInfo"></TopBar>
                <DataTable :pageInfo="NoticeList.pageInfo" :dataList="NoticeList.docs"></DataTable>
                <Pagination :pageInfo="NoticeList.pageInfo" pageType="NoticeList"></Pagination>
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
            Pagination,
        },
        methods: mapActions([

        ]),
        computed: {
            ...mapGetters([
                'NoticeList'
            ]),
            formState() {

                var formData=this.$store.getters.NoticeListFormState
                return formData
            }
        },
        mounted() {
            this.$store.dispatch('getNoticeList');
        }
    }
</script>

<style lang="">

</style>