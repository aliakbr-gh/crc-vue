<script setup>
import { useTitle } from '@/composables/useTitle';

useTitle("403 Unauthorized Access");
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center">

        <h1 class="text-6xl font-bold text-red-500">
            403
        </h1>

        <p class="text-2xl mt-4">
            Unauthorized Access
        </p>

        <p class="text-gray-500 mt-2">
            You do not have permission to access this page.
        </p>

        <router-link to="/" class="mt-6 px-4 py-2 bg-black text-white rounded">
            Go Home
        </router-link>

    </div>
</template>