<script setup>
import { ref, nextTick } from 'vue'
import { useShoppingStore } from '../stores/shopping'
import { PlusIcon } from '@heroicons/vue/24/solid'

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

const handleKeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    add()
  }
}
</script>

<template>
  <div class="sticky bottom-0 bg-white p-4 border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:relative md:bottom-auto md:shadow-none md:border-none md:p-0 md:mb-6 z-20">
    <div class="relative max-w-md mx-auto">
      <textarea
        ref="textareaRef"
        v-model="newItem"
        @input="handleInput"
        @keydown="handleKeydown"
        placeholder="Add items (enter to separate)..."
        rows="1"
        class="w-full pl-5 pr-14 py-3.5 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent shadow-sm text-lg transition-shadow resize-none overflow-hidden leading-relaxed"
      ></textarea>
      <button
        @click="add"
        class="absolute right-2 bottom-2 p-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 active:scale-95 transition-all shadow-md mb-0.5"
        aria-label="Add item"
      >
        <PlusIcon class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>
