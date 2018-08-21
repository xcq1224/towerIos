<template>
    <div class="page"> 
        <x-header class="pst" :left-options="{backText: ''}">个人资料<a slot="right" @click="save">保存</a></x-header>
        <div class="main">
            <group gutter='0' label-width="100px">
                <input class="upload-input" v-show="false" ref="upload" type="file" @change="upload" accept="image/*">
                <cell class="cell" is-link @click.native="uploadClick">
                    <span slot="title">头像</span>
                    <div slot>
                        <img :src="file ? getUrl(file) : userInfo.icon" alt="">
                    </div>
                </cell>
                <cell class="cell" v-show="editIndex !=1" @click.native="editInput(1)">
                    <span slot="title">昵称</span>
                    <div slot>{{userInfo.name}}</div>
                </cell>
                <x-input title="昵称" v-show="editIndex == 1" v-model="userInfo.name" ref="nick" @on-blur="editIndex = 0"></x-input>
                <popup-radio title="性别" :options="sexList" v-model="userInfo.sex"></popup-radio>
                <!-- <datetime
                    v-model="towerUserBirthday"
                    title="生日">
                </datetime> -->
                <popup-radio title="工作状态" :options="categoryList" v-model="userInfo.category"></popup-radio>
                <cell class="cell" v-show="editIndex !=2" @click.native="editInput(2)">
                    <span slot="title">学校</span>
                    <div slot>{{userInfo.university}}</div>
                </cell>
                <x-input title="学校" v-show="editIndex == 2" v-model="userInfo.university" ref="university" @on-blur="editIndex = 0"></x-input>
                <cell class="cell" v-show="editIndex !=3" @click.native="editInput(3)">
                    <span slot="title">公司</span>
                    <div slot>{{userInfo.company}}</div>
                </cell>
                <x-input title="公司" v-show="editIndex == 3" v-model="userInfo.company" ref="company" @on-blur="editIndex = 0"></x-input>
                <cell class="cell" v-show="editIndex !=4" @click.native="editInput(4)">
                    <span slot="title">职位</span>
                    <div slot>{{userInfo.position}}</div>
                </cell>
                <x-input title="职位" v-show="editIndex == 4" v-model="userInfo.position" ref="position" @on-blur="editIndex = 0"></x-input>
                <cell class="cell" v-show="editIndex !=5" @click.native="editInput(5)">
                    <span slot="title">个人简介</span>
                    <div slot>{{userInfo.introduce}}</div>
                </cell>
                <x-input title="个人简介" v-show="editIndex == 5" v-model="userInfo.introduce" ref="introduce" @on-blur="editIndex = 0"></x-input>
            </group>
        </div>
    </div>
</template>

<script>

    import { XHeader, Actionsheet, TransferDom, ButtonTab, ButtonTabItem, ChinaAddressData, Cell, PopupRadio } from 'vux'
    import { Divider } from 'vux'
    import { Tab, TabItem, Sticky, XButton } from 'vux'
    import { Card } from 'vux'
    import { PopupPicker } from 'vux'
    import { XInput, Group, XAddress, XTextarea, Datetime } from 'vux'
    import { setTimeout } from 'timers';

    export default {
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Divider,
            Tab,
            TabItem,
            Sticky,
            Divider,
            XButton,
            Card,
            PopupPicker,
            XInput,
            Group,
            XAddress,
            XTextarea,
            Datetime,
            Cell,
            PopupRadio,
        },  
        data () {
            return {
                formADD: {

                },
                editIndex: 0,       //  编辑中
                nick: '曾庆全',
                sexList: ["男", "女"],     //  性别
                categoryList: [{key: '0', value: "工作"}, {key: '1', value: "学生"}],     //  性别
                userInfo: {},       //  用户信息
                refList: ["nick", 'university', 'company', 'position', 'introduce'],          //  input 元素
                file: '', 
            }
        },
        activated(){
            this.file = ''
            let params = new FormData()
            this.$post("getpersonaldetails", params, (data) => {
                this.userInfo = {
                    category: data.category || '',
                    company: data.company || '',
                    icon: data.icon || '',
                    introduce: data.introduce || '',
                    name: data.name || '',
                    position: data.position || '',
                    sex: data.sex || '',
                    university: data.university || '',
                    // towerUserBirthday: data.towerUserBirthday || ''
                }
            })
        },
        methods: {
            editInput(index){
                this.editIndex = index
                setTimeout(() => {
                    this.$refs[this.refList[index-1]].focus()
                }, 0)
            },
            save(){
                let params = new FormData()
                params.append("towerUserName", this.userInfo.name)
                params.append("towerUsersex", this.userInfo.sex)
                params.append("towerUserUniversity", this.userInfo.university)
                params.append("towerUserCompany", this.userInfo.company)
                params.append("towerUserIntroduce", this.userInfo.introduce)
                params.append("towerUserPosition", this.userInfo.position)
                params.append("towerUserCategory", this.userInfo.category)
                // params.append("towerUserBirthday", this.userInfo.towerUserBirthday)
                if(this.file) params.append("icon", this.file)
                this.$post("addpersonadata", params, (data) => {
                    this.$store.state.userName = this.userInfo.name
                    if(data.iconUrl) this.$store.state.avatar = data.iconUrl
                    this.toastSuccess("修改成功")
                    this.$router.back(-1)
                })
            },

            //  上传头像
            uploadClick(){
                this.$refs.upload.click()
                this.$refs.upload.click()
            },
            upload(e){
                this.file = e.target.files[0];
                this.$refs.upload.value = ''
            },
            getUrl(file){
                if(file) return URL.createObjectURL(file)
            },




            
        },
    }
</script>

<style lang="less" scoped>
    @import "../style/base_color.less";
    .main{
        background: #f2f2f2;
        padding-top: 46px;
        padding-bottom: 55px;
        font-size: 12px;
        .weui-cell, .vux-cell-box{
            font-size: 14px;
            &:before{
                left: 0;
            }
        }
        img{
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: block;
            border: 1px solid #ddd;
        }
        .work-info-left{
            width: 100px;
            display: block;
        }
        .btn-add{
            display: block;
            text-align: center;
            font-size: 14px;
            line-height: 45px;
            border-bottom: 1px solid #ddd;
            background: #fff;
            margin-bottom: 10px;
        }
    }
</style>



