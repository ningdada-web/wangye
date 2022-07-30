<template>
  <div>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      background-color="#A9A9A9"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <h3>我的后台</h3>
      <!-- 首页、商品管理、用户管理 -->
      <el-menu-item
        v-for="item in noChildren"
        :index="item.path"  
        :key="item.path"
        @click.native="clickMenu(item)"
      >
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </el-menu-item>
      <!-- 其他 -->
      <el-submenu
        v-for="item in hasChildren"
        :index="item.path"
        :key="item.path"
      >
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <!-- 其他里的栏目 -->
        <el-menu-item-group
          v-for="(subitem, subindex) in item.children"
          :index="subitem.path"
          :key="subitem.path"
          @click.native="clickMenu(subitem)"
        >
          <!-- <span slot="title">分组一</span> -->
          <el-menu-item :index="subindex">{{ subitem.label }}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
// import { EventBus } from "../bus/bus";

export default {
  name: "CommonSide",
  data() {
    return {
      menu: [
        // {
        //   path: "/",
        //   name: "home",
        //   label: "首页",
        //   icon: "s-home",
        //   url: "Home/Home",
        // },
        // {
        //   path: "/mall",
        //   name: "mall",
        //   label: "商品管理",
        //   icon: "video-play",
        //   url: "MallManage/MallManage",
        // },
        // {
        //   path: "/user",
        //   name: "user",
        //   label: "用户管理",
        //   icon: "user",
        //   url: "UserManage/UserManage",
        // },
        // {
        //   label: "其他",
        //   icon: "location",
        //   children: [
        //     {
        //       path: "/page1",
        //       name: "page1",
        //       label: "页面1",
        //       icon: "setting",
        //       url: "Other/PageOne",
        //     },
        //     {
        //       path: "/page2",
        //       name: "page2",
        //       label: "页面2",
        //       icon: "setting",
        //       url: "Other/PageTwo",
        //     },
        //   ],
        // },
      ],
    };
  },
  computed: {
    //筛选menu路由中不带有children的item
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    asyncMenu(){
      return this.$store.state.tab.menu
    }
  },

  //   mounted() {
  //   EventBus.$on((isCollapse)=>{
  //     this.isCollapse=isCollapse
  //   })
  // },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      console.log(item);
      this.$router.push({
        name: item.name,
      });
      this.$store.commit('selectMenu',item)
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;
  border: none;

    // background-image:url('../assets/assets/images/img-side.jpg')
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>
