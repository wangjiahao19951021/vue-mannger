<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.menu">
                    <el-submenu :index="item.id" :key="item.id">
                        <template slot="title">
                            <i class="el-icon-lx-cascades"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.menu">
                            <el-submenu
                                v-if="subItem.children.length !== 0"
                                :index="subItem.id"
                                :key="subItem.id"
                            >
                                <template slot="title">
                                    <i class="el-icon-setting"></i>
                                    {{ subItem.title }}
                                </template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.children"
                                    :key="i"
                                    :index="threeItem.id"
                                >
                                    <i class="el-icon-setting"></i>
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.id" :key="subItem.id">
                                <i class="el-icon-setting"></i>
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.id" :key="item.id">
                        <i class="el-icon-setting"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../bus/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [],
            url: ""
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    },
    mounted() {
        this.items = this.$store.state.users.menus.data.data
    },
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
img{
    width: 20px;
    height: 20px;
    margin-right: 10px;
}
.el-submenu .el-menu-item{
    display: flex;
    align-items: center;
}
</style>
