<script setup>
import { ref, nextTick } from 'vue'
import { useShoppingStore } from '../stores/shopping'
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid'

const store = useShoppingStore()
const newItem = ref('')
const textareaRef = ref(null)

const resizeTextarea = () => {
  const el = textareaRef.value
  if (el) {
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 150) + 'px'
  }
}

const handleInput = () => {
  resizeTextarea()
}

const add = () => {
  if (newItem.value.trim()) {
    store.addItem(newItem.value)
    newItem.value = ''
    nextTick(() => {
      resizeTextarea()
    })
  }
}


</script>

<template>
  <div class="p-4 bg-gradient-to-t from-gray-50 via-gray-50/95 to-transparent dark:from-gray-900 dark:via-gray-900/95 pt-2 pb-[calc(1rem+env(safe-area-inset-bottom))]">
    <div class="relative max-w-md mx-auto flex items-end gap-2">
      <div class="relative flex-1 bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700 rounded-3xl flex items-center transition-colors">
        <textarea
          ref="textareaRef"
          v-model="newItem"
          @input="handleInput"
          placeholder="Tulis barang belanja..."
          rows="1"
          class="w-full pl-5 py-3 bg-transparent border-none focus:ring-0 text-gray-800 dark:text-gray-100 placeholder-gray-400 text-[16px] resize-none overflow-hidden leading-relaxed max-h-[150px]"
        ></textarea>
      </div>
      <button
        @click="add"
        class="flex-none w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md active:scale-90"
        :class="newItem.trim() ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-emerald-500/30' : 'bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'"
        :disabled="!newItem.trim()"
        aria-label="Add item"
      >
        <PaperAirplaneIcon class="w-5 h-5 ml-0.5" />
      </button>
    </div>
  </div>
</template>
