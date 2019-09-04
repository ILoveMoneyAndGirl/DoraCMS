<template>
    <div class="adminUser">
        <Form :dialogState="formState"></Form>
        <ArgForm :dialogState="softArgFormState"></ArgForm>


        <el-row class="dr-datatable">
            <el-col :span="24">
                <TopBar type="soft" :pageInfo="SoftList.pageInfo"></TopBar>
                <DataTable :pageInfo="SoftList.pageInfo" :dataList="SoftList.docs"></DataTable>
                <Pagination :pageInfo="SoftList.pageInfo" pageType="SoftList"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import Form from './form.vue'
    import ArgForm from './argForm.vue'


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
            ArgForm,
        },
        methods: mapActions([

        ]),
        computed: {
            ...mapGetters([
                'SoftList'
            ]),
            formState() {
                return this.$store.getters.SoftListFormState
            },
            softArgFormState() {
                return this.$store.getters.SoftArgFormState
            }
        },
        mounted() {
            this.$store.dispatch('getSoftList');
        }
    }
</script>

<style lang="">

</style>