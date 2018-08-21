<template>
  <div class="page bit-manage">
    <x-header class="pst" :left-options="{backText: '取消'}">
        分类管理
        <a slot="right">完成</a>
    </x-header>
    <div class="main">
        <div class="btn-add" @click="show = true">
            <i class="iconfont icon-tainjia"></i>
            <a>新增分类</a>
        </div>
        <ul>
            <li class="list-item " v-for="(item,index) in list " data-type="0" :key="index">
                <div class="list-box" :index="index" @touchstart.capture="touchStart" @touchmove.capture='touchMove' @touchend.capture="touchEnd" @click="skip">{{item}}</div>
                <!-- <div class="handle" @click="deleteItem(index)" :data-index="index">删除</div> -->
                <div class="handle">
                    <div class="edit" @click="editItem(index)">编辑</div>
                    <div class="delete" @click="deleteItem(index)">删除</div>
                </div>
            </li>
        </ul>
    </div>
    <popup v-model="show" height="100%">
        <div class="popup">
            <x-header class="pst">
                新建分类
                <a slot="overwrite-left" @click="show = false">取消</a>
                <a slot="right" @click="addClass">完成</a>
            </x-header> 
            <group gutter='0' title="新的分类">
                <x-input v-model="addText" placeholder="请输入分类名"></x-input>
            </group>
        </div>
    </popup>
    <popup v-model="show1" height="100%">
        <div class="popup1">
            <x-header class="pst">
                编辑
                <a slot="overwrite-left" @click="show1 = false">取消</a>
                <a slot="right">完成</a>
            </x-header> 
            <group gutter='0'>
                <x-input placeholder="请输入分类名" v-model="editText"></x-input>
            </group>
        </div>
    </popup>
  </div>
</template>


<script>
    import { XHeader, Popup, Group, XInput } from 'vux'

    export default {
        components: {
            XHeader,
            Popup,
            Group,
            XInput,
        },
        data () {
            return {
                list : ['技能才艺', 'AAAAA', 'BBBBBB', 'CCCCCC'],
                startX : 0 ,
                endX : 0 ,
                show: false,        //  新增窗口
                show1: false,       //  编辑窗口
                editText: '',
                addText: '',
                index: 0,
            }
        },
        methods: {
            //  新增分类
            addClass(){
                this.list.push(this.addText)
                this.show = false
                this.addText = ''    
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
            //编辑
            editItem(index){
                this.restSlide();
                this.show1 = true
                this.editText = this.list[index]
                this.index = index
            },
            //删除
            deleteItem(index){
                let that = this
                this.$vux.confirm.show({
                    title: '塔兮',
                    content: '确定要删除吗?',
                    onCancel () {that.restSlide();},
                    onConfirm () {
                        that.restSlide();
                        that.list.splice(index,1);
                    }
                })
                
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        padding-top: 46px;
        background: #f7f7f7;
        ul{
            overflow: hidden;
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
        }
    }
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
    .weui-cell{
        font-size: 14px;
    }
</style>
<style lang="less">
    .bit-manage{
        .left-arrow{
            display: none;
        }
        .vux-header .vux-header-left .vux-header-back{
            padding-left: 0;
        }
    }
</style>

