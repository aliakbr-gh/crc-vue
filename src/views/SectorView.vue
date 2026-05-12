<script setup>
import { SectorService } from '@/api/services/sector.service'
import Loader from '@/components/Loader.vue'
import { useTitle } from '@/composables/useTitle'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

useTitle('Sector')

const loading = ref(false)
const sectors = ref([])
const showDeleteModal = ref(false)
const selectedSector = ref(null)

const router = useRouter()

const goToUpdate = (sector) => {
    router.push(`/flight-configuration/sector/update/${sector.encoded_key}`)
}

const openDeleteModal = (sector) => {
    selectedSector.value = sector
    showDeleteModal.value = true
}

const deleteSector = async () => {
    try {
        const response = await SectorService.DeleteSectorByFlightNo(
            selectedSector.value.flno,
            selectedSector.value.leg,
            selectedSector.value.orgn,
            selectedSector.value.dest
        )
        toast.success(response?.message)
        fetchSectors()
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
    } finally {
        selectedSector.value = null
        showDeleteModal.value = false
    }
}

const fetchSectors = async () => {
    loading.value = true

    try {
        const response = await SectorService.GetAllActiveSectors()

        console.log('response', response)

        sectors.value = response || []
    } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchSectors()
})
</script>

<template>
    <Loader v-if="loading" />

    <div v-else class="p-6">

        <h1 class="text-2xl font-bold mb-6">
            Sectors
        </h1>

        <div v-if="loading" class="flex justify-center py-10">
            <Loader />
        </div>

        <div v-else class="overflow-x-auto rounded-xl border border-gray-200">
            <table class="w-full text-sm text-left">
                <thead class="bg-gray-100 text-gray-700">
                    <tr>
                        <th class="px-4 py-3">Flight No</th>
                        <th class="px-4 py-3">Leg</th>
                        <th class="px-4 py-3">Origin</th>
                        <th class="px-4 py-3">Destination</th>
                        <th class="px-4 py-3">Type</th>
                        <th class="px-4 py-3">Currency</th>
                        <th class="px-4 py-3">Pair Flight</th>
                        <th class="px-4 py-3">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(sector, index) in sectors" :key="index" class="border-t hover:bg-gray-50 transition">
                        <td class="px-4 py-3 font-medium">
                            {{ sector.flno }}
                        </td>

                        <td class="px-4 py-3">
                            {{ sector.leg }}
                        </td>

                        <td class="px-4 py-3">
                            {{ sector.orgn }}
                        </td>

                        <td class="px-4 py-3">
                            {{ sector.dest }}
                        </td>

                        <td class="px-4 py-3">
                            {{ sector.inter }}
                        </td>

                        <td class="px-4 py-3">
                            {{ sector.curr_abbr }}
                        </td>

                        <td class="px-4 py-3">
                            {{ sector.pair_flight || '-' }}
                        </td>

                        <td class="px-4 py-3 text-right space-x-2">
                            <button @click="router.push(`/sector/edit/${sector.encoded_key}`)" class="text-blue-600 hover:underline font-medium">
                                Update
                            </button>

                            <button @click="openDeleteModal(sector)" class="text-red-600 hover:underline font-medium">
                                Delete
                            </button>

                        </td>
                    </tr>

                    <tr v-if="!sectors.length">
                        <td colspan="7" class="text-center py-6 text-gray-500">
                            No sectors found
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="showDeleteModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg w-[350px]">

                <h2 class="text-lg font-bold mb-4">
                    Confirm Delete
                </h2>

                <p class="text-sm text-gray-600 mb-6">
                    Are you sure you want to delete
                    <b>{{ selectedSector?.flno }}</b> ?
                </p>

                <div class="flex justify-end gap-3">

                    <button @click="showDeleteModal = false" class="px-4 py-2 text-gray-600">
                        Cancel
                    </button>

                    <button @click="deleteSector" class="px-4 py-2 bg-red-600 text-white rounded">
                        Delete
                    </button>

                </div>

            </div>
        </div>
    </div>
</template>