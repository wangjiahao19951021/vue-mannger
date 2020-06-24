<template>
    <div class="login-wraps1">
        <el-tabs type="border-card">
            <el-tab-pane :label="title"></el-tab-pane>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="审批人">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item label="活动区域">
                    <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="1"></el-option>
                        <el-option label="区域二" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
                <el-table
                    ref="singleTable"
                    :data="tableData"
                    highlight-current-row
                    @cell-dblclick="handleCurrentChange"
                    style="width: 100%"
                >
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column property="date" label="日期" width="120"></el-table-column>
                    <el-table-column property="name" label="姓名" width="120"></el-table-column>
                    <el-table-column property="address" label="地址"></el-table-column>
                </el-table>
            </el-form>
            <br />
            <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </el-tabs>
        <el-dialog
            title="详细内容"
            :visible.sync="dialogVisible"
            width="30%"
            :close-on-click-modal="false"
        >
            <el-form :model="editForm" label-width="80px" ref="editForm">
                <el-form-item label="日期" prop="date">
                    <el-input v-model="editForm.date" auto-complete="off" :disabled="editor"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="editForm.name" auto-complete="off" :disabled="editor"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="editForm.address" auto-complete="off" :disabled="editor"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handeditor">编辑</el-button>
                <el-button type="primary">提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            editor: true,
            editForm: {
                id: 0,
                date: '',
                name: 0,
                address: ''
            },
            formInline: {
                user: '',
                region: ''
            },
            title: '',
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎1',
                    address: '上海市普陀区金沙江路 1518 弄',
                    id: 1234
                },
                {
                    date: '2016-05-04',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1517 弄',
                    id: 1235
                },
                {
                    date: '2016-05-02',
                    name: '王小虎1',
                    address: '上海市普陀区金沙江路 1518 弄',
                    id: 1234
                },
                {
                    date: '2016-05-04',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1517 弄',
                    id: 1235
                },
                {
                    date: '2016-05-02',
                    name: '王小虎1',
                    address: '上海市普陀区金沙江路 1518 弄',
                    id: 1234
                },
                {
                    date: '2016-05-04',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1517 弄',
                    id: 1235
                },
                {
                    date: '2016-05-04',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1517 弄',
                    id: 1235
                },
                {
                    date: '2016-05-04',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1517 弄',
                    id: 1235
                },
                {
                    date: '2016-05-04',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1517 弄',
                    id: 1235
                },
                {
                    date: '2016-05-04',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1517 弄',
                    id: 1235
                }
            ],
            currentRow: null,
            dialogVisible: false
        };
    },
    methods: {
        onSubmit() {
            let user = this.formInline.user;
            let region = this.formInline.region;
        },
        handleCurrentChange(val) {
            this.currentRow = val;
            // console.log(val.id)
            // console.log(val)
            this.dialogVisible = true;
            this.editForm = val;
            this.editor = true;
        },
        handleEdit: function(index, row) {
            this.editFormVisible = true;
            this.editForm = Object.assign({}, row);
        },
        handeditor() {
            this.editor = false;
        }
    },
    mounted() {
        this.title = this.$route.meta.title;
    }
};
</script>


<style scoped>
.login-wraps1 {
    height: 100%;
}
.el-tabs {
    min-height: 100% !important;
}
.el-pagination {
    text-align: center;
}
</style>
