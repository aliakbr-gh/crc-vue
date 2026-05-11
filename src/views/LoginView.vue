<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

import LargeLogo from "@/assets/largelogo.png";
import Plane from "@/assets/largelogo.png";

// import ThemeToggler from "@/components/ThemeToggler.vue";

import { useAuthStore } from "@/stores/auth";
import { toast } from "vue-sonner";
import { UserService } from "@/api/services/auth.service";

const router = useRouter();

const authStore = useAuthStore();

const loading = ref(false);

const showPassword = ref(false);

const formData = reactive({
    username: "",
    password: "",
});

onMounted(() => {
    // localStorage.clear();
    // sessionStorage.clear();

    // // Redirect if already logged in
    // if (authStore.user) {
    //     router.push("/");
    // }

    document.title = "Login";
});

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
    if (!formData.username || !formData.password) {
        return toast.error("Please fill all fields");
    }

    try {
        loading.value = true;

        const response = await UserService.loginUser(formData);

        console.log("LOGIN RESPONSE:", response);

        const user = response?.user || response?.data?.user;
        const token = response?.token || response?.data?.token;

        authStore.setAuth(user, token);

        toast.success(response.message);

        router.push("/");

    } catch (error) {

        toast.error(
            error?.response?.data?.message || "Login failed"
        );

    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="relative w-full min-h-screen overflow-hidden">
        <div class="fixed top-0 left-0 w-full h-full bg-cover bg-center -z-20" :style="{ backgroundImage: `url(${Plane})` }" />
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto min-h-screen">
            <div class="w-full relative z-10 bg-white/50 rounded-lg shadow backdrop-blur-sm sm:max-w-md xl:p-0 dark:bg-gray-800/80 dark:border-gray-700">
                <div class="p-6 space-y-4 sm:p-8">
                    <div>
                        <img class="mx-auto w-48" :src="LargeLogo" alt="Logo" />
                    </div>
                    <div class="flex flex-col items-center justify-between">

                        <h1 class="font-bold text-lg uppercase text-center">
                            Central Reservation Control
                        </h1>

                        <small class="tracking-wide text-xs font-bold text-center">
                            Revenue Management Department
                        </small>

                        <h1 class="text-3xl font-extrabold mt-2">
                            Login
                        </h1>

                        <!-- <ThemeToggler /> -->

                        <p class="font-bold mt-2">
                            Sign in to your account
                        </p>

                    </div>

                    <form class="space-y-4 md:space-y-6" @submit.prevent="handleLogin">
                        <div>
                            <label class="block mb-2 text-sm font-medium">
                                Username
                            </label>

                            <input v-model="formData.username" type="text" placeholder="username"
                                class="w-full rounded-lg border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-green-600" />
                        </div>
                        <div class="relative">

                            <label class="block mb-2 text-sm font-medium">
                                Password
                            </label>

                            <input v-model="formData.password" :type="showPassword ? 'text' : 'password'"
                                placeholder="**********"
                                class="w-full rounded-lg border border-gray-300 p-3 pr-10 outline-none focus:ring-2 focus:ring-green-600" />

                            <button type="button" @click="togglePasswordVisibility"
                                class="absolute cursor-pointer right-3 top-11 text-gray-500">
                                <div v-if="showPassword" class="w-5 h-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                                </div>
                                <div v-else class="w-5 h-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-off-icon lucide-eye-off"><path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49"/><path d="M14.084 14.158a3 3 0 0 1-4.242-4.242"/><path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143"/><path d="m2 2 20 20"/></svg>
                                </div>
                            </button>

                        </div>
                        <button type="submit" :disabled="loading"
                            class="w-full bg-green-700 hover:bg-green-800 transition text-white py-3 rounded-lg font-bold disabled:opacity-50">

                            <span v-if="loading">
                                Signing In...
                            </span>

                            <span v-else>
                                Sign In
                            </span>

                        </button>

                    </form>

                    <div class="text-center mt-5">
                        <p class="text-xs font-semibold animate-pulse">
                            Developed By AirSial IT Department
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
