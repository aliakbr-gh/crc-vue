<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { SectorService } from '@/api/services/sector.service'

const router = useRouter()
const loading = ref(false)

const form = reactive({
    flightNo: '',
    leg: '',
    origin: '',
    destination: '',
    currency: '',
    inter: '',
    pairFlightNo: ''
})

const validateForm = () => {
    const flightNoRegex = /^PF\d{3}$/
    const airportCodeRegex = /^[A-Z]{3}$/

    if (!flightNoRegex.test(form.flightNo)) {
        toast.error('Flight number must start with PF followed by 3 digits (e.g., PF123)')
        return false
    }

    if (form.flightNo === 'PF000') {
        toast.error('Flight number cannot be PF000. Please choose a different flight number.')
        return false
    }

    if (form.pairFlightNo === 'PF000') {
        toast.error('Pair flight number cannot be PF000. Please choose a different flight number.')
        return false
    }

    if (form.flightNo === form.pairFlightNo) {
        toast.error('Flight and its Pair Flight cannot be same.')
        return false
    }

    if (!form.leg || form.leg < 1 || form.leg > 3) {
        toast.error('Leg must be between 1 and 3')
        return false
    }

    if (!airportCodeRegex.test(form.origin)) {
        toast.error('Origin must be a 3-letter airport code (e.g., JFK)')
        return false
    }

    if (!airportCodeRegex.test(form.destination)) {
        toast.error('Destination must be a 3-letter airport code (e.g., LAX)')
        return false
    }

    if (form.origin === form.destination) {
        toast.error('Origin and Destination cannot be the same')
        return false
    }

    if (form.pairFlightNo) {
        if (!flightNoRegex.test(form.pairFlightNo)) {
            toast.error('Pair flight number must start with PF followed by 3 digits (e.g., PF123)')
            return false
        }
    }

    return true
}

const handleSubmit = async () => {
    if (!validateForm()) return

    loading.value = true

    try {
        const formData = {
            flightNo: form.flightNo,
            leg: form.leg,
            origin: form.origin,
            destination: form.destination,
            currency: form.currency,
            inter: form.inter,
            pairFlightNo: form.pairFlightNo
        }

        const response = await SectorService.AddNewSector(formData)

        toast.success(response?.message || 'Sector added successfully')

        router.push('/flight-configuration/sector')

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
            Add New Sector
        </h1>

        <div class="grid grid-cols-2 gap-4">

            <input v-model="form.flightNo" placeholder="Flight No (PF123)" class="input" />
            <input v-model="form.leg" type="number" placeholder="Leg (1-3)" class="input" />

            <input v-model="form.origin" placeholder="Origin (e.g. ISB)" class="input" />
            <input v-model="form.destination" placeholder="Destination (e.g. KHI)" class="input" />

            <input v-model="form.currency" placeholder="Currency" class="input" />
            <input v-model="form.inter" placeholder="Inter (D/I)" class="input" />

            <input v-model="form.pairFlightNo" placeholder="Pair Flight No (PF123)" class="input" />

        </div>

        <button @click="handleSubmit" :disabled="loading"
            class="mt-6 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition">
            {{ loading ? 'Saving...' : 'Add Sector' }}
        </button>

    </div>
</template>