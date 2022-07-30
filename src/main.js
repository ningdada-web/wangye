import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router";
import "./assets/assets/less/index.less";
import store from "./store";
import http from 'axios'
import './api/mock.js'
import Cookies from "js-cookie";

Vue.use(ElementUI);
Vue.prototype.$http=http
Vue.config.productionTip = false;
// Vue.prototype.$confirm = MessageBox.confirm

//路由守卫
router.beforeEach((to,from,next)=>{
  //防止页面丢失信息
  store.commit('getToken',Cookies.get('token'))
  const token = store.state.token.token
  if(!token && to.name !== 'login'){
    next({name: 'login'})
  }else if(token && to.name === 'login'){
    next({name:'home'})
  }
  else{
    next()
  }
})

new Vue({
  router,
  store,
  created(){
    store.commit('addMenu',router)
  },
  render: (h) => h(App),
}).$mount("#app");
