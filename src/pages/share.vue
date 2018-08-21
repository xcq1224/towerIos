<template>
    <div class="page"> 
        <div class="main">
            <div class="header">
                <img src="../assets/logo.png" alt=""><span>塔兮</span>
                <router-link to="./download" class="open">打开</router-link>
            </div>
            <div class="hot-card">
                <div class="user-info">
                    <img :src="params.iconUrl" width="28" height='28' alt="">{{params.name}}<i class='iconfont icon-zhongfu'></i>
                </div>
                <div class="card-title">{{params.title}}</div>
                <div class="card-desc" style="max-height: inherit;">{{params.content}}</div>
                <div class="video-box"  v-if="params.contentType > 1" @click="openVideo(params.videoUrl, params.videoImg)">
                    <img class="video-img" :src="params.videoImg" alt="">
                    <span class="play-btn"><i class="iconfont icon-bofang" style="font-size: 30px;"></i></span>
                </div>
                <div class="pictures-box" v-if="params.contentType==1 && params.imgUrl_2">
                    <div v-show="params.imgUrl_1"><img :src="params.imgUrl_1" alt=""></div>
                    <div v-show="params.imgUrl_2"><img :src="params.imgUrl_2" alt=""></div>
                    <div v-show="params.imgUrl_3"><img :src="params.imgUrl_3" alt=""></div>
                </div>
                <div class="pictures-box" v-if="params.contentType==1 && !params.imgUrl_2">
                    <img :src="params.imgUrl_1" alt="">
                </div>
                <div class="handle">{{longTime(params.createDate)}}</div> 
            </div>
        </div>
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
                commonText: '',
                query: {},      //  页面get参数
                params: {},     //  内容详细信息
            }
        },
        activated(){
            this.query = this.$router.currentRoute.query
            //  获取详情数据
            this.getDetail()
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
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        .header{
            padding: 10px;
            margin-bottom: 10px;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.1);
            img{
                width: 36px;
                height: 36px;
                vertical-align: middle;
                margin-right: 10px;
            }
            .open{
                float: right;
                width: 72px;
                height: 28px;
                line-height: 28px;
                text-align: center;
                border-radius: 14px;
                background: #008ab1;
                color: #fff;
                margin-top: 4px;
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
    }
</style>

