<template>
    <div class="login-wraps1">
        <el-tabs type="border-card" shadow="always">
            <el-tab-pane :label="title"></el-tab-pane>
            <el-form ref="form" :model="form" label-width="100px" :label-position="labelPosition">
                <el-form-item label="运输日期">
                    <el-date-picker
                        v-model="form.data_value"
                        type="date"
                        placeholder="选择日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        style="width: 100%;"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="添加运费">
                    <el-input v-model="form.money" placeholder="请输入运费" type="number"><i slot="prefix" class="el-input__icon el-icon-money"></i></el-input>
                </el-form-item>
                <el-form-item label="选择收货方">
                    <el-input v-model="form.cust_name" :disabled="true" placeholder="请选择收货方">
                        <i slot="prefix" class="el-input__icon el-icon-position"></i>
                        <el-button slot="append" type="primary" icon="el-icon-position" @click="select2">选择</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="选择车辆">
                    <el-input v-model="form.plate_number" :disabled="true" placeholder="请选择车辆">
                        <i slot="prefix" class="el-input__icon el-icon-check"></i>
                        <el-button slot="append" type="primary" icon="el-icon-check" @click="select1">选择</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="选择货物">
                    <el-input v-model="form.goods" :disabled="true" placeholder="请选择货物">
                        <i slot="prefix" class="el-input__icon el-icon-shopping-cart-2"></i>
                        <el-button type="primary" slot="append" icon="el-icon-shopping-cart-2" @click="select3">选择</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label="添加备注">
                    <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="form.remark"> </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即发布</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-tabs>
        <selectPer ref="selectPer"></selectPer>
        <selsectAddress ref="selsectAddress"></selsectAddress>
        <selectGoods ref="selectGoods"></selectGoods>
    </div>
</template>

<script>
import selectPer from '../tanchuang/selectPer';
import selsectAddress from '../tanchuang/selsectAddress';
import selectGoods from '../tanchuang/selectGoods';
import Bus from '../../common/bus/bus';

export default {
    components: {
        selectPer,
        selsectAddress,
        selectGoods
    },
    data() {
        return {
            labelPosition: 'left',
            title: '',
            form: {
                data_value: '',
                money: '',
                remark: '',
                plate_number: '',
                plate_number_id: '',
                cust_name: '',
                cust_name_id: '',
                goods: '',
                goods_id: '',
                goods_num: '',
                goods_unit: ''
            }
        };
    },
    methods: {
        onSubmit() {
            if (this.form.data_value == '') {
                this.$message({
                    showClose: true,
                    message: '请选择日期',
                    type: 'error'
                });
                return;
            }
            if (this.form.money == '') {
                this.$message({
                    showClose: true,
                    message: '请输入运费',
                    type: 'error'
                });
                return;
            }
            if (this.form.plate_number == '') {
                this.$message({
                    showClose: true,
                    message: '请选择车辆',
                    type: 'error'
                });
                return;
            }
            if (this.form.cust_name == '') {
                this.$message({
                    showClose: true,
                    message: '请选择收货方',
                    type: 'error'
                });
                return;
            }
            if (this.form.goods == '') {
                this.$message({
                    showClose: true,
                    message: '请选择货物',
                    type: 'error'
                });
                return;
            }
            /*
             *  deliveryDate: 2020-11-02
             *  vehicleId: 11
             *  demindCustStr: 27
             *  demindGoodsStr: 1
             *  goodsCount: 1200
             *  goodsPriceUnit: A
             *  fare: 1000
             *  remark:
             */
            this.$http
                .post(this.$config.ajax_url + '/demindInfo/addDemind.html', {
                    deliveryDate: this.form.data_value,
                    vehicleId: this.form.plate_number_id,
                    demindCustStr: this.form.cust_name_id,
                    demindGoodsStr: this.form.goods_id,
                    goodsCount: this.form.goods_num,
                    goodsPriceUnit: this.form.goods_unit,
                    fare: this.form.money,
                    remark: this.form.remark
                })
                .then((res) => {
                    if (res.data.success) {
                        this.$alert('添加成功', '成功', {
                            confirmButtonText: '确定',
                            type: 'success',
                            callback: (action) => {
                                this.reset();
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
        select1() {
            this.$refs.selectPer.qingqiu();
            Bus.$on('plateNumber', (result) => {
                this.form.plate_number = result.plateNumber;
                this.form.plate_number_id = result.vehicleId;
            });
        },
        select2() {
            this.$refs.selsectAddress.qingqiu();
            Bus.$on('custName', (result) => {
                this.form.cust_name = result.custName;
                this.form.cust_name_id = result.custId;
            });
        },
        select3() {
            this.$refs.selectGoods.qingqiu();
            Bus.$on('goods', (result) => {
                this.form.goods = result.selectedWorkName.goodsName + ' ' + result.num + ' ' + result.selectedWorkNames.label;
                this.form.goods_id = result.selectedWorkName.goodsId;
                this.form.goods_num = result.num;
                this.form.goods_unit = result.selectedWorkNames.value;
            });
        },
        reset() {
            this.form.data_value = '';
            this.form.money = '';
            this.form.remark = '';
            this.form.plate_number = '';
            this.form.cust_name = '';
            this.form.goods = '';
        }
    },
    mounted() {
        this.title = this.$route.meta.title;
    },
    created() {}
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
