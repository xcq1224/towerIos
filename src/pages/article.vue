<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}">文章</x-header>
        <div class="main">
            <img src="/static/picture5.jpg" alt="">
            <p style="border-top: 1px solid #eee; padding-bottom: 10px;"></p>
            <p>联系电话：18071737857</p>
            <p>QQ：1127414115</p>
            <p>Email: yunshangtaxi@163.com</p>
        </div>

    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Group,
            Cell,
            CellFormPreview,
            CellBox,
            Badge,
        },
        data () {
            return {

            }
        },
        activated(){

        },
        methods: {
            
        },
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding-top: 46px;
        padding-bottom: 10px;
        img{
            width: 100%;
            height: 1771px;
        }
        p{
            padding: 0 10px;
        }
    }
</style>


