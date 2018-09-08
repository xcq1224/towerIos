<template>
    <div class="page"> 
        <x-header :left-options="{backText: ''}">我的技能</x-header>
        <div class="main">
            <div class="hot-card" @click="toDetail(item.towerContentId, item.contentType)" v-for="(item, index) in contentList" :key="index">
                <div v-show="item.title" class="card-title text-ellipsis">{{item.title}}</div>
                <div v-show="item.content && item.contentType != 6" class="card-desc" :class="item.contentType == '0'? 'text-ellipsis12':'text-ellipsis2'">{{item.content}}</div>
                <div v-if="item.contentType == 2 || item.contentType == 3" class="video-box">
                    <img :src="item.videoImg" class="video-img" alt="">
                    <span class="play-btn iconfont icon-bofang"  @click.stop="openVideo(item.videoUrl, item.videoImg)"></span>
                </div>
                <div v-if="item.contentType == 1" class="picture-box">
                    <img :src="item.imgUrl_1" alt="">
                </div>
                <div class="handle">{{longTime(item.createDate)}}</div> 
            </div>
        </div>
    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Swiper,
            SwiperItem,
        },
        data () {
            return {
                index: 0,

                contentList: [],    
            }
        },
        activated(){
            let params = new FormData()
            this.$post("getmyskilllist", params, (data) => {
                this.contentList = data.contentList
            })
        },
        methods: {
            
        },  
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .vux-header{
        position: relative;
        z-index: 2;
    }
    .main{
        padding: 46px 0 0;
        background: #f2f2f2;
        font-size: 12px;
    }
    .hot-card{
        padding: 10px 10px 3px;
        background: #fff;
        margin-bottom: 15px;
        color: #777;
        .user-info{
            overflow: hidden;
            margin-bottom: 5px;
            img{
                border-radius: 50%;
                vertical-align: middle;
                border: 1px solid #ddd;
                margin-right: 10px;
            }
            a{
                float: right;
                margin-top: 3px;
                height: 25px;
                width: 50px;
                text-align: center;
                line-height: 24px;
                border-radius: 4px;
                font-size: 13px;
                border: 1px solid #ccc;
                color: #ccc;
                &.active{
                    color: #fff;    
                    background: @baseColor;
                    border-color: @baseColor;
                }
            }
        }
        .card-title{
            font-weight: bold;
            padding-bottom: 3px;
        }
        .card-desc{
            box-sizing: border-box;
            padding: 0px 0;
            line-height: 20px;
            padding-bottom: 2px;
        }
        .text-box{
            max-height: inherit;
            -webkit-line-clamp: 12;
        }
        .handle{
            color: #ccc;
            line-height: 30px;
            overflow: hidden;
            i{
                float: right;
                margin-right: 10px;
                font-size: 20px;
            }
        }
    }
</style>

