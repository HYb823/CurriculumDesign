import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/Login.vue"),
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/Home.vue"),
      children: [
        {
          path: "/user/list",
          name: "用户列表",
          component: () => import("@/views/userManage/userList.vue"),
        },
        {
          path: "/user/add",
          name: "用户添加",
          component: () => import("@/views/userManage/userAdd.vue"),
        },
        {
          path: "/customer/bed",
          name: "床位管理",
          component: () => import("@/views/customerManage/bedManage.vue"),
        },
        {
          path: "/customer/diet",
          name: "膳食管理",
          component: () => import("@/views/customerManage/dietManage.vue"),
        },
        {
          path: "/customer/dietCalendar",
          name: "膳食日历",
          component: () => import("@/views/customerManage/dietCalendar.vue"),
        },
        {
          path: "/customer/checkIn",
          name: "入住登记",
          component: () => import("@/views/customerManage/checkIn.vue"),
        },
        {
          path: "/customer/checkOut",
          name: "退住登记",
          component: () => import("@/views/customerManage/checkOut.vue"),
        },
        {
          path: "/customer/outRecord",
          name: "外出登记",
          component: () => import("@/views/customerManage/outRecord.vue"),
        },
        {
          path: "/customer/serviceUser",
          name: "设置服务对象",
          component: () => import("@/views/customerManage/serviceObject.vue"),
        },
        {
          path: "/customer/serviceFollow",
          name: "服务关注",
          component: () => import("@/views/customerManage/serviceConcern.vue"),
        },
        {
          path: "/customer/user",
          name: "用户管理",
          component: () => import("@/views/customerManage/userManage.vue"),
        },
        {
          path: "/nurse/level",
          name: "护理级别",
          component: () => import("@/views/nurseModel/nurseLevel.vue"),
        },
        {
          path: "/nurse/content",
          name: "护理内容",
          component: () => import("@/views/nurseModel/nurseContent.vue"),
        },
        {
          path: "/nurse/record",
          name: "护理记录",
          component: () => import("@/views/nurseModel/nurseRecord.vue"),
        },
      ],
    },
  ],
});

export default router;
