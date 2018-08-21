<template>
    <div class="page"> 
        <x-header :left-options="{backText: ''}">视频教学</x-header>
        <div class="main">
            <div class="card">
                <div class="title">教你快速搭建一款基于arduino的机器人</div>
                <video src="http://bpic.588ku.com/video_listen/588ku_video/18/05/21/12/16/37/video5b0248257ae31.mp4"></video>
                <div class="handle">2018-08-08
                    <i class="iconfont icon-dianzan1"></i>
                    <i class="iconfont icon-pinglun"></i>
                </div>
            </div>
            <div class="card">
                <div class="title">教你快速搭建一款基于arduino的机器人</div>
                <video src="http://bpic.588ku.com/video_listen/588ku_video/18/05/21/12/16/37/video5b0248257ae31.mp4"></video>
                <div class="handle">2018-08-08
                    <i class="iconfont icon-dianzan1"></i>
                    <i class="iconfont icon-pinglun"></i>
                </div>
            </div>
            <div class="card">
                <div class="title">教你快速搭建一款基于arduino的机器人</div>
                <video src="http://bpic.588ku.com/video_listen/588ku_video/18/05/21/12/16/37/video5b0248257ae31.mp4"></video>
                <div class="handle">2018-08-08
                    <i class="iconfont icon-dianzan1"></i>
                    <i class="iconfont icon-pinglun"></i>
                </div>
            </div>
            <div class="card">
                <div class="title">教你快速搭建一款基于arduino的机器人</div>
                <video src="http://bpic.588ku.com/video_listen/588ku_video/18/05/21/12/16/37/video5b0248257ae31.mp4"></video>
                <div class="handle">2018-08-08
                    <i class="iconfont icon-dianzan1"></i>
                    <i class="iconfont icon-pinglun"></i>
                </div>
            </div>
            <div class="card">
                <div class="title">教你快速搭建一款基于arduino的机器人</div>
                <video src="http://bpic.588ku.com/video_listen/588ku_video/18/05/21/12/16/37/video5b0248257ae31.mp4"></video>
                <div class="handle">2018-08-08
                    <i class="iconfont icon-dianzan1"></i>
                    <i class="iconfont icon-pinglun"></i>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'

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
        },
        data () {
            return {
                index: 0,
            }
        },
        methods: {
           
            
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
        .card{
            padding: 5px 10px 3px;
            background: #fff;
            margin-bottom: 1px;
            color: #777;
            .title{
                font-weight: bold;
                margin: 8px 0;
                font-size: 14px;
            }
            video{
                width: 100%;
                height: auto;
            }
            .handle{
                color: #ccc;
                margin: 3px 0;
                i{
                    float: right;
                    margin-right: 10px;
                    font-size: 20px;
                    line-height: 22px;
                }
            }
        }
    }
</style>

