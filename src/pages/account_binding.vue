<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}">第三方账号绑定</x-header>
        <div class="main">
            <group gutter='0'>
                <cell class="cell">
                    <span slot="title"><i class="iconfont icon-weibo" style="color: #ed8034;"></i>微博
                    <inline-x-switch v-model="switch1" @on-change='change(1)'></inline-x-switch></span>
                </cell>
                <cell class="cell">
                    <span slot="title"><i class="iconfont icon-weixin-copy" style="color: #62ac4b;"></i>微信
                    <inline-x-switch v-model="switch2" @on-change='change(2)'></inline-x-switch></span>
                </cell>
                <cell class="cell">
                    <span slot="title"><i class="iconfont icon-qq-copy" style="color: #509ddc;"></i>QQ
                    <inline-x-switch v-model="switch3" @on-change='change(3)' title=""></inline-x-switch></span>
                </cell>
            </group>
        </div>

    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, XSwitch, InlineXSwitch } from 'vux'

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
            XSwitch,
            InlineXSwitch,
        },
        data () {
            return {
                tabIndex: 0,
                switch1: false,
                switch2: false,
                switch3: false,
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
            },
            change(val){
                if(!this['switch' + val]){
                    let that = this
                    this.$vux.confirm.show({
                        content: '确定要解绑吗？',
                        onCancel () {
                            that['switch' + val] = true
                        },
                        onConfirm () {}
                    })
                }
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
        .empty-box{
            height: 10px;
            background: #f2f2f2;
        }
        .cell{
            font-size: 14px;
            padding: 10px 15px;
            .title{
                line-height: 26px;
            }
            i{
                font-size: 28px;
                vertical-align: middle;
                margin-right: 10px;
            }
            .weui-switch{
                width: 42px;
                height: 24px;
                float: right;
                top: 7px;
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


