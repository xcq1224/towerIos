<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}">塔兮币</x-header>
        <div class="main">
            <group gutter='0'>
                <cell @click.native="coinId = item.coinId" v-for="(item, index) in coinList" :key="index">
                    <x-icon v-if="coinId == item.coinId" type="ios-checkmark" size="26" slot="icon"></x-icon>
                    <x-icon v-if="coinId != item.coinId" type="ios-circle-outline" size="26" slot="icon"></x-icon>
                    <div slot="title"><span>{{item.coinsCount}}塔兮币</span></div>
                    <div slot=""><span style="color: #fc673d;">{{item.price}}元</span></div>
                </cell>
            </group>
            <div class="btn-box">
                <x-button type="warn" siz="mini" :disabled="!coinId" @click.native="charge">购买</x-button>
            </div>
            <p class="my-coin">塔兮币余额<span>{{coin}}币</span></p>
        </div>

    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, Checklist, Icon, XButton  } from 'vux'

    

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Group,
            Cell,
            CellFormPreview,
            CellBox,
            Badge,
            Checklist,
            Icon,
            XButton,
        },
        data () {
            return {
                coinId: '',   
                coinList: [],
                coin: "",
            }
        },
        mounted(){
            var that = this
            //  购买塔兮币成功回调
            window.buyTaXiCoinResult = function(){
                that.getCoin()
            }
        },
        activated(){
            this.coinId = ''
            this.getCoin()
            this.getcoinlist()
            buyTaXiCoinResult()
        },
        methods: {
            getcoinlist(){
                let params = new FormData()
                this.$post("getcoinlist", params, (data) => {
                    this.coinList = data.coinList
                })
            },
            getCoin(){
                let params = new FormData()
                this.$post("getcoins", params, (data) => {
                    this.coin = data.coin
                })
            },
            charge(){
                this.buyTaXiCoin(this.$store.state.towerUserId, this.coinId)
                console.log(this.coinId)
                console.log(this.$store.state.towerUserId)
            },
        },
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .page{
    }
    .main{
        padding-top: 46px;
        .cell{
            font-size: 14px;
            padding: 12px 15px;
            &:before{
                left: 0;
            }
        }
        .btn-box{
            padding: 20px 10px;
        }
        .my-coin{
            padding: 10px;
            span{
                font-size: 20px;
                color: #fc673d;
                font-weight: bold;
                margin-left: 6px;
            }
        }
        .vux-x-icon{
            fill: #fc673d;
            vertical-align: middle;
            margin-right: 3px;
        }
    }
</style>


