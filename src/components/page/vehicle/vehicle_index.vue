<template>
    <div class="login-wraps1">
        <el-tabs type="border-card">
            <el-tab-pane :label="title"></el-tab-pane>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="form.plateNumber" placeholder="请输入车牌号" clearable></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="options_value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                    </el-select>
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
                            <el-form-item label="状态">
                                <span>{{
                                    props.row.certState == 'A'
                                        ? '未提交'
                                        : props.row.certState == 'B'
                                        ? '待审核'
                                        : props.row.certState == 'C'
                                        ? '通过'
                                        : '拒绝'
                                }}</span>
                            </el-form-item>
                        </el-form>

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
                            <el-form-item label="排放标准">
                                <span>{{ props.row.emissionStandard }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="车辆类型">
                                <span>{{ props.row.vehicleType }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="排量">
                                <span>{{ props.row.emissions }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="车重">
                                <span>{{ props.row.weight }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="承载吨数">
                                <span>{{ props.row.load }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="行车证号">
                                <span>{{ props.row.license }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="行驶证照片">
                                <span
                                    ><el-image
                                        style="width: 30px; height: 30px"
                                        src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2942945378,442701149&fm=26&gp=0.jpg"
                                        :preview-src-list="[
                                            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2942945378,442701149&fm=26&gp=0.jpg'
                                        ]"
                                    >
                                        <div slot="error" class="image-slot">
                                            <i class="el-icon-picture-outline"></i>
                                        </div> </el-image
                                ></span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="车辆照片">
                                <span
                                    ><el-image
                                        style="width: 30px; height: 30px"
                                        src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2942945378,442701149&fm=26&gp=0.jpg"
                                        :preview-src-list="[
                                            'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2942945378,442701149&fm=26&gp=0.jpg'
                                        ]"
                                    >
                                        <div slot="error" class="image-slot">
                                            <i class="el-icon-picture-outline"></i>
                                        </div> </el-image
                                ></span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column type="index" width="50" label="序号" :index="indexMethod"> </el-table-column>
                <el-table-column prop="state" label="状态">
                    <template slot-scope="scope">
                        {{
                            scope.row.certState == 'A'
                                ? '未提交'
                                : scope.row.certState == 'B'
                                ? '待审核'
                                : scope.row.certState == 'C'
                                ? '通过'
                                : '拒绝'
                        }}</template
                    >
                </el-table-column>
                <el-table-column prop="plateNumber" label="车牌号"> </el-table-column>
                <el-table-column prop="contacts" label="联系人"> </el-table-column>
                <el-table-column prop="telephone" label="联系电话"> </el-table-column>
                <el-table-column label="行驶证照片">
                    <template slot-scope="scope">
                        <el-image
                            style="width: 30px; height: 30px"
                            src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2942945378,442701149&fm=26&gp=0.jpg"
                            :preview-src-list="[
                                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2942945378,442701149&fm=26&gp=0.jpg'
                            ]"
                        >
                            <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                            查看历史订单
                        </el-button>
                        <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                            查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <br />
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"> </el-pagination>
        </el-tabs>
        <orderMask ref="orderMask" :vehicleId="vehicleId"></orderMask>
    </div>
</template>

<script>
import orderMask from "./mask/order_mask"
export default {
    components: {
        orderMask
    },
    data() {
        return {
            form: {
                plateNumber: ''
            },
            title: '',
            total: null,
            page: 1,
            pageSize: 10,
            tableData: [],
            /*
             * A未提交
             * B待审核
             * C通过
             * R拒绝
             */
            data_detail: '',
            options: [
                {
                    value: 'A',
                    label: '未提交'
                },
                {
                    value: 'B',
                    label: '待审核'
                },
                {
                    value: 'C',
                    label: '通过'
                },
                {
                    value: 'R',
                    label: '拒绝'
                }
            ],
            options_value: 'C',
            vehicleId: ""
        };
    },
    methods: {
        reset() {
            this.form.plateNumber = '';
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
            this.$http
                .post(this.$config.ajax_url + '/vehicle/getVehiclePage.html', {
                    page: this.page,
                    pageSize: this.pageSize,
                    certState: this.options_value,
                    plateNumber: this.form.plateNumber
                })
                .then((res) => {
                    if (res.data) {
                        this.tableData = res.data.rows;
                        this.total = res.data.total;
                    }
                });
        },
        deleteRow(index, rows) {
            // this.data_detail = rows[index];
            this.vehicleId = rows[index].vehicleId
            this.$refs.orderMask.qingqiu();
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
