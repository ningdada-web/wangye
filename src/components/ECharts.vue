<template>
  <div ref="echart"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
  //
  props: {
    isAxisChart: {
      type: Boolean,
      default: true,
    },

    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },

  data() {
    return {
      // 有横坐标的数据模型
      axisOption: {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: "#333",
          },
        },
        grid: {
          left: "20%",
        },
        // 提示框
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          type: "category", // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
          axisLabel: {
            interval: 0,
            color: "#333",
          },
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#17b3a3",
              },
            },
          },
        ],
        color: ["#2ec7c9", "#b6a2de"],
        series: [],
      },
      //   没有横坐标的模型
      normalOption: {
        tooltip: {
          trigger: "item",
        },
        color: [
          "#0f78f4",
          "#dd536b",
          "#9462e5",
          "#a6a6a6",
          "#e1bb22",
          "#39c362",
          "#3ed1cf",
        ],
        series: [],
      },
      echart: null,
    };
  },
  // 判断是柱状还是饼状进行配置
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption;
    },
  },
  //   监听数据
  watch: {
    chartData: {
      handler: function () {
        this.initChart();
      },
      deep: true,
    },
  },
  methods: {
    // 初始化
    initChart() {
      this.initChartData();
      // 如果渲染后有值 直接调用 初始化，否则先渲染，再初始化
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
      }
    },
    // 判断是柱状图还是饼状图
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData;
        this.axisOption.series = this.chartData.series;
      } else {
        this.normalOption.series = this.chartData.series;
      }
    },
  },
};
</script>

<style scoped></style>
