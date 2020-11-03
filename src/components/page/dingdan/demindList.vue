<template>
    <div class="login-wraps1">
        <el-tabs type="border-card">
            <el-tab-pane :label="title"></el-tab-pane>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item>
                    <el-date-picker
                        v-model="formInline.value"
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
                            <el-form-item label="订单编号">
                                <span>{{ props.row.demindNum }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="状态">
                                <span>{{ props.row.state == 'W' ? '未开始' : props.row.state == 'D' ? '已开始' : '已结束' }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="收货方名称">
                                <span>{{ props.row.custName }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="车辆">
                                <span>{{ props.row.plateNumber }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="联系电话(司机)">
                                <span>{{ props.row.telephone }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="货物名称">
                                <span>{{ props.row.goodsName }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="下单日期">
                                <span>{{ props.row.createTime }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="运输时间">
                                <span>{{ props.row.deliveryDate }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="接单时间">
                                <span>{{ props.row.beginTime }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="签收时间">
                                <span>{{ props.row.endTime }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column type="index" width="50" label="序号" :index="indexMethod"> </el-table-column>
                <el-table-column prop="demindNum" label="订单编号"> </el-table-column>
                <el-table-column prop="custName" label="收货方名称"> </el-table-column>
                <el-table-column prop="plateNumber" label="车辆"> </el-table-column>
                <el-table-column prop="state" label="状态">
                    <template slot-scope="scope">
                        {{ scope.row.state == 'W' ? '未开始' : scope.row.state == 'D' ? '已开始' : '已结束' }}</template
                    >
                </el-table-column>
                <el-table-column prop="telephone" label="联系电话(司机)"> </el-table-column>
                <el-table-column prop="deliveryDate" label="运输时间"> </el-table-column>
                <el-table-column prop="beginTime" label="接单时间"> </el-table-column>
                <el-table-column prop="endTime" label="签收时间"> </el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                            查看详情
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <br />
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange"> </el-pagination>
        </el-tabs>
        <deminglistMask ref="deminglist_mask" :data_detail="data_detail"></deminglistMask>
    </div>
</template>

<script>
import bus from '../../common/bus/bus';
import deminglistMask from '../tanchuang/deminglist_mask';
export default {
    components: {
        deminglistMask
    },
    data() {
        return {
            formInline: {
                value: []
            },
            title: '',
            total: null,
            page: 1,
            pageSize: 10,
            tableData: [],
            /*
             * W未开始D已开始E已结束C已取消 非空
             */
            state: 'W,D',
            data_detail: ''
        };
    },
    methods: {
        reset() {
            this.formInline.value = [];
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
            if (this.formInline.value == null) {
                this.formInline.value = [];
            }
            if (this.formInline.value[0] == undefined) {
                this.formInline.value[0] = '';
            }
            if (this.formInline.value[1] == undefined) {
                this.formInline.value[1] = '';
            }
            this.$http
                .post(this.$config.ajax_url + '/demindInfo/getOrderPage.html', {
                    page: this.page,
                    pageSize: this.pageSize,
                    state: this.state,
                    qbeginTime: this.formInline.value[0],
                    qendTime: this.formInline.value[1]
                })
                .then((res) => {
                    if (res.data) {
                        this.tableData = res.data.rows;
                        this.total = res.data.total;
                    }
                });
        },
        deleteRow(index, rows) {
            this.data_detail = rows[index];
            this.$refs.deminglist_mask.qingqiu();
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
