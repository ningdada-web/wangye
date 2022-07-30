import Vue from "vue";
import VueRouter from "vue-router";
// import Main from '../view/Main';
//  import User from '../view/User.vue';
// import home from '../view/Home/home.vue';
// import user from '../view/User/user.vue';


Vue.use(VueRouter)

const routes =[
//     {
//     path:'',
//     redirect: '/home'
// },
    {
    path:'/',
    name:'Main',
    component: () => import('../view/Main.vue'),
    redirect:'/home',
    children:[
        // {
        //     path:'/home',
        //     name:'home',
        //     component:()=>import('../view/Home/home.vue')
        // },
        // {
        //     path:'/user',
        //     name:'user',
        //     component:()=>import('../view/User/user.vue')
        // },
        // {
        //     path:'/mall',
        //     name:'mall',
        //     component:()=>import('../view/Mall/mall.vue')
        // },
        // {
        //     path:'/page1',
        //     name:'page1',
        //     component:()=>import('../view/Other/page1.vue')
        // },
        // {
        //     path:'/page2',
        //     name:'page2',
        //     component:()=>import('../view/Other/page2.vue')
        // },
       
    ]
},
{
    
        path:'/login',
        name:'login',
        component:()=>import('../view/Login/Login.vue')
    
}
  
]

const router = new VueRouter({
    routes,
    mode: 'history'
  })
  
  
  export default router