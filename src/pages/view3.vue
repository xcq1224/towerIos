<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}">收藏</x-header>
        <div class="main">
            <div v-if="list.length">
                <div class="talent-card" @click="toDetail(item.towerContentId)" v-for="(item, index) in list" :key="index">
                    <img :src="item.iconUrl" alt="">
                    <p class="title">{{item.name}}</p>
                    <p>{{formatDate(item.exchangeTime, 'yyyy-MM-dd hh:mm:ss')}}</p>
                    <p>收藏了你</p>
                </div>
            </div>
            <div v-else class="empty">
                <p><i class="icon-empty iconfont"></i></p>
                <p style="position: relative; top: -40px;">您还没有收藏哦~</p>
            </div>
        </div>

    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton } from 'vux'
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
        },
        data () {
            return {
                list: [],

            }
        },
        activated(){
            this.getFollow()
        },
        methods: {

            //  根据greatManType获取对应达人列表
            getFollow(){
                this.$vux.loading.show()
                let params = new FormData()
                params.append("exchangeType", "1")
                this.$post("getexchangelist", params, (data) => {
                    this.list = data.exchangeList
                })
            },
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding-top: 46px;
        background: #f2f2f2;
        font-size: 12px;
    }
    .talent-card{
        margin-bottom: 1px;
        background: #fff;
        padding: 10px;
        font-size: 12px;
        position: relative;
        color: #ccc;
        overflow: hidden;
        img{
            width: 64px;
            height: 64px;
            border-radius: 50%;
            margin: 0 10px;
            float: left;
            border: 1px solid #ddd;
        }
        p{
            line-height: 22px;
        }
        .title{
            color: #333;
            font-weight: bold;
        }
        .attention{
            position: absolute;
            right: 10px;
            top: 4px;
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

