<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}">
            发布文章
            <span slot="right">
                <a @click="viewPicture(imgs, 0)">签约</a>
                <a @click="publish">发布</a>
            </span>
        </x-header>
        <div class="main article-desc-content">
            <!-- <x-textarea :height="40" class="textarea pst" v-model="title" placeholder="请输入标题"></x-textarea> -->
            <div :class="imgSrc ? 'thumbnail h200' : 'thumbnail'" @click="clickInput('uploadAlbum')" :style="{backgroundImage: 'url(' + imgSrc + ')' }">
                <div class="cover" v-show="!imgSrc">
                    +添加封面
                </div>
            </div>
            <input ref="uploadAlbum" @change="uploadPicture" v-show="false" type="file" accept="image/*">
            <div style="background: #fff;" class="publish-title">
                <x-textarea v-model="title" class="title-textarea" :rows="1" :autosize="true" placeholder="标题"></x-textarea>
            </div>
            <x-textarea v-model="content" :autosize="true" placeholder="正文" style="word-break: break-all;"></x-textarea>
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
                content: '',
                imgs: ["/static/picture5.jpg"],
                imgSrc: '',
            }
        },
        activated(){
            this.title = ''
            this.content = ''
            this.imgSrc = ''
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
                let content = this.content.replace(/ /g, "&nbsp;&nbsp;");
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
                params.append('content', content)
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
            clickInput(ref){
                this.$refs[ref].click()
                this.$refs[ref].click()
            },
            // 上传封面
            uploadPicture(e){
                var that = this;
                const file = e.target.files[0];
                let path = URL.createObjectURL(file)
                canvasDataURL(path, {}, (data) => {
                    that.imgSrc = data
                })
                this.$refs.uploadAlbum.value = ''
            },
        },
    }
    function canvasDataURL(path, obj, callback){
        var img = new Image();
        img.src = path;
        img.onload = function(){
            var that = this;
            // 默认按比例压缩
            var w = that.width,
                h = that.height,
                scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale);
            var quality = 0.1; 
            //生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            // 创建属性节点
            var anw = document.createAttribute("width");
            anw.nodeValue = w;
            var anh = document.createAttribute("height");
            anh.nodeValue = h;
            canvas.setAttributeNode(anw);
            canvas.setAttributeNode(anh);
            ctx.drawImage(that, 0, 0, w, h);
            // 图像质量
            if(obj.quality && obj.quality <= 1 && obj.quality > 0){
                quality = obj.quality;
            }
            // quality值越小，所绘制出的图像越模糊
            var base64 = canvas.toDataURL('image/jpeg', quality);
            // 回调函数返回base64的值
            callback(base64);
        }
    }

</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
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
        .cover{
            border: 1px dashed #ddd;
            height: 80px;
            line-height: 80px;
            text-align: center;
            font-size: 16px;
            color: #ccc;
        }
        .thumbnail{
            padding: 15px;
            width: 100%;
            height: 100px;
            border: none;
            box-sizing: border-box;
            float: none;
        }
        .h200{
            height: 200px;
        }
        .publish-title{
            .title-textarea{
                font-size: 20px;
                font-weight: bold;
                color: #000;
            }
        }
    }
</style>
<style>
    .publish-title textarea::-webkit-input-placeholder { /* WebKit browsers */ 
        color: #999; 
    } 
    .publish-title textarea{
        font-weight: bold;
    }
</style>



