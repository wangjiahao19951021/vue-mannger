<template>
    <el-dialog title="车辆详情" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" append-to-body>
        <el-form ref="data_detail" :model="data_detail" label-width="120px" :label-position="labelPosition">
            <el-form-item label="状态">
                <el-input v-model="sex" disabled></el-input>
            </el-form-item>
            <el-form-item label="车牌号">
                <el-input v-model="data_detail.plateNumber" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系人">
                <el-input v-model="data_detail.contacts" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="data_detail.telephone" disabled></el-input>
            </el-form-item>
            <el-form-item label="排放标准">
                <el-input v-model="data_detail.emissionStandard" disabled></el-input>
            </el-form-item>
            <el-form-item label="车辆类型">
                <el-input v-model="data_detail.vehicleType" disabled></el-input>
            </el-form-item>
            <el-form-item label="排量">
                <el-input v-model="data_detail.emissions" disabled></el-input>
            </el-form-item>
            <el-form-item label="车重">
                <el-input v-model="data_detail.weight" disabled></el-input>
            </el-form-item>
            <el-form-item label="承载吨数">
                <el-input v-model="data_detail.load" disabled></el-input>
            </el-form-item>
            <el-form-item label="行车证号">
                <el-input v-model="data_detail.license" disabled></el-input>
            </el-form-item>
            <el-form-item label="行驶证照片">
                <span
                    ><el-image
                        style="width: 30px; height: 30px"
                        :src="$img_url + data_detail.licensePhoto"
                        :preview-src-list="[
                            $img_url + data_detail.licensePhoto
                        ]"
                    >
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div> </el-image
                ></span>
            </el-form-item>
            <el-form-item label="车辆照片">
                <span
                    ><el-image
                        style="width: 30px; height: 30px"
                        :src="$img_url + data_detail.vehiclePhoto"
                        :preview-src-list="[
                            $img_url + data_detail.vehiclePhoto
                        ]"
                    >
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div> </el-image
                ></span>
            </el-form-item>
            <el-form-item label="注册时间">
                <el-input v-model="data_detail.createTime" disabled></el-input>
            </el-form-item>
            <el-form-item label="更改状态">
                <el-select v-model="data_detail.certState" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input type="textarea" :rows="2" v-model="data_detail.remark"> </el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save">保 存</el-button>
        </span>
    </el-dialog>
</template>

<script>
import Bus from "../../../common/bus/bus"
export default {
    data() {
        return {
            dialogVisible: false,
            labelPosition: 'left',
            data_detail: {},
            before_remark: "",
            before_certState: "",
            options: [
                {
                    value: 'C',
                    label: '通过'
                },
                {
                    value: 'A',
                    label: '未提交'
                },
                {
                    value: 'B',
                    label: '待审核'
                },
                {
                    value: 'R',
                    label: '拒绝'
                }
            ],
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
            this.data_detail.remark =  this.before_remark
            this.data_detail.certState =  this.before_certState
        },
        show() {
            this.dialogVisible = true;
        },
        qingqiu(val) {
            if (this.dialogVisible == false) {
                this.show();
                this.data_detail = val;
                this.before_remark = val.remark
                this.before_certState = val.certState
            }
        },
        save () {
            /*
             *  /vehicle/updateVehicle.html
             *  vehicleId: 11
             *  remark: 测试
             *  certState: R
            */
           this.$http
                .post(this.$config.ajax_url + '/vehicle/updateVehicle.html', {
                   certState: this.data_detail.certState,
                   vehicleId: this.data_detail.vehicleId,
                   remark: this.data_detail.remark,
                })
                .then((res) => {
                    if (res.data.success) {
                        this.$alert(res.data.message, '成功', {
                            confirmButtonText: '确定',
                            type: 'success',
                            callback: (action) => {
                                this.handleClose()
                                // 调用兄弟组件的方法
                                Bus.$emit('order_reivew');
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
        }
    },
    computed: {
        sex: {
            get() {
                // v-model不支持过滤器
                return this.data_detail.certState == 'A'
                    ? '未提交'
                    : this.data_detail.certState == 'B'
                    ? '待审核'
                    : this.data_detail.certState == 'C'
                    ? '通过'
                    : '拒绝';
            },
            set(val) {}
        }
    },
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
