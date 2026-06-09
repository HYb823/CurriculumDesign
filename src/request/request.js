import axios from "axios";
import userStore from "@/stores/userStore";
import router from "@/router";
import { ElMessage } from "element-plus";

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
      let token = userStore.token; //获取token
      token = `Bearer ${token}`; //添加前缀
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (res) => {
    console.log(res);
    if (res.status === 200) {
      return res.data;
    }
    //处理其他错误
    console.error("请求失败", res);
    return Promise.reject(res);
  },
  (err) => {
    console.log(err);
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
