<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}">设置</x-header>
        <div class="main">
            <group gutter='0'>
                <cell class="cell" is-link title="手机号" value="已绑定" link="./bind_phone"></cell>
                <cell class="cell" is-link title="修改密码" link="./reset_password"></cell>
                <cell class="cell" is-link title="第三方账号绑定" link="./account_binding"></cell>
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
            abc(){
                console.log(3)
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
        .cell{
            font-size: 14px;
            padding: 12px 15px;
            .title{
                line-height: 26px;
            }
            &:before{
                left: 0;
            }
        }
    }
</style>


