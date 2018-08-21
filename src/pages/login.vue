<template>
    <div class="page login"> 
        <x-header class="pst" :left-options="{backText: ''}">登录</x-header>
        <div class="main">
            <img src="../assets/picture2.jpg" alt="">
            <x-input text-align="center" class="input" v-model="phone" placeholder="手机号" required keyboard="number" ref='phone' is-type="china-mobile" :show-clear='false'></x-input>
            <x-input text-align="center" class="input" :is-type="passwordValid" required v-model="password" placeholder="密码" type="password" ref='password' :show-clear='false'></x-input>
            <a class="input btn-submit" @click="login">登录</a>
            <p>
                <router-link class="text-base">注册塔兮</router-link>
                <span class="text-ccc"> | </span>
                <router-link to="./forget_password">忘记密码</router-link>
            </p>
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
                password: '',
                refsList: ['phone', 'password'],
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
            login(){
                let flag = true
                this.refsList.map(item=>{
                    if(!this.$refs.phone.valid){
                        this.$refs[item].focus()
                        this.$refs[item].blur()
                        flag = false
                    }
                })
                if(!flag) return;
                let params = new FormData();
                params.append('phone', this.phone)
                params.append('password', this.password)
                this.$post("login", params, (data) => {
                    this.$store.state.towerUserId = data.towerUserId
                    this.$store.state.avatar = data.icon
                    this.$store.state.userName = data.name
                    this.$router.back(-1)
                })
            },
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
        p{
            text-align: center;
        }
    }
</style>
<style lang="less">
    .login .weui-input{
        text-align: center;
    }
</style>



