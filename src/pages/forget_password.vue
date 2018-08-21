<template>
    <div class="page register"> 
        <x-header class="pst" :left-options="{backText: ''}">忘记密码</x-header>
        <div class="main">
            <img src="../assets/picture2.jpg" alt="">
            <x-input class="input" v-model="phone" placeholder="手机号"></x-input>
            <x-input class="input code-box" v-model="code" placeholder="验证码">
                <span class="text-base get-code" slot="right-full-height">获取验证码</span>
            </x-input>
            <x-input class="input" v-model="password" placeholder="新密码" type="password"></x-input>
            <a class="input btn-submit" @click="submit">下一步</a>
        </div>

    </div>
</template>

<script>

    import { XHeader, XButton, XInput } from 'vux'

    export default {
        components: {
            XHeader,
            XButton,
            XInput,
        },
        data () {
            return {
                phone: '',
                code: '',
                password: '',
                nick: '',
            }
        },
        activated(){

        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            submit(){
                this.$vux.confirm.show({
                    // 组件除show外的属性
                    title: '塔兮',
                    content: '此账号已注册,要去登录吗?',
                    onCancel () {
                        console.log(0)
                    },
                    onConfirm () {
                        console.log(1)
                    }
                })
            }
        },
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding: 46px 30px 0;
        img{
            display: block;
            margin: 60px auto;
        }
        .input{
            width: 100%;
            height: 40px;
            padding: 0;
            border: 1px solid #ddd;
            border-radius: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 14px;
            margin-bottom: 10px;
            &:before{
                display: none;
            }
        }
        .btn-submit{
            display: block;
            background: @baseColor;
            color: #fff;
            border-color: @baseColor;
        }
        .code-box{
            box-sizing: border-box;
            padding-left: 90px;
        }
        .get-code{
            margin-right: 10px;
            line-height: 45px;
        }
    }
</style>
<style lang="less">
    .register .weui-input{
        text-align: center;
    }
</style>

