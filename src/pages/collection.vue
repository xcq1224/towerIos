<template>
    <div class="page"> 
        <x-header :left-options="{backText: ''}">我的收藏</x-header>
        <div class="main">
            <div v-if="contentList.length">
                <div class="hot-card" @click="toDetail(item.towerContentId, item.contentType)" v-for="(item, index) in contentList" :key="index">
                    <div class="user-info">
                        <span @click.stop="toHomepage(item.towerUserId)"><img :src="item.iconUrl" width="28" height='28' alt="">{{item.name}}<i class='iconfont icon-zhongfu'></i></span>
                        <a v-show="item.follow != 1" class="active" @click.stop="follow(item.towerUserId, index)">+关注</a>
                        <a v-show="item.follow == 1" @click.stop="no_follow(item.towerUserId, index)">已关注</a>
                    </div>
                    <div v-show="item.title" class="card-title text-ellipsis">{{item.title}}</div>
                    <div v-show="item.content && item.contentType != 6" class="card-desc" :class="item.contentType == '0'? 'text-ellipsis12':'text-ellipsis2'">{{item.content}}</div>
                    <div v-if="item.videoUrl" class="video-box" :style="{backgroundImage: 'url(' + item.videoImg + ')' }">
                        <span class="play-btn iconfont icon-bofang"  @click.stop="openVideo(item.videoUrl, item.videoImg, item.contentType, item.price, item.buy)"></span>
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
                    <div class="handle">{{longTime(item.createDate)}}
                        <i v-show="item.praise != 1" class="iconfont icon-dianzan1" @click.stop="praise(item.towerContentId, index)"></i>
                        <i v-show="item.praise == 1" class="iconfont icon-yijin13-zan text-red" @click.stop="no_praise(item.towerContentId, index)"></i>
                        <i class="iconfont icon-pinglun" @click.stop="toDetail(item.towerContentId, item.contentType, 1)"></i>
                        <i v-show="item.collection != 1" class="iconfont icon-ego-heart" @click.stop="collection(item.towerContentId, index)"></i>
                        <i v-show="item.collection == 1" class="iconfont icon-guanzhu text-red" @click.stop="no_collection(item.towerContentId, index)"></i>
                    </div> 
                </div>
            </div>
            <div v-else class="empty">
                <p><i class="icon-empty iconfont"></i></p>
                <p style="position: relative; top: -40px;">您还没有收藏哦~</p>
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
            this.$post("getcollectionlist", params, (data) => {
                this.contentList = data.contentList
            })
        },
        methods: {
            //  收藏
            collection(id, index){
                let params = new FormData()
                params.append('towerContentId', id)
                this.$post("collection", params, (data) => {
                    this.contentList[index].collection = '1'
                })
            },
            //  取消收藏
            no_collection(id, index){
                let params = new FormData()
                console.log(id)
                params.append('towerContentId', id)
                this.$post("no_collection", params, (data) => {
                    this.contentList[index].collection = '0'
                })
            },
            //  关注
            follow(id, index){
                let params = new FormData()
                params.append('towerUserId_fans', id)
                this.$post("follow", params, (data) => {
                    this.contentList[index].follow = '1'
                })
            },
            //  取消关注
            no_follow(id, index){
                let params = new FormData()
                params.append('towerUserId_fans', id)
                this.$post("no_follow", params, (data) => {
                    this.contentList[index].follow = '0'
                })
            },
            //  点赞
            praise(id, index){
                let params = new FormData()
                params.append('towerContentId', id)
                this.$post("praise", params, (data) => {
                    this.contentList[index].praise = '1'
                })
            },
            //  取消点赞
            no_praise(id, index){
                let params = new FormData()
                params.append('towerContentId', id)
                this.$post("no_praise", params, (data) => {
                    this.contentList[index].praise = '0'
                })
            },
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
    .video-box{
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .empty{
        p{
            text-align: center;
            color: #ccc;
            i{
                font-size: 160px;
            }
        }
    }
</style>

