<template>
<div class="login-wraps1">
    <el-tabs type="border-card">
        <el-tab-pane :label="title">
            <el-form ref="add" :model="add" label-width="120px" :label-position="labelPosition" :rules="rules">
                <el-form-item label="添加收货方" prop='custName'>
                    <el-input v-model="add.custName" placeholder="请输入收货方"></el-input>
                </el-form-item>
                <el-form-item label="所属市区" prop='value'>
                    <el-cascader v-model="add.value" :options="area_options" :props="{ expandTrigger: 'hover' }" @change="handleChange" style="width: 100%"></el-cascader>
                </el-form-item>
                <el-form-item label="添加详细地址" prop='address'>
                    <el-input v-model="add.address" placeholder="请选择详细地址" @focus="selectMap" :readonly="true">
                    </el-input>
                </el-form-item>
                <el-form-item label="添加联系人" prop='contacts'>
                    <el-input v-model="add.contacts" placeholder="请输入联系人"></el-input>
                </el-form-item>
                <el-form-item label="添加联系电话" prop='telephone'>
                    <el-input v-model="add.telephone" placeholder="请输入联系电话"></el-input>
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
                custName: '',
                value: [],
                address: '',
                longitude: '',
                latitude: '',
                telephone: '',
                contacts: ''
            },
            area_options: [],
            rules: {
                custName: [{
                    required: true,
                    message: '请输入收货方',
                }],
                value: [{
                    required: true,
                    message: '请选择所属市区',
                }],
                address: [{
                    required: true,
                    message: '请选择详细地址',
                }],
                contacts: [{
                    required: true,
                    message: '请输入联系人',
                }],
                telephone: [{
                    required: true,
                    message: '请输入联系电话',
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
            this.add.address = '';
            this.add.longitude = '';
            this.add.latitude = '';
            this.add.telephone = '';
            this.add.contacts = '';
            this.add.value = [];
            this.$refs.add.resetFields();
        },
        add_shop() {
            this.$refs.add.validate((valid) => {
                if (valid) {
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
