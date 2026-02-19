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
  <div class="p-4 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
    <div class="relative max-w-md mx-auto flex items-end gap-2">
      <div class="relative flex-1">
        <textarea
          ref="textareaRef"
          v-model="newItem"
          @input="handleInput"
          placeholder="Tulis barang belanja..."
          rows="1"
          class="flex min-h-[52px] w-full rounded-[26px] border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-5 py-3.5 text-base ring-offset-white dark:ring-offset-gray-950 placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 dark:focus-visible:ring-gray-300 disabled:cursor-not-allowed disabled:opacity-50 text-gray-900 dark:text-gray-50 resize-none overflow-hidden leading-relaxed max-h-[150px] shadow-sm"
        ></textarea>
      </div>
      <button
        @click="add"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-[52px] w-[52px] shrink-0 shadow-sm"
        :class="newItem.trim() ? 'bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400 cursor-not-allowed'"
        :disabled="!newItem.trim()"
        aria-label="Add item"
      >
        <PaperAirplaneIcon class="w-6 h-6 ml-0.5" />
      </button>
    </div>
  </div>
</template>
