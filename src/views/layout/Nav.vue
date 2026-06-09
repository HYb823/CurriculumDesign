<template>
  <div class="container">
    <div class="head">
      <div class="right">
        <el-dropdown>
          <el-avatar :src="userImg" :size="60"></el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="PersonalCenter"
                >个人中心</el-dropdown-item
              >
              <el-dropdown-item @click="PersonalSetting">设置</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span style="position: relative; left: 50px; font-size: 25px"
          >欢迎您,{{ userName }}</span
        >
      </div>
    </div>
    <div class="foot">
      <el-tabs
        v-model="edittableTabsValue"
        type="card"
        closable
        @tab-remove="handleTabsRemove"
        @tab-click="handleTabClick"
      >
        <el-tab-pane
          v-for="item in edittableTabs"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import avatar from "@/static/avatar.jpg";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();

let userImg = ref(avatar);
let userName = ref("张三");
let edittableTabsValue = ref("/home");
let edittableTabs = ref([
  {
    title: "首页",
    name: "/home",
  },
]);

const addTab = (path) => {
  edittableTabsValue.value = path;
  if (edittableTabs.value.find((tab) => tab.name === path)) {
    return;
  } else {
    edittableTabs.value.push({
      title: path.split("/").slice(-1)[0],
      name: path,
    });
  }

  router.push(path);
};

watch(
  () => route.fullPath,
  () => {
    addTab(route.fullPath);
  },
  { immediate: true },
);

function handleTabClick(tab, event) {
  console.log(tab.props.name, event);
  router.push(tab.props.name);
  edittableTabsValue.value = tab.props.name;
}

function handleTabsRemove(targetName) {
  if (edittableTabs.value.length === 1) {
    return;
  }
  edittableTabs.value = edittableTabs.value.filter(
    (tab) => tab.name !== targetName,
  );
  if (edittableTabsValue.value === targetName) {
    const nextTab = edittableTabs.value[0];
    edittableTabsValue.value = nextTab.name;
    router.push(nextTab.name);
  }
  console.log(edittableTabsValue.value, edittableTabs.value);
}

const PersonalCenter = () => {
  console.log("个人中心");
};

const PersonalSetting = () => {
  console.log("设置");
};

const logout = () => {
  console.log("退出登录");
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  background-color: rgb(245, 245, 245);
  position: relative;
}
.head {
  height: 55%;
  width: 100%;
}
.foot {
  height: 45%;
  width: 100%;
  background-color: rgb(254, 254, 254);
}
.right {
  position: absolute;
  height: 55%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  right: 300px;
}
</style>
