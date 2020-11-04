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
                        </template>
                    </el-table-column>
                    <el-table-column type="index" width="50" label="序号" :index="indexMethod"> </el-table-column>
                    <el-table-column prop="custName" label="收货方"> </el-table-column>
                    <el-table-column prop="provName,cityName,areaName,address" label="地址">
                        <!-- 使用作用域插槽，可以获取这一行返回的数据 -->
                        <template slot-scope="scope">
                            {{ scope.row.provName }}{{ scope.row.cityName }}{{ scope.row.areaName }}{{ scope.row.address }}</template
                        >
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
            <el-tab-pane label="添加店铺">
                <el-form ref="form" :model="add" label-width="100px" :label-position="labelPosition">
                    <el-form-item label="添加收货方">
                        <el-input v-model="add.address" placeholder="请输入收货方"></el-input>
                    </el-form-item>
                    <el-form-item label="所属市区">
                        <el-cascader
                            v-model="add.value"
                            :options="area_options"
                            :props="{ expandTrigger: 'hover' }"
                            @change="handleChange"
                        ></el-cascader>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
        <shopDetail ref="shopDetail"></shopDetail>
    </div>
</template>

<script>
import shopDetail from './mask/shop_detail';
export default {
    components: {
        shopDetail
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
                address: '',
                value: []
            },
            area_options: []
        };
    },
    methods: {
        handleChange(value) {
            console.log(value);
        },
        reset() {
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
                    let arr = [];
                    let arr1 = []
                    res.data.data.forEach((element, i) => {
                        var obj = {};
                        obj.label = element.name;
                        obj.value = element.code;
                        element.childList.forEach((element1, i1) => {
                            var obj1 = {}
                            obj1.label = element1.name;
                            obj1.value = element1.code;
                            arr1.push(obj1);
                        })
                        obj.children = arr1;
                        arr.push(obj);
                    });
                    this.area_options = arr
                }
            });
        }
    },
    mounted() {
        this.title = this.$route.meta.title;
    },
    created() {
        this.qingqiu();
        this.area_address();
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
