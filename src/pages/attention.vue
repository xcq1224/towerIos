<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}">我的关注
            <div slot="right" @click="search">
                <x-icon type="ios-search-strong" size="28" style="fill: #fff;margin-top: -5px;"></x-icon>
            </div>
        </x-header>
        <div class="main">
            <div class="talent-card" @click="toHomepage(item.towerUserId)" v-for="(item, index) in followList" :key="index">
                <img :src="item.iconUrl" alt="">
                <p class="title">{{item.name}}</p>
                <p>{{item.university}}</p>
                <p>{{item.followNum}}人关注</p>
                <a v-show="item.follow != 1" class="active attention" @click.stop="follow(item.towerUserId, index)">+关注</a>
                <a v-show="item.follow == 1" class="attention" @click.stop="no_follow(item.towerUserId, index)">已关注</a>
            </div>
            <div class="empty" v-show="isEmpty">当前人不存在~~</div>
        </div>
        <search
            v-show="is_search"
            v-model="value"
            @on-change="getResult"
            placeholder="请输入联系人姓名或客户名称"
            @on-cancel="onCancel"
            ref="search" style="position:absolute;top:0;">
        </search>
    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Search } from 'vux'
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
            Search,
        },
        data () {
            return {
                followList: [],  //  显示的关注列表
                list: [],  //  所有的关注列表
                //  精选
                index: 0,
                subIndex1: 0,
                subIndex2: '',
                isShow1: false,
                isShow2: false,
                chosenTop: 0,       //  精选tab的scrollTop高度

                // 搜索
                is_search: false,
                value: '',          //  搜索内容
                isEmpty: false,     //  是否为空
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
                    this.list = data.followList
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

        /****************************查询********************* */
            search(){
                this.is_search = true
                setTimeout(() => {
                    this.$refs.search.setFocus()
                },0)
            },
            onCancel () {
                this.is_search = false
            },
            getResult(val){
                this.followList = val ? this.match(val) : this.list
                this.isEmpty = !this.followList.length
            },
            match(val){
                let rs = []
                this.list.map((item) => {
                    if(item.name.indexOf(val) != -1){
                        rs.push(item)
                    }
                })
                return rs
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
    .empty{
        text-align: center;
        line-height: 60px;
        background: #fff;
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

