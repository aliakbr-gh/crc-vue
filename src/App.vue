<script setup>
import { computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import { Toaster } from 'vue-sonner'
import 'vue-sonner/style.css'

import Header from './components/Header.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const showHeader = computed(() => !route.meta.guest)

const syncLogout = (event) => {

  if (event.key === 'crc_token' && !event.newValue) {

    // token removed in another tab
    authStore.user = null
    authStore.token = null

    router.push('/login')
  }
}

onMounted(() => {
  window.addEventListener('storage', syncLogout)
})

onUnmounted(() => {
  window.removeEventListener('storage', syncLogout)
})
</script>

<template>
  <Header v-if="showHeader" />

  <RouterView />

  <Toaster position="top-center" closeButton richColors />
</template>

<style>
@import "tailwindcss";
</style>