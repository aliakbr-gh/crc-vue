<script setup>
import { SectorService } from '@/api/services/sector.service'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'

const route = useRoute()
const loading = ref(false)

const form = reactive({
    flightNo: '',
    leg: '',
    origin: '',
    destination: '',
    stopover: '',
    inter: '',
    currency: '',
    pairFlightNo: ''
})

const fetchSingleSectors = async () => {
    loading.value = true

    try {
        const response = await SectorService.GetSectorById(route.params.id)

        Object.assign(form, {
            flightNo: response.flightNo,
            leg: response.leg,
            origin: response.origin,
            destination: response.destination,
            stopover: response.stopover,
            inter: response.inter,
            currency: response.currency,
            pairFlightNo: response.pairFlightNo
        })

    } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchSingleSectors()
})

const updateSector = async () => {
    loading.value = true

    try {
        const response = await SectorService.UpdateSectorByFlightNo(
            form.flightNo,
            form.leg,
            form.origin,
            form.destination,
            form
        )

        toast.success(response?.message || 'Sector updated successfully')

    } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="p-6">

        <h1 class="text-2xl font-bold mb-6">
            Update Sector
        </h1>

        <!-- Loader -->
        <div v-if="loading" class="py-10 text-center">
            Loading...
        </div>

        <!-- Form -->
        <div v-else class="grid grid-cols-2 gap-4">

            <input v-model="form.flightNo" placeholder="Flight No" class="input" />
            <input v-model="form.leg" placeholder="Leg" class="input" />

            <input v-model="form.origin" placeholder="Origin" class="input" />
            <input v-model="form.destination" placeholder="Destination" class="input" />

            <input v-model="form.stopover" placeholder="Stopover" class="input" />
            <input v-model="form.inter" placeholder="Inter (D/I)" class="input" />

            <input v-model="form.currency" placeholder="Currency" class="input" />
            <input v-model="form.pairFlightNo" placeholder="Pair Flight No" class="input" />

        </div>

        <button @click="updateSector"
            class="mt-6 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition" :disabled="loading">
            {{ loading ? 'Updating...' : 'Update Sector' }}
        </button>

    </div>
</template>