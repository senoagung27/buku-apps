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
    class="group flex items-center justify-between p-3.5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
    :class="{ 'opacity-60 bg-gray-50': item.isDone }"
  >
    <div class="flex items-center gap-3.5 flex-1 cursor-pointer select-none" @click="emit('toggle', item.id)">
      <div class="text-emerald-500 transition-colors" :class="{ 'text-gray-300': !item.isDone }">
        <CheckCircleIcon class="w-7 h-7" v-if="item.isDone" />
        <div v-else class="w-7 h-7 rounded-full border-2 border-gray-300 hover:border-emerald-400 transition-colors"></div>
      </div>
      <span class="text-lg font-medium text-gray-700 flex flex-col" :class="{ 'line-through text-gray-400': item.isDone }">
        <span class="flex items-center gap-2">
          <span class="text-xl">{{ item.icon || item.categoryIcon }}</span>
          {{ item.name }}
        </span>
        <span class="text-xs text-gray-400 font-normal ml-8">
          {{ new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) }}
        </span>
      </span>
    </div>
    
    <div class="flex items-center gap-0.5">
      <button 
        @click.stop="copyItem" 
        class="text-gray-400 hover:text-emerald-500 p-2 rounded-full hover:bg-emerald-50 transition-colors"
        aria-label="Copy item"
      >
        <CheckIcon v-if="copied" class="w-4 h-4 text-emerald-500" />
        <ClipboardDocumentIcon v-else class="w-4 h-4" />
      </button>
      <button 
        @click.stop="emit('delete', item.id)" 
        class="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        aria-label="Delete item"
      >
        <TrashIcon class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>
