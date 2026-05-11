<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

import Header from './components/Header.vue'

const route = useRoute()

const showHeader = computed(() => !route.meta.guest)
</script>

<template>
  <Header v-if="showHeader" />

  <RouterView />

  <Toaster position="top-center" closeButton richColors />
</template>

<style>
@import "tailwindcss";
</style>