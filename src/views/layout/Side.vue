<template>
  <el-menu
    router
    background-color="#191A23"
    text-color="#fff"
    class="full"
    active-text-color="rgb(43, 190, 243)"
    default-active="/home"
  >
    <el-menu-item> 东软颐养中心 </el-menu-item>
    <el-menu-item index="/home"
      ><template #title
        ><el-icon><HomeFilled /></el-icon>首页</template
      ></el-menu-item
    >
    <!-- item.path必须要写，用来确定选择到哪一个列表头，这个路由并不是真实存在的,el-sub-menu的index并不会执行路由跳转操作 -->
    <el-sub-menu v-for="item in tableData1" :key="item.name" :index="item.path">
      <template #title>
        <el-icon><Menu /></el-icon>
        {{ item.name }}
      </template>
      <el-menu-item
        v-for="sub in item.children"
        :key="sub.path"
        :index="sub.path"
      >
        {{ sub.name }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { ref } from "vue";

const tableData1 = ref([
  {
    name: "用户管理",
    path: "/user",
    children: [
      { name: "用户列表", path: "/user/list" },
      { name: "用户添加", path: "/user/add" },
    ],
  },
  {
    name: "客户管理",
    path: "/customer",
    children: [
      { name: "床位管理", path: "/customer/bed" },
      { name: "膳食管理", path: "/customer/diet" },
      { name: "膳食日历", path: "/customer/dietCalendar" },
      { name: "入住登记", path: "/customer/checkIn" },
      { name: "退住登记", path: "/customer/checkOut" },
      { name: "外出登记", path: "/customer/outRecord" },
      { name: "设置服务对象", path: "/customer/serviceUser" },
      { name: "服务关注", path: "/customer/serviceFollow" },
      { name: "用户管理", path: "/customer/user" },
    ],
  },
  {
    name: "护理模块",
    path: "/nurse",
    children: [
      { name: "护理级别", path: "/nurse/level" },
      { name: "护理内容", path: "/nurse/content" },
      { name: "护理记录", path: "/nurse/record" },
    ],
  },
]);
</script>

<style scoped>
.full {
  height: 100%;
  width: 100%;
}
</style>
