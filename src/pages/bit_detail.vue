<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}" :right-options="{showMore: true}" @on-click-more="sharePage">{{query.title || '点滴详情'}}</x-header>
        <div class="main">
            <scroller lock-x height="-92" ref="scrollerBottom">
                <div>
                    <div class="hot-card">
                        <div class="user-info">
                            <router-link :to="'./homepage?id=' + params.towerUserId">
                                <img :src="params.iconUrl" width="28" height='28' alt="">{{params.name}}<i class='iconfont icon-zhongfu'></i>
                            </router-link>
                            <a @click="showPop1 = true" style="float: right;margin-left: 6px;"><i class="iconfont icon-tainjia-copy"></i></a>
                            <a v-show="params.follow != 1" class="active guanzhu" @click.stop="follow(params.towerUserId)">+关注</a>
                            <a v-show="params.follow == 1" class="guanzhu" @click.stop="no_follow(params.towerUserId)">已关注</a>
                        </div>
                        <div class="card-title">{{params.title}}</div>
                        <div class="video-box"  v-if="params.videoUrl" @click="openVideo(params.videoUrl, params.videoImg, params.contentType, params.price, params.buy)" :style="{backgroundImage: 'url(' + params.videoImg + ')' }">
                            <span class="play-btn"><i class="iconfont icon-bofang" style="font-size: 30px;"></i></span>
                        </div>
                        <!-- 图片 -->
                        <div v-if="params.imgUrls && params.imgUrls.length == 1" class="thumbnail-box">
                            <div class="thumbnail-one" @click.stop="viewPicture(params.imgUrls, 0)">
                                <img :src="params.imgUrls[0]" alt="">
                            </div>
                        </div>
                        <div v-if="params.imgUrls && params.imgUrls.length >1" class="thumbnail-box" style="margin-left: 0;">
                            <div class="thumbnail" :style="{backgroundImage: 'url(' + imgItem + ')' }" 
                                v-for="(imgItem, imgIndex) in params.imgUrls" :key="imgIndex" @click.stop="viewPicture(params.imgUrls, imgIndex)"></div>
                        </div>
                        <div ref="content" class="card-desc" style="max-height: inherit;"></div>
                        <div>
                            {{params.position}}
                            <img class="fr" v-if="params.scene != '0' && params.scene" :src="'/static/scene' + params.scene + '.png'" width="20"/>
                            <img class="fr" v-if="params.weather != '0' && params.weather" :src="'/static/weather' + params.weather + '.png'" width="20"/>
                            <img class="fr" v-if="params.mood != '0' && params.mood" :src="'/static/mood' + params.mood + '.png'" width="20"/>
                        </div>
                        <div class="handle">{{longTime(params.createDate)}}
                            <span v-if="showDelete">
                                <i class="iconfont icon-shanchu" @click.stop="deleteContent(params.towerContentId)"></i>
                            </span>
                            <span>
                                <i v-show="params.praise != 1" class="iconfont icon-dianzan1" @click.stop="praise(params.towerContentId)"></i>
                                <i v-show="params.praise == 1" class="iconfont icon-yijin13-zan text-red" @click.stop="no_praise(params.towerContentId)"></i>
                                {{params.collectionNum}}
                            </span>
                            <span>
                                <i class="iconfont icon-pinglun" @click="toSend"></i>
                                {{params.commentNum}}
                            </span>
                            <span>
                                <i v-show="params.collection != 1" class="iconfont icon-ego-heart" @click.stop="collection(params.towerContentId)"></i>
                                <i v-show="params.collection == 1" class="iconfont icon-guanzhu text-red" @click.stop="no_collection(params.towerContentId)"></i>
                                {{params.praiseNum}}
                            </span>
                        </div> 
                    </div>
                    <div class="comment">
                        <div class="tab"><span>评论</span></div>
                        <div v-for="(item, index) in commentList" :key="index" class="comment-card">
                            <div class="title">
                                <img :src="item.iconUrl" width="28" height='28' alt="">{{item.name}}
                                <span>{{formatDate(item.date, 'yyyy-MM-dd hh:mm')}}</span>
                            </div>
                            <p>{{item.comment}}</p>
                        </div>
                        <div v-if="!commentList[0]">
                            <p class="empty-comment">暂无评论</p>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
        <div class="footer" @click="showPop = true">评论</div>
        <div></div>
        <popup v-model="showPop" @on-show="showPopup">
            <div class="pop-footer">
                <div class="review-box">
                    <x-textarea :height="20" :rows="1" ref="common" class="review-input textarea" autosize placeholder="写评论" v-model="commonText"></x-textarea>
                </div>
                <div class="review" @click="send">发送</div> 
            </div>
        </popup>
        <popup v-model="showPop1">
            <div class="complaint">
                <p @click="shield">屏蔽</p>
                <p @click="complaint">投诉</p>
                <p @click="showPop1 = false">取消</p>
            </div>
        </popup>
        <confirm v-model="showComplaint" class="confirm-cust"
            @on-confirm="confirmComplaint"
            @on-show="opinion = ''">
            <div slot="">
                <x-textarea v-model="opinion" placeholder="请输入投诉原因" :rows="5"></x-textarea>
            </div>
        </confirm>
    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, XInput, Popup } from 'vux'
    import { Tab, TabItem, Sticky, XButton, Swiper, SwiperItem, XTextarea, Scroller, Confirm } from 'vux'
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
            XTextarea,
            Scroller,
            Confirm,
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
                showPop1: false,     //  投诉弹框
                showComplaint: false,       //  投诉
                opinion: '',                //  投诉内容
                showDelete: false,          //  是否显示删除按钮
            }
        },
        activated(){
            this.$nextTick(() => {
                this.$refs.scrollerBottom.reset({top: 0})
            })
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
                this.showDelete = false
                let params = new FormData()
                params.append("towerContentId", this.query.id)
                this.$post("getcontentbyid", params, (data) => {
                    this.params = data.content
                    this.getFormatContent(data.content.content)
                    this.commentList = data.commentList
                    this.showDelete = this.params.towerUserId == this.$store.state.towerUserId
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
                if(!this.$store.state.towerUserId){
                    this.login()
                    return
                }
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
            //  屏蔽
            shield(){
                if(!this.$store.state.towerUserId){
                    this.login()
                    return
                }
                let params = new FormData()
                params.append("towerUserId_shield", this.params.towerUserId)
                this.$post("shield", params, (data) => {
                    this.toastSuccess("屏蔽成功！")
                    this.showPop1 = false
                })
            },
            complaint(){
                if(!this.$store.state.towerUserId){
                    this.login()
                    return
                }
                this.showPop1 = false
                this.showComplaint = true
            },
            confirmComplaint(){
                let params = new FormData()
                params.append("towerContentId", this.params.towerContentId)
                params.append("content", this.opinion)
                this.$post("complaint", params, (data) => {
                    this.$vux.toast.show({
                        text: "投诉成功，我们会在24小时之内处理",
                        type: "text",
                        width: '300px',
                        time: 2500,
                        position: 'top',
                    })
                    this.showComplaint = false
                })
            },
            //  删除内容
            deleteContent(id){
                this.$vux.confirm.show({
                    title: '塔兮',
                    content: '确定要删除吗?',
                    onCancel: () => {},
                    onConfirm: () => {
                        let params = new FormData()
                        params.append('towerContentId', id)
                        this.$post("deletecontent", params, (data) => {
                            this.toastSuccess("删除成功")
                            this.$router.go(-1)
                        })
                    }
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
                a.guanzhu{
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
                text-align: center;
                font-size: 16px;
            }
            .card-desc{
                box-sizing: border-box;
                max-height: 40px;
                padding: 0px 0;
                line-height: 20px;
                padding-bottom: 2px;
                word-break: break-all;
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
    .empty-comment{
        text-align: center;
        line-height: 30px;
    }
    .video-box{
        background: #fff;
        height: 400px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
    .thumbnail{
        width: 32%;
        padding-bottom:30%;
        height: 0;
        margin: 0 1% 1% 0;
        &:nth-of-type(3n){
            margin-right: 0;
        }
    }
    .pop-footer{
        background: #fbf9fe;
        width: 100%;
        display: flex;
        align-items: flex-end;
        .review-box{
            flex: 1;
            padding: 10px 0 10px 10px;
        }
        .review-input{
            background: #fff;
            border: 1px solid #eee;
            vertical-align: bottom;
            padding: 5px;
            border-radius: 6px;
            line-height: 20px;
        }
        .review{
            width: 60px;
            color: @baseColor;
            text-align: center;
            padding-bottom: 12px;
        }
    }
    .complaint{
        background: #fff;
        line-height: 40px;
        text-align: center;
        p{
            border-bottom: 1px solid #ddd;
        }
        p:nth-of-type(3){
            border-bottom: none;
            border-top: 4px solid #ddd;
        }
    }
</style>


