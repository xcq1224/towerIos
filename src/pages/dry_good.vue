<template>
    <div class="page"> 
        <x-header :left-options="{backText: ''}"><p @click="popup = true">干货<i class="iconfont icon-xia"></i></p></x-header>
        <div class="main">
            <scroller use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore(0)"
                use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh(0)"
                lock-x ref="scrollerBottom" height="100%">
                <div v-show="isEmpty">
                    <div class="employment-card" @click="toDetail(item.towerContentId, item.contentType)" v-for="(item, index) in contentList" :key="index">
                        <p class="title text-ellipsis">{{item.title}}</p>
                        <p>{{item.name}}</p>
                        <p>{{longTime(item.createDate)}}</p>
                    </div>
                </div>
                <div v-show="!isEmpty">
                    <div style="text-align: center;">暂无数据</div>
                </div>
            </scroller>
        </div>
        <!-- 筛选 -->
        <div v-show="popup" class="filter-wrap" @click="popup = false">
            <div class="filter">
                <p>
                    <span>生活</span>
                    <span>读研</span>
                    <span>留学</span>
                    <span>创业</span>
                    <span>职场</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import { Search} from 'vux'
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Scroller } from 'vux'
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
            Scroller,
        },
        data () {
            return {
                isEmpty: 1,
                contentList: [],    //  干货内容列表
                popup: false,

                //  刷新、加载
                pageNum: 1,
                barsNum: 10,            //  每页10条
                pullupDefaultConfig: pullupDefaultConfig,
                pulldownDefaultConfig: pulldownDefaultConfig,


            }
        },
        mounted(){
            this.refresh()
        },
        activated(){
            // document.getElementsByClassName('chosen')[0].scrollTop = this.chosenTop
            // this.chosenTop = 0
            // let params = new FormData()
            // this.$post("get_b_test", params, (data) => {
            //     this.contentList = data.contentList
            // })
        },
        methods: {
            //  加载数据
            fetchData(cb) {
                var that = this
                setTimeout(() => {
                    this.$nextTick(() => {
                        that.$refs.scrollerBottom.reset()
                    })
                    cb()
                }, 200)
            },
            //  下拉刷新
            refresh() {
                this.fetchData(data => {
                    this.pageNum = 1
                    this.$refs.scrollerBottom.donePulldown()
                    let params = new FormData()
                    params.append("pageNum", 1)
                    params.append("barsNum", this.barsNum.toString())
                    this.$vux.loading.show()
                    this.$post("get_b_test", params, (data) => {
                        this.contentList = data.contentList
                        this.isEmpty = data.contentList.length
                        if(data.contentList.length == this.barsNum){
                            this.pageNum = 2
                            this.$refs.scrollerBottom.donePullup()
                            this.$refs.scrollerBottom.enablePullup()
                        }else{
                            this.$refs.scrollerBottom.disablePullup()
                        }
                    })
                })
            },
            //  加载首页数据
            loadMore(type) {
                this.fetchData(() => {
                    let params = new FormData()
                    params.append("pageNum", this.pageNum)
                    params.append("barsNum", this.barsNum.toString())
                    this.$post("get_b_test", params, (data) => {
                        this.contentList = this.contentList.concat(data.contentList)
                        this.isEmpty = this.contentList.length
                        if(data.contentList.length == this.barsNum){
                            this.pageNum++
                            this.$refs.scrollerBottom.donePullup()
                        }else{
                            this.$refs.scrollerBottom.disablePullup()
                        }
                    })
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
        padding: 46px 0 0;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        z-index: 1;
        background: #f2f2f2;
        font-size: 12px;
    }
    .vux-tab-wrap{
        z-index: 2;
    }
    .vux-slider{
        height: 100%;
        top: -44px;
        padding-top: 44px;
        box-sizing: border-box;
        z-index: 1;
    }
    .vux-swiper-item{
        height: 100%;
        overflow: auto;
    }
    .employment-card{
        padding: 15px 8px;
        border-bottom: 1px solid #ddd;
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
            &.title{
                font-weight: bold;
                font-size: 14px;
            }
            line-height: 24px;
        }
    }
    .filter-wrap{
        position: absolute;
        top: 0px;
        left: 0;
        z-index: 10;
        height: 100%;
        width: 100%;
        .filter{
            background: #fff;
            margin-top: 46px;
            padding-bottom: 20px;
            box-shadow: 3px 0px 4px #ccc;
            p{
                padding: 15px 15px 0;
                span{
                    padding: 0 10px;
                }
            }
        }
    }
</style>

