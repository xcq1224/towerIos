<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}">确认订单</x-header>
        <div class="main">
            <div class="user-info">
                <img :src="params.imgUrls[0]" width="28" height='28' alt="">&nbsp;&nbsp;{{params.name}}&nbsp;<i class='iconfont icon-zhongfu'></i>
            </div>
            <div class="card">
                <img :src="params.imgUrl_1" width="118" height="70">
                <p class="title">{{params.title}}</p>
                <p>永久有效</p>
                <p><span class="price">￥{{params.price}}</span></p>
            </div>
            <div class="total">总计：￥{{params.price}}</div>
            <p class="pay-title">选择支付方式</p>
            <div class="pay-item">
                <p><img src="../assets/alipay.png" height="60" alt=""></p>
                <span v-show="payIndex != 1"><i class="weui-icon weui_icon_circle weui-icon-circle"></i></span>
                <span v-show="payIndex == 1"><i class="weui-icon weui_icon_success weui-icon-success" style="color: #f25f30;"></i></span>
            </div>
        </div>
        <div class="footer">
            <div class="footer-left">实付金额：<span>￥{{params.price}}</span></div>
            <div class="footer-right" @click="confirmPay">确认支付</div>
        </div>
    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { XTextarea, Checklist } from 'vux'

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            XTextarea,
            Checklist,
        },
        data () {
            return {
                payIndex: 1,
                query: {},
                params: {}
            }
        },
        activated(){
            this.query = this.$router.currentRoute.query
            let params = new FormData()
            params.append("towerContentId", this.query.id)
            this.$post("getcontentbyid", params, (data) => {
                this.params = data.content
            })
        },
        methods: {
            change (val, label) {
                console.log('change', val, label)
            },
            confirmPay(){
                let towerUserId = this.$store.state.towerUserId
                let towerContentId = this.params.towerContentId
                let contentType = '3'
                this.alipay(towerUserId, towerContentId, contentType)
            }
            
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding-top: 46px;
        background: #f7f7f7;
    }
    .user-info{
        padding: 8px 8px 0;
        background: #fff;
        img{
            border-radius: 50%;
            vertical-align: middle;
        }
    }
    .card{
        padding: 12px 8px;
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
            color: #ccc;
            &.title{
                color: #777;
                font-weight: bold;
                height: 38px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .price{
                color: #f00;
            }
        }
    }
    .total{
        text-align: right;
        line-height: 40px;
        padding-right: 8px;
        padding-bottom: 10px;
        background: #fff;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    }
    .pay-title{
        padding-top: 14px;
        line-height: 30px;
        border-bottom: 1px solid #ddd;
        padding-left: 20px;
    }
    .pay-item{
        background: #fff;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        p{
            float: left;
            width: 300px;
            overflow: hidden;
        }
        span{
            float: right;
            margin-right: 15px;
        }
        i{
            font-size: 26px;
            line-height: 60px;
        }
    }
    .footer{
        background: @baseColor;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 46px;
        display: flex;
        z-index: 2;
        .footer-left{
            flex: 1;
            background: #fff;
            line-height: 46px;
            padding-left: 15px;
            span{
                color: #f00;
            }
        }
        .footer-right{
            width: 94px;
            line-height: 46px;
            color: #fff;
            text-align: center;
        }
    }
</style>


