<script setup>
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

</script>

<template>
    <header class="bg-white shadow-md">
        <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

            <h1 class="text-2xl font-bold text-green-700">
                CRC - Vue
            </h1>

            <nav class="space-x-6">
                <RouterLink to="/dashboard" class="text-gray-700 hover:text-green-700 transition">
                    Dashboard
                </RouterLink>
                <RouterLink to="/flight-updation" class="text-gray-700 hover:text-green-700 transition">
                    Flight Updation
                </RouterLink>
                <RouterLink to="/check-flight" class="text-gray-700 hover:text-green-700 transition">
                    Check Flight
                </RouterLink>
                <RouterLink to="/sector" class="text-gray-700 hover:text-green-700 transition">
                    Sector
                </RouterLink>
                <RouterLink v-if="authStore.user?.staff_code === 10803" to="/Authorization"
                    class="text-gray-700 hover:text-green-700 transition">
                    Protected Authorization Route
                </RouterLink>
                <button @click="authStore.logout" class="cursor-pointer">
                    Logout
                </button>
            </nav>

        </div>
    </header>
</template>