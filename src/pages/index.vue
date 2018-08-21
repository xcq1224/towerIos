<template>
    <div class="wrap">
        <div class="content">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
            <tabbar>
                <tabbar-item selected link="/index">
                    <i slot="icon" class="iconfont icon-shouye"></i>
                    <span slot="label">首页</span>
                </tabbar-item>
                <tabbar-item @click.native="goTo('./bit')">
                    <i slot="icon" class="iconfont icon-iconset0457"></i>
                    <span slot="label">点滴</span>
                </tabbar-item>
                <tabbar-item @on-item-click="showMore=true">  
                    <span slot="label" class="more"><i slot="icon" class="iconfont icon-add"></i></span>
                </tabbar-item>  
                <tabbar-item @click.native="goTo('./tower')">
                    <i slot="icon" class="iconfont icon-kehuqunzu"></i>
                    <span slot="label">塔圈</span>
                </tabbar-item>
                <tabbar-item link="/mine">
                    <i slot="icon" class="iconfont icon-wode"></i>
                    <span slot="label">我的</span>
                </tabbar-item> 
            </tabbar>
        </div>
        <popup v-model="showMore">
            <div class="more-handle">
                <div class="more-handle-body">
                    <div @click="publish0">
                        <span style="background: #f66;"><i class="iconfont icon-hetong2"></i></span>
                        <p>文字</p>
                    </div>
                    <div @click="uploadClick('uploadVideo')">
                        <span style="background: #fbce77;"><i class="iconfont icon-paizhao"></i></span>
                        <p>视频</p>
                        <input class="open-camera" ref="uploadVideo" @change="uploadVideo" v-show="false" type="file" accept="video/*" capture="camera">
                    </div>
                    <div @click="uploadClick('uploadPicture')">
                        <span style="background: #86df79;"><i class="iconfont icon-xiangce"></i></span>
                        <p>拍照</p>
                        <input ref="uploadPicture" @change="uploadPicture" v-show="false" type="file" accept="image/*" capture="camera">  
                    </div>
                    <div @click="uploadClick('uploadAlbum')">
                        <span style="background: #86df79;"><i class="iconfont icon-xiangce"></i></span>
                        <p>相册</p>
                    </div>
                    <div @click="publish4(4)">
                        <span style="background: #b5e1fe;"><i class="iconfont icon-jinengtechang--"></i></span>
                        <p>技能</p>
                    </div>
                    <div @click="publish4(5)">
                        <span style="background: #0084ff;"><i class="iconfont icon-xiangmuxuqiu"></i></span>
                        <p>需求</p>
                    </div>
                    <!-- <div @click="publishCourse(0)">
                        <span style="background: #cc66cc;"><i class="iconfont icon-kecheng-"></i></span>
                        <p>小课</p>
                    </div>
                    <div @click="publishCourse(1)">
                        <span style="background: #cc66cc;"><i class="iconfont icon-kecheng-"></i></span>
                        <p>文章</p>
                    </div> -->
                    <p class="copyText" v-show="false" ref="copy" data-clipboard-text="yunshangtaxi@163.com" @click="copy"></p>
                </div>
                <div class="more-handle-footer">
                    <span @click="showMore=false"><i class="iconfont icon-butongguo"></i></span>
                </div>
            </div>
        </popup>
        <!--发布文字、图片-->
        <popup v-model="show1" height="100%" @on-show="openShow1" @on-hide="closeShow1">
            <div class="main">
                <div class="header">
                    <span @click="show1=false">取消</span>
                    <i class="iconfont upload fr text-base icon-icon-" style="font-weight: bold;margin-left: 10px; font-size: 20px;" @click="show2=true"></i>
                    <span class="fr text-base" @click="publishText">发布</span>
                </div>
                <x-textarea :height="140" class="textarea" v-model="textarea" ref="textarea" placeholder="分享这一刻的想法..."></x-textarea>
                <div v-show="!videoFile" class="img-box">
                    <div class="img-thumbnail thumbnail" :style="{backgroundImage: 'url(' + imgItem + ')' }" v-for="(imgItem, imgIndex) in files" :key="imgIndex" @click.stop="viewPicture(files, imgIndex)">
                        <span class="del" @click.stop="delImg(imgIndex)">x</span>
                    </div>
                    <div class="img-item" v-show="files.length != 9" style="text-align: center;" @click="uploadClick('uploadAlbum')">
                        <i class="iconfont icon-tainjia" style="font-size: 60px; color: #ccc; line-height: 100px;"></i>
                    </div>
                </div>
                <div v-show="videoFile" class="img-box">
                    <div class="img-item" @click="playVideo">
                        <img :src="videoPicture" alt="">
                        <span class="play-btn iconfont icon-bofang"></span>
                    </div>
                </div> 
                <video v-show="false" ref="video" @loadeddata="loadVideo" :src="getUrl(videoFile)"></video>
            </div>
            <div class="footer">
                <div>
                    <span @click="geolocation" v-show="!address" class="text-base"><i class="iconfont icon-dingwei"></i>你在哪里</span>
                    <span v-show="address"><i class="iconfont icon-dingwei"></i>{{address}}</span>
                    <popover placement="top" class="fr" :gutter='0'>
                        <div slot="content" class="search-tab-items">
                            <p v-show="index != searchIndex" :class="index == searchIndex?'active': ''" v-for="(item, index) in searchTabs" :key="index" @click="searchChoose(index)">{{searchTabs[index]}}</p>
                        </div>
                        <span class="tab fr"><i class="iconfont icon-diqiu"></i>{{searchTabs[searchIndex]}}</span>
                    </popover>
                </div>
                <input ref="uploadAlbum" @change="uploadPicture" v-show="false" type="file" accept="image/*" multiple="multiple">
            </div> 
        </popup>
        <popup v-model="show2" height="100%" @on-show="openShow2">
            <x-header class="pst">
                选择分类
                <a slot="overwrite-left" @click="cancelClass">取消</a>
                <a slot="right" @click="show2=false">完成</a>
            </x-header>
            <div class="main choose-class">
                <div class="btn-add" @click="show3 = true">
                    <i class="iconfont icon-tainjia"></i>
                    <a>新增分类</a>
                </div>
                <radio v-model="className" :options="classList" style="background: #fff;"></radio>
            </div>
        </popup>
        <popup v-model="show3" height="100%" @on-show="openShow3">
            <x-header class="pst">
                新建分类
                <a slot="overwrite-left" @click="show3 = false">取消</a>
                <a slot="right" @click="addSubmit">完成</a>
            </x-header> 
            <group gutter='0' title="新的分类">
                <x-input ref="addInput" v-model="addText" placeholder="请输入分类名(2-6字符)"></x-input>
            </group>
        </popup>
        <popup v-model="show4" height="100%" @on-show="showMore=false" @on-hide="closeShow4">
            <x-header class="pst">
                发布技能
                <a slot="overwrite-left" @click="show4=false">取消</a>
                <a slot="right" @click="publishSkill">发布</a>
            </x-header>
            <div class="main" style="padding-top: 46px; background: #f2f2f2;">
                <group gutter='0' title="技能信息"  label-width="100px">
                    <!-- <popup-picker title="技能分类" :data="list1" v-model="value1" placeholder="请选择" value-text-align="left"></popup-picker> -->
                    <x-input title="标题" v-model="title" placeholder="请输入名称"></x-input>
                    <x-input v-show="contentType == 4" title="价格" v-model="price" placeholder="请输入价格" type="tel"></x-input>
                    <!-- <datetime class="datetime" placeholder="请选择时间" v-model="datetime" title="截止时间" format="YYYY-MM-DD HH:mm"></datetime> -->
                </group>
                <group gutter='0' title="图片">
                    <div class="img-box">
                        <!-- <div class="img-item">
                            <img :src="files[0]" alt="">
                            <input class="upload-input" v-show="false" ref="upload5" type="file" @change="upload5" accept="image/*">
                            <i v-show="!files.length" class="iconfont icon-web-icon-1 upload" style="position: absolute;font-size: 40px;top: 10px;left: 18px;color: #ccc;"></i>
                        </div> -->
                        <div class="img-thumbnail thumbnail" :style="{backgroundImage: 'url(' + imgItem + ')' }" v-for="(imgItem, imgIndex) in files" :key="imgIndex" @click.stop="viewPicture(files, imgIndex)">
                            <span class="del" @click.stop="delImg(imgIndex)">x</span>
                        </div>
                        <div class="img-item" v-show="files.length != 9" style="text-align: center;" @click="uploadClick('uploadAlbum')">
                            <i class="iconfont icon-tainjia" style="font-size: 60px; color: #ccc; line-height: 100px;"></i>
                        </div>
                    </div>
                </group>
                <group gutter='0' title="描述">
                    <x-textarea :rows="6" :max="200" v-model="textarea" class="textarea" placeholder="最多为200个字符"></x-textarea>
                </group>
            </div>
        </popup>
     </div>
</template>

<script>
import { Tabbar, TabbarItem, Popup, XTextarea, Popover, XHeader, Radio, Group, XInput, Datetime} from 'vux'
import Clipboard from 'clipboard';

export default {
    components: {
        Tabbar,
        TabbarItem,
        Popup,
        XTextarea,
        Popover,
        XHeader,
        Radio, 
        Group,
        XInput,
        Datetime,
    },
    data() {
            return {
                showMore: false,    //  发布选项弹框


                show1: false,       //  发布文字、图片弹框
                showSearch: false,  //  公开选项弹框
                searchIndex: 0,     //  公开选项
                searchTabs: ['公开', '塔圈', '自己'],
                files: [],          //  上传图片
                textarea: '',       //  发表文字内容
                videoFile: '',      //  视频文件     
                videoPicture: '',   //  视频文件图片   

                show2: false,       //  选择分类弹框
                show3: false,       //  新增分类弹框

                show4: false,       //  发布技能
                title: '',          //  发布技能标题
                price: '',          //  发布技能价格
                datetime: '',       //  截止时间
                
                    

                classList: [],      //  分类管理列表
                className: '',        //  分类名
                addText: '',        //  新增分类文字
                contentType: '',    //  上传类型

                //  定位
                options : {timeout: 8000},          //  定位超时
                address: '',                        //  地址
            }
    },
    methods: {
        //  文件流转化为url
        file2path(files){
            let urlList = []
            files.map(item => {
                urlList.push(this.getUrl(item))
            })
            return urlList
        },
        //发布小课、文章
        publishCourse(index){
            this.$vux.confirm.show({
                title: '塔兮',
                content: index == '0' ? '有干货，秀出来！欢迎您加入塔兮小课的创作。投稿邮箱：yunshangtaxi@163.com' : '让你的文字掷地有“金”，欢迎加入塔兮文章创作阵营。投稿邮箱yunshangtaxi@163.com',
                cancelText: '查看详情',
                confirmText: '关闭并复制',
                onCancel: () => {
                    this.showMore = false
                    if(index == '0'){
                        this.$router.push("./smallClass")
                    }else{
                        this.$router.push("./article")
                    }
                },
                onConfirm: () => {
                    this.$refs.copy.click()
                    this.showMore = false
                }
            })
        },
        copy() {
            let clipboard = new Clipboard('.copyText')
            clipboard.on('success', e => {
                this.toastSuccess("复制成功")
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                // 释放内存
                clipboard.destroy()
            })
        },
        //  上传文字
        publish0(){
            if(!this.$store.state.towerUserId){
                this.toastSuccess("请先登录")
                this.login()
            }else{
                this.show1 = true
            }
        },
        //  上传技能
        publish4(index){
            if(!this.$store.state.towerUserId){
                this.toastSuccess("请先登录")
                this.login()
            }else{
                this.show4 = true
                this.contentType = index
            }
        },

        //  将文件流转化为url
        getUrl(file){
            return file ? URL.createObjectURL(file) : null
        },
        //  上传文件
        uploadClick(val){
            if(!this.$store.state.towerUserId){
                this.toastSuccess("请先登录")
                this.login()
            }else{
                this.$refs[val].click()
                this.$refs[val].click()
            }
        },
        //  播放视频
        playVideo(){
            let videoUrl = this.getUrl(this.videoFile)
            this.openVideo(videoUrl, this.videoImg)
        },
        

        // 上传拍摄
        uploadVideo(e){
            this.videoFile = e.target.files[0];
            this.show1 = true
            e.target.value = ''

        },
        //  视频加载生成缩略图
        loadVideo(){
            let canvas = document.createElement("canvas")
            let video = this.$refs.video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            let canvasFill = canvas.getContext('2d');
            canvasFill.drawImage(video, 0, 0, canvas.width, canvas.height);
            this.videoPicture = canvas.toDataURL("image/jpeg")
        },
        // 上传相册（把图片添加到files列表里面，打开发布相册弹框并清除input值）
        uploadPicture(e){
            var that = this;
            const files = e.target.files;
            for(let i=0; i<files.length; i++){
                canvasDataURL(this.getUrl(files[i]), {}, (baseUrl) => {
                    that.files.push(baseUrl)
                    if(that.files.length>9){
                        that.files.pop()
                        that.$vux.alert.show({
                            content: '最多上传9张图片！',
                        })
                    }
                })
            }
            e.target.value = ''
            if(!this.show4){
                this.show1 = true
            }
            this.$refs.uploadPicture.value = ''
        },
        //  删除图片
        delImg(index){
            this.files.splice(index,1)
        },
        //  选择公开类型
        searchChoose(val){
            this.searchIndex = val
        },
        //  打开发布文字弹框（文本框聚焦）
        openShow1(){
            this.showMore = false
            let that = this
            setTimeout(function(){
                that.$refs.textarea.focus()
            },200)
        },
        //  关闭发布文字弹框（清除文本框内容和图片文件）
        closeShow1(){
            this.textarea = ''
            this.files = []
            this.videoFile = ''
            this.videoPicture = ''
        },
        //  发布文字、图片
        publishText(){
            if(this.textarea || this.files.length || this.videoFile){
                let params = new FormData()
                let contentType = 0
                this.files.map((file, index)=>{
                    params.append('img_'+(index+1) + '_base64', file)
                    contentType = 1
                })
                
                if(this.videoFile){
                    params.append('video', this.videoFile)
                    params.append('video_img', this.videoPicture)
                    contentType = 2
                }
                params.append('content', this.textarea)
                params.append('contentStatus ', this.searchIndex)
                params.append('dribKindName', this.className)
                params.append('contentType', contentType)
                this.$vux.loading.show({
                    text: '发布中...'
                })
                this.$post("upload", params, (data) => {
                    this.show1 = false
                    this.toastSuccess("上传成功")
                })
            }else{
                this.toastFail('请输入文字或上传图片', "200px")
            }
        },
        //  打开选择分类弹框
        openShow2(){
            let params = new FormData()
            this.$post("getdribkind", params, (data) => {
                this.classList = []
                data.dribKindList.map(item => {
                    this.classList.push(item.dribKindName)
                })
            })
        },
        //  取消选择分类（清除className）
        cancelClass(){
            this.show2 = false
            this.className = ''
        },
        //  打开新增分类弹窗
        openShow3(){
            this.show3 = true
            let that = this
            setTimeout(function(){
                that.$refs.addInput.focus()
            },200)
        },
        //  新增分类确定
        addSubmit(){
            if(this.addText.length < 2 || this.addText.length > 6){
                this.toastFail('请输入2-6字符', '160px')
            }else{
                console.log(this.addText)
                let params = new FormData()
                params.append("dribKindName", this.addText)
                this.$post("adddribkind", params, (data) => {
                    this.classList.push(this.addText)
                    this.toastSuccess('添加成功')
                    this.show3 = false
                    this.addText = ''    
                })
            }
        },


        //  关闭发布技能弹框
        closeShow4(){
            this.textarea = ''
            this.files = []
            this.title = ''
            this.price = ''
            this.datetime = ''
        },
        //  上传技能、需求图片
        upload5(e){
            this.files = e.target.files;
        },
        //  发布技能
        publishSkill(){
            if(!this.title.trim()){
                this.toastFail("标题不能为空", "120px")
                return
            }
            if(!this.textarea.trim()){
                this.toastFail("描述不能为空", "120px")
                return
            }
            let params = new FormData()
            params.append("title", this.title)
            if(this.contentType == 4){
                if(!this.price.trim()){
                    this.toastFail("价格不能为空", "120px")
                    return
                }
                params.append("price", this.price)
            }
            params.append("textarea", this.textarea)
            params.append("contentType", this.contentType)
            this.files.map((file, index)=>{
                params.append('img_'+(index+1) + '_base64', file)
            })
            this.$vux.loading.show({
                text: '发布中...'
            })
            this.$post("upload", params, (data) => {
                this.show4 = false
                this.toastSuccess("上传成功")
            })
        },
    /***************************************获取定位*********************************** */
            geolocation(){
                this.$vux.loading.show({
                    text: '定位中...'
                })
                var geolocation = new qq.maps.Geolocation("OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77", "myapp")
                geolocation.getLocation(this.showPosition, this.showErr, this.options)
            },
            showPosition(position) {
                var latlon = position.lat + "," + position.lng;
                var url = 'http://maps.google.cn/maps/api/geocode/json?latlng='+latlon+'&language=CN';
                this.$axios({
                    method:"GET",
                    url:url,
                    withCredentials: false,
                }).then(json => {
                    this.$vux.loading.hide()
                    if(json.data.status=='OK'){
                        this.address = json.data.results[0].formatted_address;
                    }else{
                        this.toastFail("定位失败")
                    }
                }).catch(res=>{
                        this.$vux.loading.hide()
                        this.toastFail('网络异常，请稍后再试', '200px')
                    }
                )
            },
            showErr(){
                this.toastFail("定位失败")
            },
    }  
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
        var quality = 0.3; 
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
    //  底部tab样式
    .weui-tabbar{
        background: #f2f2f2;
        position: absolute;
        bottom: 0;
        z-index: 409;
        .iconfont{
            position: relative;
            top: -4px;
        }
        .more{
            background: #fff;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: inline-block;
            position: relative;
            top: -6px;
            i{
                font-size: 36px;
                line-height: 56px;
                color: @baseColor;
                top: 0;
            }
        }
    }  
    //  上传类型样式
    .more-handle{
        height: 250px;
        padding-top: 35px;
        background: #fff;
        overflow: hidden;
        .more-handle-body{
            text-align: center;
            overflow: hidden;
            padding-bottom: 20px;
            a, div{
                width: 25%;
                float: left;
                margin-bottom: 20px;
                span{
                    display: inline-block;
                    border-radius: 50%;
                    width: 45px;
                    height: 45px;
                    color: #fff;
                    margin-bottom: 10px;
                    i{
                        font-size: 28px;
                    }
                }
            }
        }
        .more-handle-footer{
            position: relative;
            border-top: 1px solid #ddd;
            text-align: center;
            &:before{
                position: absolute;
                top: 0;
                display: block;
                content: '';
                background: #fff;
                height: 30px;
                width: 100%;
                z-index: 2;
            }
            span{
                position: relative;
                top: -27px;
                display: inline-block;
                border-radius: 50%;
                border: 1px solid #ddd;
                width: 54px;
                height: 54px;
                background: #fff;
                i{
                    font-size: 40px;
                    position: relative;
                    top: -4px;
                    z-index: 3;
                    color: #ddd;
                }
            }
        }
    }


    .main{
        background: #fff;
        .header{
            line-height: 36px;
            padding: 0 10px;
        }
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
            padding: 10px 20px;
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
        }
        .img-list{
            padding-left: 10px;
            .upload{
                font-size: 44px;
                color: #ccc;
            }
        }
    }
    .footer{
        position: fixed;
        bottom: 0;
        z-index: 2;
        width: 100%;
        >div{
            height: 40px;
            line-height: 40px;
            padding: 0 10px;
        }
        >p{
            background: #f6f6f6;
            color: #ccc;
            height: 50px;
            line-height: 50px;
            // .upload-box{

            // }
            i{
                margin-left: 20px;
                font-size: 28px;
            }
        }
    }
    .tab{
        width: 68px;
        background: #f6f6f6;
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        text-align: center;
        border-radius: 14px;
        margin-top: 5px;
        i{
            font-size: 18px;
            line-height: 18px;
            vertical-align: text-bottom;
            color: @baseColor;
            margin-right: 4px;
        }
    }
    .search-tab-items{
        width: 48px;
        border: 1px solid #ddd;
        border-radius: 4px;
        background: #fff;
        text-align: center;
        color: #777;
        p{
            line-height: 24px;
            &:not(:last-of-type){
                border-bottom: 1px solid #ddd;
            }
            &.active{
                color: @baseColor;
            }
        }
    }
    .choose-class{
        padding-top: 46px;
        background: #f2f2f2;
        .btn-add{
            height: 46px;
            margin: 10px 0;
            background: #fff;
            padding-left: 10px;
            line-height: 46px;
            i{
                font-size: 20px;
                vertical-align: middle;
                color: #ccc;
            }
            a{
                color: @baseColor;
                font-size: 14px;
            }
        }
    }
    

</style>
<style lang="less">
    .vux-popover{
        z-index: 503 !important;
    }
</style>

