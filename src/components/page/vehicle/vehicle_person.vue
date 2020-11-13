<template>
<div class="login-wraps1">
    <el-tabs type="border-card">
        <el-tab-pane :label="title">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="label_name.first_name" name="first">
                    <br />
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item>
                            <el-input v-model="form.plateNumber" placeholder="请输入车牌号" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-date-picker v-model="form.value" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
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
                                    <el-form-item label="人员">
                                        <span>{{ props.row.personnel }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="工资">
                                        <span>{{ props.row.wages }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="社保">
                                        <span>{{ props.row.socialSecurity }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="其他">
                                        <span>{{ props.row.other }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="日期">
                                        <span>{{ props.row.generationTimes }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column type="index" width="50" label="序号" :index="indexMethod"> </el-table-column>
                        <el-table-column prop="plateNumber" label="车牌号"> </el-table-column>
                        <el-table-column prop="personnel" label="人员"> </el-table-column>
                        <el-table-column prop="wages" label="工资"> </el-table-column>
                        <el-table-column prop="socialSecurity" label="社保"> </el-table-column>
                        <el-table-column prop="other" label="其他"> </el-table-column>
                        <el-table-column prop="generationTimes" label="日期"> </el-table-column>
                        <!--
                        <el-table-column fixed="right" label="操作">
                            <template slot-scope="scope">
                                <el-button @click.native.prevent="orderDetail(scope.$index, tableData)" type="text" size="small">
                                    查看详情
                                </el-button>
                            </template>
                        </el-table-column>
                        -->
                    </el-table>
                    <br />
                    <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"> </el-pagination>
                </el-tab-pane>
                <el-tab-pane :label="label_name.second_name" name="second">
                    <br />
                    <el-form ref="form" :model="add" label-width="100px" :label-position="labelPosition" :rules="rules">
                        <el-form-item label="人员" prop="personnel">
                            <el-input v-model="add.personnel" placeholder="请输入人员"></el-input>
                        </el-form-item>
                        <el-form-item label="工资" prop="wages">
                            <el-input v-model="add.wages" placeholder="请输入工资" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="社保" prop="socialSecurity">
                            <el-input v-model="add.socialSecurity" placeholder="请输入社保" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="其他" prop="other">
                            <el-input v-model="add.other" placeholder="请输入其他费用" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="日期" prop="data_value">
                            <el-date-picker v-model="add.data_value" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" style="width: 100%">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="选择车辆" prop="plate_number">
                            <el-input v-model="add.plate_number" placeholder="请选择车辆" @focus="select1" :readonly="true">
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="add_fuel">添 加</el-button>
                            <el-button @click="add_reset">重 置</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
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
            activeName: 'first',
            label_name: {
                first_name: "人员费用列表",
                second_name: "添加人员费用",
            },
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
                personnel: '',
                data_value: '',
                fuel: '',
                plate_number: '',
                plate_number_id: "",
                wages: '',
                socialSecurity: '',
                other: ''
            },
            labelPosition: 'left',
            rules: {
                personnel: [{
                    required: true,
                    message: '请输入人员',
                }],
                wages: [{
                    required: true,
                    message: '请输入工资',
                }],
                socialSecurity: [{
                    required: true,
                    message: '请输入社保',
                }],
                other: [{
                    required: true,
                    message: '请输入其他费用',
                }],
                data_value: [{
                    required: true,
                    message: '请选择日期',
                }],
                plate_number: [{
                    required: true,
                    message: '请选择车辆',
                }],
            },
            type: 'E'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab);
        },
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
                .post(this.$config.ajax_url + '/cost/getPagepersonnelPage.html', {
                    page: this.page,
                    pageSize: this.pageSize,
                    plateNumber: this.form.plateNumber,
                    qbeginTime: this.form.value[0],
                    qendTime: this.form.value[1],
                    type: this.type,
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
            this.$refs.form.validate((valid) => {
                if (valid) {
                    // vehicleId: 27
                    // generationTimes: 2020 - 11 - 13
                    // personnel: 100
                    // wages: 10
                    // socialSecurity: 101
                    // other: 2222
                    // type: E
                    this.$http
                        .post(this.$config.ajax_url + '/cost/addpersonnel.html', {
                            vehicleId: this.add.plate_number_id,
                            generationTimes: this.add.data_value,
                            type: this.type,
                            personnel: this.add.personnel,
                            wages: this.add.wages,
                            socialSecurity: this.add.socialSecurity,
                            other: this.add.other,
                        })
                        .then((res) => {
                            if (res.data.success) {
                                this.$alert(res.data.message, '成功', {
                                    confirmButtonText: '确定',
                                    type: 'success',
                                    callback: (action) => {
                                        this.add_reset();
                                        this.activeName = 'first'
                                        this.page = 1
                                        this.tableData = [];
                                        this.total = null;
                                        this.qingqiu()
                                    }
                                });
                            } else {
                                this.$alert(res.data.message, '失败', {
                                    confirmButtonText: '确定',
                                    type: 'error',
                                    callback: (action) => {}
                                });
                            }
                        });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        add_reset() {
            this.add.money = '';
            this.add.data_value = '';
            this.add.fuel = '';
            this.add.plate_number = '';
            this.add.plate_number_id = '';
            this.$refs.form.resetFields();
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
