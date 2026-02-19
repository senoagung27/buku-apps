<script setup>
import { onMounted, ref } from 'vue'
import { useShoppingStore } from './stores/shopping'
import ShoppingInput from './components/ShoppingInput.vue'
import ShoppingList from './components/ShoppingList.vue'
import SplashScreen from './components/SplashScreen.vue'
import { ShoppingBagIcon } from '@heroicons/vue/24/solid'
import { ArrowPathIcon, ClipboardDocumentIcon, CheckIcon, ListBulletIcon, Squares2X2Icon, MoonIcon, SunIcon } from '@heroicons/vue/24/outline'

const isRefreshing = ref(false)
const showSplash = ref(true)

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
  setTimeout(() => {
    showSplash.value = false
  }, 2500)
})
</script>

<template>
  <div class="h-dvh bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans selection:bg-emerald-100 dark:selection:bg-emerald-900 selection:text-emerald-900 dark:selection:text-emerald-100 flex flex-col overflow-hidden transition-colors duration-300">
    <!-- Splash Screen -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition duration-700 ease-in"
      leave-from-class="transform opacity-100"
      leave-to-class="transform opacity-0"
    >
      <SplashScreen v-if="showSplash" />
    </Transition>

    <!-- Fixed Header -->
    <header class="bg-white/80 dark:bg-gray-900/80 shadow-sm z-30 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 flex-none transition-colors duration-300">
      <div class="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <ShoppingBagIcon class="w-7 h-7 text-emerald-500" />
          <h1 class="text-lg font-bold tracking-tight text-gray-800 dark:text-white">Buku Apps</h1>
        </div>
        <div class="flex items-center gap-1">
          <button 
            @click="store.toggleDarkMode" 
            class="p-2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-full transition-colors active:scale-95"
            :aria-label="store.isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            <SunIcon v-if="store.isDarkMode" class="w-5 h-5" />
            <MoonIcon v-else class="w-5 h-5" />
          </button>
          <button 
            @click="copyList" 
            class="p-2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-full transition-colors active:scale-95"
            aria-label="Copy list"
          >
            <CheckIcon v-if="copied" class="w-5 h-5 text-emerald-500" />
            <ClipboardDocumentIcon v-else class="w-5 h-5" />
          </button>
          <button 
            @click="store.toggleViewMode" 
            class="p-2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-full transition-colors active:scale-95"
            :aria-label="store.viewMode === 'list' ? 'Switch to grid view' : 'Switch to list view'"
          >
            <Squares2X2Icon v-if="store.viewMode === 'list'" class="w-5 h-5" />
            <ListBulletIcon v-else class="w-5 h-5" />
          </button>
          <button 
            @click="refresh" 
            class="p-2 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-full transition-colors active:scale-95"
            aria-label="Refresh"
          >
            <ArrowPathIcon class="w-5 h-5 transition-transform duration-500" :class="{ 'animate-spin': isRefreshing }" />
          </button>
        </div>
      </div>
    </header>
    
    <!-- Scrolling Content -->
    <main class="flex-1 overflow-y-auto w-full max-w-md mx-auto relative flex flex-col no-scrollbar">
      <div class="p-4 pb-4">
        <ShoppingList />
      </div>
    </main>

    <!-- Fixed Input Area at Bottom -->
    <div class="flex-none w-full max-w-md mx-auto z-20">
      <ShoppingInput />
    </div>
  </div>
</template>
