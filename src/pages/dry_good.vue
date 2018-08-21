<template>
    <div class="page"> 
        <x-header :left-options="{backText: ''}">干货</x-header>
        <div class="main">
            <div class="employment-card" @click="toDetail(item.towerContentId, item.contentType)" v-for="(item, index) in contentList" :key="index">
                <img :src="item.imgUrl_1" width="118" height="70">
                <p class="title text-ellipsis">{{item.title}}</p>
                <p>{{item.name}}</p>
                <p>{{item.contentKind}}</p>
            </div>
        </div>

    </div>
</template>

<script>
    import { Search} from 'vux'
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem } from 'vux'
    const list = () => ['热门', '精选', '达人', '干货']
    export default {
        components: {
            Search,
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
                //  search
                results: [],
                value: '',

                //  tab
                index: 0,

                //  精选
                subnavIndex: 0,
                isShow1: false,
                isShow2: false,
                isShow1: false,
                isShow1: false,
                chosenTop: 0,       //  精选tab的scrollTop高度

                contentList: [],    //  干货内容列表


            }
        },
        activated(){
            // document.getElementsByClassName('chosen')[0].scrollTop = this.chosenTop
            // this.chosenTop = 0
            let params = new FormData()
            this.$post("get_b_test", params, (data) => {
                this.contentList = data.contentList
            })
        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {

        },
    }

    //  search
    function getResult (val) {
        let rs = []
        for (let i = 0; i < 20; i++) {
            rs.push({
            title: `${val} result: ${i + 1} `,
            other: i
            })
        }
        return rs
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
    }
    .vux-tab-wrap{
        z-index: 2;
    }
    .vux-slider{
        height: 100%;
        top: -44px;
        padding-top: 44px;
        box-sizing: border-box;
        z-index: 1;
    }
    .vux-swiper-item{
        height: 100%;
        overflow: auto;
    }
    .employment-card{
        padding: 15px 8px;
        border-bottom: 1px solid #ddd;
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
            &.title{
                font-weight: bold;
                font-size: 14px;
            }
            line-height: 24px;
        }
    }
</style>

