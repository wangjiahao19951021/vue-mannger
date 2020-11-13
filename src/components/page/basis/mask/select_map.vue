<template>
<el-dialog title="详细地址" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" append-to-body>
    <el-form ref="form" :inline="true" class="demo-form-inline" :rules="rules" :model="form">
        <el-form-item label="请输入详细地址" prop="address">
            <el-input v-model="form.address" placeholder="请输入详细地址" clearable id="tipinput"></el-input>
        </el-form-item>
    </el-form>
    <div id="container"></div>
    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="determine">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
import Bus from "../../../common/bus/bus"
import MapLoader from '../../../../commonjs/amap';
export default {
    data() {
        return {
            dialogVisible: false,
            labelPosition: 'left',
            data_detail: {},
            form: {
                address: "",
                longitude: "",
                latitude: ""
            },
            rules: {
                address: [{
                    required: true,
                    message: '请输入详细地址',
                }],
            }
        };
    },
    methods: {
        handleClose() {
            this.dialogVisible = false;
        },
        determine() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    if (this.form.longitude == "" || this.form.latitude == "") {
                        this.$message({
                            showClose: true,
                            message: '请点击地图选择坐标',
                            type: 'error'
                        });
                        return;
                    }
                    Bus.$emit("address_map", this.form)
                    this.handleClose()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        show() {
            this.dialogVisible = true;
        },
        qingqiu(val) {
            if (this.dialogVisible == false) {
                this.show();
                this.initMap();
                this.form.address = ""
                this.form.longitude = ""
                this.form.latitude = ""
            }
        },
        initMap() {
            MapLoader().then(
                (AMap) => {
                    let that = this
                    //地图加载
                    var map = new AMap.Map('container', {
                        resizeEnable: true
                    });
                    //输入提示
                    var autoOptions = {
                        input: "tipinput"
                    };
                    var auto = new AMap.Autocomplete(autoOptions);
                    var placeSearch = new AMap.PlaceSearch({
                        map: map
                    }); //构造地点查询类
                    AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
                    function select(e) {
                        placeSearch.setCity(e.poi.adcode);
                        placeSearch.search(e.poi.name); //关键字查询查询
                    }
                    AMap.plugin(['AMap.ToolBar'], function () {
                        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
                        map.addControl(
                            new AMap.ToolBar({
                                // 简易缩放模式，默认为 false
                                liteStyle: true
                            })
                        );
                    });
                    AMap.event.addListener(map, "click", function (e) {
                        map.clearMap();
                        that.form.longitude = e.lnglat.lng
                        that.form.latitude = e.lnglat.lat
                        new AMap.Marker({
                            position: e.lnglat,
                            map: map
                        });
                    });
                },
                (e) => {
                    console.log('地图加载失败', e);
                }
            );
        }
    },
    mounted() {}
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

#container {
    width: 100%;
    height: 50vh;
}

.amap-sug-result {
    z-index: 99999;
}
</style>
