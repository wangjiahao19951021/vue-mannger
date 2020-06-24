<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">用户登录</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="param.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="password"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="circ">
                    <el-input
                        type="text"
                        placeholder="请输入验证码"
                        v-model="param.circ"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                    <canvas
                        class="mycanvas"
                        width="80"
                        height="40"
                        @click="fourCode(values)"
                    >抱歉，您的浏览器不支持canvas元素，换个浏览器试试？</canvas>
                </el-form-item>

                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <p class="login-tips">河北集宗科技有限公司&nbsp;版权所有</p>
            </el-form>
        </div>
    </div>
</template>

<script>
// import AES from "../../../commonjs/aes/aes"

import { mapActions } from 'vuex';
export default {
    name: 'codetest',
    data() {
        return {
            param: {
                username: '17700008851',
                password: '123456',
                circ: '1234'
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                circ: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
            },
            value: '',
            code: '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
            values: ''
        };
    },
    methods: {
        ...mapActions(['addGoodInCar']),
        submitForm() {
            let that = this;
            if (this.param.username == '') {
                this.$message.error('请输入用户名');
                return;
            }
            if (this.param.password == '') {
                this.$message.error('请输入密码');
                return;
            }
            if (this.param.circ == '') {
                this.$message.error('请输入验证码');
                return;
            }
            // if (this.param.circ !== this.values ) {
            //     this.$message.error("验证码错误");
            //     return
            // }
            let mobile, password;
            this.$http
                .post('/api/canggang/manager/login', {
                // .post('http://192.168.124.9:80/canggang/manager/login?password=4M8S3C2Rm%2BIBPe6Yh0Ll8w==&mobile=17700008851', {
                    mobile: this.param.username,
                    password: this.$AES.Encrypt(this.param.password)
                }, {
                    withCredentials: true
                })
                .then(res => {
                   console.log(document.cookie)
                    if (res.data.message == 'success') {
                        let mes = res.data.message;
                        this.$http.get('/static/json/menu.json', {}).then(res => {
                            if (res.data) {
                                that.addGoodInCar(mes);
                                sessionStorage.setItem('menu', JSON.stringify(res.data));
                                this.$message.success('登录成功');
                                this.$router.push('/');
                            }
                        });
                    } else {
                        this.$message.error(res.data.message);
                        console.log('error submit!!');
                        return false;
                    }
                });
        },

        randomColor() {
            //得到随机的颜色值
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        },
        fourCode(values) {
            this.value = values;
            for (let a = 0; a < 4; a++) {
                this.value += this.code1();
            }
            this.doDraw();
        },
        code1() {
            let index = Math.floor(Math.random() * (this.code.length - 1) + 1);
            return this.code[index];
        },
        doDraw() {
            var x = 20;
            var y = 20 + Math.random() * 8;
            var deg = (Math.random() * 30 * Math.PI) / 180;
            //  获取canvas
            var canvas = document.getElementsByClassName('mycanvas');
            canvas[0].width = canvas[0].width; //清空画布
            canvas[0].height = canvas[0].height;
            var canvas_width = canvas[0].width;
            var canvas_height = canvas[0].height;
            var context = canvas[0].getContext('2d');
            context.font = 'bold 23px 微软雅黑';
            context.fillText(this.value, 15, 30);
            context.translate(x, y); //canvas原点的偏移量
            context.rotate(deg); //旋转度数
            context.fillStyle = this.randomColor(); //设置颜色
            context.strokeStyle = this.randomColor(); //设置颜色
            context.rotate(-deg);
            context.translate(-x, -y);
            for (var i = 0; i <= 15; i++) {
                //验证码上显示线条
                context.strokeStyle = this.randomColor(); //轮廓风格
                context.beginPath();
                context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
                context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
                context.stroke();
            }
            for (var i = 0; i <= 30; i++) {
                //验证码上显示小点
                context.strokeStyle = this.randomColor();
                context.beginPath(); //新建一条路径
                var x = Math.random() * canvas_width;
                var y = Math.random() * canvas_height;
                context.moveTo(x, y); //吧画笔移动到指定位置
                context.lineTo(x + 1, y + 1); //想指定位置移动
                context.stroke();
            }
        }
    },
    mounted() {
        let values = this.values;
        this.fourCode(values);
    },
    created() {
        // console.log(this.$store.state.cars[0])
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    /* background: url(../../../assets/img/login_background.36d22693.jpg) no-repeat; */
    /* background-size: 100%; */
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #666666;
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.8);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #666666;
}

.mycanvas {
    border: 1px solid rgb(199, 198, 198);
    border-radius: 20%;
}
</style>