import router from "@/router";
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { toast } from "vue-sonner";

export const useAuthStore = defineStore("crc_auth", () => {
  const user = ref(
    JSON.parse(localStorage.getItem("crc_user")) || null
  );

  const token = ref(
    localStorage.getItem("crc_token") || null
  );

  const isAuthenticated = computed(() => !!token.value);

  const setAuth = (userData, accessToken) => {
    user.value = userData;
    token.value = accessToken;

    localStorage.setItem("crc_user", JSON.stringify(userData));
    localStorage.setItem("crc_token", accessToken);
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    localStorage.removeItem("crc_user");
    localStorage.removeItem("crc_token");
    toast.success("Logout Successfully")
    router.push("/login");
  };

  return {
    user,
    token,
    isAuthenticated,
    setAuth,
    logout,
  };
});