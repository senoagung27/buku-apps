<script setup>
import { ShoppingBagIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-opacity duration-700">
    <div class="flex flex-col items-center gap-4 animate-bounce-in">
      <div class="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl shadow-emerald-500/10 dark:shadow-emerald-500/5">
        <ShoppingBagIcon class="w-16 h-16 text-emerald-500" />
      </div>
      <h1 class="text-2xl font-bold bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent tracking-tight">
        Buku Apps
      </h1>
      <div class="mt-4 flex gap-1">
        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]"></div>
        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]"></div>
        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-bounce"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce-in {
  0% { opacity: 0; transform: scale(0.9); }
  100% { opacity: 1; transform: scale(1); }
}
.animate-bounce-in {
  animation: bounce-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>
