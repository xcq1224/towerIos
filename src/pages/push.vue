<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}">设置</x-header>
        <div class="main">
            <group gutter='0' class="header" title="消息提醒">
                <cell class="cell">
                    <span slot="title">私信消息<inline-x-switch></inline-x-switch></span>
                </cell>
            </group>
            <group gutter='0' class="header" title="推送通知">
                <cell class="cell">
                    <span slot="title">关注人动态<inline-x-switch></inline-x-switch></span>
                </cell>
                <cell class="cell">
                    <span slot="title">新粉丝<inline-x-switch></inline-x-switch></span>
                </cell>
                <cell class="cell">
                    <span slot="title">新回复<inline-x-switch></inline-x-switch></span>
                </cell>
            </group>
        </div>

    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, InlineXSwitch } from 'vux'

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
            InlineXSwitch,
        },
        data () {
            return {
                tabIndex: 0,

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
    .page{
        background: #f2f2f2;
    }
    .main{
        padding-top: 46px;
        .cell{
            font-size: 14px;
            padding: 10px 15px;
            .title{
                line-height: 26px;
            }
            .weui-switch{
                width: 42px;
                height: 24px;
                float: right;
                &:before{
                    width: 40px;
                }
            }
            &:before{
                left: 0;
            }
        }
    }
</style>


