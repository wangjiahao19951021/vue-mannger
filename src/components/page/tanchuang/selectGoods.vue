<template>
<el-dialog title="选择货物" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="货物类型" prop="value">
            <el-select placeholder="请选择货物类型" v-model="form.value" style="width: 100%" @change="showMessage($event)">
                <el-option v-for="item in form.type_options" :key="item.goodsId" :label="item.goodsName" :value="item.goodsId"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="货物数量" prop="num">
            <el-input v-model="form.num" placeholder="请输入货物数量" type="number"></el-input>
        </el-form-item>
        <el-form-item label="货物单位" prop="unit">
            <el-select placeholder="请选择货物单位" v-model="form.unit" style="width: 100%" @change="showMessages($event)">
                <el-option v-for="items in form.unit_options" :key="items.value" :label="items.label" :value="items.value"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="货物重量" prop="weights">
            <el-input v-model="form.weights" placeholder="请输入货物重量" type="number"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleDetermine('form')">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
import Bus from '../../common/bus/bus';
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                type_options: [],
                value: '',
                num: '',
                unit: '',
                selectedWorkName: "",
                selectedWorkNames: "",
                unit_options: [{
                        label: '条',
                        value: 'A'
                    },
                    {
                        label: '箱',
                        value: 'B'
                    },
                ],
                weights: ""
            },
            rules: {
                value: [{
                    required: true,
                    message: '请选择货物类型',
                }],
                num: [{
                    required: true,
                    message: '请输入货物数量',
                }],
                unit: [{
                    required: true,
                    message: '请选择货物单位',
                }],
                weights: [{
                    required: true,
                    message: '请输入货物重量',
                }],
            }
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
        },
        showMessage(e) {
            let selectedWorkName = {};
            selectedWorkName = this.form.type_options.find((item) => { //这里的chargingWorkNameList就是上面遍历的数据源
                return item.goodsId === e;
                //筛选出匹配数据，是对应数据的整个对象
            });
            this.form.selectedWorkName = selectedWorkName
        },
        showMessages(e) {
            let selectedWorkName = {};
            selectedWorkName = this.form.unit_options.find((item) => { //这里的chargingWorkNameList就是上面遍历的数据源
                return item.value === e;
                //筛选出匹配数据，是对应数据的整个对象
            });
            this.form.selectedWorkNames = selectedWorkName
        },
        show() {
            this.dialogVisible = true;
        },
        handleDetermine(form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    let data = {
                        selectedWorkName: this.form.selectedWorkName,
                        num: this.form.num,
                        selectedWorkNames: this.form.selectedWorkNames,
                        weights: this.form.weights
                    }
                    Bus.$emit('goods', data);
                    this.dialogVisible = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        qingqiu() {
            this.$http.post(this.$config.ajax_url + '/goods/getGoodsList.html', {}).then((res) => {
                if (res.data) {
                    if (this.dialogVisible == false) {
                        this.show();
                    }
                    this.form.value = '';
                    this.form.num = '';
                    this.form.unit = '';
                    this.form.weights = '';
                    this.form.type_options = res.data.data;
                    this.$refs.form.resetFields();
                }
            });
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
