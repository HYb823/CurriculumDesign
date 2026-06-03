<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 左侧标题区域 -->
      <div class="left-title">
        <h1>东软颐养中心</h1>
        <h2>养老管理系统</h2>
        <p>专注于智慧养老服务管理</p>
      </div>

      <!-- 右侧登录表单 -->
      <div class="right-form">
        <h3>{{ isLogin ? "账户登录" : "用户注册" }}</h3>

        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="isLogin ? loginRules : registerRules"
          :validate-on-rule-change="false"
          class="login-form"
        >
          <!-- 手机号 -->
          <el-form-item prop="phone">
            <el-input
              v-model="loginForm.phone"
              placeholder="请输入手机号"
              prefix-icon="User"
              clearable
            />
          </el-form-item>

          <!-- 密码 -->
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <!-- 确认密码 注册时显示 -->
          <el-form-item prop="confirmPwd" v-if="!isLogin">
            <el-input
              v-model="loginForm.confirmPwd"
              placeholder="请确认密码"
              prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <el-form-item prop="real_name" v-if="!isLogin">
            <el-input
              v-model="loginForm.real_name"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
          <el-form-item prop="age" v-if="!isLogin">
            <el-input v-model="loginForm.age" placeholder="请输入年龄" />
          </el-form-item>
          <el-form-item prop="gender" v-if="!isLogin">
            <el-input v-model="loginForm.gender" placeholder="请输入性别" />
          </el-form-item>

          <!-- 登录/注册 按钮 -->
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="handleSubmit">
              {{ isLogin ? "登 录" : "注 册" }}
            </el-button>
          </el-form-item>

          <!-- 切换文字 -->
          <div
            style="
              text-align: center;
              margin-top: 15px;
              color: #00796b;
              cursor: pointer;
            "
            @click="toggleForm"
          >
            {{ isLogin ? "没有账号？去注册" : "已有账号？去登录" }}
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { Login, Register } from "@/api/user";
import router from "@/router/index";
import userStore from "@/stores/userStore";

// 控制登录/注册切换
const isLogin = ref(true);

// 表单引用
const loginFormRef = ref(null);

// 登录/注册 共用表单
const loginForm = reactive({
  phone: "",
  password: "",
  confirmPwd: "",
  real_name: "",
  age: "",
  gender: "",
});

// 登录校验规则
const loginRules = {
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: /^1[3-9]\d{9}$/, message: "手机号格式不正确", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度不能少于6位", trigger: "blur" },
  ],
};

// 注册校验规则
const registerRules = {
  phone: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    {
      pattern: /^1[3-9]\d{9}$/,
      message: "请输入正确的手机号",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, message: "密码长度至少为6位", trigger: "blur" },
  ],
  confirmPwd: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value !== loginForm.password) {
          callback(new Error("两次密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  real_name: [
    { required: true, message: "请输入真实姓名", trigger: "blur" },
    {
      pattern: /^[\u4e00-\u9fa5]+$/,
      message: "真实姓名只能包含中文字符",
      trigger: "blur",
    },
  ],
  age: [
    { required: true, message: "请输入年龄", trigger: "blur" },
    { pattern: /^[0-9]+$/, message: "年龄只能包含数字", trigger: "blur" },
  ],
  gender: [
    { required: true, message: "请输入性别", trigger: "blur" },
    {
      pattern: /^(男|女)$/,
      message: "性别只能输入“男”或“女”",
      trigger: "blur",
    },
  ],
};

// 切换登录/注册
const toggleForm = () => {
  isLogin.value = !isLogin.value;
  loginForm.phone = "";
  loginForm.password = "";
  loginForm.confirmPwd = "";
  loginForm.real_name = "";
  loginForm.age = "";
  loginForm.gender = "";
};

// 统一提交：登录 / 注册
const handleSubmit = async () => {
  console.log("handleSubmit");
  const valid = await loginFormRef.value?.validate();
  if (!valid) return;

  if (isLogin.value) {
    // 登录逻辑（完全保留你原来的写法）
    await Login(loginForm)
      .then((res) => {
        if (res.status === 200) {
          ElMessage.success("登录成功");
          userStore.setToken(res.data.token);
          router.push({ path: "/home" });
        } else {
          ElMessage.error(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
        ElMessage.error("登录失败，请检查手机号和密码");
      });
  } else {
    // 注册逻辑（和你登录风格保持一致）
    await Register(loginForm)
      .then((res) => {
        if (res.status === 200) {
          ElMessage.success("注册成功，请登录");
          isLogin.value = true;
        } else {
          ElMessage.error(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
        ElMessage.error("注册失败");
      });
  }
};
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #00796b, #26a69a);
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-box {
  width: 750px;
  height: 460px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  overflow: hidden;
}

/* 左侧 */
.left-title {
  flex: 1;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333;
}

.left-title h1 {
  font-size: 28px;
  margin: 0;
  color: #00796b;
}

.left-title h2 {
  font-size: 20px;
  margin: 10px 0;
  font-weight: normal;
}

.left-title p {
  font-size: 14px;
  color: #666;
}

/* 右侧表单 */
.right-form {
  flex: 1;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.right-form h3 {
  font-size: 22px;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
}

.login-form {
  width: 100%;
}

.login-btn {
  width: 100%;
  height: 44px;
  font-size: 16px;
  background-color: #00796b;
  border-color: #00796b;
}
</style>
