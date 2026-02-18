<script setup>
import { TrashIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'

const props = defineProps({
  item: Object
})

const emit = defineEmits(['toggle', 'delete'])

const copied = ref(false)
const copyItem = async () => {
  await navigator.clipboard.writeText(`${props.item.icon || props.item.categoryIcon} ${props.item.name}`)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1200)
}
</script>

<template>
  <div
    class="group flex items-center justify-between p-4 bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100/50 hover:shadow-[0_8px_16px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300"
    :class="{ 'opacity-60 bg-gray-50 shadow-none border-transparent': item.isDone }"
  >
    <div class="flex items-center gap-4 flex-1 cursor-pointer select-none" @click="emit('toggle', item.id)">
      <div class="text-emerald-500 transition-colors duration-300" :class="{ 'text-gray-300': !item.isDone }">
        <CheckCircleIcon class="w-6 h-6" v-if="item.isDone" />
        <div v-else class="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-emerald-400 transition-colors"></div>
      </div>
      <span class="text-lg font-medium text-gray-700 flex flex-col" :class="{ 'line-through text-gray-400 decoration-gray-300': item.isDone }">
        <span class="flex items-center gap-3">
          <span class="text-2xl filter drop-shadow-sm">{{ item.icon || item.categoryIcon }}</span>
          <span class="tracking-tight">{{ item.name }}</span>
        </span>
        <span class="text-xs text-gray-400 font-medium ml-9 mt-0.5 tracking-wide uppercase opacity-70">
          {{ new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) }}
        </span>
      </span>
    </div>
    
    <div class="flex items-center gap-1">
      <button 
        @click.stop="copyItem" 
        class="text-gray-400 hover:text-emerald-600 p-2 rounded-full hover:bg-emerald-50 transition-colors active:scale-90"
        aria-label="Copy item"
      >
        <CheckIcon v-if="copied" class="w-5 h-5 text-emerald-500" />
        <ClipboardDocumentIcon v-else class="w-5 h-5" />
      </button>
      <button 
        @click.stop="emit('delete', item.id)" 
        class="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors active:scale-90 focus:outline-none"
        aria-label="Delete item"
      >
        <TrashIcon class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
