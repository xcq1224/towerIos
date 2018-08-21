<template>
    <div class="page"> 
        <x-header :left-options="{backText: ''}">市场<span slot="right"><i class="iconfont icon-ego-heart"></i><i class="iconfont icon-dianzan1"></i></span></x-header>
        <div class="main">
            <div class="video-box" @click="openVideo(params.videoUrl, params.videoImg)" style="margin-top: 0; border-bottom: 1px solid #ddd;">
                <img class="video-img" :src="params.videoImg" alt="">
                <span class="play-btn"><i class="iconfont icon-bofang" style="font-size: 30px;"></i></span>
            </div>
            <tab :line-width=2 v-model="index" custom-bar-width="40%">
                <tab-item class="vux-center" :selected="index == 0" @click="index = 0">介绍</tab-item>
                <tab-item class="vux-center" :selected="index == 1" @click="index = 1">评价</tab-item>
            </tab>
            <swiper v-model="index" :show-dots="false" height="100%">
                <swiper-item class="item-desc">
                    <div class="desc-info">
                        <p class="title">{{params.title}}</p>
                        <p class="price">￥35.00
                            <i v-show="params.praise != 1" class="iconfont icon-dianzan1" @click.stop="praise(params.towerContentId)"></i>
                            <i v-show="params.praise == 1" class="iconfont icon-yijin13-zan text-red" @click.stop="no_praise(params.towerContentId)"></i>
                            <i v-show="params.collection != 1" class="iconfont icon-ego-heart" @click.stop="collection(params.towerContentId)"></i>
                            <i v-show="params.collection == 1" class="iconfont icon-guanzhu text-red" @click.stop="no_collection(params.towerContentId)"></i>
                        </p>
                        <div class="user-info">
                            <img :src="params.iconUrl" width="28" height='28' alt="">&nbsp;&nbsp;{{params.name}}&nbsp;<i class='iconfont icon-zhongfu'></i>
                            <a v-show="params.follow != 1" class="active" @click.stop="follow(params.towerUserId)">+关注</a>
                            <a v-show="params.follow == 1" @click.stop="no_follow(params.towerUserId)">已关注</a>
                        </div>
                        <div class="desc">
                            <p>课程介绍</p>
                            <p style="color: #777;">课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍课程介绍</p>
                            <p>购买须知<br/>该课程为付费系列课程，按课程计划定时更新，每节课程可在开课时学习，也可以反复回放。</p>
                            <p>该课程为虚拟内容服务，购买成功后盖不支持退款。</p>
                            <p>版权归作者所有，严禁翻录可侵权，违者将追究法律责任。</p>
                            <p>如有疑问，可点击下方咨询。</p>
                        </div>
                    </div>
                </swiper-item>
                <swiper-item class="item-comment">
                    <div class="comment-card" v-for="(item, index) in commentList" :key="index">
                        <div class="title">
                            <img :src="item.iconUrl" width="28" height='28' alt="">{{item.name}}
                            <span>{{formatDate(item.date, 'yyyy-MM-dd hh:mm:ss')}}</span>
                        </div>
                        <p>{{item.comment}}</p>
                    </div>
                    <div class="empty-comment" v-if="!commentList[0]">
                        <i class="iconfont icon-empty"></i>
                        <p>暂无评论</p>
                    </div>
                </swiper-item>
            </swiper>
        </div>
        <div class="footer" v-show="!index">
            <router-link class="footer-left" to="./advisory">
                <i class="iconfont icon-zixun"></i>
                <p>咨询</p>
            </router-link>
            <router-link to="./confirm_order" class="footer-right">加入学习</router-link>
        </div>
        <div class="footer" v-show="index" @click="toSend">
            <div class="footer-right">评论</div>
        </div>
        <popup v-model="showPop" @on-show="showPopup">
            <div class="popup">
                <div class="footer-fixed">
                    <x-input v-model="commonText" class="common-input" ref="common" placeholder="写评论" :show-clear="false"></x-input>
                    <span class="text-base" @click="send">发送</span>
                </div>
            </div>
        </popup>
    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Popup, XInput } from 'vux'

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
            Popup,
            XInput,
        },
        data () {
            return {
                index: 0,
                query: {},     //  页面跳转数据
                params: {},     //  页面详情数据
                commentList: [],    //  评论数据
                showPop: false,   //  评论弹框
                commonText: '',     //  评论类容
            }
        },
        activated(){
            this.query = this.$router.currentRoute.query
            if (this.query.status == '1'){
                this.showPop = true
                this.index = 1
            }
            //  获取详情数据
            this.getDetail()
            //  获取评论列表
            // this.getcomment()
        },
        methods: {
            //  获取详情数据
            getDetail(){
                let params = new FormData()
                params.append("towerContentId", this.query.id)
                this.$post("getcontentbyid", params, (data) => {
                    this.params = data.content
                    this.commentList = data.commentList
                })
            },


            //  获取评论
            getcomment(){
                let params = new FormData()
                params.append("towerContentId", this.query.id)
                this.$post("getcomment", params, (data) => {
                    this.commentList = data.commentList
                })
            },
            //  准备发表评论（判断是否登录）
            toSend(){
                if(!this.$store.state.towerUserId){
                    this.toastSuccess("请先登录")
                    this.login()
                    return
                }
                this.showPop=true
            },
            //  显示评论弹框
            showPopup(){
                this.commonText = ''
                let that = this
                setTimeout(function(){
                    that.$refs.common.focus()
                }, 200)
            },
            //  发表评论
            send(){
                this.showPop = false
                if(this.commonText){
                    let params = new FormData()
                    params.append("towerContentId", this.params.towerContentId)
                    params.append("comment", this.commonText)
                    this.$post("comment", params, (data) => {
                        this.getcomment()
                    })
                }
            },

            //  关注
            follow(id){
                if(!this.$store.state.towerUserId){
                    this.toastSuccess("请先登录")
                    this.login()
                    return
                }
                let params = new FormData()
                console.log(id)
                params.append('towerUserId_fans', id)
                this.$post("follow", params, (data) => {
                    this.params.follow = '1'
                })
            },
            //  取消关注
            no_follow(id, index){
                let params = new FormData()
                console.log(id)
                params.append('towerUserId_fans', id)
                this.$post("no_follow", params, (data) => {
                    this.params.follow = '0'
                })
            },
            //  收藏
            collection(id){
                if(!this.$store.state.towerUserId){
                    this.toastSuccess("请先登录")
                    this.login()
                    return
                }
                let params = new FormData()
                params.append('towerContentId', id)
                this.$post("collection", params, (data) => {
                    this.params.collection = '1'
                })
            },
            //  取消收藏
            no_collection(id){
                let params = new FormData()
                params.append('towerContentId', id)
                this.$post("no_collection", params, (data) => {
                    this.params.collection = '0'
                })
            },
            //  点赞
            praise(id){
                if(!this.$store.state.towerUserId){
                    this.toastSuccess("请先登录")
                    this.login()
                    return
                }
                let params = new FormData()
                params.append('towerContentId', id)
                this.$post("praise", params, (data) => {
                    this.params.praise = '1'
                })
            },
            //  取消点赞
            no_praise(id){
                let params = new FormData()
                params.append('towerContentId', id)
                this.$post("no_praise", params, (data) => {
                    this.params.praise = '0'
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
        span i{
            font-size: 24px;
            margin-left: 10px;
        }
    }
    .main{
        position: absolute;
        top: 0;
        padding: 46px 0;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        z-index: 1;
        display: flex;
        flex-direction: column;
        background: #f2f2f2;
        .vux-slider{
            flex: 1;
        }
        .vux-swiper-item{
            overflow: auto;
        }
    }
    .item-desc{
        .desc-info{
            >p, >div{
                background: #fff;
                padding-left: 8px;
                padding-right: 8px;
            }
            .title{
                color: #333;
                font-weight: bold;
                padding: 10px 8px;
            }
            .price{
                color: #f00;
                font-weight: bold;
                line-height: 32px;
                i{
                    float: right;
                    margin-right: 10px;
                    font-size: 20px;
                    color: #ccc;
                }
            }
            .desc{
                padding: 5px 8px;
                color: #333;
                p{
                    padding: 5px 0;
                }
            }
        }
        .user-info{
            margin: 10px 0;
            padding: 8px;
            background: #fff;
            img{
                border-radius: 50%;
                vertical-align: middle;
                border: 1px solid #ddd;
            }
            a{
                float: right;
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
        .more{
            height: 36px;
            line-height: 36px;
            margin: 20px 0 1px;
            padding: 0 8px;
            background: #fff;
            span{
                float: right;
                color: @baseColor;
            }
        }
        .chosen-card{
            padding: 12px 8px;
            margin-bottom: 1px;
            background: #fff;
            overflow: hidden;
            font-size: 12px;
            img{
                float: left;
                border-radius: 8px;
                margin-right: 10px;
                width: 118px;
                height: 70px;
            }
            p{
                color: #ccc;
                &.title{
                    color: #777;
                    font-weight: bold;
                    height: 38px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
                .num{
                    color: #777;
                }
                .sprice{
                    float: right;
                    color: #f00;
                    margin-right: 18px;
                    font-weight: bold;
                }
            }
        }
    }
    .comment-card{
        padding: 10px 8px 25px;
        background: #fff;
        margin-bottom: 1px;
        .title{
            overflow: hidden;
            img{
                border-radius: 50%;
                vertical-align: middle;
                margin-right: 8px;
                border: 1px solid #ddd;
            }
            span{
                float: right;
                color: #ccc;
                line-height: 30px;
                font-size: 12px;
            }
        }
        p{
            padding-left: 40px;
            line-height: 20px;
        }
    }
    .footer{
        background: @baseColor;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 46px;
        display: flex;
        text-align: center;
        z-index: 2;
        .footer-left{
            width: 64px;
            background: #f2f2f2;
            line-height: 6px;
            color: inherit;
            i{
                font-size: 24px;
                line-height: 32px;
            }
        }
        .footer-right{
            flex: 1;
            line-height: 46px;
            color: #fff;
        }
    }
    //  评论弹框样式
    .footer-fixed{
        background: #f2f2f2;
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 46px;
        padding: 0 10px;
        box-sizing: border-box;
        line-height: 46px;
        z-index: 2;
        display: flex;
        .vux-x-input{
            padding: 0;
            flex: 1;
            border: 1px solid #ddd;
            height: 30px;
            background: #fff;
            margin-top: 7px;
            padding: 0 10px;
            margin-right: 10px;
        }
    }
</style>

