<template>
    <div class="login-wraps1">
        <el-tabs type="border-card">
            <el-tab-pane :label="title"></el-tab-pane>
            <div id="container"></div>
        </el-tabs>
    </div>
</template>
<script>
import DataSet from '@antv/data-set';
import { Chart } from '@antv/g2';

export default {
    name: 'spectaculars',
    data() {
        return {
            title: '',
            basicColumnChartProp: {
                data: [],
                container: 'c1',
                // width: 700,
                // height: 600,
                from: {
                    type: 'z'
                }
            }
        };
    },
    methods: {
        test() {
            this.$http
                .post(this.$config.ajax_url + '/Statistical/Mileagstatistics.html', {
                    type: 'z'
                })
                .then((res) => {
                    this.basicColumnChartProp.data = JSON.stringify(res.data.data);
                    this.basicColumnChartProp.data = JSON.parse(
                        this.basicColumnChartProp.data.replace(/createTime/g, 'year').replace(/sundistance/g, 'value')
                    );
                    let data = [];
                    res.data.data.forEach((item, i) => {
                        var obj = {
                            year: String,
                            value: Number
                        };
                        obj.year = item.createTime + ' ';
                        obj.value = item.sundistance;
                        data.push(obj);
                    });
                    const ds = new DataSet();
                    const dv = ds.createView().source(data);
                    dv.transform({
                        type: 'map',
                        callback: (row) => {
                            row.year = parseInt(row.year, 10);
                            return row;
                        }
                    }).transform({
                        type: 'regression',
                        method: 'polynomial',
                        fields: ['year', 'value'],
                        bandwidth: 0.1,
                        as: ['Year', 'Value']
                    });
                    const chart = new Chart({
                        container: 'container',
                        autoFit: true,
                        height: 500,
                        padding: [20, 40]
                    });
                    chart.scale({
                        Year: {
                            range: [0, 1]
                        },
                        value: {
                            alias: '车辆里程统计(KM)',
                            sync: true,
                            nice: true
                        },
                        Value: {
                            sync: true,
                            nice: true
                        }
                    });
                    chart.axis('year', {
                        tickLine: null
                    });
                    const view1 = chart.createView();
                    view1.data(data);
                    view1.interval().position('year*value').style({
                        fillOpacity: 1
                    });
                    chart.render();
                });
        }
    },
    mounted() {
        this.title = this.$route.meta.title;
        this.test();
    }
};
</script>
