<template>
    <div class="has-tabbar page"> 
        <x-header :left-options="{backText: ''}">用户协议及使用条款款</x-header>
        <div class="main">
            <p>IQUP用户注册协议</p>
            <p>在使用本系统的所有功能之前，请您务必仔细阅读并透彻理解本声明。在使用本系统的所有功能之前，请您务必仔细阅读并透彻理解本声明。
                在使用本系统的所有功能之前，请您务必仔细阅读并透彻理解本声明。在使用本系统的所有功能之前，请您务必仔细阅读并透彻理解本声明。
            </p>
        </div>

    </div>
</template>

<script>

    import { XHeader } from 'vux'

    export default {
        components: {
            XHeader,
        },
        data () {
            return {

            }
        },
        activated(){

        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            abc(){
                console.log(3)
            }
        },
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .vux-header{
        position: relative;
        z-index: 2;
    }
    .main{
        position: absolute;
        top: 0;
        padding: 46px 0 0;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        z-index: 1;
        overflow: auto;
        p{
            padding: 10px;
            line-height: 16px;
        }
    }
</style>


