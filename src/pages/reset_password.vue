<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}">修改密码</x-header>
        <div class="main">
            <group gutter='0' label-width="100px">  
                <x-input title="手机号" ref='phone' placeholder="请输入手机号" v-model="phone" type="tel"></x-input>
                <x-input title="验证码" v-model="code" class="weui-vcode" ref='code' placeholder="请输入验证码" :show-clear='false' type="tel">
                    <div slot="right">
                        <span v-show="!start" class="text-color" @click="getCode">获取验证码</span>
                        <p v-show="start">重新获取(<countdown v-model="time" :start="start" @on-finish="finish"></countdown>)</p> 
                    </div>
                </x-input>
                <x-input title="新密码" text-align="center" class="input" v-model="password" placeholder="请输入6~20位数字/字母/'.'/'_'的密码" type="password" ref='password'></x-input>
            </group>
            <a class="submit-btn" @click="submit">提交</a>
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
                phone: '',
                code: '',
                password: '',
                time: 60,
                start: false,
                refsList: ['phone', 'code', 'password'],
                passwordValid: function(value){
                    let uPassword = /^([a-zA-Z0-9]|[._]){6,20}$/
                    return{
                        valid: uPassword.test(value),
                        msg: "请输入6~20位数字/字母/'.'/'_'",
                    }
                },
            }
        },
        activated(){

        },
        methods: {
            submit(){
                let uPhone = /^1[0-9]{10}$/
                let uPassword = /^([a-zA-Z0-9]|[._]){6,20}$/
                if(!uPhone.test(this.phone)){
                    this.toastFail('手机号错误')
                    return
                }
                if(this.code.length != 4){
                    this.toastFail('验证码错误')
                    return
                }
                if(!uPassword.test(this.password)){
                    this.toastFail('密码格式错误')
                    return
                }
                let params = new FormData();
                params.append('phone', this.phone)
                params.append('verification', this.code)
                params.append('password', this.password)
                this.$post("modifypassword", params, (data) => {
                    this.toastSuccess("修改密码成功", "200px")
                    this.$router.back(-1)
                })
            },
            finish (index) {
                this.start = false
                this.time = 20
            },
            getCode(){
                let uPhone = /^1[0-9]{10}$/
                if(uPhone.test(this.phone)){
                    let that = this
                    let params = new FormData()
                    params.append('phone', this.phone)
                    this.$post("getverification", params, (data) => {
                        this.start = true
                    })
                }
                else{
                    this.toastFail('手机号错误')
                }
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


