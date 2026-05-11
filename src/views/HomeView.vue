<script setup>
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const authStore = useAuthStore();

onMounted(() => {
    console.log("authStore", authStore.user);
    
    if (authStore.user) {
        router.push("/dashboard");
    }
});
</script>