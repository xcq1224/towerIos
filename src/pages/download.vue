<template>
    <div class="page"> 
        <div class="main">
            <img src="../assets/logo.png" alt="">
            <a href="http://towerxi.com/apk/towerX.apk" class="download">立即下载</a> 
        </div>
    </div>
</template>

<script>

    export default {
        activated(){

        },
        methods: {

        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        text-align: center;
        img{
            width: 100px;
            height: 100px;
            margin-top: 100px;
        }
        a{
            width: 280px;
            display: block;
            padding: 10px 0;
            margin: 40px auto;
            color: #fff;
            text-align: center;
            background-color: #008ab1;
        }
    }
</style>

