<script setup>
import { ref } from 'vue'
import { useShoppingStore } from '../stores/shopping'
import ShoppingItem from './ShoppingItem.vue'
import ConfirmModal from './ConfirmModal.vue'
import { TrashIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/vue/24/outline'

const store = useShoppingStore()
const showClearModal = ref(false)

const handleClearAll = () => {
  store.clearAll()
  showClearModal.value = false
}
</script>

<template>
  <div class="pb-32 md:pb-0 space-y-8">
    <div v-if="store.items.length === 0" class="text-center text-gray-400 dark:text-gray-500 py-12 transition-colors">
      <div class="bg-gray-50 dark:bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-gray-300 dark:text-gray-600 transition-colors">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
      </div>
      <p class="text-lg font-medium text-gray-500 dark:text-gray-400 transition-colors">Your list is empty</p>
      <p class="text-sm">Add items to start shopping!</p>
    </div>
    
    <template v-else>
      <div class="flex justify-end mb-4">
        <button 
          @click="showClearModal" 
          class="inline-flex items-center justify-center rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 h-9 px-3"
        >
          <TrashIcon class="w-4 h-4 mr-2" />
          Hapus Semua
        </button>
      </div>

      <!-- Search Bar -->
      <div class="sticky top-0 z-20 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-sm py-2 mb-6 -mx-2 px-2 transition-colors">
        <div class="relative group">
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-gray-400" />
          <input 
            v-model="store.searchQuery"
            type="text"
            placeholder="Cari barang..."
            class="flex h-10 w-full rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-3 py-2 pl-9 text-sm ring-offset-white dark:ring-offset-gray-950 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <button 
            v-if="store.searchQuery"
            @click="store.searchQuery = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-500 hover:text-gray-900 dark:hover:text-gray-50 rounded-md transition-colors"
          >
            <XMarkIcon class="w-3 h-3" />
          </button>
        </div>
      </div>

      <div v-for="(items, category) in store.itemsByCategory" :key="category" class="animate-fade-in">
        <h2 class="text-xs font-bold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider px-1 flex items-center gap-2 mt-6 first:mt-0 transition-colors">
          <span class="text-lg">{{ items[0].categoryIcon || '📦' }}</span>
          {{ category }}
        </h2>
        <div :class="{ 'space-y-3': store.viewMode === 'list', 'grid grid-cols-2 gap-3': store.viewMode === 'grid' }">
          <ShoppingItem
            v-for="item in items"
            :key="item.id"
            :item="item"
            :view-mode="store.viewMode"
            @toggle="store.toggleItem"
            @delete="store.deleteItem"
          />
        </div>
      </div>
      
      <!-- History Section -->
      <div v-if="Object.keys(store.historyByDate).length > 0" class="mt-8 pt-8">
         <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-3 px-2 transition-colors">
            <span class="text-2xl filter drop-shadow-sm">📜</span> 
            <span>Riwayat Belanja</span>
         </h2>
         
         <div v-for="(items, date) in store.historyByDate" :key="date" class="mb-8 relative pl-4 border-l-2 border-emerald-100/50 dark:border-emerald-900/30 transition-colors">
            <h3 class="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-4 bg-emerald-50/80 dark:bg-emerald-900/20 backdrop-blur-sm inline-block px-4 py-1.5 rounded-full shadow-sm border border-emerald-100/50 dark:border-emerald-800/30 transition-colors">{{ date }}</h3>
            <div class="space-y-3">
              <ShoppingItem
                v-for="item in items"
                :key="item.id"
                :item="item"
                :view-mode="store.viewMode"
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
