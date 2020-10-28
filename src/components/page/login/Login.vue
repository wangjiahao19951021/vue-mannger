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
                <div>
                    <el-form-item>
                    <el-input
                        type="text"
                        placeholder="请输入验证码"
                        v-model="param.circ"
                        @keyup.enter.native="submitForm()"
                    >
                    </el-input>
                    </el-form-item>
                    <div class="yzm_box">
                        <img :src="src" alt="" @click="qiehuan" class="yzm">
                    </div>
                </div>
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
                circ: ''
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                circ: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
            },
            value: '',
            values: '',
            src: 'http://localhost:8080/canggang/manager/captcha/login.html'
        };
    },
    methods: {
        
        ...mapActions(['addGoodInCar']),
        submitForm() {

            //             let mes = {
            //                 name: "hahah",

            //             };

            // this.$http.get('/static/json/menu.json', {}).then(res => {
            //                 if (res.data) {
            //                     this.addGoodInCar(mes);
            //                     sessionStorage.setItem('menu', JSON.stringify(res.data));
            //                     this.$message.success('登录成功');
            //                     this.$router.push('/');
            //                 }
            //             });
            //             return
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
            let mobile, password;
            this.$http
                .post('/canggang/manager/login.html', {
                // .post('http://192.168.124.9:80/canggang/manager/login?password=4M8S3C2Rm%2BIBPe6Yh0Ll8w==&mobile=17700008851', {
                    mobile: this.param.username,
                    password: this.$AES.Encrypt(this.param.password),
                    captcha: this.param.circ
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
        qiehuan () {
            this.src = 'http://localhost:8080/canggang/manager/captcha/login.html?data=' + Math.random()
        },

    },
    mounted() {
    },
    created() {
        // console.log(this.$store.state.cars[0])
         this.$http.post('/canggang/manager/captcha/getcooid.html',{
    data: {
        a: 1
    },
  },
  {
    headers: {
      "aa" : 'sessionId=' + 12313541354153 + '; recId=' + 123,
      
    }
  }).then(res => {
      console.log(res)
      document.cookie = res.data.data
      console.log(document.cookie)
  });
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
    margin-top: 20px;
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
.yzm_box{
    display: flex;
}
.yzm{
    margin: 0 auto;
}
</style>