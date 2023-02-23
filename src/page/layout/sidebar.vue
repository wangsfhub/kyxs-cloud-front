<template>
    <div class="sidebar-container" :class="{'is-active':isCollapse}">
        <logo :isCollapse="isCollapse"></logo>
        <div class="out-menu">
            <div class="inner-menu">
                <el-menu unique-opened = "true"
                         default-active="2"
                         class="el-menu-vertical-demo"
                         :collapse="isCollapse">
                    <el-sub-menu v-for="(item,index) in localMenu" :key="item.id" :index="index">
                        <template #title>
                            <el-icon><location /></el-icon>
                            <span>{{ item.label }}</span>
                        </template>
                        <!-- 此处调用menu-item组件 -->
                        <sidebar-item :menuData="item.children"></sidebar-item>
                    </el-sub-menu>
                </el-menu>
            </div>
        </div>
    </div>
</template>
<script>
    import SidebarItem from './sidebarItem.vue'
    import demo from '@/menus/demo/index';
    import { ref } from 'vue'
    export default {
        name: "left",
        components:{
            SidebarItem
        },
        props:{
            isCollapse: {
                type: Boolean,
            },
        },
        data(){
            return{
                localMenu:[]
            }
        },
        created() {
            let newMenusArray = demo;
            this.localMenu = newMenusArray
            //let menuData = deepCopy(newMenusArray)
            //this.$store.commit('SET_MENU', newMenusArray);
        },
        methods:{

        }
    }

</script>

<style lang="scss" scoped>
    .el-menu{
        border-right: none;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        border-right: none;
    }
    /* for Chrome */
    .inner-menu::-webkit-scrollbar {
        display: none;
    }

</style>
