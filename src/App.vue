<script setup>
import { onMounted } from 'vue'
import { useShoppingStore } from './stores/shopping'
import ShoppingInput from './components/ShoppingInput.vue'
import ShoppingList from './components/ShoppingList.vue'
import { ShoppingBagIcon } from '@heroicons/vue/24/solid'
import { ArrowPathIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

const isRefreshing = ref(false)
const refresh = async () => {
  isRefreshing.value = true
  await store.loadItems()
  setTimeout(() => { isRefreshing.value = false }, 500)
}

const copied = ref(false)
const copyList = async () => {
  const groups = store.itemsByCategory
  let text = '🛒 Daftar Belanja\n\n'
  for (const [category, items] of Object.entries(groups)) {
    text += `${items[0]?.categoryIcon || '📦'} ${category}\n`
    for (const item of items) {
      const check = item.isDone ? '✅' : '⬜'
      text += `  ${check} ${item.name}\n`
    }
    text += '\n'
  }
  await navigator.clipboard.writeText(text.trim())
  copied.value = true
  setTimeout(() => { copied.value = false }, 1500)
}

const store = useShoppingStore()

onMounted(() => {
  store.loadItems()
})
</script>

<template>
  <div class="h-dvh bg-gray-50 text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900 flex flex-col overflow-hidden">
    <!-- Fixed Header -->
    <header class="bg-white/80 shadow-sm z-30 backdrop-blur-xl border-b border-gray-100 flex-none">
      <div class="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <ShoppingBagIcon class="w-7 h-7 text-emerald-500" />
          <h1 class="text-lg font-bold tracking-tight text-gray-800">Buku Apps</h1>
        </div>
        <div class="flex items-center gap-1">
          <button 
            @click="copyList" 
            class="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors active:scale-95"
            aria-label="Copy list"
          >
            <CheckIcon v-if="copied" class="w-5 h-5 text-emerald-500" />
            <ClipboardDocumentIcon v-else class="w-5 h-5" />
          </button>
          <button 
            @click="refresh" 
            class="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors active:scale-95"
            aria-label="Refresh"
          >
            <ArrowPathIcon class="w-5 h-5 transition-transform duration-500" :class="{ 'animate-spin': isRefreshing }" />
          </button>
        </div>
      </div>
    </header>
    
    <!-- Scrolling Content -->
    <main class="flex-1 overflow-y-auto w-full max-w-md mx-auto relative flex flex-col">
      <div class="p-4 pb-32">
        <ShoppingList />
      </div>

      <!-- Fixed Input Area at Bottom of Main Container -->
      <div class="sticky bottom-0 mt-auto z-20">
        <ShoppingInput />
      </div>
    </main>
  </div>
</template>
