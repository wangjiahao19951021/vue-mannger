<template>
    <el-dialog title="订单详情" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" append-to-body>
        <el-form ref="data_detail" :model="data_detail" label-width="120px" :label-position="labelPosition">
            <el-form-item label="订单编号">
                <el-input v-model="data_detail.demindNum" disabled></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-input v-model="sex" disabled></el-input>
            </el-form-item>
            <el-form-item label="收货方名称">
                <el-input v-model="data_detail.custName" disabled></el-input>
            </el-form-item>
            <el-form-item label="车辆">
                <el-input v-model="data_detail.plateNumber" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系电话(司机)">
                <el-input v-model="data_detail.telephone" disabled></el-input>
            </el-form-item>
            <el-form-item label="货物名称">
                <el-input v-model="data_detail.goodsName" disabled></el-input>
            </el-form-item>
            <el-form-item label="下单日期">
                <el-input v-model="data_detail.createTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="运输时间">
                <el-input v-model="data_detail.deliveryDate" disabled></el-input>
            </el-form-item>
            <el-form-item label="接单时间">
                <el-input v-model="data_detail.beginTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="签收时间">
                <el-input v-model="data_detail.endTime" disabled></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import Bus from '../../common/bus/bus';
export default {
    props: ['data_detail'],
    data() {
        return {
            dialogVisible: false,
            labelPosition: 'left'
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
        },
        show() {
            this.dialogVisible = true;
        },
        qingqiu() {
            if (this.dialogVisible == false) {
                this.show();
            }
        }
    },
    computed: {
        sex: {
            get() {
                // v-model不支持过滤器
                return this.data_detail.state == 'W' ? '未开始' : this.data_detail.state == 'D' ? '已开始' : '已结束';
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
