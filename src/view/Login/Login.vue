<template>
<div class="login">
  <div class="login-box">
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <h3 class="login-title">系统登录</h3>
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>

    <el-form-item
      label="密码"
      label-width="80px"
      prop="password"
      
    >
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>

    <el-form-item class="login-submit">
      <el-button type="primary" @click="login" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
  </div>
  </div>
</template>

<script>
// import  Mock  from 'mockjs';
import { getMenu } from '../../api/data'

export default {
  name: "Login",
  
  data() {
    return {
      form: {

      },
      rules: {
        username: [
          {
            require: true,
            message: "请输入账号",
            trigger: "blur",
          },
          {
            min: 3,
            max: 8,
            message: "长度在3到8个字符",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      //获取menu路由
      getMenu(this.form).then(({data:res})=>{
        console.log(this.form,'this.form');
        console.log(res,'res');
        if(res.code === 20000){
          this.$store.commit('clearMenu')
          this.$store.commit('setMenu',res.data.menu)//向store传入menu
          this.$store.commit('setToken',res.data.token)
          this.$store.commit('addMenu',this.$router)
          this.$router.push({name:'home'})
        }else{
          this.$message.warning(res.data.message)
        }
      })
      //  const token = Mock.random.guid()
      //  this.$store.commit('setToken',token)
      //  this.$router.push({name:'home'})
    },
  },
};
</script>

<style scoped lang="less">
.login-container{
    border-radius: 15px;
    background-clip: padding-box;
    // margin:180px auto;
    width:350px;
    padding: 35px 35px 15px 35px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    position: absolute;
    top: 40%;
    left: 40%;
}
.login-title{
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
.login-submit{
    margin: 10px auto 0px auto;
}
.login{
  background-image: url('../../assets/assets/images/img-login.jpg');
  height: 100%;
  width: 100%;
  position: relative;
}

</style>
