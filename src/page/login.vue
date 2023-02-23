<template>
    登录
</template>

<script>
    export default {
        name: "login",
        data(){
            return {

            }
        },
        created() {
            this.$message.success("时322323");
            this.$loading();
            setTimeout(()=>{
                this.$loading().close();
            },4000)
        },
        methods:{

        }

    }
</script>

<style scoped>

</style>