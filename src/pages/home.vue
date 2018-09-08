<template>
    <div class="page"> 
        <div class="header pst" style="z-index: 500;">
            <search
                v-model="value"
                @on-submit="onSubmit"
                ref="search"
                class="bg-base"
                style="position:relative;top:0;z-index: 500;">
            </search>
            <router-link  v-show="false" to="./news" class="news active"><i class="iconfont icon-icon--"></i></router-link>
        </div>
        <div class="tab pst">
            <router-link to="./featured" class="tab-item">
                <p style="background: #ff9900;"><i class="iconfont icon-shichang"></i></p>
                <span>技能</span>
            </router-link>
            <router-link to="./talent" class="tab-item">
                <p style="background: #3399ff;"><i class="iconfont icon-zan"></i></p>
                <span>达人</span>
            </router-link>
            <router-link to="./dry_good" class="tab-item">
                <p style="background: #cc66cc;"><i class="iconfont icon-wenzhang-copy"></i></p>
                <span>干货</span>
            </router-link>
        </div>
        <div class="main" style="overflow: hidden;">
            <load-more v-show="isEmpty" :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
            <scroller v-show="!isEmpty" use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore"
                use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh"
                lock-x ref="scrollerBottom" height="-178" @on-scroll="onScroll">
                <div>
                    <div class="empty" style="height: 10px;"></div>
                    <p class="title"><i class="iconfont icon-remen"></i>热门</p>
                    <div class="hot-card" @click="toDetail(item.towerContentId, item.contentType)" v-for="(item, index) in contentShowList" :key="index">
                        <!-- 用户信息 -->
                        <div class="user-info" @click.stop="toHomepage(item.towerUserId)">
                            <span><img :src="item.iconUrl" width="28" height='28' alt="">{{item.name}}<i class='iconfont icon-zhongfu'></i></span>
                            <!-- <a v-show="item.follow != 1" class="active" @click.stop="follow(item.towerUserId, index)">+关注</a> -->
                            <!-- <a v-show="item.follow == 1" @click.stop="no_follow(item.towerUserId, index)">已关注</a> -->
                            <a v-show="item.follow == 1" class="active" style="width:64px;">认识一下</a>
                        </div>
                        <div v-show="item.title" class="card-title text-ellipsis" style="margin-left: 40px;">{{item.title}}</div>
                        <div v-show="item.content && item.contentType != 6" style="margin-left: 40px; margin-bottom: 5px;" class="card-desc" :class="item.contentType == '0'? 'text-ellipsis12':'text-ellipsis2'">{{item.content}}</div>
                        <!-- 视频 -->
                        <div v-if="item.contentType == 2 || item.contentType == 3" class="video-box">
                            <img :src="item.videoImg" class="video-img" alt="">
                            <span class="play-btn iconfont icon-bofang"  @click.stop="openVideo(item.videoUrl, item.videoImg)"></span>
                            <p v-show="item.isError" class="video-error">视频加载失败</p>
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
        mounted() {
            this.$nextTick(() => {
                this.$refs.scrollerBottom.reset({top: 0})
            })
            this.$vux.loading.show()
            this.loadMore()
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
        methods: {
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
                    params.append("keyword", this.value)
                    params.append("pageNum", this.pageNum)
                    this.$post("getcontentlist", params, (data) => {
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
            //  搜索
            onSubmit () {
                this.$refs.search.setBlur()
                let params = new FormData()
                params.append("keyword", this.value)
                params.append("pageNum", this.pageNum)
                this.$post('search', params, (data)=>{
                    this.contentShowList = [].concat(data.contentList);
                    this.isEmpty = !this.contentShowList.length
                })
            },
            //  加载首页数据
            loadMore() {
                this.fetchData(() => {
                    let params = new FormData()
                    params.append("keyword", this.value)
                    params.append("pageNum", this.pageNum)
                    this.$post("getcontentlist", params, (data) => {
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
                if(!this.$store.state.towerUserId){
                    this.login()
                    return
                }
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
                if(!this.$store.state.towerUserId){
                    this.login()
                    return
                }
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
                if(!this.$store.state.towerUserId){
                    this.login()
                    return
                }
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
    .header{
        background: #b5e1fe;
        display: flex;
        height: 46px;
        .search{
            flex: 1;
            .weui-search-bar{
                background: #b5e1fe;
            }
        }
        .news{
            line-height: 46px;
            padding-right: 13px;
            color: #fff;
            position: relative;
            i{
                font-size: 24px;
            }
            &.active:after{
                content: '';
                position: absolute;
                top: 10px;
                right: 15px;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                background: red;
            }
        }
    }
    .tab{
        background: #fff;
        display: flex;
        border-bottom: 1px solid #ddd;
        a{
            flex: 1;
            text-align: center;
            height: 80px;
            p{
                width: 40px;
                height: 40px;
                border-radius: 50%;
                line-height: 40px;
                margin: 10px auto 3px;
                color: #fff;
                i{
                    font-size: 20px;
                }
            }
        }
    }
    .main{
        padding-top: 126px;
        padding-bottom: 64px;
        .title{
            background: #fff;
            padding-left: 10px;
            font-weight: bold;
            i{
                color: #f36;
                font-weight: normal;
            }
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
    
    
    
    .search-tab{
        background: #fff;
        padding: 0 2px 0 6px;
        display: block;
        height: 28px;
        font-size: 14px;
        i{
            font-size: 20px;
            line-height: 28px;
            vertical-align: middle;
        }
    }
</style>

