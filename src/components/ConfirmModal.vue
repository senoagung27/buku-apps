<script setup>
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline'

defineProps({
  show: Boolean,
  title: { type: String, default: 'Konfirmasi' },
  message: { type: String, default: 'Apakah kamu yakin?' },
  confirmText: { type: String, default: 'Hapus' },
  cancelText: { type: String, default: 'Batal' }
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-black/40 backdrop-blur-sm"
          @click="emit('cancel')"
        ></div>
        
        <!-- Modal -->
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-modal-in">
          <!-- Close button -->
          <button 
            @click="emit('cancel')" 
            class="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors z-10"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>

          <!-- Content -->
          <div class="p-6 pt-8 text-center">
            <!-- Icon -->
            <div class="mx-auto w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <ExclamationTriangleIcon class="w-8 h-8 text-red-500" />
            </div>
            
            <!-- Text -->
            <h3 class="text-lg font-bold text-gray-900 mb-2">{{ title }}</h3>
            <p class="text-sm text-gray-500 leading-relaxed">{{ message }}</p>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 p-5 pt-2">
            <button 
              @click="emit('cancel')" 
              class="flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {{ cancelText }}
            </button>
            <button 
              @click="emit('confirm')" 
              class="flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-red-500 hover:bg-red-600 active:scale-95 transition-all shadow-lg shadow-red-500/25"
            >
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.95) translateY(10px);
}

.animate-modal-in {
  animation: modalIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes modalIn {
  from { transform: scale(0.9) translateY(20px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}
</style>
