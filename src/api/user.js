import instance from "@/request/request";

export const Login = (data) => instance.post("/sysUser/login", data); // 登录
export const Register = (data) => instance.post("/sysUser/register", data); // 注册
