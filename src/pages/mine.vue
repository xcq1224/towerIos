<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{showBack: false}">我的</x-header>
        <div class="main">
            <group gutter='0' class="header">
                <cell v-show="towerUserId" class="cell" is-link link="./personal_info">
                    <img :src="avatar" alt="" slot="icon">
                    <div slot="title" class="title">
                        <p>{{userName}}</p>
                        <p style="color: #ccc;">
                            <span @click.stop="toAttention">关注 {{followNum}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span @click.stop="toFans">粉丝 {{fansNum}}</span>
                        </p>
                    </div>
                </cell>
                <cell v-show="!towerUserId" class="cell">
                    <img src="../assets/avatar.png" style="border: none" alt="" slot="icon">
                    <div class="login-box" @click="login">
                        <a>登录</a> /
                        <a>注册</a>
                    </div>
                </cell>
            </group>
            <div class="empty-box"></div>
            <group gutter='0'>
                <cell class="cell" is-link @click.native="goTo('./order')">
                    <span slot="title"><i class="iconfont icon-hetong2" style="color: #76b662;"></i>我的订单</span>
                </cell>
                <!-- <cell class="cell" is-link @click.native="goTo('./my_skill')">
                    <span slot="title"><i class="iconfont icon-jinengtechang--" style="color: #1c8ef0;"></i>我的技能</span>
                </cell> -->
                <cell class="cell" is-link @click.native="goTo('./collection')">
                    <span slot="title"><i class="iconfont icon-ego-heart" style="color: #fe3c3c;"></i>我的收藏</span>
                </cell>
                <cell class="cell" is-link @click.native="goTo('./shield')">
                    <span slot="title"><i class="iconfont icon-pingbi1" style="color: #86df79;"></i>我的屏蔽</span>
                </cell>
                <cell class="cell" is-link @click.native="goTo('./coin')">
                    <span slot="title"><i class="iconfont icon-jinbi" style="color: #fe9e0c;"></i>塔兮币</span>
                </cell>  
                <cell class="cell" is-link link="./settings">
                    <span slot="title"><i class="iconfont icon-shezhi" style="color: #7f91c3;"></i>设置</span>
                </cell>  
            </group>
            <div style="height: 20px; background: #f6f6f6;"></div>
            <group gutter='0'>
                <cell class="cell" is-link @click.native="goTo('./view1')">
                    <div slot="title">
                        <i class="iconfont icon-zan" style="color: #ffa103;"></i>
                        <span style="position: relative;">赞<i class="dot" v-show="praiseNew == '1'"></i></span>
                    </div>
                </cell>
                <cell class="cell" is-link @click.native="goTo('./view2')">
                    <div slot="title">
                        <i class="iconfont icon-pinglun" style="color: #34b87f;"></i>
                        <span style="position: relative;">评论<i class="dot" v-show="commentNew == '1'"></i></span>
                    </div>
                </cell>
                <cell class="cell" is-link @click.native="goTo('./view3')">
                    <div slot="title">
                        <i class="iconfont icon-ego-heart" style="color: #5ab5d8;"></i>
                        <span style="position: relative;">收藏<i class="dot" v-show="collectionNew == '1'"></i></span>
                    </div>
                </cell>
            </group>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'

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
        },
        data () {
            return {
                tabIndex: 0,
                towerUserId: '',
                userName: '',
                avatar: '',
                followNum: '',
                fansNum: '',

                //  是否有新消息
                praiseNew: '0',
                commentNew: '0',
                collectionNew: '0',
            }
        },
        activated(){
            let params = new FormData()
            let that = this
            this.towerUserId = this.$store.state.towerUserId
            this.userName = this.$store.state.userName
            this.avatar = this.$store.state.avatar
            if(this.$store.state.towerUserId){
                this.$post("getmine", params, (data) => {
	                this.followNum = data.followNum
	                this.fansNum = data.fansNum
	            })
            }
            this.getNews()
        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            //  跳转我的关注页面
            toAttention(){
                this.$router.push("./attention")
            },
            //  跳转我的粉丝页面
            toFans(){
                this.$router.push("./fans")
            },
            //  是否有新消息
            getNews(){
                if(this.$store.state.towerUserId){
                    let params = new FormData()
                    this.$post("getexchange", params, (data) => {
                        this.praiseNew = data.praiseNew
                        this.commentNew = data.commentNew
                        this.collectionNew = data.collectionNew
                    })
                }
            },
        },
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding-top: 46px;
        background: #fff;
        .header .cell{
            padding: 0 15px;
        }
        .cell{
            font-size: 14px;
            padding: 10px 15px;
            img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                float: left;
                margin: 20px 10px 20px 0;
                border: 1px solid #ddd;
            }
            .title{
                line-height: 26px;
            }
            i{
                font-size: 20px;
                vertical-align: middle;
                margin-right: 10px;
            }
            &:before{
                left: 0;
            }
        }
        .content{
            background: #fff;
        }
        .login-box{
            border: 1px solid @baseColor;
            width: 182px;
            height: 42px;
            margin-right: 55px;
            color: @baseColor;
            text-align: center;
            line-height: 40px;
            border-radius: 6px;
        }
        .news-box{
            display: inline-block;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 10px;
            text-align: center;
            line-height: 40px;
            i{
                color: #fff;
                margin-right: 0;
                font-size: 24px;
            }
        }
        .dot{
            position: absolute;
            width: 8px;
            height: 8px;
            background: red;
            border-radius: 50%;
            top: -2px;
            right: -10px;
            margin-right: 0 !important;
        }
    }
</style>


