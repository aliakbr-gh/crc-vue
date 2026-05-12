<script setup>
import { useTitle } from '@/composables/useTitle';
import Modal from "@/components/Modal.vue"
import { ref } from 'vue';

useTitle("Dashboard");

const open = ref(false)
const loading = ref(false)
</script>

<template>
    <h1>This is Dashboard</h1>

    <button class="button-primary" @click="open = true">
       Open Model
    </button>

    <Modal :isOpen="open" title="Update Flight Status" confirmButtonTitle="Update" :loading="loading"
        :closeIfClickOutside="true" @close="open = false" @confirm="handleUpdate">

        <div class="flex flex-col gap-3">

            <h1> Model here</h1>
        </div>

    </Modal>
</template>