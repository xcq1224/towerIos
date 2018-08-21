import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: 0,
    url: '123434',
    pictureFiles: '',
    // 2c93b3ca63fd01ea01641160ee8b0042
    towerUserId: '',
    avatar: '',             //  用户头像
    userName: '',           //  用户名
    showVideo: false,        //  是否显示视频弹框
    videoUrl: '',           //  视频url
    videoImg: '',           //  视频缩略图
    showPicture: false,       //  是否显示图片弹框
    pictureList: [],            //  图片列表
    pictureIndex: [],            //  图片index
    isRouterAlive: true,          //  刷新当前路由
    nextUrl: '',                //  登录后跳转的url
    version: '',                //  当前版本
}

const mutations = {
    inc: state => state.count++,
    dec: state => state.count--
}

const actions = {
	inc(){
        state.count++
    },
    dec(){
        state.count--
    }
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})