<template>
  <div class="div1">
    <div class="div2">
      <Side></Side>
    </div>
    <div class="div3">
      <div class="div4">
        <Nav />
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import "@/css/style.css";
import Nav from "@/views/layout/Nav.vue";
import Side from "@/views/layout/Side.vue";
import router from "@/router/index.js";
</script>

<style scoped>
.div1 {
  height: 100vh;
  width: 100vw;
  display: flex;
}
.div2 {
  height: 100%;
  width: 15%;
}
.div3 {
  height: 100%;
  width: 85%;
  background-color: rgb(245, 245, 245);
}
.div4 {
  height: 12%;
  width: 100%;
}
</style>
<!-- .div1 {
  background-color: aquamarine;
  width: 200px;
  height: 200px;
  padding: 20px;
  box-sizing: border-box;
  /* rem是2倍html的font-size */
  font-size: 2rem;
} -->
