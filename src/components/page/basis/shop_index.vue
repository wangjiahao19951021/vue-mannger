<template>
<div class="login-wraps1">
    <el-tabs type="border-card">
        <el-tab-pane :label="title">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                    <el-input v-model="form.custName" placeholder="请输入收货方名称" clearable></el-input>
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
                            <el-form-item label="收货方">
                                <span>{{ props.row.custName }}</span>
                            </el-form-item>
                        </el-form>
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-form-item label="地址">
                                <span>{{ props.row.provName + props.row.cityName + props.row.areaName + props.row.address }}</span>
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
                            <el-form-item label="创建时间">
                                <span>{{ props.row.createTime }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column type="index" width="50" label="序号" :index="indexMethod"> </el-table-column>
                <el-table-column prop="custName" label="收货方"> </el-table-column>
                <el-table-column prop="provName,cityName,areaName,address" label="地址">
                    <!-- 使用作用域插槽，可以获取这一行返回的数据 -->
                    <template slot-scope="scope">
                        {{ scope.row.provName }}{{ scope.row.cityName }}{{ scope.row.areaName }}{{ scope.row.address }}</template>
                </el-table-column>
                <el-table-column prop="contacts" label="联系人"> </el-table-column>
                <el-table-column prop="telephone" label="联系电话"> </el-table-column>

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
    </el-tabs>
    <shopDetail ref="shopDetail"></shopDetail>
    <selectMap ref="selectMap"></selectMap>
</div>
</template>

<script>
import shopDetail from './mask/shop_detail';
import selectMap from './mask/select_map';
import Bus from '../../common/bus/bus';
export default {
    components: {
        shopDetail,
        selectMap
    },
    data() {
        return {
            labelPosition: 'left',
            form: {
                custName: ''
            },
            title: '',
            total: null,
            page: 1,
            pageSize: 10,
            tableData: [],
            add: {
                custName: '',
                value: [],
                address: '',
                longitude: '',
                latitude: '',
                telephone: '',
                contacts: ''
            },
            area_options: []
        };
    },
    methods: {
        add_reset() {
            this.add.custName = '';
            this.add.address = '';
            this.add.longitude = '';
            this.add.latitude = '';
            this.add.telephone = '';
            this.add.contacts = '';
            this.add.value = [];
        },
        add_shop() {
            if (this.add.custName == '') {
                this.$message({
                    showClose: true,
                    message: '请输入收货方',
                    type: 'error'
                });
                return;
            }
            if (this.add.value == [] || this.add.value.length == 0) {
                this.$message({
                    showClose: true,
                    message: '请选择所属市区',
                    type: 'error'
                });
                return;
            }
            if (this.add.address == '') {
                this.$message({
                    showClose: true,
                    message: '请选择详细地址',
                    type: 'error'
                });
                return;
            }
            if (this.add.contacts == '') {
                this.$message({
                    showClose: true,
                    message: '请输入联系人',
                    type: 'error'
                });
                return;
            }
            if (this.add.telephone == '') {
                this.$message({
                    showClose: true,
                    message: '请输入联系电话',
                    type: 'error'
                });
                return;
            }
            /*
             *   /cust/addCust.html
             *   custName: 大方
             *   contacts: 23432
             *   telephone: 234234
             *   provCode: 110000
             *   cityCode: 110100
             *   areaCode: 110101
             *   address: 撒旦法
             *   longitude: 114.549153
             *   latitude: 38.047637
             */
            this.$http
                .post(this.$config.ajax_url + '/cust/addCust.html', {
                    custName: this.add.custName,
                    provCode: this.add.value[0],
                    cityCode: this.add.value[1],
                    areaCode: this.add.value[2],
                    address: this.add.address,
                    longitude: this.add.longitude,
                    latitude: this.add.latitude,
                    contacts: this.add.contacts,
                    telephone: this.add.telephone,
                })
                .then((res) => {
                    if (res.data.success) {
                        this.$alert(res.data.message, '成功', {
                            confirmButtonText: '确定',
                            type: 'success',
                            callback: (action) => {
                                this.add_reset();
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
        },
        selectMap() {
            this.$refs.selectMap.qingqiu();
            Bus.$on('address_map', (result) => {
                this.add.address = result.address;
                this.add.longitude = result.longitude;
                this.add.latitude = result.latitude;
            });
        },
        handleChange(value) {
            console.log(value);
        },
        reset() {
            3;
            this.form.custName = '';
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
                .post(this.$config.ajax_url + '/cust/getCustPage.html', {
                    page: this.page,
                    pageSize: this.pageSize,
                    custName: this.form.custName
                })
                .then((res) => {
                    if (res.data) {
                        this.tableData = res.data.rows;
                        this.total = res.data.total;
                    }
                });
        },
        orderDetail(index, rows) {
            this.$refs.shopDetail.qingqiu(rows[index]);
        },
        area_address() {
            this.$http.post('http://192.168.124.12/chengpei/areainfo/getAreaList.html', {}).then((res) => {
                if (res.data) {
                    this.area_options = JSON.stringify(res.data.data);
                    this.area_options = JSON.parse(
                        this.area_options
                        .replace(/code/g, 'value')
                        .replace(/name/g, 'label')
                        .replace(/childList/g, 'children')
                    );
                }
            });
        }
    },
    mounted() {
        this.title = this.$route.meta.title;
    },
    created() {
        this.qingqiu();
        // this.area_address();
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
