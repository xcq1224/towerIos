<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}">设置</x-header>
        <div class="main">
            <!-- <group gutter='0' class="header">
                <cell class="cell" is-link title="账号与安全" link="./account_security"></cell>
            </group>
            <div class="empty-box"></div> -->
            <!-- <group gutter='0'>
                <cell class="cell" is-link title="视频自动播放" link="./traffic_source"></cell>
                <cell class="cell" is-link title="推送" link="./push"></cell>
            </group>
            <div class="empty-box"></div> -->
            <group gutter='0'>
                <!-- <cell class="cell" is-link title="清除缓存" @click.native="clear" value="100M"></cell> -->
                <cell class="cell" is-link title="意见反馈" link="./feedback"></cell>
                <cell class="cell" is-link title="关于塔兮" link="./about"></cell>
            </group>
            <div class="empty-box"></div>
            <group gutter='0'>
                <cell class="cell" is-link title="修改密码" link="./reset_password"></cell>
                <cell class="cell" is-link title="退出登录" @click.native="signOut"></cell>
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

            }
        },
        activated(){

        },
        // deactivated(){
        //     console.log(3);
        // },
        methods: {
            clear(){
                this.$vux.confirm.show({
                    content: '确定清除缓存文件？',
                    onCancel () {},
                    onConfirm () {}
                })
            },
            signOut(){
                let that = this
                this.$vux.confirm.show({
                    title: '塔兮',
                    content: '您确定退出吗',
                    onCancel () {},
                    onConfirm () {
                        that.$store.state.towerUserId = ''
                        window.webkit.messageHandlers.logout.postMessage(null);
                        that.$router.go(-1)
                    }
                })
            }
        },
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .page{
        background: #f2f2f2;
    }
    .main{
        padding-top: 46px;
        .empty-box{
            height: 10px;
            background: #f2f2f2;
        }
        .cell{
            font-size: 14px;
            padding: 12px 15px;
            img{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                float: left;
                margin: 20px 10px 20px 0;
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
    }
</style>


