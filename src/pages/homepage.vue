<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}">个人主页</x-header>
        <div class="header pst">
            <img :src="userInfo.icon" alt="">
            <p class="title">{{userInfo.name}}
                <a @click="showPop1 = true" style="float: right;margin-left: 6px;"><i class="iconfont icon-tainjia-copy"></i></a>
                <a v-show="isFollow != 1" class="attention active" @click.stop="follow(query.id)">+关注</a>
                <a v-show="isFollow == 1" class="attention" @click.stop="no_follow(query.id)">已关注</a>
                <span class="attention letter">聊一下</span>
            </p>
            <p>{{userInfo.introduce}}</p>
        </div>
        <div class="attention-box pst" style="z-index: 1">
            <div class="attention-left">
                <p class="num">
                    <!-- <span>4.9</span> -->
                    <span class="font14">还没⼈给Ta打分</span>
                </p>
                <p>
                    <span>大众印象</span>
                </p>
            </div>
            <div class="attention-right">
                <p class="num">{{userInfo.fansNum}}</p>
                <p>粉丝</p>
            </div>
        </div>
        <scroller lock-y :scrollbar-x=false class="pst" style="z-index: 1">
            <div class="box1">
                <div class="ability-item">
                    <p @click="popup8 = true">分类</p>
                </div>
                <div class="ability-item">
                    <p @click="popup9 = true">时间</p>
                </div>
                <div class="ability-item">
                    <p @click="popup10 = true">城市</p>
                </div>
                <div class="ability-item">
                    <p @click="popup5 = true">心情</p>
                </div>
                <div class="ability-item">
                    <p @click="popup6 = true">天气</p>
                </div>
                <div class="ability-item">
                    <p @click="popup7 = true">场景</p>
                </div>
                <!-- <div class="ability-item">
                    <p>足迹</p>
                </div> -->
            </div>
        </scroller>
        <div class="main">
            <scroller v-show="!isEmpty" use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore"
                use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh"
                lock-x ref="scrollerBottom" height="-245" @on-scroll="onScroll">
                <div class="scroll-box">
                    <div class="hot-card" v-if="!dribKindId && !filterFiled">
                        <div class="thumbnail" :style="{backgroundImage: 'url(' + cardUrls[0] + ')' }" style="margin-right: 5px;"></div>
                        <div class="bit-content" style="text-align: left;">
                            <p class="bit-time">他的名片</p>
                            <p class="bit-address">&nbsp;</p>
                            <p class="" v-for="(item, index) in label" :key="index">{{item}}</p>
                        </div>
                    </div>
                    <div v-else-if="!contentShowList.length" style="text-align: center; line-height: 40px;">没有找到任何记录！</div>
                    <div class="hot-card" @click="toDetail(item.towerContentId, item.contentType)" v-for="(item, index) in contentShowList" :key="index">
                        <div v-if="item.imgUrls.length" class="thumbnail" :style="{backgroundImage: 'url(' + item.imgUrls[0] + ')' }"></div>
                        <div v-if="item.videoImg" class="thumbnail bit-video iconfont icon-bofang1" :style="{backgroundImage: 'url(' + item.videoImg + ')' }"></div>
                        <div class="bit-content">
                            <p class="bit-time">{{formatDate(item.createDate, 'yyyy.MM.dd')}}</p>
                            <p class="bit-address">{{item.position || '&nbsp;'}}</p>
                            <p class="content-text text-ellipsis2" style="word-break: break-all;-webkit-line-clamp: 3;">{{item.content}}</p>
                            <p class="bit-card-ft">
                                <img v-if="item.mood != '0' && item.mood" :src="'/static/mood' + item.mood + '.png'" width="16"/>
                                <img v-if="item.weather != '0' && item.weather" :src="'/static/weather' + item.weather + '.png'" width="16"/>
                                <img v-if="item.scene != '0' && item.scene" :src="'/static/scene' + item.scene + '.png'" width="16"/>
                            </p>
                        </div>
                    </div>
                </div>
            </scroller>
        </div>
        <!-- 筛选 -->
        <div v-show="popup5" class="filter-wrap" @click="popup5 = false">
            <div class="filter" style="background: #24ceff;">
                <p>
                    <img src="/static/mood1.png" alt="" @click="filter('mood', '1')">
                    <img src="/static/mood2.png" alt="" @click="filter('mood', '2')">
                    <img src="/static/mood3.png" alt="" @click="filter('mood', '3')">
                    <img src="/static/mood4.png" alt="" @click="filter('mood', '4')">
                    <img src="/static/mood5.png" alt="" @click="filter('mood', '5')">
                    <img src="/static/mood6.png" alt="" @click="filter('mood', '6')">
                </p>
            </div>
        </div>
        <div v-show="popup6" class="filter-wrap" @click="popup6 = false">
            <div class="filter" style="background: #24ceff;">
                <p>
                    <img src="/static/weather1.png" alt="" @click="filter('weather', '1')">
                    <img src="/static/weather2.png" alt="" @click="filter('weather', '2')">
                    <img src="/static/weather3.png" alt="" @click="filter('weather', '3')">
                    <img src="/static/weather4.png" alt="" @click="filter('weather', '4')">
                    <img src="/static/weather5.png" alt="" @click="filter('weather', '5')">
                    <img src="/static/weather6.png" alt="" @click="filter('weather', '6')">
                </p>
            </div>
        </div>
        <div v-show="popup7" class="filter-wrap" @click="popup7 = false">
            <div class="filter" style="background: #24ceff;">
                <p>
                    <img src="/static/scene1.png" alt="" @click="filter('scene', '1')">
                    <img src="/static/scene2.png" alt="" @click="filter('scene', '2')">
                    <img src="/static/scene3.png" alt="" @click="filter('scene', '3')">
                    <img src="/static/scene4.png" alt="" @click="filter('scene', '4')">
                    <img src="/static/scene5.png" alt="" @click="filter('scene', '5')">
                    <img src="/static/scene6.png" alt="" @click="filter('scene', '6')">
                </p>
            </div>
        </div>
        <div v-show="popup8" class="filter-wrap" @click="popup8 = false">
            <div class="filter" style="background: #24ceff;padding-bottom: 0;">
                <scroller v-show="dribKindList.length>5" lock-y :scrollbar-x=false>
                    <div class="box2" :style="'width: '+ 22*(dribKindList.length + 1) +'vw;'">
                        <div :class="dribKindName == '' ? 'ability-item text-base' : 'ability-item'" @click="getDribByKind('', '', '')">
                            全部
                        </div>
                        <div :class="item.dribKindName == dribKindName ?'ability-item text-base' : 'ability-item'" v-for="(item, index) in dribKindList" :key="index" @click="getDribByKind(item.dribKindId, item.dribKindName, item.dribKindDetail)">
                            {{item.dribKindName || '默认分类'}}
                        </div>
                    </div>
                </scroller>
            </div>
        </div>
        <div v-show="popup9" class="filter-wrap" @click="popup9 = false">
            <div class="filter" style="background: #24ceff;padding-bottom: 0;display: flex;">
                <div class="filter-date" style="flex: 1;">
                    <datetime v-model="startTime" @on-clear="startTime = ''" clear-text="清除" @click.native.stop class="date-custom" format="YYYY-MM-DD"></datetime>
                </div>
                <span class="data_">~</span>
                <div class="filter-date" style="flex: 1;">
                    <datetime v-model="endTime" @on-clear="endTime = ''" clear-text="清除" @click.native.stop class="date-custom" format="YYYY-MM-DD"></datetime>
                </div>
                <span class="data_" @click="refresh">确定&nbsp;&nbsp;</span>
            </div>
        </div>
        <div v-show="popup10" class="filter-wrap" @click="popup10 = false">
            <div class="filter city-box" style="background: #24ceff;">
                <div>
                    <span class="city-item" v-for="(item, index) in cityList" :key="index" @click="filter('city', item)">{{item}}</span>
                </div>
            </div>
        </div>
        <popup v-model="showPop1">
            <div class="complaint">
                <p @click="shield">屏蔽</p>
                <p @click="showPop1 = false">取消</p>
            </div>
        </popup>
    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, Scroller, Popup, Group, XInput } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, XTextarea, Radio, Icon, Datetime } from 'vux'
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
            Popup,
            Group,
            XInput,
            XTextarea,  
            Radio,
            Icon,
            Datetime,
        },
        data () {
            return {
                query: {},      //  页面传参
                userInfo: {
                    name: '',
                    fansNum: '',
                    followNum: '',
                    introduce: '',
                    icon: '',
                },   //  用户信息
                isFollow: '',   //  是否关注

                //  个人信息
                label: [],
                cardUrls: [],

                contentAllList: [],     //  所有数据
                contentShowList: [],    //  页面显示数据    
                dribKindList: [],       //  点滴分类列表 
                length: 5,              //  显示数据长度
                pageNum: 1,             //  当前页
                dribKindId: '',         //  点滴分类id
                dribKindName: '',        //  当前分类名称
                dribKindDetail: '',     //  分类描述

                //  刷新、加载
                pullupDefaultConfig: pullupDefaultConfig,
                pulldownDefaultConfig: pulldownDefaultConfig,
                isEmpty: false,         //  没有数据

            //  修改内容分类
                popup4: false,          
                kinds: [],              //  分类列表
                kind: '',               //  选择分类
                towerContentId: '',     //  当前编辑的内容id
            //  筛选
                popup5: false,
                popup6: false,
                popup7: false,
                popup8: false,
                popup9: false,
                popup10: false,
                filterFiled: '',
                filterType: '',
                startTime: '',
                endTime: '',
                cityList: [],
                showPop1: false,     //  投诉弹框
            }
        },
        mounted(){
            
        },
        activated(){
            this.contentShowList = []
            this.contentAllList = []
            this.userInfo = {}
            this.isFollow = false
            this.pageNum = 1
            this.query = this.$router.currentRoute.query
            this.$nextTick(() => {
                this.$refs.scrollerBottom.reset({top: 0})
            })
            this.$vux.loading.show()
            this.getusercard()
            this.getPersonalHomePage()
            this.loadMore()
            this.getCity()
        },
        deactivated(){
            this.popup5 = false
            this.popup6 = false
            this.popup7 = false
            this.popup8 = false
            this.popup9 = false
            this.popup10 = false
        },
        methods: {
            // 获取名片
            getusercard(){
                let params = new FormData()
                params.append("towerUserId", this.query.id)
                this.$post("getusercard", params, (data) => {
                    this.label = this.toArray(data.label)
                    this.cardUrls = data.cardUrls
                })
            },
            //  获取个人主页信息
            getPersonalHomePage(){
                let params = new FormData()
                params.append("towerUserId_star", this.query.id)
                this.$post("getPersonalHomePage", params, (data) => {
                    this.userInfo['name'] = data.name
                    this.userInfo['fansNum'] = data.fansNum
                    this.userInfo['followNum'] = data.followNum
                    this.userInfo['icon'] = data.icon
                    this.userInfo['introduce'] = data.introduce
                    this.isFollow = data.isFollow
                    this.dribKindList = data.dribKindList
                    // this.contentList = data.contentList
                })
            },
            //获取城市列表
            getCity(){
                let params = new FormData()
                params.append("towerUserId", this.query.id)
                this.$post("getdribcity", params, (data) => {
                    this.cityList = data.cityList
                })
            },

            //  筛选
            filter(filterFiled, filterType){
                this.filterFiled = filterFiled
                this.filterType = filterType
                this.dribKindId = ''
                this.dribKindName = ''
                this.dribKindDetail = ''
                this.refresh()
            },

            //  获取分类内容
            getDribByKind(dribKindId, dribKindName, dribKindDetail){
                this.dribKindName = dribKindName
                this.dribKindDetail = dribKindDetail
                this.dribKindId = dribKindId
                this.filterFiled = ''
                this.filterType = ''
                this.refresh()
            },

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
                    params.append("dribKindId", this.dribKindId)
                    params.append(this.filterFiled, this.filterType)
                    params.append("startTime", this.startTime)
                    params.append("endTime", this.endTime)
                    params.append("towerUserId", this.query.id)
                    this.$vux.loading.show()
                    this.$post("getdrib", params, (data) => {
                        // this.dribKindName = dribKindName
                        // this.dribKindDetail = dribKindDetail
                        this.$refs.scrollerBottom.reset({top: 0})
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
                    params.append("dribKindId", this.dribKindId)
                    params.append(this.filterFiled, this.filterType)
                    params.append("startTime", this.startTime)
                    params.append("endTime", this.endTime)
                    params.append("towerUserId", this.query.id)
                    this.$vux.loading.show()
                    this.$post("getdrib", params, (data) => {
                        data.contentList.map(item => {
                            item['isError'] = false
                            this.contentShowList.push(item)
                        })
                        if(data.contentList.length == 5){
                            this.pageNum += 1
                            this.$refs.scrollerBottom.donePullup()
                        }else{
                            this.$refs.scrollerBottom.disablePullup()
                        }
                    })
                })
            },
            onScroll(e){
                
            },
            //  关注
            follow(id){
                if(!this.$store.state.towerUserId){
                    this.toastSuccess("请先登录")
                    this.login()
                    return
                }
                let params = new FormData()
                params.append('towerUserId_fans', id)
                this.$post("follow", params, (data) => {
                    this.isFollow = '1'
                })
            },
            //  取消关注
            no_follow(id){
                let params = new FormData()
                params.append('towerUserId_fans', id)
                this.$post("no_follow", params, (data) => {
                    this.isFollow = '0'
                })
            },
            //  屏蔽
            shield(){
                if(!this.$store.state.towerUserId){
                    this.login()
                    return
                }
                let params = new FormData()
                params.append("towerUserId_shield", this.query.id)
                this.$post("shield", params, (data) => {
                    this.toastSuccess("屏蔽成功！")
                    this.showPop1 = false
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .header{
        background: #fff;
        padding: 10px;
        font-size: 12px;
        color: #ccc;
        overflow: hidden;
        img{
            width: 46px;
            height: 46px;
            border-radius: 50%;
            margin-right: 10px;
            float: left;
            border: 1px solid #ddd;
        }
        .title{
            color: #777;
            font-size: 14px;
            line-height: 24px;
        }
        .attention{
            float: right;
            margin-left: 10px;
        }
        .letter{
            color: #fff;
            border-color: coral;       
            background: coral;
        }
    }
    .attention-box{
        background: #fff;
        padding: 10px 0;
        overflow: hidden;
        margin: 10px 0;
        >div{
            width: 50%;
            float: left;
            text-align: center;
        }
        .num{
            font-size: 16px;
            padding-bottom: 5px;
        }
        .attention-left{
            border-right: 1px solid #ddd;
            box-sizing: border-box;
            float: left;
            text-align: center;
            img{
                width:20px;
                height: 20px;
                border-radius: 50%;
                position: relative;
                top: 12px;
                left: 3px;
            }
            p:last-of-type{
                img{
                    visibility: hidden;
                }
            }
        }
    }
    .box1 {
        position: relative;
        display: flex;
        background: #fff;
        overflow: hidden;
        text-align: center;
        line-height: 40px;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        .ability-item{
            float: left;
            flex: 1;
        }
    }
    .ability{
        background: #fff;
        overflow: hidden;
        text-align: center;
        line-height: 24px;
        padding: 10px 0;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        margin-bottom: 10px;
        .ability-item{
            float: left;
            width: 22vw;
            .num{
                font-weight: bold;
            }
        }
    }
    .desc-info{
        background: #fff;   
        padding: 10px;
        line-height: 20px;
        color: #ccc;
    }
    .main{
        padding: 245px 0 0;
        background: #f2f2f2;
        font-size: 12px;
        .scroll-box{
            background: #fff;
            overflow: hidden;
            padding: 0 5px;
            position: relative;
            &:after{
                content: '';
                width: 1px;
                height: 100%;
                position: absolute;
                left: 50%;  
                background: #333;
            }
        }
        .hot-card{
            background: #fff;
            margin-bottom: 15px;
            padding-right: 3px;
            color: #777;
            float: left;
            width: 50%; 
            box-sizing: border-box;
            min-height: 160px;
            overflow: hidden;
            border-top-left-radius: 6px;
            position: relative;
            &:before{
                content: "";
                display: block;
                height: 1px;
                width: calc(100% - 3px);
                background: #333;
                position: absolute;
                right: 0;
            }
            &:nth-of-type(2n){
                float: right;
                border-top-left-radius: 0;
                border-top-right-radius: 6px;
                padding-left: 3px;
                padding-right: 0;
                .thumbnail{
                    float: right;
                }
                &:before{
                    left: 0;
                }
                .bit-content{
                    text-align: left; 
                }
                .bit-card-ft{
                    text-align: right;
                }
            }
            &:nth-of-type(2){
                margin-top: 120px;
            }
            &:nth-of-type(1){
                margin-top: 20px;
            }
            .thumbnail{
                height: 110px;
                width: 110px;
                float: left;
                margin: 0;
                margin-bottom: 5px;
                border: 1px solid #333;
                border-radius: 6px;
                position: relative;
            }
            .bit-video:before{
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                top: 0;
                margin: auto;
                width: 40px;
                height: 40px;
                font-size: 40px;
                line-height: 40px;
                color: #fff;
            }
            .bit-content{
                text-align: right; 
            }
            .content-text{
                margin-bottom: 24px;
            }
            .bit-time{
                font-weight: bold;
            }
            .bit-card-ft{
                text-align: left;
                clear: both;
            }
        }
    }
    .btn-add{
        height: 46px;
        margin: 10px 0;
        background: #fff;
        padding-left: 10px;
        line-height: 46px;
        i{
            font-size: 20px;
            vertical-align: middle;
            color: #ccc;
        }
        a{
            color: @baseColor;
            font-size: 14px;
        }
    }
    .items{
        overflow: hidden;
        .list-item{
            position: relative;
            height: 46px;
            line-height: 46px;
            -webkit-transition: all 0.2s;
            transition: all 0.2s;
            border-bottom: 1px solid #ddd;
            .list-box{
                padding: 0 10px;
                background: #fff;
                box-sizing: border-box;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
            }
            .handle{
                width: 120px;
                color: #fff;
                text-align: center;
                position: absolute;
                top:0;
                right: -120px;
                display: flex;
                .edit{
                    flex: 1;
                    background: #fbce77;
                }
                .delete{
                    flex: 1;
                    background: #ccc;
                }
            }
        }
    }
    .weui-cell{
        font-size: 14px;
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
            margin-top: 248px;
            height: 40px;
            p{
                padding: 0 15px 0;
                line-height: 40px;
            }
            .label{
                margin-right: 20px;
            }
            img{
                width: 30px;
                height: 30px;
                vertical-align: middle;
                margin: 0 3px;
            }
        }
        .data_{
            line-height: 40px;
            color: #fff;
            font-weight: bold;
        }
        .date-custom{
            height: 20px;
            background: #fff;
            padding: 5px;
            margin: 5px;
            display: block;
        }
    }
    .box2{
        position: relative;
        overflow: hidden;
        text-align: center;
        line-height: 40px;
        color: #fff;
        .ability-item{
            float: left;
            width: 80px;
        }
    }
    .city-box{
        line-height: 40px;
        // padding-bottom: 0 !important;
        height: 40px;
        box-sizing: border-box;
        overflow: hidden;
        >div{
            overflow: auto;
            height: 50px;
            color: #fff;
            padding-right: 10px;
            span{
                padding-left: 10px;
            }
        }
    }
    .complaint{
        background: #fff;
        line-height: 40px;
        text-align: center;
        p{
            border-bottom: 1px solid #ddd;
        }
        p:nth-of-type(2){
            border-bottom: none;
            border-top: 4px solid #ddd;
        }
    }
</style>
<style lang="less">
    .page .date-custom .weui-cell__ft{
        padding-right: 0;
        text-align: center;
        &:after{
            display: none;
        }
    }
</style>

