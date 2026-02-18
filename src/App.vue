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
  <div class="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
    <header class="bg-white shadow-sm sticky top-0 z-10 backdrop-blur-md bg-white/90 supports-[backdrop-filter]:bg-white/60">
      <div class="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <ShoppingBagIcon class="w-8 h-8 text-emerald-500" />
          <h1 class="text-xl font-bold tracking-tight text-gray-800">Daftar Belanja Saya</h1>
        </div>
        <div class="flex items-center gap-1">
          <button 
            @click="copyList" 
            class="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
            aria-label="Copy list"
          >
            <CheckIcon v-if="copied" class="w-5 h-5 text-emerald-500" />
            <ClipboardDocumentIcon v-else class="w-5 h-5" />
          </button>
          <button 
            @click="refresh" 
            class="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
            aria-label="Refresh"
          >
            <ArrowPathIcon class="w-5 h-5 transition-transform duration-500" :class="{ 'animate-spin': isRefreshing }" />
          </button>
        </div>
      </div>
    </header>
    
    <main class="max-w-md mx-auto p-4 relative min-h-[calc(100vh-80px)] flex flex-col justify-between">
      <ShoppingList />
      <ShoppingInput />
    </main>
  </div>
</template>
