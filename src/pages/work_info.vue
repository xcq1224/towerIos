<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}">编辑工作信息<a slot="right">保存</a></x-header>
        <div class="main">
            <group gutter='0' label-width="100px">
                <x-input title="公司名称" v-model="nick"></x-input>
                <datetime title="工作时间" format="YYYY-MM-DD"></datetime>
                <x-input title="职务"></x-input>
            </group>
            <a class="btn-del">删除工作信息</a>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, ChinaAddressData, Cell } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton } from 'vux'
    import { Card } from 'vux'
    import { PopupPicker } from 'vux'
    import { XInput, Group, XAddress, XTextarea, Datetime } from 'vux'
    import { setTimeout } from 'timers';

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Divider,
            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Card,
            PopupPicker,
            XInput,
            Group,
            XAddress,
            XTextarea,
            Datetime,
            Cell,
        },  
        data () {
            return {
                formADD: {

                },
                nick: '曾庆全',
                value: ['男'],
                list: [['男', '女']],
            }
        },
        activated(){
            this.handleType = this.$router.currentRoute.query.handleType || this.handleType
        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            




            
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        background: #f2f2f2;
        padding-top: 46px;
        padding-bottom: 55px;
        font-size: 12px;
        .weui-cell, .vux-cell-box{
            font-size: 14px;
            &:before{
                left: 0;
            }
        }
        img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: block;
        }
        .work-info-left{
            width: 100px;
            display: block;
        }
        .btn-del{
            display: block;
            text-align: center;
            font-size: 14px;
            line-height: 45px;
            border-bottom: 1px solid #ddd;
            background: #fff;
            margin: 20px 0;
            color: @baseColor;
        }
    }
</style>



