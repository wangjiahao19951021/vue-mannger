<template>
    <div class="login-wraps1">
        <el-tabs type="border-card" shadow="always">
            <el-tab-pane :label="title"></el-tab-pane>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="运输日期">
                    <el-date-picker v-model="form.data_value" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="选择车辆">
                    <el-col :span="8">
                        <el-input v-model="form.car" :disabled="true"></el-input>
                    </el-col>
                    <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogVisible = true">选择</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">立即发布</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </el-tabs>

        <el-dialog title="选择车辆" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>选择车辆</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            title: '',
            dialogVisible: false,
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
