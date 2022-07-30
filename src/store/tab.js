// import router from "@/router"
import Cookie from "js-cookie"
//面包屑状态
export default{
    state:{
        //缩回按钮状态
        isCollapse:false,

        //面包屑数据
        tabList:[
            {
                path:'/home',
                name:'home',
                label:'首页',
                icon:'home'
            }
        ],
        currentMenu:null,
        menu:[]
    },
    mutations:{
        //取反isconllape，实现按钮功能
        collapseMenu(state){
            state.isCollapse=!state.isCollapse
        },
        //面包屑选择功能
        selectMenu(state,val){
            //如果不是首页，获得当前的页面路径名字
            if (val.name !== 'home'){
                state.currentMenu = val
                const result = state.tabList.findIndex(item => item.name === val.name)
                //如果没获得数据，将当前数据push进去
                if(result === -1){
                    state.tabList.push(val)

                }
            }else{
                state.collapseMenu = null
            }
        },
        //关闭面包屑
        closeTag(state,val){
            const result = state.tabList.findIndex(item => item.name === val.name)
            state.tabList.splice(result,1)
        },

        setMenu(state,val){//cookie储存json
            state.menu = val
            console.log(val,'val');
            Cookie.set('menu',JSON.stringify(val))
        },
        clearMenu(state){//清除菜单列表
            state.menu=[]
            Cookie.remove('menu')
        },
        addMenu(state,router){
            if(!Cookie.get('menu')){
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            console.log(menu,'menu');
            const menuArray = []
            menu.forEach(item => {
                console.log(item,'item');
                    if(item.children){
                        item.children = item.children.map(item =>{
                            item.component = () => import(`../view/${item.url}`)
                            return item
                        })
                        menuArray.push(...item.children)
                        console.log(menuArray,'menuArray');
                    }else{
                        item.component = () =>import(`../view/${item.url}`)
                        menuArray.push(item)
                    }
                
            });
            //路由的动态添加
            menuArray.forEach(item =>{
                router.addRoute('Main',item)
            })
        }
    }
}