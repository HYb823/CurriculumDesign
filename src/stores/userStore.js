import { defineStore } from "pinia";

const userStore = defineStore(
  "user",
  () => {
    const token = ref("");
    const setToken = (newToken) => {
      token.value = newToken;
    };
    const removeToken = () => {
      token.value = "";
    };
    const user = ref({});
    return {
      user,
      token,
      setToken,
      removeToken,
    };
  },
  {
    persist: true,
  },
);

export default userStore;
