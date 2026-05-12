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

@import url('https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap');
@import 'tailwindcss';

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-primary: #016833;
  --color-secondary: #07721e;
  --color-brand: #c29962;

  --text-xxs: 0.6rem;
  --text-tiny: 0.5rem;

  --font-roboto: 'Roboto', sans-serif;
  --font-poppins: 'Poppins', sans-serif;
  --font-fira-sans: 'Fira Sans', sans-serif;
  --font-open-sans: 'Open Sans', sans-serif;
  --font-work-sans: 'Work Sans', sans-serif;
  --font-mono: 'Roboto Mono', monospace;
  --font-times: 'Times New Roman', Times, serif;
  --font-verdana: Verdana, Geneva, Tahoma, sans-serif;
}

@layer utilities {
  .font-roboto {
    font-family: var(--font-roboto);
  }

  .font-poppins {
    font-family: var(--font-poppins);
  }

  .font-fira-sans {
    font-family: var(--font-fira-sans);
  }

  .font-open-sans {
    font-family: var(--font-open-sans);
  }

  .font-work-sans {
    font-family: var(--font-work-sans);
  }

  .font-mono {
    font-family: var(--font-mono);
  }

  .font-times {
    font-family: var(--font-times);
  }

  .font-verdana {
    font-family: var(--font-verdana);
  }

  .scrollbar::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  .scrollbar::-webkit-scrollbar-track {
    border-radius: 100vh;
    background: #f7f4ed;
  }

  .scrollbar::-webkit-scrollbar-thumb {
    border-radius: 100vh;
    border: 3px solid lightslategray;
    padding: 1px;
  }

  .scrollbar::-webkit-scrollbar-thumb:hover {
    background: gray;
  }
}

:root {
  --font-scale: 1;
}

html {
  font-size: calc(1rem * var(--font-scale));
  transition: font-size 0.3s ease;
}

body {
  @apply bg-[#ededed] dark:bg-gray-900 text-black dark:text-white font-roboto;
}

h1,
h2,
h3,
h4,
h5,
p {
  @apply font-poppins;
}

.label {
  @apply block mb-2 text-xs font-medium text-gray-900 dark:text-white font-fira-sans;
}

.input {
  @apply block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500;
}

.select {
  @apply bg-gray-50 p-2 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
}

.select-sm {
  @apply bg-gray-50 p-0.5 border border-gray-300 text-gray-900 text-xs rounded-lg block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
}

.button {
  @apply text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 disabled:hover:bg-blue-600 disabled:dark:hover:bg-blue-600 cursor-pointer font-poppins;
}

.button-default {
  @apply py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer;
}

.button-primary {
  @apply text-white bg-secondary hover:bg-[#055114] font-medium rounded-lg text-sm px-5 py-2 disabled:hover:bg-secondary disabled:dark:hover:bg-secondary cursor-pointer font-poppins;
}

.button-primary-base {
  @apply text-white bg-secondary hover:bg-[#055114] font-medium rounded-md text-xxs p-2 disabled:hover:bg-secondary disabled:dark:hover:bg-secondary cursor-pointer font-poppins;
}

.button-primary-sm {
  @apply text-white bg-secondary hover:bg-[#055114] font-medium rounded-lg text-tiny px-2 py-1 disabled:hover:bg-secondary disabled:dark:hover:bg-secondary cursor-pointer font-poppins;
}

.button-danger {
  @apply text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2 dark:bg-red-600 dark:hover:bg-red-700 disabled:hover:bg-red-700 disabled:dark:hover:bg-red-700 cursor-pointer font-poppins;
}

.button-danger-base {
  @apply text-white bg-red-700 hover:bg-red-800 font-medium rounded-md text-xxs p-2 dark:bg-red-600 dark:hover:bg-red-700 disabled:hover:bg-red-700 disabled:dark:hover:bg-red-700 cursor-pointer font-poppins;
}

.button-danger-sm {
  @apply text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-tiny px-2 py-1 dark:bg-red-600 dark:hover:bg-red-700 disabled:hover:bg-red-700 disabled:dark:hover:bg-red-700 cursor-pointer font-poppins;
}

.status-primary {
  @apply text-white bg-green-700 font-medium rounded-lg text-xxs px-2 py-1 font-poppins dark:bg-green-700 uppercase;
}

.status-danger {
  @apply text-white bg-red-700 font-medium rounded-lg text-xxs px-2 py-1 dark:bg-red-600 uppercase font-poppins;
}

.link {
  @apply font-normal text-xs text-secondary hover:underline dark:text-white font-open-sans;
}

.card {
  @apply block max-w-xl mx-auto my-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700;
}

.card-min-w {
  @apply block max-w-2xl mx-auto my-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700;
}

.card-w-full {
  @apply block w-full h-full mx-auto my-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700;
}

.card-heading {
  @apply text-xl font-medium leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white uppercase font-poppins;
}

.primary-heading {
  @apply text-xl font-medium leading-tight tracking-tight text-primary md:text-2xl dark:text-white text-center px-2 py-4 uppercase font-poppins;
}

.sub-primary-heading {
  @apply text-base font-normal leading-tight tracking-tight text-primary md:text-xl dark:text-white text-center px-2 py-4 uppercase font-work-sans;
}

.menu-tab {
  @apply flex items-center p-3 rounded-md text-sm text-center font-bold hover:bg-secondary hover:text-white transition-colors duration-300;
}

.table {
  @apply shadow-xl w-full text-xs text-left rtl:text-right text-black dark:text-white font-roboto;
}

.table-caption {
  @apply font-bold text-lg;
}

.table-thead {
  @apply font-bold text-xs uppercase bg-gray-50 dark:bg-gray-700;
}

.table-thead-th {
  @apply p-2 lg:text-xxs xl:text-xs uppercase;
}

.table-tbody-tr {
  @apply bg-white text-xxs border-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600;
}

.table-tbody-th {
  @apply px-4 py-2 text-xs font-semibold whitespace-nowrap text-nowrap uppercase;
}

.table-tbody-td {
  @apply p-2 lg:text-xxs xl:text-xs;
}

.table-link-primary {
  @apply font-medium text-primary dark:text-white hover:underline cursor-pointer;
}

.table-link-danger {
  @apply font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer;
}

.table-navigation {
  @apply inline-flex -space-x-px text-xs;
}

.table-navigation-prev-btn {
  @apply flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
}

.table-navigation-button {
  @apply flex items-center justify-center px-3 h-8 leading-tight dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
}

.table-navigation-button-active {
  @apply text-primary dark:text-white font-bold border border-gray-300 bg-blue-50;
}

.table-navigation-button-inactive {
  @apply text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700;
}

.table-navigation-next-btn {
  @apply flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white;
}

.table-label {
  @apply mb-2 text-xs font-medium text-gray-900 dark:text-white;
}

.table-input {
  @apply px-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50 text-xs dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
}

.table-search-input {
  @apply px-1 w-100 text-gray-900 border border-gray-400 rounded-lg bg-white text-xs dark:bg-white dark:border-white dark:placeholder-gray-400 dark:text-black;
}

.table-select {
  @apply bg-gray-50 px-1 border border-gray-300 text-gray-900 text-xs rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white;
}

.flex-center {
  @apply flex items-center justify-center;
}

.input-suffix {
  @apply absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none font-semibold text-tiny uppercase text-black dark:text-white;
}

.pcs-input-w {
  @apply w-6;
}

.wt-input-w {
  @apply w-11;
}

.amount-input-w {
  @apply w-20;
}

.percent-input-w {
  @apply w-10;
}

.radio-input {
  @apply w-4 h-4 text-brand border border-gray-400 bg-white rounded-full focus:ring-2 focus:ring-brand;
}

.radio-input:checked {
  @apply border-brand;
}

.radio-input:checked::before {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 9999px;
  background: #07721e;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
}

.classmanagement-table {
  @apply border border-gray-300 p-1 text-base text-center;
}

.classmanagement-table-input {
  @apply px-1 text-gray-900 border border-gray-300 rounded-md bg-gray-50;
}
</style>