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
  <div class="p-4 bg-gradient-to-t from-gray-50 via-gray-50/95 to-transparent pt-8">
    <div class="relative max-w-md mx-auto group">
      <div class="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div class="relative bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/50 p-1.5 flex items-end gap-2 transition-transform duration-300 focus-within:-translate-y-1">
        <textarea
          ref="textareaRef"
          v-model="newItem"
          @input="handleInput"
          @keydown="handleKeydown"
          placeholder="Tulis barang belanja..."
          rows="1"
          class="w-full pl-6 py-4 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 text-lg resize-none overflow-hidden leading-relaxed max-h-[150px]"
        ></textarea>
        <button
          @click="add"
          class="flex-none w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center hover:bg-emerald-600 active:scale-90 transition-all shadow-lg hover:shadow-emerald-500/30 mb-0.5"
          aria-label="Add item"
        >
          <PlusIcon class="w-6 h-6" />
        </button>
      </div>
    </div>
  </div>
</template>
