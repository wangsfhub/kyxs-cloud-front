<template>
    <div class="top">
        <div class="top-button is-left">
            <div class="logo" ref="logo" style="width:200px">
               <h4>Cloud Wboot</h4>
            </div>
            <div class="tags-breadcrumb ciic-cursor-pointer "  @click="showCollapse">
                <el-icon v-if="isCollapse" ><Expand /></el-icon>
                <el-icon v-else><Fold /></el-icon>
            </div>
        </div>
        <div class="is-right">
            <el-dropdown>
                <span class="avatar-dropdown el-dropdown-link">
                    <img class="user-avatar" src="@assets/user-avatar.gif">
                    <span class="user-name">张三</span>
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>基本信息设置</el-dropdown-item>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    import { ref } from 'vue'
    export default {
        components: {},
        name: "top",
        props:{
            isCollapse: {
                type: Boolean,
            },
        },
        data() {
            return {
            };
        },
        filters: {},
        created() {
        },
        mounted() {
        },
        computed: {

        },
        methods: {
            showCollapse() {
                this.$emit('switchCollapse',this.isCollapse?false:true)
            },
        }
    }
</script>
<style>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px !important;
    }
</style>
<style lang="scss" scoped>
    .avatar-dropdown {
        margin-right: 30px;
        display: flex;
        align-content: center;
        align-items: center;
        justify-content: center;
        justify-items: center;
        .user-avatar{
            flex-shrink: 0;
            width: 40px;
            height: 40px;
            margin-left: 15px;
            cursor: pointer;
            border-radius: 50%;
        }
        .user-name{
            position: relative;
            display: flex;
            flex-shrink: 0;
            align-content: center;
            align-items: center;
            height: 40px;
            margin-left: 6px;
            line-height: 40px;
            cursor: pointer;
        }
    }
    .collapse{
        opacity: 0.5;
    }
    .el-dropdown{
        margin-right: 20px;
    }
    .el-tooltip{
        margin-right: 10px;
    }
    span+.xiala{
        margin-left: 0;
        font-size: 12px;
    }

    .pifu{
        width: 30px;
        height: 30px;
        box-sizing: border-box;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
    }
    .pifu .icon{
        font-size: 18px;
        margin: 0;
    }
    .super-navs {
        padding-left: 80px;
        display: flex;
        cursor: pointer;
    }

    .super-nav:hover {
        background: #299cfe;
        color: #ffffff;
    }

    .super-nav.is-active {
        background: #008aff;
        color: #ffffff;
    }

    .super-nav {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #008aff;
        padding: 7px 15px;
    }

    .super-nav p {
        font-size: 12px;
        line-height: 12px;
        margin-top: 8px;
    }

    .super-nav .icon {
        margin: 0;
    }

    .top {
        padding-left: 0;
    }
    .top-item{
        margin-right: 20px;
    }
    .icon {
        font-size: 30px;
        margin-top: 2px;
        margin-right: 6px;
    }

    .quanping .icon {
        font-size: 18px !important;
    }

    .setting {
        margin-left: 10px;
    }

    .setting .icon {
        font-size: 20px;
        margin-right: 0;
    }

    .user-logo {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-top: 2px;
        margin-right: 6px
    }

    .index .top {
        /*border-bottom: 1px solid #98C8FC;*/
    }

    .tags-breadcrumb {
        padding-left: 0;
    }
    .message{
        padding: 15px 10px 18px;
        width: 30px;
        position: relative;
        margin-right: 20px;
    }
    .message:hover{
        background: #eee;
        box-shadow:0px -2px 8px #ccc;
        .message-title{
            right: 0px;
            transition: .2s linear;
        }
    }
    .message:hover .pifu{
        background: #3f85ff;
        border: 1px solid #3f85ff;
    }
    .message:hover .icon{
        color: #fff;
    }
    .message .message-title{
        width: 310px;
        // padding-left: 12px;
        height:80vh;
        background: #eee;
        position: fixed;
        top: 64px;
        right:0;
        right: -310px;
        z-index: 99;
        box-shadow: -3px 0 8px #ccc;
    }
    .message .message-title .msC1{
        width: 134px;
        float: left;
        margin-top: 24px;
        color: #999;
        font-size: 16px;
    }
    .message .message-title .msC2{
        width: 102px;
        float: left;
        color: #3f85ff;
        font-size: 12px;
        border: 1px solid #3f85ff;
        height: 20px;
        text-align: center;
        line-height: 20px;
        border-radius: 20px;
        margin-top: 20px;
        cursor: pointer;
    }
    .msg-list{
        display: block;
        height:calc(100% - 40px) ;
        overflow-y: auto;
        border-radius: 8px;
        padding:0 9px;
        background: #f3f3f3;
        h2{
            font-size:16px;
            font-weight:600;
            color:rgba(51,51,51,1);
            line-height:22px;
            padding:5px 0;
        }
        li{
            padding: 20px 14px;
            display: block;
            border-bottom: 1px solid #eee;
            .t1{
                color: #8cb2f4;
                font-size: 12px;
                margin-right: 5px;
                margin-bottom: 8px;
                display: inline-block;
            }
            .t2{
                color: #aaa;
                font-size: 10px;
            }
            .msg-content{
                width: 213px;
                color: #000;
                font-size: 12px;
                white-space: pre-wrap;
                line-height: 18px;
                position: relative;
                i{
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: #000;
                    top: 5px;
                    left: -8px;
                }
            }
        }
    }
    .msg-top{
        display: flex;
        height: 33px;
        padding-left: 7px;
        padding-right: 14px;
        justify-content: space-between;
        align-items: center;
        background: #fff;
    }
    .msg-top p{
        font-size:13px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:18px;
    }
    .msg-top  .el-link{
        font-size:10px;
        font-weight:400;
        color:rgba(51,133,255,1);
        line-height:14px;
    }
    .scan-mp{
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: center;
        padding: 10px;
    }
    .scan-mp img{
        width:200px;
        height:200px;
    }
    .scan-mp span{
        font-size: 14px;
        color: #666;
    }

</style>

