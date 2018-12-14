<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}">达人
            <div slot="right" @click="search">
                <x-icon type="ios-search-strong" size="28" style="fill: #fff;margin-top: -5px;"></x-icon>
            </div>
        </x-header>
        <div class="subnav pst">
            <div>
                <div class="subnav-item" :class="greatManType?'':'active'" @click="getgreatmanlist(0)">职业大咖</div>
            </div>
            <div>
                <div class="subnav-item" :class="!greatManType?'':'active'" @click="getgreatmanlist(1)">学生大牛</div>
            </div>
        </div>
        <div class="main">
            <scroller lock-x height="100%" ref="scrollerBottom">
                <div>
                    <div class="talent-card" @click="toHomepage(item.towerUserId)" v-for="(item, index) in towerUserListShow" :key="index">
                        <img :src="item.iconUrl" alt="">
                        <p class="title">{{item.name}}</p>
                        <p>{{item.university}}</p>
                        <p>{{item.followNum}}人关注</p>
                        <a v-show="item.follow != 1" class="active attention" @click.stop="follow(item.towerUserId, index)">+关注</a>
                        <a v-show="item.follow == 1" class="attention" @click.stop="no_follow(item.towerUserId, index)">已关注</a>
                    </div>
                </div>
            </scroller>
        </div>
        <search
            v-show="is_search"
            v-model="value"
            @on-submit="searchResult"
            placeholder="请输入用户昵称"
            @on-cancel="onCancel"
            ref="search" style="position:absolute;top:0;">
            <div slot="" class="search-result-box">
                <div class="talent-card" @click="toHomepage(item.towerUserId)" v-for="(item, index) in resultList" :key="index">
                    <img :src="item.iconUrl" alt="">
                    <p class="title">{{item.name}}</p>
                    <p>{{item.university}}</p>
                    <p>{{item.followNum}}人关注</p>
                    <a v-show="item.follow != 1" class="active attention" @click.stop="follow(item.towerUserId, index)">+关注</a>
                    <a v-show="item.follow == 1" class="attention" @click.stop="no_follow(item.towerUserId, index)">已关注</a>
                </div>
            </div>
        </search>
    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Search, Scroller } from 'vux'
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
            Scroller,
        },
        data () {
            return {
                greatManType: 0,        //  达人类别
                towerUserListAll0: [],   //  职业大咖达人列表
                towerUserListAll1: [],   //  学生大牛达人列表
                towerUserListShow: [],  //  页面显示的达人列表
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
                resultList: [],         //  搜索结果
                isEmpty: false,     //  是否为空
            }
        },
        activated(){
            this.is_search = false
            this.$vux.loading.show()
            this.getgreatmanlist(this.greatManType)
        },
        methods: {

            //  根据greatManType获取对应达人列表
            getgreatmanlist(index){
                this.$nextTick(() => {
                    this.$refs.scrollerBottom.reset({top: 0})
                })
                this.greatManType = index
                let params = new FormData()
                params.append("greatManType", this.greatManType)
                this.$post("getgreatmanlist", params, (data) => {
                    this['towerUserListAll'+this.greatManType] = data.towerUserList
                    this.towerUserListShow = data.towerUserList
                })
            },

            //  关注
            follow(id, index){
                if(!this.$store.state.towerUserId){
                    this.toastSuccess("请先登录")
                    this.login()
                    return
                }
                let params = new FormData()
                params.append('towerUserId_fans', id)
                this.$post("follow", params, (data) => {
                    this.towerUserListShow[index].follow = '1'
                })
            },
            //  取消关注
            no_follow(id, index){
                let params = new FormData()
                params.append('towerUserId_fans', id)
                this.$post("no_follow", params, (data) => {
                    this.towerUserListShow[index].follow = '0'
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
                this.resultList = []
            },
            searchResult(val){
                if(val){
                    let params = new FormData()
                    params.append("keyword", val)
                    this.$post("searchman", params, (data) => {
                        this.resultList = data.towerUserList
                    })
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .subnav{
        height: 34px;
        padding-top: 6px;
        border-bottom: 1px solid #e5e5e5;
        margin-bottom: 10px;
        background: #fff;
        position: relative;
        >div{
            width: 50%;
            height: 24px;
            float: left;
            text-align: center;
            line-height: 24px;
            box-sizing: border-box;
            &:first-of-type{
                border-right: 1px solid #e5e5e5;
            }
            .subnav-item.active{
                color: @baseColor;
            }
        }
        ul{
            position: absolute;
            width: 100vw;
            top: 41px;
            left: 0;
            background: #fff;
            padding: 3px 7px 10px;
            box-sizing: border-box;
            overflow: hidden;
            z-index: 2;
            box-shadow: 4px 2px 8px -1px #ccc;
            li{
                width: 20%;
                float: left;
                list-style: none;
                a{
                    display: block;
                    margin: 7px;
                    border: 1px solid @baseColor;
                    text-align: center;
                    line-height: 22px;
                    border-radius: 10px;
                    font-size: 12px;
                    &.active{
                        background: @baseColor;
                        color: #fff;
                    }
                }
                &.title{
                    width: 100%; 
                    text-align: left;
                    padding-left: 16px;
                }
                &.title:not(:first-of-type){
                    margin-top: 10px;
                }
            }
        }
    }
    .main{
        padding-top: 97px;
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
    .search-result-box{
        height: 100vh;
        background: #fff;
        padding-bottom: 44px;
        box-sizing: border-box;
        overflow: auto;
    }
</style>

