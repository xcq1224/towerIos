<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}">关于塔兮</x-header>
        <div class="main">
            <div class="logo">
                <img src="../assets/logo.png" alt="">
            </div>
            <group gutter='0'>
                <cell class="cell" :title="'当前版本：v1.0'"></cell>
            </group>
            <div class="tip">
                <router-link to="./agreement_terms">用户协议</router-link>及<router-link to="./privacyPolicy">隐私政策</router-link>
            </div>
        </div>

    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge } from 'vux'
    import { mapState, mapActions, mapMutations } from 'vuex'

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
        computed: {
            ...mapState(["version"]),
        },
        data () {
            return {
                
            }
        },
        activated(){

        },
        methods: {

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
        .logo{
            text-align: center;
            margin: 50px 0 20px;
            img{
                width: 100px;
                height: 100px;
            }
        }
        .cell{
            font-size: 14px;
            padding: 12px 15px;
            &:before{
                left: 0;
            }
        }
        .tip{
            position: absolute;
            bottom: 30px;
            width: 100%;
            text-align: center;
            color: inherit;
            a{
                color: @baseColor;
            }
        }
    }
</style>


