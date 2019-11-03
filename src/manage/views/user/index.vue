<template>
    <div class="User">
        <el-row class="dr-datatable">
            <el-col :span="24">
             <TopBar type="UserList" :pageInfo="UserList.pageInfo"></TopBar>
                <DataTable :pageInfo="UserList.pageInfo" :dataList="UserList.docs"></DataTable>
                <Pagination :pageInfo="UserList.pageInfo" pageType="UserList"></Pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>

    import DataTable from './dataTable.vue';
    import Pagination from '../common/Pagination.vue';
    import TopBar from "../common/TopBar.vue";

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
            Pagination,
        },

        methods: mapActions([

        ]),
        computed: {
            ...mapGetters([
                'UserList'
            ]),
        },
        mounted() {
            this.$store.dispatch('getUserList');
        }
    }
</script>

<style lang="">

</style>