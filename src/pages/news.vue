<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}"><span @click="showPopupPicker=true">我的订单<i class="iconfont icon-xia"></i></span></x-header>
        <div class="main">
            <tab :line-width=2 custom-bar-width="50%" v-model="index">
                <tab-item class="vux-center" :selected="index == 0" @click="index = 0">系统消息</tab-item>
                <tab-item class="vux-center" :selected="index == 1" @click="index = 1">评论私信</tab-item>
            </tab>
            <swiper v-model="index" :show-dots="false" height="100%">
                <swiper-item>
                    <div class="system-info">
                        <p class="title"><span>订单通知</span><span class="fr font12">2018-08-08 08:08</span></p>
                        <p class="font12">电视剧感觉你能考上的两个螺丝刀</p>
                    </div>
                </swiper-item>
                <swiper-item>
                    <div class="comment-info">
                        <img src="" alt="">
                        <p><span class="text-333">宋祖儿</span><span class="fr font12">2018-08-08 08:08</span></p>
                        <p><span class="font12">宋祖儿关注你了,相互关注成为好友吧</span></p>
                    </div>
                    <div class="comment-info">
                        <img src="" alt="">
                        <p><span class="text-333">付熙评论了你的点滴</span><span class="fr font12">2018-08-08 08:08</span></p>
                        <p><span class="font12">我觉得还可以</span></p>
                    </div>
                </swiper-item>
            </swiper>
        </div>
        <popup-picker class="popup-picker" :show.sync="showPopupPicker" @on-change="pickerChange" :show-cell="false" :data="list1" v-model="value1"></popup-picker>
    </div>
</template>

<script>
    import { XHeader } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, PopupPicker } from 'vux'
    const list = () => ['热门', '精选', '达人', '干货']
    export default {
        components: {
            XHeader,
            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Swiper,
            SwiperItem,
            PopupPicker,
        },
        data () {
            return {
                //  tab
                index: 0,
                showPopupPicker: false,
                value1: ['全部订单'],
                list1: [['全部订单', '技能学习', '技能变现']]
            }
        },
        activated(){
        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
           pickerChange(val){
               console.log(val)
           }
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding-top: 46px;
        overflow: hidden;
        .vux-tab-wrap{
            z-index: 2;
        }
        .vux-slider{
            height: 100%;
            top: -44px;
            padding-top: 44px;
            box-sizing: border-box;
            z-index: 1;
            .vux-swiper-item{
                height: 100%;
                overflow: auto;
            }
        }
    }
    .system-info{
        border-bottom: 1px solid #ddd;
        padding: 4px 10px;
        .title{
            margin-bottom: 5px;
        }
    }
    .comment-info{
        border-bottom: 1px solid #ddd;
        padding: 10px;
        img{
            width: 32px;
            height: 32px;
            border-radius: 50%;
            float: left;
            vertical-align: middle;
            margin-top: 5px;
            margin-right: 10px;
        }
    }
</style>

