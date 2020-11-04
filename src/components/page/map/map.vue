<template>
    <div class="login-wraps1">
        <el-tabs type="border-card">
            <el-tab-pane :label="title"></el-tab-pane>
            <div class="test">
                <div id="container"></div>
                <!-- <div class="input-card">
                    <h4>轨迹回放控制</h4>
                    <div class="input-item">
                        <input type="button" class="btn" value="开始动画" id="start" @click="startAnimation" />
                        <input type="button" class="btn" value="暂停动画" id="pause" @click="pauseAnimation" />
                    </div>
                    <div class="input-item">
                        <input type="button" class="btn" value="继续动画" id="resume" @click="resumeAnimation" />
                        <input type="button" class="btn" value="停止动画" id="stop" @click="stopAnimation" />
                    </div>
                </div> -->
            </div>
            <br />
            <el-row style="text-align: center;">
                <el-button type="primary" @click="standard">查看标准图</el-button>
                <el-button type="primary" @click="satellite">查看卫星图</el-button>
            </el-row>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="运输中订单" name="first">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="订单编号">
                                        <span>{{ props.row.demindNum }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="状态">
                                        <span>{{ props.row.state == 'W' ? '未开始' : props.row.state == 'D' ? '已开始' : '已结束' }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="收货方名称">
                                        <span>{{ props.row.custName }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="车辆">
                                        <span>{{ props.row.plateNumber }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="联系电话(司机)">
                                        <span>{{ props.row.telephone }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="货物名称">
                                        <span>{{ props.row.goodsName }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="下单日期">
                                        <span>{{ props.row.createTime }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="运输时间">
                                        <span>{{ props.row.deliveryDate }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="接单时间">
                                        <span>{{ props.row.beginTime }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="签收时间">
                                        <span>{{ props.row.endTime }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column type="index" width="50" label="序号" :index="indexMethod"> </el-table-column>
                        <el-table-column prop="demindNum" label="订单编号"> </el-table-column>
                        <el-table-column prop="plateNumber" label="运输车辆"> </el-table-column>
                        <el-table-column prop="goodsName" label="货物名称"> </el-table-column>
                        <el-table-column prop="deliveryDate" label="运输时间"> </el-table-column>
                        <el-table-column fixed="right" label="操作">
                            <template slot-scope="scope">
                                <el-button @click.native.prevent="car_datail(scope.$index, tableData)" type="text" size="small">
                                    查看轨迹
                                </el-button>
                                <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                                    查看详情
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br />
                    <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange">
                    </el-pagination>
                </el-tab-pane>
                <el-tab-pane label="历史订单" name="second">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column type="expand">
                            <template slot-scope="props">
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="订单编号">
                                        <span>{{ props.row.demindNum }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="状态">
                                        <span>{{ props.row.state == 'W' ? '未开始' : props.row.state == 'D' ? '已开始' : '已结束' }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="收货方名称">
                                        <span>{{ props.row.custName }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="车辆">
                                        <span>{{ props.row.plateNumber }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="联系电话(司机)">
                                        <span>{{ props.row.telephone }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="货物名称">
                                        <span>{{ props.row.goodsName }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="下单日期">
                                        <span>{{ props.row.createTime }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="运输时间">
                                        <span>{{ props.row.deliveryDate }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="接单时间">
                                        <span>{{ props.row.beginTime }}</span>
                                    </el-form-item>
                                </el-form>
                                <el-form label-position="left" inline class="demo-table-expand">
                                    <el-form-item label="签收时间">
                                        <span>{{ props.row.endTime }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </el-table-column>
                        <el-table-column type="index" width="50" label="序号" :index="indexMethod"> </el-table-column>
                        <el-table-column prop="demindNum" label="订单编号"> </el-table-column>
                        <el-table-column prop="plateNumber" label="运输车辆"> </el-table-column>
                        <el-table-column prop="goodsName" label="货物名称"> </el-table-column>
                        <el-table-column prop="deliveryDate" label="运输时间"> </el-table-column>
                        <el-table-column fixed="right" label="操作">
                            <template slot-scope="scope">
                                <el-button @click.native.prevent="car_datail(scope.$index, tableData)" type="text" size="small">
                                    查看轨迹
                                </el-button>
                                <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                                    查看详情
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <br />
                    <el-pagination background layout="prev, pager, next" :total="total" @current-change="handleCurrentChange">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
        </el-tabs>
        <deminglistMask ref="deminglist_mask" :data_detail="data_detail"></deminglistMask>
    </div>
</template>

<script>
/*
 *你可能会遇到一个报错，当你开发人员历史轨迹的时候，你开启了张三的运动轨迹，但是在他还未停止的时候，你又查看了李四的历史轨迹，那么他会报一个错， 实际上你得在开始动画startAnimation时就停止一下上一个动画 this.marker.stopMove()。
 */
import MapLoader from '../../../commonjs/amap';
import deminglistMask from '../tanchuang/deminglist_mask';
export default {
    components: {
        deminglistMask
    },
    name: 'test',
    data() {
        return {
            map: null,
            total: null,
            marker: '',
            layers: [],
            lineArr: [],
            page: 1,
            pageSize: 10,
            tableData: [],
            bofang: 1,
            bofang_data: '播放',
            yanshiqi: '',
            title: '',
            activeName: 'first',
            state: 'W,D',
            data_detail: ''
        };
    },
    methods: {
        deleteRow(index, rows) {
            this.data_detail = rows[index];
            this.$refs.deminglist_mask.qingqiu();
        },
        handleClick(tab, event) {
            // console.log(tab, event);
            console.log(tab.name);
            if (tab.name == 'second') {
                this.page = 1
                this.state = 'E';
                this.lineArr = [];
                this.initMap();
                this.qingqiu();
            } else if (tab.name == 'first') {
                this.page = 1
                this.state = 'W,D';
                this.lineArr = [];
                this.initMap();
                this.qingqiu();
            }
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
        startAnimation() {
            this.marker.moveAlong(this.lineArr, 10000);
        },
        pauseAnimation() {
            this.marker.pauseMove();
        },
        resumeAnimation() {
            this.marker.resumeMove();
        },
        stopAnimation() {
            this.marker.stopMove();
        },
        satellite() {
            this.qingqiu();
            this.lineArr = [];
            this.layers = [new AMap.TileLayer.Satellite()];
            this.initMap();
        },
        standard() {
            this.qingqiu();
            this.lineArr = [];
            this.layers = [];
            this.initMap();
        },
        initMap() {
            MapLoader().then(
                (AMap) => {
                    this.map = null;
                    this.marker = '';
                    let cen = '';
                    if (this.lineArr.length == 0) {
                        cen = [116.397428, 39.90923];
                    } else {
                        cen = [this.lineArr[0][0], this.lineArr[0][1]];
                    }
                    this.map = new AMap.Map('container', {
                        resizeEnable: true,
                        center: cen,
                        zoom: 11,
                        layers: this.layers
                    });
                    if (this.lineArr.length == 0) {
                        return;
                    }
                    this.marker = new AMap.Marker({
                        map: this.map,
                        icon: 'https://webapi.amap.com/images/car.png',
                        offset: new AMap.Pixel(-26, -13),
                        autoRotation: true,
                        angle: -90
                    });
                    // 绘制轨迹
                    var polyline = new AMap.Polyline({
                        map: this.map,
                        path: this.lineArr,
                        showDir: true,
                        strokeColor: '#28F', //线颜色
                        // strokeOpacity: 1,     //线透明度
                        strokeWeight: 6 //线宽
                        // strokeStyle: "solid"  //线样式
                    });
                    var passedPolyline = new AMap.Polyline({
                        map: this.map,
                        // path: lineArr,
                        strokeColor: '#AF5', //线颜色
                        strokeOpacity: 1, //线透明度
                        strokeWeight: 6, //线宽
                        strokeStyle: 'solid' //线样式
                    });
                    this.marker.on('moving', function (e) {
                        passedPolyline.setPath(e.passedPath);
                    });
                    this.map.setFitView();
                },
                (e) => {
                    console.log('地图加载失败', e);
                }
            );
        },
        car_datail(index, rows) {
            /*
             *  /demindInfo/selectCarLineMore.html
             *  demindId: 80
             */
            clearTimeout(this.yanshiqi);
            this.$http
                .post(this.$config.ajax_url + '/demindInfo/selectCarLineMore.html', {
                    page: this.page,
                    pageSize: this.pageSize,
                    demindId: rows[index].demindId
                })
                .then((res) => {
                    if (res.data.success) {
                        let line = res.data.data[0].vehicleLine;
                        this.lineArr = [];
                        if (line.length > 0) {
                            for (var i = 0; i < line.length; i++) {
                                this.lineArr.push([line[i].longitude, line[i].latitude]);
                            }
                            this.initMap();
                            this.yanshiqi = setTimeout(() => {
                                this.marker.moveAlong(this.lineArr, 100000);
                            }, 1000);
                        } else {
                            this.$message({
                                showClose: true,
                                message: '暂无数据',
                                type: 'error'
                            });
                            this.initMap();
                        }
                    }
                });
        },
        qingqiu() {
            /*
             *  /demindInfo/getOrderPage.html
             *   state: E
             *   pageSize: 10
             *   page: 1
             */
            this.$http
                .post(this.$config.ajax_url + '/demindInfo/getOrderPage.html', {
                    page: this.page,
                    pageSize: this.pageSize,
                    state: this.state
                })
                .then((res) => {
                    if (res.data) {
                        this.tableData = res.data.rows;
                        this.total = res.data.total;
                    }
                });
        }
    },
    mounted() {
        /*
         *  在地图scripts引入之后
         */
        this.initMap();
        this.title = this.$route.meta.title;
    },
    created() {
        this.qingqiu();
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
#container {
    width: 100%;
    height: 50vh;
}
.input-card .btn {
    margin-right: 1.2rem;
    width: 9rem;
}

.input-card .btn:last-child {
    margin-right: 0;
}
</style>