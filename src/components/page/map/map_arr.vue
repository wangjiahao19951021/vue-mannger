<template>
    <div class="login-wraps1">
        <el-tabs type="border-card">
            <div class="test">
                asdf
                <div id="container"></div>
                <div class="input-card">
                    <h4>轨迹回放控制</h4>
                    <div class="input-item">
                        <input type="button" class="btn" value="开始动画" id="start" @click="startAnimation" />
                        <input type="button" class="btn" value="暂停动画" id="pause" @click="pauseAnimation" />
                    </div>
                    <div class="input-item">
                        <input type="button" class="btn" value="继续动画" id="resume" @click="resumeAnimation" />
                        <input type="button" class="btn" value="停止动画" id="stop" @click="stopAnimation" />
                    </div>
                </div>
            </div>
        </el-tabs>
    </div>
</template>



 <script>
/*
 *你可能会遇到一个报错，当你开发人员历史轨迹的时候，你开启了张三的运动轨迹，但是在他还未停止的时候，你又查看了李四的历史轨迹，那么他会报一个错， 实际上你得在开始动画startAnimation时就停止一下上一个动画 this.marker.stopMove()。
 */
import MapLoader from '../../../commonjs/amap';
export default {
    name: 'test',
    data() {
        return {
            map: null,
            marker: '',
            lineArr: [
                [116.478935, 39.997761],
                [116.478939, 39.997825],
                [116.478912, 39.998549],
                [116.478912, 39.998549],
                [116.478998, 39.998555],
                [116.478998, 39.998555],
                [116.479282, 39.99856],
                [116.479658, 39.998528],
                [116.480151, 39.998453],
                [116.480784, 39.998302],
                [116.480784, 39.998302],
                [116.481149, 39.998184],
                [116.481573, 39.997997],
                [116.481863, 39.997846],
                [116.482072, 39.997718],
                [116.482362, 39.997718],
                [116.483633, 39.998935],
                [116.48367, 39.998968],
                [116.484648, 39.999861],
            ]
        };
    },
    methods: {
        startAnimation() {
            this.marker.moveAlong(this.lineArr, 500);
        },

        pauseAnimation() {
            this.marker.pauseMove();
        },

        resumeAnimation() {
            this.marker.resumeMove();
        },

        stopAnimation() {
            this.marker.stopMove();
        }
    },
    mounted() {
        /*
         *  在地图scripts引入之后
         */
        MapLoader().then(
            (AMap) => {
                var lineArr = this.lineArr;
                console.log('地图加载成功');
                var map = new AMap.Map('container', {
                    resizeEnable: true,
                    center: [116.397428, 39.90923],
                    zoom: 15
                });
                this.marker = new AMap.Marker({
                    map: map,
                    position: [116.478935, 39.997761],
                    icon: 'https://webapi.amap.com/images/car.png',
                    offset: new AMap.Pixel(-26, -13),
                    autoRotation: true,
                    angle: -90
                });

                // 绘制轨迹
                var polyline = new AMap.Polyline({
                    map: map,
                    path: lineArr,
                    showDir: true,
                    strokeColor: '#28F', //线颜色
                    // strokeOpacity: 1,     //线透明度
                    strokeWeight: 6 //线宽
                    // strokeStyle: "solid"  //线样式
                });

                var passedPolyline = new AMap.Polyline({
                    map: map,
                    // path: lineArr,
                    strokeColor: '#AF5', //线颜色
                    strokeOpacity: 1, //线透明度
                    strokeWeight: 6, //线宽
                    strokeStyle: 'solid' //线样式
                });

                this.marker.on('moving', function (e) {
                    passedPolyline.setPath(e.passedPath);
                });

                map.setFitView();
            },
            (e) => {
                console.log('地图加载失败', e);
            }
        );
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