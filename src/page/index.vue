<template>
    <div class="pull-height animated">
        <div class="nav">
            <Top class="top" :isCollapse.sync="isCollapse" @switchCollapse="switchCollapse"/>
        </div>
        <div class="index">
<!--            <sidebar class="left" :isCollapse.sync="isCollapse" />-->
            <Menu :isCollapse="isCollapse" class="left hidden-xs-only" />
            <div class="right">
                <div class="main">
                    <div class="router">
                        <router-view/>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
    import Top from './layout/top.vue'
    // import Sidebar from './layout/sidebar.vue'
    import Menu from "./menu/index.vue"
    import {ref} from 'vue'
    const isCollapse = ref(false)
    const switchCollapse = () =>{
        isCollapse.value = isCollapse.value?false:true;
    }
</script>

<style lang="scss" scoped>
.index {
     display: flex;
     position: relative;
     height: calc(100vh - 65px);
     overflow: hidden;
    .left {
        width: 200px;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        margin-top: 0px;
        border-right: 1px solid var(--left-border-right-background);
    }
    .left:before{
        content:"";
        position: absolute;
        top: 0;
        right: 0;
        width: 1px;
        height: 100%;
        z-index: 10;
    }
    .left.is-active:before{
        content:"";
        position: absolute;
        top: 0;
        right: 0;
        width: 1px;
        height: 100%;
    }
    .right {
        position: relative;
        height: 100%;
        box-sizing: border-box;
        overflow: hidden;
        flex: 1;
    }
    .main {
        height: 100%;
        background: var(--main-background);
        box-sizing: border-box;
        overflow-y: auto;
        .router {
            margin: 10px;
            background: var(--router-background);
            min-height: calc(100% - 20px);
            height: auto;
            overflow: auto;
            border-radius: 5px;
            box-sizing: border-box;
        }
    }
    .nav {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 12;
        box-shadow: 0 0 1px rgba(0,0,0,0.25);
    }

}
</style>