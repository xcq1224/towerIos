<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}"><span>我的订单</span></x-header>
        <div class="main">
            <div v-if="orderList.length">
                <div class="order-item" v-for="(item, index) in orderList" :key="index">
                    <div class="item-body" @click="goDetail(item.towerContentId)">
                        <p class="text-333">{{item.orderName}}</p>
                        <p><span class="font12">{{item.orderDate}}</span><span class="fr">{{item.price}}塔兮币</span></p>
                    </div>
                </div>
            </div>
            <div v-else class="empty">
                <p><i class="icon-empty iconfont"></i></p>
                <p style="position: relative; top: -40px;">你还没有购买过商品哦</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { XHeader } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, PopupPicker } from 'vux'
    export default {
        components: {
            XHeader,
            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Swiper,
            SwiperItem,
            PopupPicker,
        },
        data () {
            return {
                orderList: []
            }
        },
        activated(){
            this.getOrderList()
        },
        methods: {
            getOrderList(){
                let params = new FormData()
                this.$post("getorderformlist", params, (data) => {
                    this.orderList = data.orderFormList
                })
            },
            goDetail(id){
                this.$router.push("./detail?type=0&id=" + id)
            },
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding-top: 46px;
        background: #f7f7f7;
        overflow: hidden;
        .vux-tab-wrap{
            z-index: 2;
        }
        .vux-slider{
            height: 100%;
            top: -44px;
            padding-top: 44px;
            box-sizing: border-box;
            z-index: 1;
            .vux-swiper-item{
                height: 100%;
                overflow: auto;
            }
        }
    }
    .order-item{
        margin-bottom: 10px;
        background: #fff;
        .item-body{
            padding: 8px 10px 4px;
            border-bottom: 1px solid #ddd;
        }
        img{
            width: 48px;
            height: 40px;
            margin-right: 5px;
            float: left;
        }
        .item-footer{
            padding: 6px 10px 6px;
            font-size: 12px;
            border-bottom: 1px solid #ddd;
            line-height: 24px;
            .btn{
                float: right;
                margin-left: 8px;
                width: 60px;
                height: 22px;
                border-radius: 4px;
                text-align: center;
                line-height: 22px;
                border: 1px solid #ddd;
            }
            .btn-pay{
                border-color: #f00;
                color: #f00;
            }
        }
        
    }
    .empty{
        p{
            text-align: center;
            color: #ccc;
            i{
                font-size: 160px;
            }
        }
    }
</style>

