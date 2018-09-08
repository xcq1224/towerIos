// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import store from './store'
import axios from 'axios'
import App from './App'
import  { ConfirmPlugin, ToastPlugin, AlertPlugin, LoadingPlugin } from 'vux'
import 'lib-flexible/flexible.js'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Bridge from './config/bridge.js'
//  定位
import "./js/geolocation.min"

//  富文本编辑器
import initRichText from './js/edit';  
initRichText();
//  video.js
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);


FastClick.attach(document.body)

// axios.defaults.withCredentials = true
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin )
Vue.use(VueAwesomeSwiper)
Vue.use(LoadingPlugin )
Vue.prototype.$bridge = Bridge

/**------------------------------------ios回调方法------------------------------------------------- */
window.shareResult = function(channel_id,share_channel,share_url) {
    var content = channel_id+","+share_channel+","+share_url;
    alert(content);
}
//  登录成功回调
window.loginResult = function(res){
    let data = JSON.parse(res)
    store.state.towerUserId = data.towerUserId
    store.state.avatar = data.icon
    store.state.userName = data.name
    let nextUrl = store.state.nextUrl
    if(nextUrl){
        store.state.nextUrl = ''
        router.push(nextUrl)
    }else{
        store.state.isRouterAlive = false
        Vue.nextTick(() => (store.state.isRouterAlive = true))
    }
}
//  获取当前版本
window.sendVersion = function(res){
    store.state.version = res
}
//  支付成功回调
window.alipayResult = function(res){
    if(res == "9000"){
        alert('支付成功')
    }else if(res != '6001'){
        alert('支付失败')
    }
}

//  刷新当前路由
// Vue.prototype.reload = function(){
//     this.$store.state.isRouterAlive = false
//     this.$nextTick(() => (this.$store.state.isRouterAlive = true))
// }

/**------------------------------------调用ios方法------------------------------------------------- */
Vue.prototype.login = function(){
    window.webkit.messageHandlers.login.postMessage(null);
}
//  支付
Vue.prototype.alipay = function(towerUserId, towerContentId, contentType){
    let params = {
        "towerUserId": towerUserId,
        "towerContentId": towerContentId,
        "contentType": contentType
    }
    window.webkit.messageHandlers.alipay.postMessage(params);
}

//  分享
Vue.prototype.share = function(title, descr, thumbImage, webpageUrl){
    let params = {
        "title": title || '塔兮',
        "descr": descr || '',
        "thumbImage": 'http://web.towerxi.com/apk/towerx.png',
        "webpageUrl": 'http://ios.towerxi.com/share?id' + webpageUrl
    }
    window.webkit.messageHandlers.share.postMessage(params);
}
//  分享
Vue.prototype.shareResume = function(title, descr, thumbImage, webpageUrl){
    let params = {
        "title": title || '塔兮',
        "descr": descr || '',
        "thumbImage": 'http://web.towerxi.com/apk/towerx.png',
        "webpageUrl": 'http://ios.towerxi.com/share_resume?id' + webpageUrl
    }
    window.webkit.messageHandlers.share.postMessage(params);
}

//  跳转页面
Vue.prototype.goTo = function(url){
    if(this.$store.state.towerUserId){
        this.$router.push(url)
    }else{
        this.$store.state.nextUrl = url
        this.login()
    }
}
//  获取数组长度
Vue.prototype.length = function(arr){
    return arr.length
}
//  成功提示
Vue.prototype.toastSuccess = function(text, width){
    this.$vux.toast.show({
        text: text,
        type: "text",
        width: width || '100px',
        time: 800,
        position: 'top',
    })
}

//  失败提示
Vue.prototype.toastFail = function(text, width){
    this.$vux.toast.show({
        text: '<span style="color:#f90">' + text + '</span>',
        type: "text",
        width: width || '100px',
        time: 1600,
        position: 'top',
    })
}

//  打开视频弹窗
Vue.prototype.openVideo = function(videoUrl, videoImg){
    this.$store.state.showVideo = true
    this.$store.state.videoUrl = videoUrl
    this.$store.state.videoImg = videoImg
}

//  打开图片弹窗
Vue.prototype.viewPicture = function(pictureList, index){
    this.$store.state.pictureList = pictureList
    this.$store.state.showPicture = true
    this.$store.state.pictureIndex = index
}

//  跳转到详情
Vue.prototype.toDetail = function(id, type, status){
    let str = status ? '&status=' + status : '&status=0'
    // if(type == 3){
    //     this.$router.push('./detail?id=' + id + str)
    // }else{
    //     this.$router.push('./bit_detail?id=' + id + str)
    // }
    if(type == 6){
        this.$router.push('./article_detail?id=' + id + str)
    }else{
        this.$router.push('./bit_detail?id=' + id + str)
    }
},
//  跳转到个人主页
Vue.prototype.toHomepage = function(id){
    this.$router.push('./homepage?id=' + id)
},

/**
 * 
 * @param {*} val 秒钟
 */
Vue.prototype.secont2minute = function(val){
  let m = val ? parseInt(val/60) : 0
  let s = val ? parseInt(val%60) : 0
  m = m<10? '0'+m : m
  s = s<10? '0'+s : s
  return m + ':' + s;  
}
/**
 * 时间间隔
 * @param {时间戳} t2 
 */
Vue.prototype.longTime = function(t2){
    let str = ''
    let t1 = new Date()
    let t = t1 - t2
    let m = Math.ceil(t/60000)
    let h = parseInt(m/60)
    if(!h){
        return m + '分钟前'
    }
    let d = parseInt(h/24)
    if(!d){
        return h + '小时前'
    }
    let M = parseInt(d/30)
    if(!M){
        return d + '天前'
    }
    let y = parseInt(M/12)
    if(!y){
        return M + '月前'
    }
    return y + '年前';  
}

/**
 * 
 * @param {*} time 时间戳
 * @param {*} fmt   返回时间格式
 */
Vue.prototype.formatDate = function(time, fmt){
    let datetime = new Date(time)
    var fmt = fmt || 'yyyy-MM-dd';
    var o = {  
        "M+": datetime.getMonth() + 1, //月份  
        "d+": datetime.getDate(), //日  
        "h+": datetime.getHours(), //小时  
        "m+": datetime.getMinutes(), //分  
        "s+": datetime.getSeconds(), //秒  
        "q+": Math.floor((datetime.getMonth() + 3) / 3), //季度  
        "S": datetime.getMilliseconds() //毫秒  
    };  
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (datetime.getFullYear() + "").substr(4 - RegExp.$1.length));  
    for (var k in o)  
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));  
    return fmt;  
  }

//  不用了
Vue.prototype.post = function(url, params, success, error){
    if(this.$store.state.towerUserId){
        console.log(this.$store.state.towerUserId)
        params.append('towerUserId', this.$store.state.towerUserId)
    }
    this.$axios.post(url, params).then(res => {
        if(res.data.returnStatus == 'false'){
            if(error){
                error(res.data)
            }else{
                this.$vux.toast.show({
                    type: 'text',
                    width: '200px',
                    text: '网络异常，请稍后再试！',
                })
            }
        }else{
            success(res.data)
        }
    }).catch(error => {
        this.$vux.toast.show({
            type: 'text',
            width: '200px',
            text: '网络异常，请稍后再试！',
        })
    })
}

/**
 * 
 * @param {*} action 接口名
 * @param {*} params post参数
 * @param {*} success 成功回调函数
 * @param {*} error 错误回调函数
 */
Vue.prototype.$post = function(action, params, success, error){
    let url = 'http://towerxi.com/app/account!' + action + '.action'
    if(this.$store.state.towerUserId){
        console.log(this.$store.state.towerUserId)
        params.append('towerUserId', this.$store.state.towerUserId)
    }
    this.$axios.post(url, params).then(res => {
        this.$vux.loading.hide()
        if(res.data.returnStatus == 'false'){
            if(error){
                error(res.data)
            }else{
                this.toastFail(res.data.msg, '200px')
            }
        }else{
            success(res.data)
        }
    }).catch(error => {
        this.$vux.loading.hide()
        this.toastFail('网络异常，请稍后再试', '200px')
    })
}


/* eslint-disable no-new */
new Vue({
  router,
  store,
  created: function(){
    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));
    //  重新加载时关闭视频弹窗
    this.$store.state.showVideo = false
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
        localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
    })
  },
  render: h => h(App)
}).$mount('#app-box')


