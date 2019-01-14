<template>
    <div class="page"> 
        <div class="header pst" style="z-index: 500;">
            <search
            v-if="false"
                v-model="value"
                @on-submit="onSubmit"
                @on-cancel="refresh"
                ref="search"
                class="bg-base"
                style="position:relative;top:0;z-index: 500;">
            </search>
            <div class="search-box" @click="showSearch = true">
                <i class="weui-icon-search"></i>  名字、标签、内容、服务、课程
            </div>
        </div>
        <div class="tab pst" v-show="showSubTab">
            <router-link to="./featured" class="tab-item">
                <p style="background: #ff9900;"><i class="iconfont icon-shichang"></i></p>
                <span>小课</span>
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
        <div class="empty pst" style="height: 4px;background: #ddd;"></div>
        <div class="main" style="overflow: hidden;">
            <load-more v-show="isEmpty" :show-loading="false" tip="暂无数据" background-color="#fbf9fe"></load-more>
            <scroller class="scroll-box" v-show="!isEmpty" use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore"
                use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh"
                lock-x ref="scrollerBottom" height="-190" @on-scroll="onScroll">
                <div @touchstart="touchstart" @touchend="touchend" @touchmove="touchmove">
                    <div class="new-cardd-box" v-for="(item, index) in contentShowList" :key="index">
                        <div class="card-left" @click="toHomepage(item.towerUserId)">
                            <div class="card-img"  :style="{backgroundImage: 'url(' + item.userCardUrl + ')' }"></div>
                            <p>
                                <span class="card-name">{{item.name}}</span>
                                <span class="sex-box" :style="item.sex == '女'? '' : 'background: #3399ff;'"><i :class="item.sex == '女'? 'iconfont icon-nv' : 'iconfont icon-male_icon'"></i></span>
                                <a>认识一下</a>
                            </p>
                            <p class="label">
                                <span v-for="(item1, index1) in toArray(item.label)" :key="index1">{{item1}}</span>
                            </p>
                        </div>
                        <div class="card-right" @click="toDetail(item.towerContentId, item.contentType)" :style="{backgroundImage: 'url(' + or(item.videoImg, item.imgUrls[0]) + ')' }">
                            <span v-if="item.videoImg" class="play-btn"><i class="iconfont icon-bofang"></i></span>
                            <div class="handle-box">
                                <span class="icon-box">
                                    <i v-show="item.collection != 1" class="iconfont icon-ego-heart" @click.stop="collection(item.towerContentId, index)"></i>
                                    <i v-show="item.collection == 1" class="iconfont icon-guanzhu text-red" @click.stop="no_collection(item.towerContentId, index)"></i>
                                </span>
                                <div class="card-text text-ellipsis2">
                                    {{emptyFormat(item.content)}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
        <popup v-model="showSearch" height="100%" @on-show="searchFocus" @on-hide="showSearch=false">
            <div class="searchPopup">
                <search
                    v-model="value"
                    @on-submit="onSubmit"
                    @on-cancel="showSearch = false"
                    ref="search"
                    class=""
                    style="position:relative;top:0;z-index: 500;">
                </search>
                <div class="hotSearch">
                    <p class="title">热门搜索</p>
                    <div>
                        <!-- <a><i class="iconfont icon-remen"></i>流行色</a> -->
                        <a v-for="item in hotList" :key="item.id">{{item.keyword}}</a>
                    </div>
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
            /******************************二级tab的显示与隐藏************************* */
                touchstartY: 0,
                touchendY: 0,
                showSubTab: true,
                //  search
                results: [],
                hotList: [],            //  热门词
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

                showSearch: false,      //  是否显示搜索框
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.scrollerBottom.reset({top: 0})
            })
            this.$vux.loading.show()
            this.loadMore()
            this.getHotKey()
        },
        methods: {
            /****************************搜索框*********************************** */
            //  弹出搜索框时聚焦
            searchFocus(){
                setTimeout(() => {
                    this.$refs.search.setFocus()
                }, 100)
            },
            //  获取热门关键词
            getHotKey(){
                let params = new FormData()
                this.$post("getHotSearch", params, (data) => {
                    this.hotList = data.hotList
                })
            },


            or(a,b){
                return a || b;
            },
            //  将&nbsp;转为空格
            emptyFormat(str){
                if(str){
                    return str.replace(/&nbsp;/g, " ")  
                }else{
                    return ""
                }
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
                this.isEmpty = false
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
                this.top = e.top
            },
            touchstart(e){
                this.touchstartY = e.touches[0].pageY
            },
            touchmove(e){
                this.touchendY = e.touches[0].pageY
            },
            touchend(e){
                console.log(this.touchendY - this.touchstartY)
                if(this.touchendY - this.touchstartY > 90){
                    this.showSubTab = true
                }else if(this.touchendY - this.touchstartY < -90){
                    this.showSubTab = false
                }
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
                    this.contentShowList[index].collectionNum = parseInt(this.contentShowList[index].collectionNum) + 1
                })
            },
            //  取消收藏
            no_collection(id, index){
                let params = new FormData()
                console.log(id)
                params.append('towerContentId', id)
                this.$post("no_collection", params, (data) => {
                    this.contentShowList[index].collection = '0'
                    this.contentShowList[index].collectionNum = parseInt(this.contentShowList[index].collectionNum) - 1
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
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .bg-base{
        background: @baseColor;
    }
    .header{
        background: @baseColor;
        display: flex;
        height: 46px;
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
        // padding-top: 134px;
        padding-top: 46px;
        padding-bottom: 64px;
        background: #fff;
        .title{
            background: #fff;
            padding-left: 10px;
            font-weight: bold;
            i{
                color: #f36;
                font-weight: normal;
            }
        }
        .scroll-box{
            padding-top: 88px;
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
    .new-cardd-box{
        height: 250px;
        margin: 0 10px 10px 0;
        box-shadow: 3px 3px 10px 0 #777;
        background: #fff;
        border-radius: 4px;
        overflow: hidden;
        display: flex;
        .card-left{
            font-size: 12px;
            width: 160px;
            .card-img{
                width: 140px;
                height: 180px;
                background-size: cover;
                background-repeat: no-repeat;
                background-position: center;
                border: 1px solid #ddd;
                margin: 0 auto 10px;
                border-radius: 6px;
            }
            p a{
                background: #fe7129;
                color: #fff;
                width: 60px;
                height: 20px;
                text-align: center;
                line-height: 20px;
                border-radius: 10px;
                float: right;
            }
            .card-name{
                max-width: 60px;
                display: inline-block;
                overflow: hidden;
                white-space: nowrap;
                vertical-align: middle;
                margin-left: 10px;
                font-weight: bold;
            }
            .sex-box{
                background: #d79db3;
                border-radius: 50%;
                display: inline-block;
                width: 20px;
                height: 20px;
                text-align: center;
                i{
                    color: #fff;
                    font-size: 14px;
                    line-height: 20px;
                }
            }
            .label{
                display: flex;
                font-size: 12px;
                line-height: 30px;
                span{
                    flex: 1;
                    text-align: center;
                }
            }
        }
        .card-right{
            position: relative;
            box-shadow: -2px 2px 18px #777;
            width: 200px;
            margin-left: 6px;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            border-radius: 6px;
            color: #fff;
            font-size: 12px;
            .play-btn{
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                width: 50px;
                height: 50px;
                color: #fff;
                border-radius: 50%;
                text-align: center;
                background: rgba(51, 51, 51, 0.6);
                line-height: 50px;
                i{
                    font-size: 30px; 
                    position: relative; 
                    left: 2px;
                }
            }
            .handle-box{
                position: absolute;
                bottom: 0;
                width: 100%;
                display: flex;
                background: rgba(51, 51, 51, 0.6);
                align-items: center;
                .icon-box{
                    text-align: center;
                    padding-left: 6px;
                    i{
                        font-size: 24px;
                    }
                }
                .card-text{
                    padding: 2px 6px;
                    position: relative;
                    word-break: break-all;
                    box-sizing: border-box;
                    line-height: 20px;
                    flex: 1;
                }
            }
        }
    }

    .search-box{
        border: 8px solid @baseColor;
        width: 100%;
        background: #fff;
        text-align: center;
        line-height: 30px;
        border-radius: 40px;
    }
</style>
<style lang="less">
    .searchPopup{
        background: #f5f8f9;
        height: 100%;
        .weui-search-bar{
            background: #fff;
        }
        .weui-search-bar__cancel-btn{
            color: #aaaaaa;
        }
        .weui-search-bar__form{
            background: #fff;
        }
        .weui-search-bar__form:after{
            border-color: #fff;
        }
        .weui-search-bar__box{
            background: #f0f0f0;
            border-radius: 28px;
            .weui-search-bar__input{
                color: #b5b5b5;
            }
        }
        .hotSearch{
            background: #fff;
            padding: 0 10px;
            .title{
                color: #232424;
                padding: 6px 10px;
            }
            >div{
                overflow: hidden;
                a{
                    float: left;
                    border: 0.026667rem solid #eee;
                    line-height: 20px;
                    font-size: 12px;
                    border-radius: 20px;
                    padding: 5px 8px;
                    margin-bottom: 10px;
                    margin-right: 10px;
                    color: #484848;
                    i{
                        color: #ff2741;
                        font-size: 14px;
                    }
                } 
            }
        }
    }
</style>
