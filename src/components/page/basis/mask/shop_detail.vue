<template>
    <el-dialog title="收货方详情" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" append-to-body>
        <el-form ref="data_detail" :model="data_detail" label-width="120px" :label-position="labelPosition">
            <el-form-item label="收货方">
                <el-input v-model="data_detail.custName" disabled></el-input>
            </el-form-item>
            <el-form-item label="地址">
                <el-input v-model="sex" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系人">
                <el-input v-model="data_detail.contacts" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="data_detail.telephone" disabled></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary"  @click="handleClose">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    data() {
        return {
            dialogVisible: false,
            labelPosition: 'left',
            data_detail: {},
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
        },
        show() {
            this.dialogVisible = true;
        },
        qingqiu(val) {
            if (this.dialogVisible == false) {
                this.show();
                this.data_detail = val
            }
        },
    },
    computed: {
        sex: {
            get() {
                // v-model不支持过滤器
                return this.data_detail.provName + this.data_detail.cityName + this.data_detail.areaName + this.data_detail.address 
            },
            set(val) {}
        }
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
