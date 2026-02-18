<script setup>
import { ref } from 'vue'
import { useShoppingStore } from '../stores/shopping'
import ShoppingItem from './ShoppingItem.vue'
import ConfirmModal from './ConfirmModal.vue'
import { TrashIcon } from '@heroicons/vue/24/outline'

const store = useShoppingStore()
const showClearModal = ref(false)

const handleClearAll = () => {
  store.clearAll()
  showClearModal.value = false
}
</script>

<template>
  <div class="pb-32 md:pb-0 space-y-8">
    <div v-if="store.items.length === 0" class="text-center text-gray-400 py-12">
      <div class="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-gray-300">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
      </div>
      <p class="text-lg font-medium text-gray-500">Your list is empty</p>
      <p class="text-sm">Add items to start shopping!</p>
    </div>
    
    <template v-else>
      <div class="flex justify-end mb-4">
        <button 
          @click="showClearModal = true" 
          class="text-xs font-semibold text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1"
        >
          <TrashIcon class="w-4 h-4" />
          Hapus Semua
        </button>
      </div>

      <div v-for="(items, category) in store.itemsByCategory" :key="category" class="animate-fade-in">
        <h2 class="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider px-1 flex items-center gap-2 mt-6 first:mt-0">
          <span class="text-lg">{{ items[0].categoryIcon || '📦' }}</span>
          {{ category }}
        </h2>
        <div class="space-y-3">
          <ShoppingItem
            v-for="item in items"
            :key="item.id"
            :item="item"
            @toggle="store.toggleItem"
            @delete="store.deleteItem"
          />
        </div>
      </div>
      
      <!-- History Section -->
      <div v-if="Object.keys(store.historyByDate).length > 0" class="mt-8 pt-8">
         <h2 class="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3 px-2">
            <span class="text-2xl filter drop-shadow-sm">📜</span> 
            <span>Riwayat Belanja</span>
         </h2>
         
         <div v-for="(items, date) in store.historyByDate" :key="date" class="mb-8 relative pl-4 border-l-2 border-emerald-100/50">
            <h3 class="text-sm font-semibold text-emerald-600 mb-4 bg-emerald-50/80 backdrop-blur-sm inline-block px-4 py-1.5 rounded-full shadow-sm border border-emerald-100/50">{{ date }}</h3>
            <div class="space-y-3">
              <ShoppingItem
                v-for="item in items"
                :key="item.id"
                :item="item"
                @toggle="store.toggleItem"
                @delete="store.deleteItem"
              />
            </div>
         </div>
      </div>
    </template>
  </div>

  <ConfirmModal
    :show="showClearModal"
    title="Hapus Semua?"
    message="Semua item belanja akan dihapus permanen. Kamu tidak bisa mengembalikannya."
    confirmText="Ya, Hapus Semua"
    cancelText="Batal"
    @confirm="handleClearAll"
    @cancel="showClearModal = false"
  />
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
