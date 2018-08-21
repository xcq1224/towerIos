<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}">绑定手机</x-header>
        <div class="main">
            <group gutter='0' label-width="100px">  
                <x-input title="手机号" mask="999 9999 9999" placeholder="请输入手机号" v-model="phoneNum" :max="13" is-type="china-mobile"></x-input>
                <x-input title="验证码" class="weui-vcode" placeholder="请输入验证码">
                    <div slot="right">
                        <span v-show="!start" class="text-color" @click="start = true">获取验证码</span>
                        <p v-show="start">重新获取(<countdown v-model="time" :start="start" @on-finish="finish"></countdown>)</p> 
                    </div>
                </x-input>
            </group>
            <a class="submit-btn">提交</a>
        </div>

    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, XSwitch, InlineXSwitch, XInput, Countdown } from 'vux'

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
            XInput,
            Countdown,
        },
        data () {
            return {
                phoneNum: '',
                isShow: true,
                time: 20,
                start: false,
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
            finish (index) {
                this.start = false
                this.time = 20
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
        .weui-cell, .vux-cell-box{
            font-size: 14px;
            line-height: 24px;
            padding: 12px;
            &:before{
                left: 0;
            }
            .text-color{
                color: @baseColor;
            }
        }
        .submit-btn{
            margin:  20px auto;
            display: block;
            width: 350px;
            height: 42px;
            line-height: 42px;
            color: #fff;
            text-align: center;
            background: @baseColor;
        }
    }
</style>


