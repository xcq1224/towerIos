<template>
    <div class="page"> 
        <x-header :left-options="{backText: ''}">技能才干</x-header>
        <div class="main">
            <div class="card">
                <div class="title">穿衣也是有讲究的</div>
                <div class="desc">云上塔兮 Abby <span class="num">1092</span>人在学</div>
                <div class="img-box">
                    <img src="https://bpic.588ku.com/video_listen/588ku_pic/18/05/12/0fdf8381536e27ee15f7a633027c9a96.jpg!/fw/320" alt="">
                </div>
                <div class="handle">2018-08-08
                    <span class="price">￥35.00</span>
                </div>
            </div>
            <div class="card">
                <div class="title">穿衣也是有讲究的</div>
                <div class="desc">云上塔兮 Abby <span class="num">1092</span>人在学</div>
                <div class="img-box">
                    <img src="https://bpic.588ku.com/video_listen/588ku_pic/18/05/12/0fdf8381536e27ee15f7a633027c9a96.jpg!/fw/320" alt="">
                </div>
                <div class="handle">2018-08-08
                    <span class="price">￥35.00</span>
                </div>
            </div>
            <div class="card">
                <div class="title">穿衣也是有讲究的</div>
                <div class="desc">云上塔兮 Abby <span class="num">1092</span>人在学</div>
                <div class="img-box">
                    <img src="https://bpic.588ku.com/video_listen/588ku_pic/18/05/12/0fdf8381536e27ee15f7a633027c9a96.jpg!/fw/320" alt="">
                </div>
                <div class="handle">2018-08-08
                    <span class="price">￥35.00</span>
                </div>
            </div>
            <div class="card">
                <div class="title">穿衣也是有讲究的</div>
                <div class="desc">云上塔兮 Abby <span class="num">1092</span>人在学</div>
                <div class="img-box">
                    <img src="https://bpic.588ku.com/video_listen/588ku_pic/18/05/12/0fdf8381536e27ee15f7a633027c9a96.jpg!/fw/320" alt="">
                </div>
                <div class="handle">2018-08-08
                    <span class="price">￥35.00</span>
                </div>
            </div>
            <div class="card">
                <div class="title">穿衣也是有讲究的</div>
                <div class="desc">云上塔兮 Abby <span class="num">1092</span>人在学</div>
                <div class="img-box">
                    <img src="https://bpic.588ku.com/video_listen/588ku_pic/18/05/12/0fdf8381536e27ee15f7a633027c9a96.jpg!/fw/320" alt="">
                </div>
                <div class="handle">2018-08-08
                    <span class="price">￥35.00</span>
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
            img{
                width: 100%;
                height: auto;
            }
            .title{
                font-weight: bold;
                margin: 5px 0;
                font-size: 14px;
            }
            .desc{
                color: #ccc;
                margin-bottom: 5px;
                .num{
                    color: #777;
                }
            }
            .handle{
                color: #ccc;
                margin: 5px 0;
                .price{
                    color: #f00;
                    float: right;
                    font-weight: bold;
                }
            }
        }
    }
</style>

