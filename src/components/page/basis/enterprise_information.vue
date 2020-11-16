<template>
<div class="login-wraps1">
    <el-tabs type="border-card">
        <el-tab-pane :label="title">
            <el-form ref="add" :model="add" label-width="120px" :label-position="labelPosition" :rules="rules">
                <el-form-item label="公司名称" prop='factoryName'>
                    <el-input v-model="add.factoryName" placeholder="请输入公司名称" :disabled="editor"></el-input>
                </el-form-item>
                <el-form-item label="联系人姓名" prop='contacts'>
                    <el-input v-model="add.contacts" placeholder="请输入联系人姓名" :disabled="editor"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop='mobile'>
                    <el-input v-model="add.mobile" placeholder="请输入联系电话" type="number" :disabled="editor"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editors">编 辑</el-button>
                    <el-button @click="add_shop" :disabled="editor">保 存</el-button>
                </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            labelPosition: 'left',
            title: '',
            add: {
                factoryName: "",
                contacts: "",
                mobile: "",
            },
            rules: {
                factoryName: [{
                    required: true,
                    message: '请输入公司名称',
                }],
                contacts: [{
                    required: true,
                    message: '请输入联系人姓名',
                }],
                mobile: [{
                    required: true,
                    message: '请输入联系电话',
                }],
            },
            editor: true
        };
    },
    methods: {
        test() {
            const data = this.basicColumnChartProp.data;
            const chart = new G2.Chart({
                container: this.basicColumnChartProp.container,
                width: this.basicColumnChartProp.width,
                height: this.basicColumnChartProp.height
            });
            chart.source(data);
            chart.interval().position('genre*sold').color('genre')
            chart.render();
        },

        editors() {
            this.editor = false
        },
        add_shop() {
            this.$refs.add.validate((valid) => {
                if (valid) {
                    this.$http
                        .post(this.$config.ajax_url + '/updatememberInfo.html', {
                            factoryName: this.add.factoryName,
                            contacts: this.add.contacts,
                            mobile: this.add.mobile,
                        })
                        .then((res) => {
                            if (res.data.success) {
                                this.$alert(res.data.message, '成功', {
                                    confirmButtonText: '确定',
                                    type: 'success',
                                    callback: (action) => {
                                        this.editor = true
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
        information() {
            this.$http
                .post(this.$config.ajax_url + '/quermemberInfo.html', {})
                .then((res) => {
                    if (res.data.data) {
                        this.add.factoryName = res.data.data.factoryName
                        this.add.contacts = res.data.data.contacts
                        this.add.mobile = res.data.data.mobile
                    }
                });
        }
    },
    mounted() {
        this.title = this.$route.meta.title;
        this.test()

    },
    created() {
        this.information()
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
