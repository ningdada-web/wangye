<template>
  <div class="homepage">
    <el-container>
      <el-aside width="auto">
        <common-side></common-side>
      </el-aside>
      <el-container>
        <el-header>
          <common-head />
        </el-header>
        <el-main>
          <common-tag-vue></common-tag-vue>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import CommonSide from "@/components/CommonSide.vue";
import CommonHead from "@/components/CommonHead.vue";
import CommonTagVue from "@/components/CommonTag.vue";
export default {
  name: "vue-Main",
  components: {
    CommonSide,
    CommonHead,
    CommonTagVue
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.el-header {
  background-image: url('../assets/assets/images/veer-132424657.jpg');
  // padding: 0%;
}
.el-main {
  padding-top: 0;
}
.el-aside {
  height: 100vh;
  // background-image: url(../assets/assets/images/img-side.jpg);
}
.el-container {
  height: 100vh;
}
.homepage {
  height: 100vh;
}
</style>
