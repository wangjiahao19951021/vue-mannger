<template>
    <div class="login-wraps1">
        <el-tabs type="border-card">
            <el-tab-pane :label="title">
                <el-form :inline="true" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="form.plateNumber" placeholder="请输入车牌号" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-date-picker
                            v-model="form.value"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            value-format="yyyy-MM-dd"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="reset">重置</el-button>
                        <el-button type="primary" @click="onSubmit" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                </el-form>
                <br />
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="车牌号">
                                    <span>{{ props.row.plateNumber }}</span>
                                </el-form-item>
                            </el-form>
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="联系人">
                                    <span>{{ props.row.contacts }}</span>
                                </el-form-item>
                            </el-form>
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="联系电话">
                                    <span>{{ props.row.telephone }}</span>
                                </el-form-item>
                            </el-form>
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="加油量">
                                    <span>{{ props.row.fuelQuantity }}</span>
                                </el-form-item>
                            </el-form>
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="费用">
                                    <span>{{ props.row.money }}</span>
                                </el-form-item>
                            </el-form>
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="加油时间">
                                    <span>{{ props.row.fuelTime }}</span>
                                </el-form-item>
                            </el-form>
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="创建时间">
                                    <span>{{ props.row.createTime }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column type="index" width="50" label="序号" :index="indexMethod"> </el-table-column>
                    <el-table-column prop="plateNumber" label="车牌号"> </el-table-column>
                    <el-table-column prop="contacts" label="联系人"> </el-table-column>
                    <el-table-column prop="telephone" label="联系电话"> </el-table-column>
                    <el-table-column prop="fuelQuantity" label="加油量"> </el-table-column>
                    <el-table-column prop="money" label="费用"> </el-table-column>
                    <el-table-column prop="fuelTime" label="加油时间"> </el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button @click.native.prevent="orderDetail(scope.$index, tableData)" type="text" size="small">
                                查看详情
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <br />
                <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"> </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="添加加油记录">
                <el-form ref="form" :model="add" label-width="100px" :label-position="labelPosition">
                    <el-form-item label="添加费用">
                        <el-input v-model="add.money" placeholder="请输入费用" type="number"
                            ><i slot="prefix" class="el-input__icon el-icon-money"></i
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="加油量">
                        <el-input v-model="add.fuel" placeholder="请输入加油量"
                            ><i slot="prefix" class="el-input__icon el-icon-document-add"></i
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="加油时间">
                        <el-date-picker
                            v-model="add.data_value"
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            style="width: 100%"
                        >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="选择车辆">
                        <el-input v-model="add.plate_number" :disabled="true" placeholder="请选择车辆">
                            <i slot="prefix" class="el-input__icon el-icon-check"></i>
                            <el-button slot="append" type="primary" icon="el-icon-check" @click="select1">选择</el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="add_fuel">添 加</el-button>
                        <el-button @click="add_reset">重 置</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <orderComeDetail ref="orderComeDetail"></orderComeDetail>
        <selectPer ref="selectPer"></selectPer>
    </div>
</template>

<script>
import orderComeDetail from './mask/order_come_detail';
import selectPer from '../tanchuang/selectPer';
import Bus from '../../common/bus/bus';
export default {
    components: {
        orderComeDetail,
        selectPer
    },
    data() {
        return {
            form: {
                plateNumber: '',
                value: []
            },
            title: '',
            total: null,
            page: 1,
            pageSize: 10,
            tableData: [],
            data_detail: '',
            add: {
                money: '',
                data_value: '',
                fuel: '',
                plate_number: '',
                plate_number_id: ""
            },
            labelPosition: 'left'
        };
    },
    methods: {
        reset() {
            this.form.plateNumber = '';
            this.form.value = [];
        },
        onSubmit() {
            this.qingqiu();
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
        },
        qingqiu() {
            if (this.form.value == null) {
                this.form.value = [];
            }
            if (this.form.value[0] == undefined) {
                this.form.value[0] = '';
            }
            if (this.form.value[1] == undefined) {
                this.form.value[1] = '';
            }
            this.$http
                .post(this.$config.ajax_url + '/vehicle/getVehicleFuepage.html', {
                    page: this.page,
                    pageSize: this.pageSize,
                    plateNumber: this.form.plateNumber,
                    qbeginTime: this.form.value[0],
                    qendTime: this.form.value[1]
                })
                .then((res) => {
                    if (res.data) {
                        this.tableData = res.data.rows;
                        this.total = res.data.total;
                    }
                });
        },
        orderDetail(index, rows) {
            this.$refs.orderComeDetail.qingqiu(rows[index]);
        },
        select1() {
            this.$refs.selectPer.qingqiu();
            Bus.$on('plateNumber', (result) => {
                this.add.plate_number = result.plateNumber;
                this.add.plate_number_id = result.vehicleId;
            });
        },
        add_fuel() {
            if (this.add.money == '') {
                this.$message({
                    showClose: true,
                    message: '请输入费用',
                    type: 'error'
                });
                return;
            }
            if (this.add.fuel == '') {
                this.$message({
                    showClose: true,
                    message: '请输入加油量',
                    type: 'error'
                });
                return;
            }
            if (this.add.data_value == '') {
                this.$message({
                    showClose: true,
                    message: '请选择日期',
                    type: 'error'
                });
                return;
            }
            if (this.add.plate_number_id == '') {
                this.$message({
                    showClose: true,
                    message: '请选择车辆',
                    type: 'error'
                });
                return;
            }
            /*
             *   /vehicle/addVehicleFue.html
             *   vehicleId: 11
             *   fuelQuantity: 100
             *   fuelTime: 2020-11-04
             *   money: 1000
             */
            this.$http
                .post(this.$config.ajax_url + '/vehicle/addVehicleFue.html', {
                   vehicleId: this.add.plate_number_id,
                   fuelQuantity: this.add.fuel,
                   fuelTime: this.add.data_value,
                   money: this.add.money,
                })
                .then((res) => {
                    if (res.data.code == 1) {
                        this.$alert(res.data.msg, '成功', {
                            confirmButtonText: '确定',
                            type: 'success',
                            callback: (action) => {
                                this.add_reset();
                            }
                        });
                    } else {
                        this.$alert(res.data.msg, '失败', {
                            confirmButtonText: '确定',
                            type: 'error',
                            callback: (action) => {}
                        });
                    }
                });
        },
        add_reset() {
            this.add.money = '';
            this.add.data_value = '';
            this.add.fuel = '';
            this.add.plate_number = '';
            this.add.plate_number_id = '';
        }
    },
    mounted() {
        this.title = this.$route.meta.title;
    },
    created() {
        this.qingqiu();
    }
};
</script>


<style>
.login-wraps1 {
    height: 100%;
}
.el-tabs {
    min-height: 100% !important;
}
.el-pagination {
    text-align: center;
}
.el-icon-circle-close {
    color: white;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 150px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
</style>
