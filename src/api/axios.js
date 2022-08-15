import axios from "axios";
import config from "@/config";
// import { options } from "less";

//判断是否为生产模式或者开发模式
const baseUrl =
  process.env.NODE_ENV === "development" ? config.baseUrl.dev : config.baseUrl.pro;

class HttpRequeset {
  // 设置默认值为空方便使用 devServer 代理
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  getInsideConfig() {
    // 默认配置
    const config = {
      baseUrl: this.baseUrl,
      header: {},
    };
    return config;
  }
  interceptors(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(
      function (config) {
        // 在发送请求之前做些什么
        return config;
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );

    // 添加响应拦截器
    instance.interceptors.response.use(
      function (response) {
        console.log(response,'response');
        // 对响应数据做点什么
        return response;
      },
      function (error) {
        // 对响应错误做点什么
        console.log(error,'error');
        return Promise.reject(error);
      }
    );
  }
  //创建axios实例
  request(options){
    const instance = axios.create()
    // 默认配置和用户自定义配置合并
    options ={...this.getInsideConfig(), ...options}
    // 调用拦截器
    this.interceptors(instance)
    // 返回实例
    return instance(options)
}
}

export default new HttpRequeset(baseUrl);
