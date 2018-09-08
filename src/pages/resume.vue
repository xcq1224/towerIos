<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}" :right-options="{showMore: true}" @on-click-more="sharePage">我的简历</x-header>
        <div class="main">
            <div class="userInfo">
                <img :src="data.icon" alt="">
                <p>{{data.name}}&nbsp;&nbsp;{{data.sex}}</p>
                <p>{{data.company || data.university}}</p>
            </div>
            <div v-for="(item, index) in data.contentList" :key="index">
                <p style="background: #f2f2f2; padding: 5px 10px;">{{item.dribKindName}}：{{item.dribKindDetail}}</p>
                <div class="hot-card" @click="toDetail(item.towerContentId, item.contentType)">
                    <div v-show="item.title" class="card-title text-ellipsis">{{item.title}}</div>
                    <div v-show="item.content && item.contentType != 6" class="card-desc" :class="item.contentType == '0'? 'text-ellipsis12':'text-ellipsis2'">{{item.content}}</div>
                    <!-- 视频 -->
                    <div v-if="item.contentType == 2 || item.contentType == 3" class="video-box">
                        <img class="video-img" :src="item.videoImg" alt="">
                        <span class="play-btn iconfont icon-bofang" @click.stop="openVideo(item.videoUrl, item.videoImg)"></span>
                    </div>
                    <!-- 图片 -->
                    <div v-if="item.imgUrls.length" class="thumbnail-box">
                        <div v-if="item.imgUrls.length > 1" class="thumbnail" :style="{backgroundImage: 'url(' + imgItem + ')' }" 
                            v-for="(imgItem, imgIndex) in item.imgUrls" :key="imgIndex" @click.stop="viewPicture(item.imgUrls, imgIndex)"></div>
                        <div v-if="item.imgUrls.length == 1" class="thumbnail-one" @click.stop="viewPicture(item.imgUrls, 0)">
                            <img :src="item.imgUrls[0]" alt="">
                        </div>
                    </div>
                    <div style="overflow: hidden;">
                        {{item.position}}
                        <img class="fr" v-if="item.scene != '0' && item.scene" :src="'/static/scene' + item.scene + '.png'" width="20"/>
                        <img class="fr" v-if="item.weather != '0' && item.weather" :src="'/static/weather' + item.weather + '.png'" width="20"/>
                        <img class="fr" v-if="item.mood != '0' && item.mood" :src="'/static/mood' + item.mood + '.png'" width="20"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Search, Popover, Scroller, Popup, XHeader, Range, Cell } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, LoadMore } from 'vux'
    import { setTimeout } from 'timers';
    export default {
        components: {
            Search,
            Popover,
            Scroller,
            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Swiper,
            SwiperItem,
            Popup,
            XHeader,
            Range,
            Cell,
            LoadMore,
        },
        data () {
            return {
                //  search
                data: {},    //  页面显示数据     
            }
        },
        mounted() {
        },
        activated(){
            this.getpersonalvitae()
        },
        methods: {
            getpersonalvitae() {
                let params = new FormData()
                params.append("towerUser_id", this.$store.state.towerUserId)
                this.$post("getpersonalvitae", params, (data) => {
                    this.data = data
                })
            },
            //  转发
            sharePage(){
                let descr = this.data.name + '的简历'
                let webpageUrl = this.$store.state.towerUserId
                this.shareResume('', descr, '', webpageUrl)
            },
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .bg-base{
        background: @baseColor;
    }
    .main{
        padding-top: 46px;
        background: #f2f2f2;
    }
    .userInfo{
        text-align: center;
        background: #fff;
        padding: 30px 0 20px;
        img{
            width: 60px;
            height: 60px;
            border-radius: 50%;
        }
    }
    .hot-card{
        padding: 10px 10px 3px;
        background: #fff;
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

