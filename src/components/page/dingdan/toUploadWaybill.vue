<template>
    <div class="login-wraps1">
        <el-tabs type="border-card">
            <el-tab-pane :label="title"></el-tab-pane>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="审批人">
                    <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
                    <el-button type="primary" @click="onSubmit">上传</el-button>
                </el-form-item>
                <el-table
                    ref="singleTable"
                    :data="tableData"
                    highlight-current-row
                    @cell-dblclick="handleCurrentChange"
                    style="width: 100%"
                    @selection-change="handleSelectionChange"
                >
                    <el-table-column type="selection" width="55"></el-table-column>
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

        <el-backtop :bottom="100"></el-backtop>
    </div>
</template>

<script>
export default {
    components: {},
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
                user: ''
            },
            title: '',
            tableData: [],
            currentRow: null,
            dialogVisible: false,
            multipleSelection: []
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
        },
        handleSelectionChange(val) {
            // console.log(val)
            this.multipleSelection = val;
        }
    },
    mounted() {
        this.title = this.$route.meta.title;
        this.$http.get('/static/json/table.json', {}).then(res => {
            if (res) {
                this.tableData = res.data;
            }
        });
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
