<template>
    <div class="page"> 
        <x-header :left-options="{backText: ''}">个人主页</x-header>
        <div class="main">
            <div class="header">
                <img :src="userInfo.icon" alt="">
                <p class="title">{{userInfo.name}}
                    <a v-show="isFollow != 1" class="attention active" @click.stop="follow(towerUserId_star)">+关注</a>
                    <a v-show="isFollow == 1" class="attention" @click.stop="no_follow(towerUserId_star)">已关注</a>
                    <!-- <span class="attention letter">私信</span> -->
                </p>
                <p>{{userInfo.introduce}}</p>
            </div>
            <div class="attention-box">
                <div class="attention-left">
                    <p>
                        <span class="num">{{userInfo.followNum}}</span>
                    </p>
                    <p>
                        <span>关注</span>
                    </p>
                </div>
                <div class="attention-right">
                    <p class="num">{{userInfo.fansNum}}</p>
                    <p>粉丝</p>
                </div>
            </div>
            <scroller lock-y :scrollbar-x=false>
                <div class="ability" :style="'width: '+ 22*(dribKindList.length + 1) +'vw;'">
                    <div :class="dribKindName == '' ? 'ability-item text-base' : 'ability-item'" @click="getDribByKind('', '', '')">
                        <p>全部</p>
                        <p class="num">&nbsp;</p>
                    </div>
                    <div :class="item.dribKindName == dribKindName ?'ability-item text-base' : 'ability-item'" v-for="(item, index) in dribKindList" :key="index" @click="getDribByKind(item.dribKindId, item.dribKindName, item.dribKindDetail)">
                        <p>{{item.dribKindName || '默认分类'}}</p>
                        <p class="num">{{item.dribKindNum}}</p>
                    </div>
                </div>
            </scroller>
            <div :style="(dribKindName && !dribKindDetail) ? 'height: 10px;' : ''"></div>
            <div v-show="!dribKindDetail" @click="popup0 = true">
                <div class="desc-info" v-show="dribKindName == ''">
                    <div class="card-info">
                        <img :src="cardUrls[0]" alt="">
                        <div>
                            <p>
                                <span class="sex-box" :style="sex == '女'? '' : 'background: #3399ff;'"><i :class="sex == '女'? 'iconfont icon-nv' : 'iconfont icon-male_icon'"></i></span>
                            </p>
                            <p v-for="(item, index) in label" :key="index">{{item}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="desc-info" v-show="dribKindDetail" @click="popup0 = true">
                <p>{{dribKindDetail}}</p>
            </div>
            <div class="hot-card" @click="toDetail(item.towerContentId, item.contentType)" v-for="(item, index) in contentList" :key="index">
                <div v-show="item.title" class="card-title text-ellipsis">{{item.title}}</div>
                <div v-show="item.content && item.contentType != 6" class="card-desc" :class="item.contentType == '0'? 'text-ellipsis12':'text-ellipsis2'">{{item.content}}</div>
                <div v-if="item.contentType == 2 || item.contentType == 3" class="video-box">
                    <img class="video-img" :src="item.videoImg">
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
                <div class="handle">{{longTime(item.createDate)}}
                    <i v-show="item.praise != 1" class="iconfont icon-dianzan1" @click.stop="praise(item.towerContentId, index)"></i>
                    <i v-show="item.praise == 1" class="iconfont icon-yijin13-zan text-red" @click.stop="no_praise(item.towerContentId, index)"></i>
                    <i class="iconfont icon-pinglun" @click.stop="toDetail(item.towerContentId, item.contentType, 1)"></i>
                    <i v-show="item.collection != 1" class="iconfont icon-ego-heart" @click.stop="collection(item.towerContentId, index)"></i>
                    <i v-show="item.collection == 1" class="iconfont icon-guanzhu text-red" @click.stop="no_collection(item.towerContentId, index)"></i>
                </div> 
            </div>
        </div>

    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, Scroller } from 'vux'
import { format } from 'url';

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
        },
        data () {
            return {
                index: 0,
                towerUserId_star: '',   //  id
                userInfo: {
                    name: '',
                    fansNum: '',
                    followNum: '',
                    introduce: '',
                    icon: '',
                },   //  用户信息
                isFollow: '',   //  是否关注
                dribKindList: [], //    类别
                contentList: [], //    内容

                dribKindName: '',        //  当前分类名称
                dribKindDetail: '',     //  分类描述
                dribKindId: '',         //  点滴分类id

                //  个人信息
                sex: '',
                label: [],
                cardUrls: [],
            }
        },
        activated(){
            this.towerUserId_star = this.$router.currentRoute.query.id

            let params = new FormData()
            this.$post("getusercard", params, (data) => {
                this.sex = data.sex
                this.label = this.toArray(data.label)
                this.cardUrls = data.cardUrls
            })
            
            this.getPersonalHomePage()
        },
        methods: {
            //  获取个人主页信息
            getPersonalHomePage(){
                let params = new FormData()
                params.append("towerUserId_star", this.towerUserId_star)
                this.$post("getPersonalHomePage", params, (data) => {
                    this.userInfo['name'] = data.name
                    this.userInfo['fansNum'] = data.fansNum
                    this.userInfo['followNum'] = data.followNum
                    this.userInfo['icon'] = data.icon
                    this.userInfo['introduce'] = data.introduce
                    this.isFollow = data.isFollow
                    this.dribKindList = data.dribKindList
                    this.contentList = data.contentList
                })
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

            //  获取分类内容
            getDribByKind(dribKindId, dribKindName, dribKindDetail){
                let that = this
                let params = new FormData()
                this.dribKindName = dribKindName
                this.dribKindDetail = dribKindDetail
                this.dribKindId = dribKindId
                if(dribKindId){
                    params.append("dribKindId", dribKindId)
                    this.$post('getdribbykind', params, (data)=>{
                        that.contentList = data.contentList;
                    })
                }else{
                    this.getPersonalHomePage()
                }
            },

            //  收藏
            collection(id, index){
                if(!this.$store.state.towerUserId){
                    this.toastSuccess("请先登录")
                    this.login()
                    return
                }
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
            //  点赞
            praise(id, index){
                if(!this.$store.state.towerUserId){
                    this.toastSuccess("请先登录")
                    this.login()
                    return
                }
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
        overflow: auto;
        .card-info{
            text-align: center;
            background: #fff;
            margin-bottom: 10px;
            padding: 10px 0 5px;
            img{
                max-width: 200px;
                max-height: 160px;
                border: 1px solid #ddd;
            }
            div{
                vertical-align: top;
                display: inline-block;
                p{
                    line-height: 30px;
                    color: #777;
                }
                .sex-box{
                    padding: 4px;
                    border-radius: 50%;
                    color: #fff;
                }
            }
        }
        .desc-info{
            padding: 10px;
            background: #fff;
            margin-bottom: 10px;
        }
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
                color: @baseColor;
                border-color: @baseColor;       
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
        .ability {
            height: 50px;
            position: relative;
            background: #fff;
            overflow: hidden;
            text-align: center;
            line-height: 24px;
            padding: 10px 0;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            .ability-item{
                float: left;
                width: 80px;
                .num{
                    font-weight: bold;
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
    }
</style>

