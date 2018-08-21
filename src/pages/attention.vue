<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}">我的关注</x-header>
        <div class="main">
            <div class="talent-card" @click="toHomepage(item.towerUserId)" v-for="(item, index) in followList" :key="index">
                <img :src="item.iconUrl" alt="">
                <p class="title">{{item.name}}</p>
                <p>{{item.university}}</p>
                <p>{{item.followNum}}人关注</p>
                <a v-show="item.follow != 1" class="active attention" @click.stop="follow(item.towerUserId, index)">+关注</a>
                <a v-show="item.follow == 1" class="attention" @click.stop="no_follow(item.towerUserId, index)">已关注</a>
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
                followList: [],  //  关注列表
                //  精选
                index: 0,
                subIndex1: 0,
                subIndex2: '',
                isShow1: false,
                isShow2: false,
                chosenTop: 0,       //  精选tab的scrollTop高度

            }
        },
        activated(){
            this.getFollow()
        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {

            //  根据greatManType获取对应达人列表
            getFollow(){
                let params = new FormData()
                this.$post("getfollow", params, (data) => {
                    this.followList = data.followList
                })
            },

            //  关注
            follow(id, index){
                let params = new FormData()
                params.append('towerUserId_fans', id)
                this.$post("follow", params, (data) => {
                    this.followList[index].follow = '1'
                })
            },
            //  取消关注
            no_follow(id, index){
                let params = new FormData()
                params.append('towerUserId_fans', id)
                this.$post("no_follow", params, (data) => {
                    this.followList[index].follow = '0'
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
</style>

