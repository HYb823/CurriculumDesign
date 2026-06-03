import axios from "axios";
import userStore from "@/stores/userStore";
import router from "@/router";
import { ElMessage } from "element-plus";
//必须在组件外实例化一次

const baseURL = "http://localhost:8080";
const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

instance.interceptors.request.use(
  (config) => {
    if (userStore.token) {
      config.headers.Authorization = userStore.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    console.log("请求成功", res); //这里可以处理响应数据
    if (res.status === 200) {
      return res.data;
    }
    //处理其他错误
    console.error("请求失败", res);
    return Promise.reject(res);
  },
  (err) => {
    console.log(err.response.status);
    //处理401错误 权限不足 或token过期 拦截登录
    if (err.response.status === 401) {
      router.push("/login");
    }
    //错误默认情况
    ElMessage.error(err.response.data.message || "请求异常");
    return Promise.reject(err);
  },
);

export default instance;
