<template>
    <div class="wrapper">
        <v-head></v-head>
        <v-sidebar></v-sidebar>
        <div class="content-box" :class="{'content-collapse':collapse}">
            <v-tags></v-tags>
            <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive :include="tagsList">
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </div>
    </div>
</template>

<script>
import vHead from '../header/Header.vue';
import vSidebar from '../sidebar/Sidebar';
import vTags from '../tags/Tags';
import bus from '../bus/bus';

// import {mapState} from 'vuex'
export default {
    data() {
        return {
            tagsList: [],
            collapse: false,
        };
    },
    components: {
        vHead,
        vSidebar,
        vTags
    },
    created() {
        bus.$on('collapse-content', msg => {
            this.collapse = msg;
        });

        // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
        bus.$on('tags', msg => {
            let arr = [];
            for (let i = 0, len = msg.length; i < len; i++) {
                msg[i].name && arr.push(msg[i].name);
            }
            this.tagsList = arr;
        });

        // console.log(this.$store.state.cars)

        // console.log(this.$store.state.cars[0])
    },

    mounted() {
        // this.$http.post('/api/canggang/manager/main/buildMenu',{
        //     a: 1
        // },{
        //    withCredentials: true
        // }).then(res => {
        //     // console.log(res)
        // });
        // this.$http.post(this.$config.ajax_url +  '/main/buildMenu.html', {}).then(res => {
        //         // console.log(res)
        // })
        // ceShi () {
            
                   
        // },
       
        
    },

    
};
</script>
