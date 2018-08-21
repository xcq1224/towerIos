<template>
    <div class="has-tabbar page"> 
        <x-header :left-options="{backText: ''}">意见反馈</x-header>
        <div class="main">
            <group gutter='0' title="反馈内容">
                <x-textarea :height="140" class="textarea" v-model="feedbackContent" placeholder="请详细描述你的问题或意见"></x-textarea>
                <div class="img-box">
                    <div class="img-item" @click="uploadClick">
                        <img :src="getUrl(img_1)" alt="">
                        <i v-show="!img_1" class="iconfont icon-web-icon-1 upload" style="position: absolute;font-size: 40px;top: 10px;left: 18px;color: #ccc;"></i>
                        <input class="upload-input" v-show="false" ref="upload" type="file" @change="upload" accept="image/*">
                    </div>
                </div>
            </group>
            <group gutter='0' title="联系方式">
                <x-input title="手机号/微信" v-model="contact" placeholder="请输入手机号/微信"></x-input>
            </group>
        </div>
        <div class="footer" @click="feedback">提交</div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem } from 'vux'
    import { Cell, CellBox, CellFormPreview, Group, Badge, InlineXSwitch, XTextarea, XInput, Icon } from 'vux'

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
            InlineXSwitch,
            XTextarea,
            XInput,
            Icon,
        },
        data () {
            return {
                feedbackContent: '',
                img_1: '',
                contact: '',
            }
        },
        activated(){

        },
        methods: {
            uploadClick(){
                this.$refs.upload.click()
                this.$refs.upload.click()
            },
            upload(e){
                this.img_1 = e.target.files[0];
            },
            getUrl(file){
                if(file) return URL.createObjectURL(file)
            },
            feedback(){
                let params = new FormData()
                params.append("feedbackContent", this.feedbackContent)
                params.append("img_1", this.img_1)
                params.append("contact", this.contact)
                this.$post("feedback", params, (data) => {
                    this.toastSuccess("反馈成功")
                    this.$router.back(-1)
                })
            },
        },
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .page{
        background: #f2f2f2;
    }
    .vux-header{
        position: relative;
        z-index: 2;
    }
    .main{
        padding-top: 46px;
        .tab{
            .cell{
                padding: 15px 20px;
                font-size: 14px;
            }
            span{
                display: inline-block;
                width: 110px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                background: #f2f2f2;
                margin-right: 25px;
                border-radius: 4px;
                &.active{
                    background: @baseColor;
                    color: #fff;
                }
            }
        }
        .textarea{
            font-size: 14px;
            height: 130px;
        }
        .img-box{
            overflow: hidden;
            padding: 10px;
            .img-item{
                width: 80px;
                height: 80px;
                border: 1px solid #ddd;
                background: #f7f7f7;
                position: relative;
                float: left;
                margin-right: 8px;
                margin-bottom: 10px;
                &:nth-of-type(4n){
                    margin-right: 0;
                }
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
                .del{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    line-height: 15px;
                    border-radius: 50%;
                    background: #b8bdae;
                    color: #69833a;
                }
            }
        }
        .img-list{
            padding-left: 10px;
            .upload{
                font-size: 44px;
                color: #ccc;
            }
        }
        .weui-cell{
            font-size: 14px;
        }
    }
    .footer{
        position: absolute;
        bottom: 0;
        z-index: 2;
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        background: @baseColor;
        color: #fff;
    }
</style>


