<template>
    <div class="page"> 
        <x-header :left-options="{backText: ''}">干货<span slot="right"><i class="iconfont icon-ego-heart"></i><i class="iconfont icon-dianzan1"></i></span></x-header>
        <div class="main">
            <div class="article-box">
                <div class="user-info">
                    <img src="" width="40" height='40' alt="">曾庆全<a class="active">+关注</a>
                </div>
                <div class="title">
                    资深HR解析--我们到底需要什么人？
                </div>
                <p class="datetime">就业&nbsp;&nbsp;&nbsp;&nbsp;2018-08-08 08:08</p>
                <div style="padding: 10px;">
                    <div class="picture-box">
                        <img src="" alt="">
                    </div>
                </div>
                <div class="article">
                    <p>一位资深HR前辈写给还在路上的HR的《HR成长启示录》：“人生的路很长，但关键的只有几步。”即便是熟知职业生涯规划
                    的HR，当你走上职场发展之路时，依然会遇到各种困境，往往很难分辨哪几步至为关键。如何破解HR职业发展中的难题，走
                    好职场每一步，实现HR个人价值的最大化呢？下面我们将分阶段向您讲解如何走好这关键的几步：</p>
                    <p>1、新HR的困惑出于多方面的原因，或因为不像销售人员那样受公司重视、或因为每天周而复始的处理大量琐碎的事务性工作、
                    或因为职业升迁机会太少，不少刚入行的HR出现了这样或那样的困惑，这时大家应该弄清楚自己到底是“职业困惑”还是“职位困惑”，
                    也就是说是不喜欢也不适合这个职业还是这个职位带给自己的成就感太低，这是准备在这个行当继续发展下去的每一个HR都要深思熟虑的事情。</p>
                    <p>这里面涉及到的是面对比较浮躁的社会，HR应如何理性思考自己的现实状况和职业发展规划的问题。跳槽或许能够暂时解决职位晋升问题，
                    但是如果内心真正的职业困惑没有解决，还是无济于事。</p>
                </div>
            </div>
            <div class="comment">
                <div class="tab"><span>评论</span></div>
                <div class="comment-card">
                    <div class="title">
                        <img src="" width="28" height='28' alt="">曾庆全
                        <span>2018-05-04 08:08</span>
                    </div>
                    <p>挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的
                        挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的
                    </p>
                </div>
                <div class="comment-card">
                    <div class="title">
                        <img src="" width="28" height='28' alt="">曾庆全
                        <span>2018-05-04 08:08</span>
                    </div>
                    <p>挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的
                        挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的挺好的
                    </p>
                </div>
            </div>
        </div>
        <div class="footer">评论</div>
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
        display: flex;
        flex-direction: column;
        background: #f2f2f2;
        overflow: auto;
    }
    .article-box{
        background: #fff;
        .user-info{
            overflow: hidden;
            padding: 10px;
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
        .title{
            font-size: 16px;
            font-weight: bold;
            padding: 6px 10px;
            span{
                float: right;
                color: @baseColor;
                border-color: @baseColor;
            }
        }
        .datetime{
            padding: 0 10px 5px;
            color: #ccc;
        }
        .article{
            padding: 0 10px;
            line-height: 18px;
            p{
                margin-bottom: 15px;
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
</style>

