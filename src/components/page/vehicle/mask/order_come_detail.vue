<template>
    <el-dialog title="车辆加油详情" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" append-to-body>
        <el-form ref="data_detail" :model="data_detail" label-width="120px" :label-position="labelPosition">
            <el-form-item label="车牌号">
                <el-input v-model="data_detail.plateNumber" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系人">
                <el-input v-model="data_detail.contacts" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="data_detail.telephone" disabled></el-input>
            </el-form-item>
            <el-form-item label="加油量">
                <el-input v-model="data_detail.fuelQuantity" disabled></el-input>
            </el-form-item>
            <el-form-item label="费用">
                <el-input v-model="data_detail.money" disabled></el-input>
            </el-form-item>
            <el-form-item label="加油时间">
                <el-input v-model="data_detail.fuelTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-input v-model="data_detail.createTime" disabled></el-input>
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
