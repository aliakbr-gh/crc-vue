<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    isOpen: Boolean,
    title: String,
    loading: Boolean,

    confirmButtonTitle: { type: String, default: 'Ok' },
    secondaryConfirmTitle: { type: String, default: 'Confirm' },
    cancelButtonTitle: { type: String, default: 'Cancel' },

    showConfirmButton: { type: Boolean, default: true },
    showSecondaryConfirmButton: { type: Boolean, default: false },
    showCancelButton: { type: Boolean, default: true },
    showCloseIcon: { type: Boolean, default: true },

    closeIfClickOutside: { type: Boolean, default: false },
    className: String,
})

const emit = defineEmits([
    'close',
    'confirm',
    'secondary-confirm'
])

const modalRef = ref(null)

const onClose = () => emit('close')

const handleSubmit = () => {
    emit('confirm')
}

/* ESC + Enter handling */
const handleKeyDown = (e) => {
    if (!props.isOpen) return

    if (e.key === 'Enter' && !e.shiftKey) {
        const tag = document.activeElement?.tagName
        if (tag === 'TEXTAREA' || tag === 'BUTTON') return

        e.preventDefault()
        emit('confirm')
    }

    if (e.key === 'Escape') {
        onClose()
    }
}

const handleOutsideClick = (e) => {
    if (!props.closeIfClickOutside) return
    if (modalRef.value && !modalRef.value.contains(e.target)) {
        onClose()
    }
}

watch(() => props.isOpen, (val) => {
    document.body.style.overflow = val ? 'hidden' : ''
})

onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleOutsideClick)
})

onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeyDown)
    document.removeEventListener('mousedown', handleOutsideClick)
    document.body.style.overflow = ''
})
</script>

<template>
    <div v-if="isOpen" tabindex="-1" aria-hidden="false"
        class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black/50">
        <form ref="modalRef" class="relative p-4 w-full max-w-2xl max-h-full" :class="className"
            @submit.prevent="handleSubmit">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">

                <!-- Header -->
                <div class="flex items-center justify-between p-4 border-b dark:border-gray-600">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                        {{ title }}
                    </h3>

                    <button v-if="showCloseIcon" type="button"
                        class="text-gray-400 hover:bg-gray-200 rounded-lg w-8 h-8 inline-flex justify-center items-center"
                        @click="onClose">
                        ✕
                    </button>
                </div>

                <!-- Body -->
                <div class="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                    <div v-if="loading" class="flex justify-center items-center h-40">
                        <div class="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full">
                        </div>
                    </div>

                    <slot v-else />
                </div>

                <!-- Footer -->
                <div v-if="showConfirmButton || showCancelButton || showSecondaryConfirmButton"
                    class="flex items-center p-4 border-t dark:border-gray-600">
                    <button v-if="showConfirmButton" type="submit" class="button-primary" :disabled="loading">
                        {{ confirmButtonTitle }}
                    </button>

                    <button v-if="showSecondaryConfirmButton" type="button"
                        class="ml-3 px-4 py-2 bg-red-600 text-white rounded" @click="onSecondaryConfirm"
                        :disabled="loading">
                        {{ secondaryConfirmTitle }}
                    </button>

                    <button v-if="showCancelButton" type="button" class="ml-3 button-default" @click="onClose"
                        :disabled="loading">
                        {{ cancelButtonTitle }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
