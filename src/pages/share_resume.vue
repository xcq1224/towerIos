<template>
    <div class="page"> 
        <div class="main">
            <div class="header">
                <img src="../assets/logo.png" alt=""><span>塔兮</span>
                <router-link to="./download" class="open">打开</router-link>
            </div>
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
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, XInput, Popup } from 'vux'
    import { Tab, TabItem, Sticky, XButton, Swiper, SwiperItem } from 'vux'
import { setTimeout } from 'timers';

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Tab,
            TabItem,
            Sticky,
            XButton,
            Swiper,
            SwiperItem,
            XInput,
            Popup,
        },
        data () {
            return {
                commonText: '',
                query: {},      //  页面get参数
                data: {}
            }
        },
        activated(){
            this.query = this.$router.currentRoute.query
            //  获取详情数据
            this.getpersonalvitae()
        },
        methods: {
            //  获取详情数据
            getpersonalvitae() {
                let params = new FormData()
                params.append("towerUser_id", this.query.id)
                this.$post("getpersonalvitae", params, (data) => {
                    this.data = data
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        .header{
            padding: 10px;
            margin-bottom: 10px;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
            img{
                width: 36px;
                height: 36px;
                vertical-align: middle;
                margin-right: 10px;
            }
            .open{
                float: right;
                width: 72px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                border-radius: 14px;
                background: #008ab1;
                color: #fff;
                margin-top: 4px;
            }
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
                max-height: 40px;
                padding: 0px 0;
                line-height: 20px;
                padding-bottom: 2px;
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
            .pictures-box{
                overflow: hidden;
                padding-left: 2px;
                >div{
                    position: relative;
                    float: left;
                    width: 33.33%;
                    height: 116px;
                    padding: 0 2px 2px 0;
                    box-sizing: border-box;
                }
                img{
                    display: block;
                    height: auto;
                    width: 100%;
                    height: 100%;
                }
                .more-img{
                    position: absolute;
                    background: rgba(0, 0, 0, 50%);
                    top: 0;
                    left: 0;
                    bottom: 2px;
                    right: 2px;
                    color: #fff;
                    text-align: center;
                    line-height: 80px;
                    font-size: 16px;
                }
            }
        }
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
</style>

