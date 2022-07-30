<template>
  <div class="common-head">
    <!-- 头部 -->
    <header>
      <!-- 左侧图标 -->
      <div class="l-content">
        <el-button
          @click="handleMenu"
          plain
          icon="el-icon-s-operation"
          size="mini"
        ></el-button>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            class="myColor"
            :to="{ path: item.path }"
            v-for="item in tags"
            :key="item.path"
            >{{ item.label }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <!-- 下拉菜单 -->
      <div class="r-content">
        <el-dropdown trigger="hover" size="mini">
          <span>
            <!-- 头像 -->
            <img :src="userImg" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="mine">个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dialog title="个人中心" :visible.sync="dialogFormVisible">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-form :model="form">
            <el-form-item label="账号名" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="住址邮箱" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择所在区域邮箱">
                <el-option
                  label="武汉:1023634057@qq.com"
                  value="1023634057@qq.com"
                ></el-option>
                <el-option
                  label="广州:ningbbn@163.com"
                  value="ningbbn@163.com"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </header>
  </div>
</template>

<script>
// import { EventBus } from "../bus/bus";
import { mapState } from "vuex";
export default {
  name: "common-head",
  data() {
    return {
      userImg: require("../assets/assets/images/img-header (2).jpg"), //头像
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    handleMenu() {
      //显示菜单按钮
      this.$store.commit("collapseMenu");
    },
    logout() {
      //登出
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      this.$router.push("/login");
    },
    mine() {
      // this.$store.commit("changeImage");
      this.dialogFormVisible = true;
    },
    confirm() {
      this.$store.commit("changeTime", this.form.name);
      this.$store.commit("changeAddress", this.form.region);
      this.dialogFormVisible = false;
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabList,
    }),
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
.r-content {
  padding-top: 8px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  //重写面包屑的字体颜色
  .myColor ::v-deep .el-breadcrumb__inner {
    color: red;
  }
}
</style>
