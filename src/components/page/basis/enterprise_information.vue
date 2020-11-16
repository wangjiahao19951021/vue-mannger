<template>
<div class="login-wraps1">
    <el-tabs type="border-card">
        <el-tab-pane :label="title">
            <el-form ref="add" :model="add" label-width="120px" :label-position="labelPosition" :rules="rules">
                <el-form-item label="添加商品" prop='custName'>
                    <el-input v-model="add.custName" placeholder="请输入商品名称"></el-input>
                </el-form-item>
                <el-form-item label="货物级别" prop='radio'>
                    <el-radio v-model="add.radio" label="1">一级货物</el-radio>
                </el-form-item>
                <el-form-item label="展示顺序" prop='listOrder'>
                    <el-input v-model="add.listOrder" placeholder="请输入展示顺序" type="number"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="add_shop">添 加</el-button>
                    <el-button @click="add_reset">重 置</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
    <selectMap ref="selectMap"></selectMap>
</div>
</template>

<script>
import selectMap from './mask/select_map';
import Bus from '../../common/bus/bus';
export default {
    components: {
        selectMap
    },
    data() {
        return {
            labelPosition: 'left',
            form: {
                custName: ''
            },
            title: '',
            add: {
                custName: "",
                listOrder: "",
                radio: "1"
            },
            area_options: [],
            rules: {
                custName: [{
                    required: true,
                    message: '请输入商品名称',
                }],
                radio: [{
                    required: true,
                    message: '请输入商品名称',
                }],
                listOrder: [{
                    required: true,
                    message: '请输入展示顺序',
                }],
            }
        };
    },
    methods: {
        handleChange(value) {
            console.log(value);
        },
        add_reset() {
            this.add.custName = '';
            this.add.listOrder = '';
            this.$refs.add.resetFields();
        },
        add_shop() {
            this.$refs.add.validate((valid) => {
                if (valid) {
                    /*
                     *      /goods/addGoods.html
                     *      goodsName: 测试
                     *      parentId: 
                     *      goodsLevel: 1
                     *      listOrder: 2
                     */
                    this.$http
                        .post(this.$config.ajax_url + '/goods/addGoods.html', {
                            goodsName: this.add.custName,
                            goodsLevel: this.add.radio,
                            listOrder: this.add.listOrder,
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
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        selectMap() {
            this.$refs.selectMap.qingqiu();
            Bus.$on('address_map', (result) => {
                this.add.address = result.address;
                this.add.longitude = result.longitude;
                this.add.latitude = result.latitude;
            });
        },
    },
    mounted() {
        this.title = this.$route.meta.title;
    },
    created() {}
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
