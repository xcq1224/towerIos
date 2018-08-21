<template>
    <div class="page register"> 
        <x-header class="pst" :left-options="{backText: ''}">完善资料</x-header>
        <div class="main">
            <div class="tab">
                <div class="tab-item" :class="tabIndex == 0 ? 'active' : ''" @click="tabIndex = 0">
                    <p><i class="iconfont icon-xuesheng1"></i></p>    
                    <span>我是学生</span>
                </div>
                <div class="tab-item" :class="tabIndex == 1 ? 'active' : ''" @click="tabIndex = 1">
                    <p><i class="iconfont icon-yuangongqia"></i></p>    
                    <span>我已工作</span>
                </div>
            </div>
            <div v-show="tabIndex == 0">
                <x-input class="input" v-model="phone" placeholder="学校名称" :show-clear='false'></x-input>
                <div :class="date1?'text-777': 'text-ccc'" class="input" @click="visibility1 = true">{{date1? date1: '入学时间'}}</div>
                <x-input class="input" v-model="phone" placeholder="院系" :show-clear='false'></x-input>
            </div>
            <div v-show="tabIndex == 1">
                <x-input class="input" v-model="phone" placeholder="公司名称" :show-clear='false'></x-input>
                <div :class="date1?'text-777': 'text-ccc'" class="input" @click="visibility1 = true">{{date1? date1: '工作时间'}}</div>
                <x-input class="input" v-model="phone" placeholder="职务" :show-clear='false'></x-input>
            </div>
            <a class="input btn-submit">确定</a>
            <p class="go"><router-link to="">先看看，稍后完善</router-link></p>
        </div>
        <datetime v-show="false" v-model="date1" @on-change="change" :show.sync="visibility1"></datetime>
        <datetime v-show="false" v-model="date2" @on-change="change" :show.sync="visibility2"></datetime>
    </div>
</template>

<script>

    import { XHeader, XButton, XInput, Datetime } from 'vux'

    export default {
        components: {
            XHeader,
            XButton,
            XInput,
            Datetime,
        },
        data () {
            return {
                tabIndex: 0,
                phone: '',
                code: '',
                password: '',
                nick: '',
                date1: '',
                date2: '',
                visibility1: false,
                visibility2: false,
            }
        },
        activated(){

        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            change(val){
                console.log(val)
            }
        },
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding: 46px 30px 0;
        .tab{
            display: flex;
            margin-bottom: 30px;
            .tab-item{
                flex: 1;
                text-align: center;
                color: #ccc;
                p{
                    width: 56px;
                    height: 56px;
                    background: #ccc;
                    border-radius: 50%;
                    margin: 40px auto 8px;
                    border: 1px solid #ccc;
                    i{
                        font-size: 32px;
                        color: #fff;
                        line-height: 56px;
                    }
                }
                &.active{
                    color: @baseColor;
                    p{
                        background: #fff;
                        border: 1px solid @baseColor;
                        i{
                            color: @baseColor;
                        }
                    }
                }
            }
        }
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
        .go{
            font-size: 12px;
            color: @baseColor;
            text-align: right;
        }
    }
</style>
<style lang="less">
    .register .weui-input{
        text-align: center;
    }
</style>

