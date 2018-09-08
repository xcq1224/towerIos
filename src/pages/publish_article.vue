<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}">
            发布文章
            <span slot="right">
                <a @click="viewPicture(imgs, 0)">签约</a>
                <a @click="publish">发布</a>
            </span>
        </x-header>
        <!-- <x-textarea :height="40" class="textarea pst" v-model="title" placeholder="请输入标题"></x-textarea> -->
        <div class="pst" style="background: #fff; border-bottom: 1px solid #eee;">
            <x-input placeholder="请输入标题" v-model="title"></x-input>    
        </div>
        <div class="main article-desc-content">
            <vue-html5-editor :content="content" :height="400" @change="updateData"></vue-html5-editor>  
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, XTextarea, XInput, Popup } from 'vux'

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
            XTextarea,
            XInput,
            Popup,
        },
        data () {
            return {
                title: '',
                content: '请输入内容',
                imgs: ["/static/picture5.jpg"]
            }
        },
        activated(){
            this.title = ''
            this.content = '请输入内容'
        },
        deactivated(){
            this.$store.state.showPicture = false
        },
        methods: {
            updateData(e = ''){  
                this.content = e;  
            },
            //  发布文字、图片
            publish(){
                console.log(3)
                if(!this.title.trim()){
                    this.toastFail('请输入标题', "200px")
                    return
                }
                if(!this.content.trim()){
                    this.toastFail('请输入内容2', "200px")
                    return
                }
                let params = new FormData()
                let contentType = 0
                params.append('content', this.content)
                params.append('title', this.title)
                params.append('contentStatus ', 0)
                params.append('contentType', 6)
                this.$vux.loading.show({
                    text: '发布中...'
                })
                console.log(this.content)
                this.$post("upload", params, (data) => {
                    this.toastSuccess("上传成功")
                    this.$router.go(-1)
                })
                    
            },
        },
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding-top: 86px;
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


