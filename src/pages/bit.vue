<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{showBack: false}">我的点滴
            <a slot="right" @click="show1=true"><i style="font-size: 24px;" class="iconfont icon-icon-"></i></a>
        </x-header>
        <div class="main">
            <scroller v-show="dribKindList.length>5" lock-y :scrollbar-x=false>
                <div class="box1" :style="'width: '+ 22*dribKindList.length +'vw;'">
                    <div class="ability-item" v-for="(item, index) in dribKindList" :key="index" @click="getDribByKind(item.dribKindId, item.dribKindName, item.dribKindDetail)">
                        <p>{{item.dribKindName || '默认分类'}}</p>
                        <p class="num">{{item.dribKindNum}}</p>
                    </div>
                </div>
            </scroller>
            <scroller v-show="!isEmpty" use-pullup :pullup-config="pullupDefaultConfig" @on-pullup-loading="loadMore"
                use-pulldown :pulldown-config="pulldownDefaultConfig" @on-pulldown-loading="refresh"
                lock-x ref="scrollerBottom" height="-172" @on-scroll="onScroll">
                <div>
                    <div v-show="!dribKindDetail" @click="popup0 = true">
                        <div class="desc-info" v-show="dribKindName == '基本信息'">
                            <p>姓名：</p>
                            <p>性别：</p>
                            <p>出生日期：</p>
                            <p>学校：</p>
                            <p>专业：</p>
                            <p>学历：</p>
                            <p>入学时间：</p>
                            <p>用一个词来形容自己：</p>
                        </div>
                        <div class="desc-info" v-show="dribKindName == '日常点滴'">
                            <p>我爱好记录生活，你也可以在我的生活中更好的认识我</p>
                        </div>
                        <div class="desc-info" v-show="dribKindName == '技能变现'">
                            <p>我擅长的技能有这些：</p>
                            <p>技能1：</p>
                            <p>技能2：</p>
                        </div>
                        <div class="desc-info" v-show="dribKindName == '技能学习'">
                            <p>我注重生活技能的提升，这些是我学过和正在学习的技能：</p>
                            <p>学习1：</p>
                            <p>学习2：</p>
                        </div>
                        <div class="desc-info" v-show="dribKindName == '文学创作'">
                            <p>写文章，是我的爱好，时不时发表一下想法让我觉得很愉快</p>
                        </div>
                        <div class="desc-info" v-show="dribKindName == '校园生活'">
                            <p>简单梳理一下自己的教育经历：</p>
                            <p>xx年xx月-xx年xx月  xx高中</p>
                            <p>xx年xx月-xx年xx月  xx大学    xx专业   xx学历</p>
                            <p>xx年xx月-xx年xx月  xx大学    xx专业   xx学历</p>
                            <p>美好的校园生活，我将它们在这里封存</p>
                        </div>
                        <div class="desc-info" v-show="dribKindName == '学业成绩'">
                            <p>关于专业成绩，我可以用不错来形容：</p>
                            <p>GPA：</p>
                        </div>
                        <div class="desc-info" v-show="dribKindName == '工作经验'">
                            <p>在工作经验，我对自己的职业发展是很负责任的，待过的公司都帮助我收获了巨大的成长：</p>
                            <p>xx年xx月-xx年xx月  xx公司    xx职务</p>
                            <p>xx年xx月-xx年xx月  xx公司    xx职务</p>
                        </div>
                        <div class="desc-info" v-show="dribKindName == '项目经验'">
                            <p>这些是我参与过的项目和取得的成绩：</p>
                            <p>xx年xx月-xx年xx月 xx项目  xx角色     xx成绩</p>
                            <p>xx年xx月-xx年xx月 xx项目  xx角色     xx成绩</p>
                        </div>
                        <div class="desc-info" v-show="dribKindName == '实践经验'">
                            <p>我注重将所学知识与实践应用的结合，在校期间参与过以下实践活动：</p>
                            <p>xx年xx月-xx年xx月 xx活动  xx成绩</p>
                            <p>xx年xx月-xx年xx月 xx活动  xx成绩</p>
                        </div>
                        <div class="desc-info" v-show="dribKindName == '兴趣爱好'">
                            <p>我闲暇时间是这么安排的，做这些事让我轻松：</p>
                            <p>兴趣1:</p>
                            <p>兴趣2:</p>
                        </div>
                        <div class="desc-info" v-show="dribKindName == '个人评价'">
                            <p>用一句话来描述我自己，我觉得是：</p>
                        </div>
                    </div>
                    <div class="desc-info" v-show="dribKindDetail" @click="popup0 = true">
                        <p>{{dribKindDetail}}</p>
                    </div>
                    <div style="height: 15px;"></div>
                    <div class="hot-card" @click="toDetail(item.towerContentId, item.contentType)" v-for="(item, index) in contentShowList" :key="index">
                        <div v-show="item.title" class="card-title text-ellipsis">{{item.title}}</div>
                        <div v-show="item.content" class="card-desc" :class="item.contentType == '0'? 'text-ellipsis12':'text-ellipsis2'">{{item.content}}</div>
                        <div v-if="item.contentType == 2 || item.contentType == 3" class="video-box">
                            <img :src="item.videoImg" alt="" class="video-img">
                            <span class="play-btn iconfont icon-bofang" @click.stop="openVideo(item.videoUrl, item.videoImg)"></span>
                        </div>
                        <!-- 图片 -->
                        <div v-if="item.imgUrls.length" class="thumbnail-box">
                            <div v-if="item.imgUrls.length > 1" class="thumbnail" :style="{backgroundImage: 'url(' + imgItem + ')' }" 
                                v-for="(imgItem, imgIndex) in item.imgUrls" :key="imgIndex" @click.stop="viewPicture(item.imgUrls, imgIndex)"></div>
                            <div v-if="item.imgUrls.length == 1" class="thumbnail-one" @click.stop="viewPicture(item.imgUrls, 0)">
                                <img :src="item.imgUrls[0]" alt="">
                            </div>
                        </div>
                        <div class="handle">{{longTime(item.createDate)}}
                            <i v-show="item.praise != 1" class="iconfont icon-dianzan1" @click.stop="praise(item.towerContentId, index)"></i>
                            <i v-show="item.praise == 1" class="iconfont icon-yijin13-zan text-red" @click.stop="no_praise(item.towerContentId, index)"></i>
                            <i class="iconfont icon-pinglun" @click.stop="toDetail(item.towerContentId, item.contentType, 1)"></i>
                            <i v-show="item.collection != 1" class="iconfont icon-ego-heart" @click.stop="collection(item.towerContentId, index)"></i>
                            <i v-show="item.collection == 1" class="iconfont icon-guanzhu text-red" @click.stop="no_collection(item.towerContentId, index)"></i>
                        </div> 
                    </div>
                </div>
            </scroller>
        </div>
        <!--编辑默认分类描述-->
        <popup v-model="popup0" height="100%"  @on-show="showPopup0">
            <x-header class="pst">
                {{dribKindName}}
                <a slot="overwrite-left" @click="popup0 = false">取消</a>
                <a slot="right" @click="savePopup0">保存</a>
            </x-header>
            <x-textarea :height="140" class="textarea" v-model="dribKindDetail" ref="textarea" placeholder="请输入描述" style="background: #fff;"></x-textarea>
        </popup>
        <!--分类管理-->
        <popup v-model="show1" height="100%">
            <div class="popup1">
                <x-header class="pst">
                    分类管理
                    <a slot="overwrite-left" @click="show1=false">取消</a>
                    <a slot="right" @click="show1=false">完成</a>
                </x-header>
                <div class="main" style="padding-bottom: 0;">
                    <div class="btn-add" @click="addClass">
                        <i class="iconfont icon-tainjia"></i>
                        <a>新增分类</a>
                    </div>
                    <ul class="items">
                        <li class="list-item" v-if="item.dribKindType == 1" v-for="(item,index) in dribKindList" data-type="0" :key="index">
                            <div class="list-box" :index="index" @touchstart.capture="touchStart" @touchmove.capture='touchMove' @touchend.capture="touchEnd" @click="skip">{{item.dribKindName}}</div>
                            <!-- <div class="handle" @click="deleteItem(index)" :data-index="index">删除</div> -->
                            <div class="handle">
                                <div class="edit" @click="editItem(index)">编辑</div>
                                <div class="delete" @click="deleteItem(item.dribKindId,index)">删除</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </popup>
        <!--添加分类-->
        <popup v-model="show2" height="100%" @on-hide="addText=''">
            <div class="popup2">
                <x-header class="pst">
                    新建分类
                    <a slot="overwrite-left" @click="show2 = false">取消</a>
                    <a slot="right" @click="addSubmit">完成</a>
                </x-header> 
                <group gutter='0' title="新的分类">
                    <x-input ref="addInput" v-model="addText" placeholder="请输入分类名(2-6字符)"></x-input>
                </group>
            </div>
        </popup>
        <!--编辑分类-->
        <popup v-model="show3" height="100%">
            <div class="popup3">
                <x-header class="pst">
                    编辑
                    <a slot="overwrite-left" @click="show3 = false">取消</a>
                    <a slot="right" @click="editSubmit">完成</a>
                </x-header> 
                <group gutter='0'>
                    <x-input ref="editInput" placeholder="请输入分类名" v-model="editText"></x-input>
                </group>
            </div>
        </popup>
    </div>
</template>

<script>
    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, Scroller, Popup, Group, XInput } from 'vux'
    import { Tab, TabItem, Sticky, Divider, XButton, Swiper, SwiperItem, XTextarea } from 'vux'
    import { setTimeout } from 'timers';

    const pulldownDefaultConfig = {
        content: '下拉刷新',
        height: 40,
        autoRefresh: false,
        downContent: '下拉刷新',
        upContent: '释放后刷新',
        loadingContent: '正在刷新...',
        clsPrefix: 'xs-plugin-pulldown-'
    }
    const pullupDefaultConfig = {
        content: '加载中...',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '释放后加载',
        upContent: '上拉加载更多',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pullup-'
    }
    export default {
        components: {
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
            Scroller,
            Popup,
            Group,
            XInput,
            XTextarea,  
        },
        data () {
            return {
                tab: 0,
                show1: false,   //  分类管理窗口
                show2: false,   //  添加分类窗口
                show3: false,   //  编辑分类窗口
                popup0: false,  //  编辑默认分类描述
                startX : 0 ,
                endX : 0 ,
                editText: '',
                addText: '',
                index: 0,

                contentAllList: [],     //  所有数据
                contentShowList: [],    //  页面显示数据    
                dribKindList: [],       //  点滴分类列表 
                length: 5,              //  显示数据长度
                pageNum: 1,             //  当前页
                dribKindId: '',         //  点滴分类id
                dribKindName: '',        //  当前分类名称
                dribKindDetail: '',     //  分类描述

                //  刷新、加载
                pullupDefaultConfig: pullupDefaultConfig,
                pulldownDefaultConfig: pulldownDefaultConfig,
                isEmpty: false,         //  没有数据
            }
        },
        mounted(){
            this.$nextTick(() => {
                this.$refs.scrollerBottom.reset({top: 0})
            })
            this.$vux.loading.show()
            this.loadMore()
        },
        activated(){
            this.getdribkind()
        },
        methods: {
            
            //  获取点滴分类
            getdribkind(){
                let params = new FormData()
                this.$post("getdribkind", params, (data) => {
                    this.dribKindList = data.dribKindList
                })
            },

            //  获取分类内容
            getDribByKind(dribKindId, dribKindName, dribKindDetail){
                // this.dribKindName = dribKindName
                this.dribKindId = dribKindId
                this.refresh(dribKindName, dribKindDetail)
            },

            //  打开点滴默认分类编辑
            showPopup0(){
                setTimeout(() => {
                    this.$refs.textarea.focus()
                },200)
            },

            //  保存点滴默认分类
            savePopup0(){
                let params = new FormData();
                params.append("dribKindId", this.dribKindId)
                params.append("dribKindName", this.dribKindName)
                params.append("dribKindDetail", this.dribKindDetail)
                this.$post("editdribkind", params, (data) => {
                    this.popup0 = false
                    this.getdribkind()
                })
            },

            fetchData(cb) {
                var that = this
                setTimeout(function(){
                    that.$nextTick(() => {
                        that.$refs.scrollerBottom.reset()
                    })
                    cb()
                }, 200)
            },

            //  下拉刷新
            refresh(dribKindName, dribKindDetail) {
                this.fetchData(data => {
                    this.pageNum = 1
                    this.$refs.scrollerBottom.enablePullup()
                    this.$refs.scrollerBottom.donePulldown()
                    let params = new FormData()
                    params.append("pageNum", 1)
                    params.append("dribKindId", this.dribKindId)
                    this.$vux.loading.show()
                    this.$post("getdrib", params, (data) => {
                        this.dribKindName = dribKindName
                        this.dribKindDetail = dribKindDetail
                        this.$refs.scrollerBottom.reset({top: 0})
                        this.contentShowList = [].concat(data.contentList)
                        if(data.contentList.length == 5){
                            this.pageNum += 1
                            this.$refs.scrollerBottom.donePullup()
                        }else{
                            this.$refs.scrollerBottom.disablePullup()
                        }
                    })
                })
            },
            //  加载数据
            loadMore() {
                this.fetchData(() => {
                    let params = new FormData()
                    params.append("pageNum", this.pageNum)
                    this.$vux.loading.show()
                    this.$post("getdrib", params, (data) => {
                        data.contentList.map(item => {
                            item['isError'] = false
                            this.contentShowList.push(item)
                        })
                        if(data.contentList.length == 5){
                            this.pageNum += 1
                            this.$refs.scrollerBottom.donePullup()
                        }else{
                            this.$refs.scrollerBottom.disablePullup()
                        }
                    })
                })
            },
            onScroll(e){
                
            },

            

            //  收藏
            collection(id, index){
                let params = new FormData()
                params.append('towerContentId', id)
                this.$post("collection", params, (data) => {
                    this.contentShowList[index].collection = '1'
                })
            },
            //  取消收藏
            no_collection(id, index){
                let params = new FormData()
                console.log(id)
                params.append('towerContentId', id)
                this.$post("no_collection", params, (data) => {
                    this.contentShowList[index].collection = '0'
                })
            },
            //  点赞
            praise(id, index){
                let params = new FormData()
                params.append('towerContentId', id)
                this.$post("praise", params, (data) => {
                    this.contentShowList[index].praise = '1'
                })
            },
            //  取消点赞
            no_praise(id, index){
                let params = new FormData()
                params.append('towerContentId', id)
                this.$post("no_praise", params, (data) => {
                    this.contentShowList[index].praise = '0'
                })
            },



            skip(){
                if( this.checkSlide() ){
                    this.restSlide();
                }else{
                }
            },
            //滑动开始
            touchStart(e){
                // 记录初始位置
                this.startX = e.touches[0].clientX;
            },
            //滑动中
            touchMove(e){
                // 滑动距离
                let parentElement = e.currentTarget.parentElement;
                let s = e.touches[0].clientX - this.startX;
                if(parentElement.dataset.type == 0 & s<0){
                    s = s<-120?-120:s
                    parentElement.setAttribute('style', 'transform: translate3d(' + s + 'px,0,0)')
                }
                if(parentElement.dataset.type == 1 & s>0){
                    s = s>120?0:s-120
                    parentElement.setAttribute('style', 'transform: translate3d(' + s + 'px,0,0)')
                }
            },
            //滑动结束
            touchEnd(e){
                // 当前滑动的父级元素
                let parentElement = e.currentTarget.parentElement;
                // 记录结束位置
                this.endX = e.changedTouches[0].clientX;
                // 左滑
                if( parentElement.dataset.type == 0 && this.startX - this.endX > 30 ){
                    this.restSlide();
                    parentElement.setAttribute('style', 'transform: translate3d(-120px,0,0)')
                    parentElement.dataset.type = 1
                }
                // 右滑
                if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
                    this.restSlide();
                    parentElement.setAttribute('style', 'transform: translate3d(0,0,0)')
                    parentElement.dataset.type = 0
                }
                this.startX = 0;
                this.endX = 0;
            },
            //判断当前是否有滑块处于滑动状态
            checkSlide(){
                let listItems = document.querySelectorAll('.list-item');
                for( let i = 0 ; i < listItems.length ; i++){
                    if( listItems[i].dataset.type == 1 ) {
                        return true;
                    }
                }
                return false;
            },
            //复位滑动状态
            restSlide(){
                let listItems = document.querySelectorAll('.list-item');
                // 复位
                for( let i = 0 ; i < listItems.length ; i++){
                    listItems[i].setAttribute('style', 'transform: translate3d(0,0,0)')
                    listItems[i].dataset.type = 0
                }
            },
            addClass(){
                this.show2 = true
                let that = this
                setTimeout(function(){
                    that.$refs.addInput.focus()
                },200)
            },
            //编辑
            editItem(index){
                this.restSlide();
                this.show3 = true
                this.editText = this.dribKindList[index].dribKindName
                this.index = index
            },
            //删除
            deleteItem(id, index){
                let that = this
                this.$vux.confirm.show({
                    title: '塔兮',
                    content: '确定要删除吗?',
                    onCancel () {that.restSlide();},
                    onConfirm () {
                        let params = new FormData()
                        params.append("dribKindId", id)
                        that.$post("deletedribkind", params, (data) => {
                            that.restSlide();
                            that.dribKindList.splice(index,1);
                        })
                    }
                })
            },
            //  新增分类确定
            addSubmit(){
                if(this.addText.length < 2 || this.addText.length > 6){
                    this.toastFail('请输入2-6字符', '160px')
                }else{
                    let params = new FormData()
                    params.append("dribKindName", this.addText)
                    this.$post("adddribkind", params, (data) => {
                        this.dribKindList.push({
                            "dribKindId": data.dribKindId,
                            "dribKindName": this.addText,
                            "dribKindNum": '0',
                            "dribKindType": '1'
                        })
                        this.toastSuccess('添加成功')
                        this.show2 = false
                        this.addText = ''    
                    })
                }
            },
            //  编辑分类确定
            editSubmit(){
                let params = new FormData()
                params.append("dribKindId", this.dribKindList[this.index].dribKindId)
                params.append("dribKindName", this.editText)
                this.$post('editdribkind', params, (data) => {
                    this.show3 = false
                    this.dribKindList[this.index].dribKindName = this.editText
                })
            },
            
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding: 46px 0 60px;
        background: #f2f2f2;
        font-size: 12px;
        .bit-title{
          position: relative;
          background: #fff;
          color: @baseColor;
          padding-left: 20px;
          padding-top: 5px;
          line-height: 24px;
          &:before{
            content: '';
            display: block;
            width: 4px;
            height: 18px;
            background: @baseColor; 
            position: absolute;
            left: 10px;
          }
        }
        .box1 {
            height: 50px;
            position: relative;
            background: #fff;
            overflow: hidden;
            text-align: center;
            line-height: 24px;
            padding: 10px 0;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            .ability-item{
                float: left;
                width: 80px;
                .num{
                    font-weight: bold;
                }
            }
        }
        .ability{
            background: #fff;
            overflow: hidden;
            text-align: center;
            line-height: 24px;
            padding: 10px 0;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            margin-bottom: 10px;
            .ability-item{
                float: left;
                width: 22vw;
                .num{
                    font-weight: bold;
                }
            }
        }
        .desc-info{
            background: #fff;   
            padding: 10px;
            line-height: 20px;
            color: #ccc;
        }
        .hot-card{
            padding: 10px 10px 3px;
            background: #fff;
            margin-bottom: 15px;
            color: #777;
            .user-info{
                overflow: hidden;
                margin-bottom: 5px;
                img{
                    border-radius: 50%;
                    vertical-align: middle;
                    border: 1px solid #ddd;
                    margin-right: 10px;
                }
                a{
                    float: right;
                    margin-top: 3px;
                    height: 25px;
                    width: 50px;
                    text-align: center;
                    line-height: 24px;
                    border-radius: 4px;
                    font-size: 13px;
                    border: 1px solid #ccc;
                    color: #ccc;
                    &.active{
                        color: #fff;    
                        background: @baseColor;
                        border-color: @baseColor;
                    }
                }
            }
            .card-title{
                font-weight: bold;
                padding-bottom: 3px;
            }
            .card-desc{
                box-sizing: border-box;
                padding: 0px 0;
                line-height: 20px;
                padding-bottom: 2px;
            }
            .text-box{
                max-height: inherit;
                -webkit-line-clamp: 12;
            }
            .handle{
                color: #ccc;
                line-height: 30px;
                overflow: hidden;
                i{
                    float: right;
                    margin-right: 10px;
                    font-size: 20px;
                }
            }
        }
    }
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
    .items{
        overflow: hidden;
        .list-item{
            position: relative;
            height: 46px;
            line-height: 46px;
            -webkit-transition: all 0.2s;
            transition: all 0.2s;
            border-bottom: 1px solid #ddd;
            .list-box{
                padding: 0 10px;
                background: #fff;
                box-sizing: border-box;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
            }
            .handle{
                width: 120px;
                color: #fff;
                text-align: center;
                position: absolute;
                top:0;
                right: -120px;
                display: flex;
                .edit{
                    flex: 1;
                    background: #fbce77;
                }
                .delete{
                    flex: 1;
                    background: #ccc;
                }
            }
        }
    }
    .weui-cell{
        font-size: 14px;
    }
</style>

