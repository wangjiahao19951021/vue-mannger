<template>
    <div class="login-wraps1">
        <el-tabs type="border-card" shadow="always">
            <el-tab-pane :label="title"></el-tab-pane>
            <el-form ref="form" :model="form" label-width="100px" :label-position="labelPosition">
                <el-form-item label="运输日期">
                    <el-date-picker v-model="form.data_value" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="选择车辆">
                    <el-col :span="8">
                        <el-input v-model="form.car" :disabled="true"></el-input>
                    </el-col>
                    <el-button type="primary" icon="el-icon-check" @click="select1">选择</el-button>
                </el-form-item>
                <el-form-item label="选择收货方">
                    <el-col :span="8">
                        <el-input v-model="form.car" :disabled="true"></el-input>
                    </el-col>
                    <el-button type="primary" icon="el-icon-position" @click="select1">选择</el-button>
                </el-form-item>
                <el-form-item label="选择货物">
                    <el-col :span="8">
                        <el-input v-model="form.car" :disabled="true"></el-input>
                    </el-col>
                    <el-button type="primary" icon="el-icon-shopping-cart-2" @click="select1">选择</el-button>
                </el-form-item>
                <el-form-item label="添加备注">
                    <el-col :span="16">
                        <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="textarea"> </el-input>
                    </el-col>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即发布</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </el-tabs>
        <selectPer ref="tan1"></selectPer>
    </div>
</template>

<script>
import selectPer from '../tanchuang/selectPer';
export default {
    components: {
        selectPer
    },
    data() {
        return {
            labelPosition: 'left',
            title: '',
            form: {
                data_value: '',
                car: ''
            }
        };
    },
    methods: {
        onSubmit() {
            this.form.data_value = new Date(this.form.data_value).toLocaleDateString().replace(/\//g, '-');
            console.log(this.form.data_value);
        },
        select1() {
            this.$refs.tan1.qingqiu();
        }
    },
    mounted() {
        this.title = this.$route.meta.title;
    },
    created() {
    }
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
