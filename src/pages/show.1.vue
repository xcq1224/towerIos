<template>
    <div class="has-tabbar page"> 
        <x-header class="pst" :left-options="{backText: ''}">展示自己的自拍照和标签<a slot="right" @click="save">保存</a></x-header>
        <div class="main">
            <p style="margin-top: 5px;">你发布内容时，首页显示的自拍照将在这里面的照片中随机选择(最多拍9张，列表显示在这里)</p>
            <div class="img-box" style="min-height: 200px;">
                <div class="img-thumbnail thumbnail" :style="{backgroundImage: 'url(' + imgItem + ')' }" v-for="(imgItem, imgIndex) in files" :key="imgIndex" @click.stop="viewPicture(files, imgIndex)">
                    <span class="del" @click.stop="delImg(imgIndex)">x</span>
                </div>
                <div class="img-item" v-show="files.length != 9" style="text-align: center;">
                    <i class="iconfont icon-tainjia" style="font-size: 60px; color: #ccc; line-height: 100px;"></i>
                    <input ref="upload" @change="upload" class="input-img" type="file" accept="image/*" multiple="multiple">
                </div>
            </div>
            <p style="margin-bottom: 15px;">哪些标签适合描述你？(最多选三个)</p>
            <div class="tag-box">
                <div :class="labelList.indexOf(item) == -1 ? 'tag-item' : 'tag-item active'" v-for="(item, index) in tagList" :key="index" @click="choose(item)">{{item}}</div>
                <div :class="labelList.indexOf(item) == -1 ? 'tag-item' : 'tag-item active'" v-for="(item, index) in tags" :key="index" @click="choose(item)">{{item}}</div>
                <div>
                    <x-input v-show="editTag" ref="tagInput" :max="4" v-model="tagValue" class="el-tag-input" :show-clear="false" @on-blur="tagConfirm" @on-enter="tagConfirm"></x-input>
                    <x-button mini plain class="add-btn" type="primary" v-show="!editTag" @click.native="editStart">自建标签</x-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { XHeader, XInput, XButton } from 'vux'

    export default {
        components: {
            XHeader,
            XInput,
            XButton,
        },
        data () {
            return {
                files: [],
                editTag: false,
                tagValue: '',
                tags: [],
                //  默认标签
                tagList: ["美男子", "学霸", "宅", "技术控", "美女", "网红", "暖", "全能", "学渣", "吃货", "IT达人", "最佳女友"],    
                labelList: [],  //  选中的标签
            }
        },
        activated(){
            let params = new FormData()
            this.$post("getusercard", params, (data) => {
                this.labelList = data.label ? data.label.split(",") : []
                this.files = data.cardUrls
                this.labelList.map((item) => {
                    if(this.tagList.indexOf(item) == -1){
                        this.tagList.push(item)
                    }
                })
            })
        },
        methods: {
            //  保存
            save(){
                let params = new FormData()
                this.files.map((file, index)=>{
                    params.append('img_user_card_'+(index+1) + '_base64', file)
                })
                params.append("label", this.labelList.join(","))
                this.$vux.loading.show()
                this.$post("uploadusercard", params, (data) => {
                    this.toastSuccess("上传成功")
                    this.$router.go(-1)
                })
            },
            //  选择标签
            choose(val){
                if(this.labelList.indexOf(val) == -1){
                    if(this.labelList.length > 2){
                        this.labelList.splice(0, 1)
                    }
                    this.labelList.push(val)
                }else{
                    this.labelList.splice(this.labelList.indexOf(val),1)
                }
            },
            //  将文件流转化为url
            getUrl(file){
                return file ? URL.createObjectURL(file) : null
            },
            //  上传图片
            upload(e){
                var that = this;
                const files = e.target.files;
                let n = this.files.length
                let flag = false
                for(let i=0; i<files.length; i++){
                    if(i>= 9-n){
                        flag = true
                        break
                    }
                    canvasDataURL(this.getUrl(files[i]), i, {}, (baseUrl, m) => {
                        that.files.splice(m + n, 0, baseUrl)
                    })
                }
                if(flag){
                    this.$vux.alert.show({
                        content: '最多上传9张图片！',
                    })
                }
                this.$refs.upload.value = ''
            },
            //  删除图片
            delImg(index){
                this.files.splice(index,1)
            },
            editStart(){
                this.editTag = true
                setTimeout(() => {
                    this.$refs.tagInput.focus()
                }, 0)
            },
            tagConfirm(){
                let tagValue = this.tagValue;
                if (tagValue) {
                    if(this.tags.indexOf(tagValue) != -1 || this.tagList.indexOf(tagValue) != -1){
                        this.$vux.toast.show({
                            type: 'text',
                            width: '200px',
                            text: '该标签已存在！',
                        })
                        this.editTag = false;
                        this.tagValue = '';
                        return
                    }
                    this.tags.push(tagValue);
                }
                this.editTag = false;
                this.tagValue = '';
            },
            delTag(index){
                this.tags.splice(index, 1)
            },
        },
    }
    //  压缩图片
    function canvasDataURL(path, i, obj, callback){
        var img = new Image();
        img.src = path;
        img.onload = function(){
            var that = this;
            // 默认按比例压缩
            var w = that.width,
                h = that.height;
            var quality = 0.1; 
            //生成canvas
            var canvas = document.createElement('canvas');
            canvas.width = w;    
            canvas.height = h;   
            var ctx = canvas.getContext('2d');

            //获取图片方向
            var orient;
            EXIF.getData(img, function () {
                orient = EXIF.getTag(this, 'Orientation');
                //如果图片方向等于6 ，则旋转矫正，反之则不做处理
                if (orient == 6) {
                    canvas.width = h;    
                    canvas.height = w;   
                    ctx.save();
                    ctx.rotate(90 * Math.PI / 180);
                    ctx.drawImage(img, 0, - h);
                    ctx.restore();
                } else {
                    ctx.drawImage(img, 0, 0, w, h);
                }

                // ctx.drawImage(that, 0, 0, w, h);
                // 图像质量
                if(obj.quality && obj.quality <= 1 && obj.quality > 0){
                    quality = obj.quality;
                }
                // quality值越小，所绘制出的图像越模糊
                var base64 = canvas.toDataURL('image/jpeg', quality);
                // 回调函数返回base64的值
                callback(base64, i);
            });
        }
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding: 46px 10px 0;
        background: #fff;
        .header .cell{
            padding: 0 15px;
        }
        
    }
    .img-box{
        overflow: hidden;
        padding: 20px 10px;
        position: relative;
        .img-item{
            width: 100px;
            height: 100px;
            border: 1px solid #ddd;
            background: #f7f7f7;
            position: relative;
            float: left;
            margin-right: 8px;
            margin-bottom: 10px;
            &:nth-of-type(3n){
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
            .play-btn{
                position: absolute;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                width: 30px;
                height: 30px;
                color: #fff;
                border-radius: 50%;
                text-align: center;
                background: rgba(51, 51, 51, 0.6);
                font-size: 20px;
                line-height: 30px;
            }
        }
        .img-thumbnail{
            width: 100px;
            height: 100px;
            border: 1px solid #ddd;
            position: relative;
            float: left;
            margin-right: 8px;
            margin-bottom: 10px;
            &:nth-of-type(3n){
                margin-right: 0;
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
        .input-img{
            opacity: 0;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
    }
    .tag-box{
        overflow: hidden;
        .tag-item{
            width: 80px;
            height: 30px;
            border: 1px solid #333;
            display: block;
            float: left;
            margin-right: 6px;
            margin-bottom: 6px;
            text-align: center;
            line-height: 28px;
            border-radius: 4px;
            &.active{
                background: #cc99ff;
                color: #000;
            }
        }
        .el-tag-input{
            display: inline-block;
            width: 60px;
            height: 16px;
            padding: 5px 10px 10px;
            border-radius: 6px;
            vertical-align: middle;
            border: 1px solid #ddd;
        }
        .add-btn{
            width: 82px;
            color: @baseColor;
            border-color: @baseColor;
            padding: 1px 10px;
        }
    }
</style>


