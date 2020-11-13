<template>
<el-dialog title="选择车辆" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column type="index" width="50" label="序号" :index="indexMethod"></el-table-column>
        <el-table-column prop="plateNumber" label="车牌号" width="180"> </el-table-column>
        <el-table-column prop="emissionStandard" label="排放标准" width="180"> </el-table-column>
        <el-table-column prop="contacts" label="联系人"> </el-table-column>
        <el-table-column prop="telephone" label="联系电话"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
                <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small"> 选择 </el-button>
            </template>
        </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"> </el-pagination>
        <!-- <el-button @click="handleClose">取 消</el-button> -->
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
    </span>
</el-dialog>
</template>

<script>
import Bus from '../../common/bus/bus';
export default {
    data() {
        return {
            dialogVisible: false,
            tableData: [],
            page: 1,
            pageSize: 10,
            total: null,
            certState: "C"
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
        },
        show() {
            this.dialogVisible = true;
        },
        deleteRow(index, rows) {
            //$emit第一个参数对应$on的第一个参数，第二个参数是$on回调函数里面的形参
            Bus.$emit('plateNumber', rows[index]);
            this.handleClose();
        },
        qingqiu() {
            this.$http
                .post(this.$config.ajax_url + '/vehicle/getVehiclePage.html', {
                    page: this.page,
                    pageSize: this.pageSize,
                    certState: this.certState
                })
                .then((res) => {
                    if (res.data) {
                        if (this.dialogVisible == false) {
                            this.show();
                        }
                        this.tableData = res.data.rows;
                        this.total = res.data.total;
                    }
                });
        },
        // 这里是切换页数
        handleCurrentChange(val) {
            this.page = val;
            this.qingqiu();
        },
        // 根据分页展示序号
        indexMethod(index) {
            index = index + 1 + (this.page - 1) * this.pageSize;
            return index;
        }
    },
    onload() {}
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
