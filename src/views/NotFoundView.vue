<script setup>
import { useTitle } from '@/composables/useTitle';

useTitle("404 Page Not Found");
</script>

<template>
    <div class="min-h-screen flex flex-col items-center justify-center">

        <h1 class="text-7xl font-bold">
            404
        </h1>

        <p class="text-2xl mt-4">
            Page Not Found
        </p>

        <p class="text-gray-500 mt-2">
            The page you are looking for does not exist.
        </p>

        <router-link to="/" class="mt-6 px-4 py-2 bg-black text-white rounded">
            Back To Home
        </router-link>

    </div>
</template>