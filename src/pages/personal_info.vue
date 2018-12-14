<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}">我的名片
            <span slot="right">
                <i class="iconfont icon-web-icon-"></i>
                <router-link to="./show"><i class="iconfont icon-icon-1"></i></router-link>
            </span>
        </x-header>
        <div class="main">
            <div class="header">
                <span class="font14">{{userInfo.name}}</span>
                <span class="sex-box" :style="userInfo.sex == '女'? '' : 'background: #3399ff;'"><i :class="userInfo.sex == '女'? 'iconfont icon-nv' : 'iconfont icon-male_icon'"></i></span>
                <span v-for="(item, index) in labelList(userInfo.label)" :key="index"></span>
            </div>
            <swiper auto height="250px" dots-position="center">
                <swiper-item class="banner" @click.native="viewPicture(userInfo.cardUrls, index)" v-for="(item, index) in userInfo.cardUrls" :key="index" :style="{backgroundImage: 'url(' + item + ')' }"></swiper-item>
            </swiper>
            <p class="lable-box">
                <span class="label-text">出生日期：</span>
                <span class="label-value">{{userInfo.name}}</span>
            </p>
            <p class="lable-box">
                <span class="label-text">教育经历：</span>
                <span class="label-value">{{userInfo.name}}</span>
            </p>
            <p class="lable-box">
                <span class="label-text">工作经历：</span>
                <span class="label-value">{{userInfo.name}}</span>
            </p>
            <p class="lable-box">
                <span class="label-text">专业成果：</span>
                <span class="label-value">{{userInfo.name}}</span>
            </p>
            <p class="lable-box">
                <span class="label-text">技能擅长：</span>
                <span class="label-value">{{userInfo.name}}</span>
            </p>
            <p class="lable-box">
                <span class="label-text">兴趣爱好：</span>
                <span class="label-value">{{userInfo.name}}</span>
            </p>
            <p class="lable-box">
                <span class="label-text">自我评价：</span>
                <span class="label-value">{{userInfo.name}}</span>
            </p>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, ChinaAddressData, Cell, PopupRadio } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton } from 'vux'
    import { Card } from 'vux'
    import { PopupPicker } from 'vux'
    import { XInput, Group, XAddress, XTextarea, Datetime, Swiper, SwiperItem,  } from 'vux'
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
            PopupRadio,
            Swiper,
            SwiperItem,
        },  
        data () {
            return {
                formADD: {

                },
                editIndex: 0,       //  编辑中
                nick: '曾庆全',
                sexList: ["男", "女"],     //  性别
                categoryList: [{key: '0', value: "工作"}, {key: '1', value: "学生"}],     //  性别
                userInfo: {},       //  用户信息
                refList: ["nick", 'university', 'company', 'position', 'introduce'],          //  input 元素
                file: '', 
            }
        },
        activated(){
            let params = new FormData()
            this.$post("getpersonaldetails", params, (data) => {
                this.userInfo = {
                    label: data.label || '',
                    cardUrls: data.cardUrls || [],
                    category: data.category || '',
                    company: data.company || '',
                    icon: data.icon || '',
                    introduce: data.introduce || '',
                    name: data.name || '',
                    position: data.position || '',
                    sex: data.sex || '',
                    university: data.university || '',
                    // towerUserBirthday: data.towerUserBirthday || ''
                }
            })
        },
        methods: {
            labelList(label){
                let labelList = []
                if(label){
                    labelList = label.split(",")
                }
                return labelList
            },
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        background: #fff;
        padding-top: 46px;
        padding-bottom: 55px;
        font-size: 12px;
        
        .weui-cell, .vux-cell-box{
            font-size: 14px;
            &:before{
                display: none;
            }
        }
    }
    .header{
        background: #fff;
        padding: 10px 10px;
        .sex-box{
            background: #d79db3;
            border-radius: 50%;
            display: inline-block;
            width: 20px;
            height: 20px;
            text-align: center;
            i{
                color: #fff;
                font-size: 14px;
                line-height: 20px;
            }
        }
        span{
            margin: 0 4px;
        }
    }
    .banner{
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .lable-box{
        padding: 6px 8px;
        display: flex;
        .label-text{
            width: 70px;
            text-align: right;
        }
        .label-value{
            flex: 1;
        }
    }
</style>



