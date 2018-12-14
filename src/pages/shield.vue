<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}">我的屏蔽</x-header>
        <div class="main">
            <scroller lock-x height="100%" ref="scrollerBottom">
                <div>
                    <div v-if="dataList.length">
                        <div class="talent-card" v-for="(item, index) in dataList" :key="index">
                            <img :src="item.iconUrl" alt="">
                            <p class="title">{{item.name}}</p>
                            <p>{{item.university}}</p>
                            <p>{{item.followNum || 0}}人关注</p>
                            <a @click="no_shield(item.towerUserId, index)" class="active attention">取消屏蔽</a>
                        </div>
                    </div>
                    <div v-else class="empty">
                        <p><i class="icon-empty iconfont"></i></p>
                        <p style="position: relative; top: -40px;">您还没有屏蔽任何人</p>
                    </div>
                </div>
            </scroller>
        </div>
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
                dataList: [],           //  屏蔽列表
            }
        },
        activated(){
            this.getshield()
        },
        methods: {
            //  获取屏蔽列表
            getshield(){
                let params = new FormData()
                this.$post("getshield", params, (data) => {
                    this.dataList = data.shieldList
                })
            },
            //  取消屏蔽
            no_shield(id, index){
                let params = new FormData()
                params.append("towerUserId_shield", id)
                this.$post("no_shield", params, (data) => {
                    this.dataList.splice(index, 1)
                })
            },
        }
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
            width: 60px;
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

