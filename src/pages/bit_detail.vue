<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}" :right-options="{showMore: true}" @on-click-more="sharePage">点滴详情</x-header>
        <div class="main">
            <div class="hot-card">
                <div class="user-info">
                    <img :src="params.iconUrl" width="28" height='28' alt="">{{params.name}}<i class='iconfont icon-zhongfu'></i>
                    <a v-show="params.follow != 1" class="active" @click.stop="follow(params.towerUserId)">+关注</a>
                    <a v-show="params.follow == 1" @click.stop="no_follow(params.towerUserId)">已关注</a>
                </div>
                <div class="card-title">{{params.title}}</div>
                <div class="card-desc" style="max-height: inherit;">{{params.content}}</div>
                <div class="video-box"  v-if="params.contentType==2" @click="openVideo(params.videoUrl, params.videoImg)">
                    <img class="video-img" :src="params.videoImg" alt="">
                    <span class="play-btn"><i class="iconfont icon-bofang" style="font-size: 30px;"></i></span>
                </div>
                <!-- 图片 -->
                <div v-if="params.imgUrls.length" class="thumbnail-box">
                    <div v-if="params.imgUrls.length > 1" class="thumbnail" :style="{backgroundImage: 'url(' + imgItem + ')' }" 
                        v-for="(imgItem, imgIndex) in params.imgUrls" :key="imgIndex" @click.stop="viewPicture(params.imgUrls, imgIndex)"></div>
                    <div v-if="params.imgUrls.length == 1" class="thumbnail-one" @click.stop="viewPicture(params.imgUrls, 0)">
                        <img :src="params.imgUrls[0]" alt="">
                    </div>
                </div>
                <div class="handle">{{longTime(params.createDate)}}
                    <i v-show="params.praise != 1" class="iconfont icon-dianzan1" @click.stop="praise(params.towerContentId)"></i>
                    <i v-show="params.praise == 1" class="iconfont icon-yijin13-zan text-red" @click.stop="no_praise(params.towerContentId)"></i>
                    <i v-show="params.collection != 1" class="iconfont icon-ego-heart" @click.stop="collection(params.towerContentId)"></i>
                    <i v-show="params.collection == 1" class="iconfont icon-guanzhu text-red" @click.stop="no_collection(params.towerContentId)"></i>
                </div> 
            </div>
            <div class="comment">
                <div class="tab"><span>评论</span></div>
                <div v-for="(item, index) in commentList" :key="index" class="comment-card">
                    <div class="title">
                        <img :src="item.iconUrl" width="28" height='28' alt="">{{item.name}}
                        <span>2018-05-04 08:08</span>
                    </div>
                    <p>{{item.comment}}</p>
                </div>
                <div v-if="!commentList[0]">
                    <p class="empty-comment">暂无评论</p>
                </div>
            </div>
        </div>
        <div class="footer" @click="toSend">评论</div>
        <div></div>
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
                type: '0',
                showMenus: false,
                showPop: false,
                commonText: '',
                query: {},      //  页面get参数
                params: {},     //  内容详细信息
                commentList: {},     //  评论列表
            }
        },
        activated(){
            this.query = this.$router.currentRoute.query
            if (this.query.status == '1') this.showPop = true

            //  获取详情数据
            this.getDetail()
        },
        methods: {
            //  转发
            sharePage(){
                let title = this.params.title
                let descr = this.params.content
                let thumbImage = this.params.imgUrl_1
                let webpageUrl = this.params.towerContentId
                this.share(title, descr, thumbImage, webpageUrl)
            },
            //  获取详情数据
            getDetail(){
                let params = new FormData()
                params.append("towerContentId", this.query.id)
                this.$post("getcontentbyid", params, (data) => {
                    this.params = data.content
                    this.commentList = data.commentList
                })
            },
            // 显示评论弹框
            showPopup(){
                this.commonText = ''
                let that = this
                setTimeout(function(){
                    that.$refs.common.focus()
                }, 200)
            },
            //  准备发表评论（判断是否登录）
            toSend(){
                if(!this.$store.state.towerUserId){
                    this.login()
                    return
                }
                this.showPop=true
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
            //  获取评论
            getcomment(){
                let params = new FormData()
                params.append("towerContentId", this.params.towerContentId)
                this.$post("getcomment", params, (data) => {
                    this.commentList = data.commentList
                })
            },

            //  关注
            follow(id){
                if(!this.$store.state.towerUserId){
                    this.login()
                    return
                }
                let params = new FormData()
                console.log(id)
                params.append('towerUserId_fans', id)
                this.post("http://106.14.7.242:8080/tower/app/account!follow.action", params, (data) => {
                    this.params.follow = '1'
                })
            },
            //  取消关注
            no_follow(id, index){
                let params = new FormData()
                console.log(id)
                params.append('towerUserId_fans', id)
                this.post("http://106.14.7.242:8080/tower/app/account!no_follow.action", params, (data) => {
                    this.params.follow = '0'
                })
            },
            //  收藏
            collection(id){
                if(!this.$store.state.towerUserId){
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
    .main{
        padding-top: 46px;
        padding-bottom: 46px;
        background: #f2f2f2;
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
        .comment{
            background: #fff;
            margin-top: 12px;
            .tab{
                overflow: hidden;
                padding-left: 10px;
                span{
                    float: left;
                    line-height: 36px;
                    border-bottom: 2px solid #999;
                }
            }
            .comment-card{
                padding: 10px 8px 25px;
                background: #fff;
                border-bottom: 1px solid #ddd;
                .title{
                    overflow: hidden;
                    img{
                        border-radius: 50%;
                        vertical-align: middle;
                        margin-right: 8px;
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
        }
    }
    .footer{
        background: @baseColor;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 46px;
        text-align: center;
        line-height: 46px;
        z-index: 2;
        color: #fff;
    }
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
    .empty-comment{
        text-align: center;
        line-height: 30px;
    }
</style>


