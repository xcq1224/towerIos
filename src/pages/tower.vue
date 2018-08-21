<template>
    <div class="page"> 
        <div class="main">
            <div class="follow-box">
                <div class="follow-item" v-if="index < 3 || followList.length == 4" v-for="(item, index) in followList" :key="index"  @click="toHomepage(item.towerUserId)">
                    <img :src="item.iconUrl" alt="">
                    <p>{{item.name}}</p>
                </div>
                <div class="follow-item" v-if="followList.length>4">
                    <p class="follow-more" @click="show1 = true">●●●</p>
                </div>
            </div>
            <load-more v-show="isEmpty" :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
            <scroller v-show="!isEmpty" use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore"
                use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh"
                lock-x ref="scrollerBottom" height="-160" @on-scroll="onScroll">
                <div>
                    <div class="hot-card" @click="toDetail(item.towerContentId, item.contentType)" v-for="(item, index) in contentShowList" :key="index">
                        <!-- 用户信息 -->
                        <div class="user-info">
                            <span @click.stop="toHomepage(item.towerUserId)"><img :src="item.iconUrl || '../assets/avatar.png'" width="28" height='28' alt="">{{item.name}}<i class='iconfont icon-zhongfu'></i></span>
                        </div>
                        <div v-show="item.title" class="card-title text-ellipsis">{{item.title}}</div>
                        <div v-show="item.content" class="card-desc" :class="item.contentType == '0'? 'text-ellipsis12':'text-ellipsis2'">{{item.content}}</div>
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
                        <!-- 收藏、点赞、评论操作 -->
                        <div class="handle">{{longTime(item.createDate)}}
                            <i v-show="item.praise != 1" class="iconfont icon-dianzan1" @click.stop="praise(item.towerContentId, index)"></i>
                            <i v-show="item.praise == 1" class="iconfont icon-yijin13-zan text-red" @click.stop="no_praise(item.towerContentId, index)"></i>
                            <i class="iconfont icon-pinglun" @click.stop="toDetail(item.towerContentId, item.contentType, 1)"></i>
                            <i v-show="item.collection != 1" class="iconfont icon-ego-heart" @click.stop="collection(item.towerContentId, index)"></i>
                            <i v-show="item.collection == 1" class="iconfont icon-guanzhu text-red" @click.stop="no_collection(item.towerContentId, index)"></i>
                        </div> 
                    </div>
                </div>
            </scroller>
        </div>
        <popup v-model="show1" position="right" max-height="100%">
            <div class="follows">
                <div class="follow-item" v-for="(item, index) in followList" :key="index" @click="toHomepage(item.towerUserId)">
                    <img :src="item.iconUrl" alt="">{{item.name}}
                </div>
            </div>
        </popup>
    </div>
</template>

<script>
    import { Search, Popover, Scroller, Popup, XHeader, Range, Cell } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, LoadMore } from 'vux'
    import { setTimeout } from 'timers';
    const pulldownDefaultConfig = {
        content: '下拉刷新',
        height: 40,
        autoRefresh: false,
        downContent: '下拉刷新',
        upContent: '释放后刷新',
        loadingContent: '正在刷新...',
        clsPrefix: 'xs-plugin-pulldown-'
    }
    const pullupDefaultConfig = {
        content: '加载中...',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '释放后加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pullup-'
    }
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
                results: [],
                searchList: [{
                  index: 1,
                  list: [{'title': 'sdgjksjdg', 'content': 'atqrqw'},{'title': 'sdgjksjdg', 'content': 'atqrqw'}]
                },{
                  index: 2,
                  list: [{'title': 'sdgjksjdg'}]
                },{
                  index: 3,
                  list: [{'title': 'sdgjksjdg', 'content': 'atqrqw'}]
                },{
                  index: 4,
                  list: [{'title': 'sdgjksjdg'}]
                }],
                contentShowList: [],    //  页面显示数据     
                pageNum: 1,             //  返回页数
                value: '',              //  搜索文本
                isEmpty: false,         //  没有数据
                followList: [],         //  我关注的人
                show1: false,           //  是否显示更多我关注的人
                
                showVideo: false,       //  是否打开视频
                videoUrl: '',           //  播放中的视频
                videoImg: '',           //  播放中的视频的缩略图
                videoPlayIndex: 0,      //  视频弹框播放的视频
                time: 0,
                max: 0,
                duration: 0,
                paused: true,
                isChange: false,
                isFullScreen: false,

                //  tab
                index: 0,
                
                //  刷新、加载
                pullupDefaultConfig: pullupDefaultConfig,
                pulldownDefaultConfig: pulldownDefaultConfig,



                

            }
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.scrollerBottom.reset({top: 0})
            })
            this.loadMore()
        },
        activated(){
            this.getFollow()
        },
        methods: {
            //  获取我关注的人
            getFollow(){
                let params = new FormData()
                this.$post("getfollow", params, (data) => {
                    this.followList = data.followList
                })
            },
            //  跳转到个人主页
            toHomepage(id){
                this.$router.push('./homepage?id=' + id + '')
            },


            //  加载数据
            fetchData(cb) {
                var that = this
                setTimeout(function(){
                    that.$nextTick(() => {
                        that.$refs.scrollerBottom.reset()
                    })
                    cb()
                }, 200)
            },
            //  下拉刷新
            refresh() {
                this.fetchData(data => {
                    this.pageNum = 1
                    this.$refs.scrollerBottom.enablePullup()
                    this.$refs.scrollerBottom.donePulldown()
                    let params = new FormData()
                    params.append("pageNum", 1)
                    this.$post("getmomentslist", params, (data) => {
                        this.contentShowList = [].concat(data.contentList)
                        if(data.contentList.length == 5){
                            this.pageNum += 1
                            this.$refs.scrollerBottom.donePullup()
                        }else{
                            this.$refs.scrollerBottom.disablePullup()
                        }
                    })
                })
            },
            //  加载数据
            loadMore() {
                this.fetchData(() => {
                    let params = new FormData()
                    params.append("pageNum", this.pageNum)
                    this.$post("getmomentslist", params, (data) => {
                        data.contentList.map(item => {
                            item['isError'] = false
                            this.contentShowList.push(item)
                        })
                        // this.contentShowList = this.contentShowList.concat(data.contentList)
                        if(data.contentList.length == 5){
                            this.pageNum += 1
                            this.$refs.scrollerBottom.donePullup()
                        }else{
                            this.$refs.scrollerBottom.disablePullup()
                        }
                    })
                })
            },
            //  内容滚动触发
            onScroll(e){
                
            },

            //  收藏
            collection(id, index){
                let params = new FormData()
                params.append('towerContentId', id)
                this.$post("collection", params, (data) => {
                    this.contentShowList[index].collection = '1'
                })
            },
            //  取消收藏
            no_collection(id, index){
                let params = new FormData()
                console.log(id)
                params.append('towerContentId', id)
                this.$post("no_collection", params, (data) => {
                    this.contentShowList[index].collection = '0'
                })
            },
            //  关注
            follow(id, index){
                let params = new FormData()
                params.append('towerUserId_fans', id)
                this.$post("follow", params, (data) => {
                    this.contentShowList[index].follow = '1'
                })
            },
            //  取消关注
            no_follow(id, index){
                let params = new FormData()
                params.append('towerUserId_fans', id)
                this.$post("no_follow", params, (data) => {
                    this.contentShowList[index].follow = '0'
                })
            },
            //  点赞
            praise(id, index){
                let params = new FormData()
                params.append('towerContentId', id)
                this.$post("praise", params, (data) => {
                    this.contentShowList[index].praise = '1'
                })
            },
            //  取消点赞
            no_praise(id, index){
                let params = new FormData()
                params.append('towerContentId', id)
                this.$post("no_praise", params, (data) => {
                    this.contentShowList[index].praise = '0'
                })
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
        padding-bottom: 54px;
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
    .follow-box{
        height: 106px; 
        overflow: hidden;
        .follow-item{
            width: 25%;
            float: left;
            text-align: center;
            padding: 10px 0 5px;
            img{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                border: 1px solid #eee;
            }
            .follow-more{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: #fff;
                margin: 0 auto;
                line-height: 60px;
                color: #ccc;
            }
        }
    }
    .follows{
        height: 100%;
        width: 200px;
        background: #fff;
        overflow: auto;
        .follow-item{
            img{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                border: 1px solid #eee;
                vertical-align: middle;
                margin: 5px 10px;
            }
        }
    }
</style>

