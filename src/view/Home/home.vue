<template>
  <div class="v-home">
    <el-row class="home" :gutter="20">
    <!-- 左列 -->
      <el-col :span="8" style="margin-top: 20px">
      <!-- 个人中心 -->
        <el-card shadow="hover">
          <div class="user">
            <img :src="userImg" />
            <div class="userInfo">
              <p class="name">账号名：{{formName}}</p><br/>
              <p class="access">邮箱地址：{{formAddress}}</p>
            </div>
          </div>
          <div class="login-info">
            <p>登录时间：<span>2022-06-09</span></p>
            <p>登录地点：<span>广州</span></p>
          </div>
        </el-card>
        <!-- 课程列表 -->
        <el-card style="margin-top: 20px; height: 460px" shadow="hover">
          <el-table :data="tableData">
            <!-- val和key和i分别对应值和键和索引 -->
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- 右列 -->
      <el-col :span="16" style="margin-top: 20px">
        <div class="num">
          <!-- 数据分析 -->
          <el-card
            shadow="hover"
            v-for="item in countData"
            :key="item.name"
            :body-style="{ display: 'flex', padding: 0 }"
          >
            <!-- ES6字符串拼接``和${} -->
            <i
              class="icon"
              :class="`el-icon-${item.icon}`"
              :style="{ background: item.color }"
            ></i>
            <div class="detail">
              <p class="num">￥{{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- 折线图 -->
        <el-card style="height: 280px" shadow="hover">
          <echart :chartData="echartData.order" style="height: 280px" />
        </el-card>
        <!-- 柱状图和饼状图 -->
        <div class="graph">
          <el-card style="height: 260px" shadow="hover">
            <echart :chartData="echartData.user" style="height: 240px" />
          </el-card>

          <el-card style="height: 260px" shadow="hover">
            <echart
              :chartData="echartData.video"
              :isAxisChart="false"
              style="height: 240px"
            />
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from "../../api/data.js";
import Echart from "../../components/ECharts.vue";
import { mapState } from "vuex";

export default {
  name: "vue-home",
  components: {
    Echart,
  },
  data() {
    return {
      userImg: require("../../assets/assets/images/img-header (2).jpg"),
      tableData: [],
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      tableLabel: {
        name: "手机",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          xData: [],
          series: [],
        },
      },
    };
  },
  mounted() {
    // 获取图表数据
    getData().then((res) => {
      const { code, data } = res.data;
      // 折线图
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        this.echartData.order.xData = xData;
        this.echartData.order.series = series;
        //柱状图
        this.echartData.user.xData = data.userData.map((item) => item.date);
        (this.echartData.user.series = [
          {
            name: "新增用户",
            type: "bar",
            data: data.userData.map((item) => item.new),
          },
          {
            name: "活跃用户",
            type: "bar",
            data: data.userData.map((item) => item.active),
          },
        ]),
        //饼状图
          (this.echartData.video.series = {
            data: data.videoData,
            type: "pie",
          });
      }
    });
  },
  methods: {},
  computed:{//账号，邮箱地址
    ...mapState({
      formName:(state) => state.mine.formName,
      formAddress:(state) => state.mine.formAddress
    })
  }
};
</script>

<style scoped>


/* .el-card{
  background-image: url('../../assets/assets/images/img-main.jpg');
} */


</style>
