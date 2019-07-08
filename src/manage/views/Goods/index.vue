<template>
    <div class="adminUser">
        <TagForm :dialogState="formState"></TagForm>
        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="goods" :pageInfo="GoodsList.pageInfo"></TopBar>
                <DataTable :pageInfo="GoodsList.pageInfo" :dataList="GoodsList.docs"></DataTable>
                <Pagination :pageInfo="GoodsList.pageInfo" pageType="GoodsList"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import TagForm from './tagForm'
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
            TagForm,
            Pagination
        },
        methods: mapActions([

        ]),
        computed: {
            ...mapGetters([
                'GoodsList'
            ]),
            formState() {

                var formData=this.$store.getters.GoodsListFormState
                   console.log("formData??????????????????????");
                    console.log(formData);
                return formData
            }
        },
        mounted() {
            this.$store.dispatch('getGoodsList');
        }
    }
</script>

<style lang="">

</style>