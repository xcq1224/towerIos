<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}">设置</x-header>
        <div class="main">
            <group gutter='0'>
                <radio :options="radioList" @on-change="change"></radio>
            </group>
        </div>

    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Group, Radio } from 'vux'

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Group,
            Radio,
        },
        data () {
            return {
                radioList: [ '使用移动流量和WIFI', '仅WIFI', '关闭' ],

            }
        },
        activated(){

        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            change (value, label) {
                console.log('change:', value, label)
            },
        },
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .page{
        background: #f2f2f2;
    }
    .main{
        padding-top: 46px;
        .weui-cell{
            font-size: 14px;
            padding: 12px 15px;
            .title{
                line-height: 26px;
            }
            &:before{
                left: 0;
            }
        }
    }
</style>


