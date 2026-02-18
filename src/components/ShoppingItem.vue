<script setup>
import { TrashIcon, ClipboardDocumentIcon, CheckIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue'

const props = defineProps({
  item: Object,
  viewMode: {
    type: String,
    default: 'list'
  }
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
    class="group relative bg-white rounded-2xl border border-gray-100/50 hover:shadow-[0_8px_16px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
    :class="[
      { 'opacity-60 bg-gray-50 shadow-none border-transparent': item.isDone },
      viewMode === 'list' 
        ? 'flex items-center justify-between p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)]' 
        : 'flex flex-col items-center justify-center p-4 text-center aspect-square shadow-sm'
    ]"
    @click="emit('toggle', item.id)"
  >
    <!-- Grid View Actions (Absolute) -->
    <template v-if="viewMode === 'grid'">
      <button 
        @click.stop="copyItem" 
        class="absolute top-2 left-2 p-1.5 text-gray-300 hover:text-emerald-500 rounded-full hover:bg-emerald-50 transition-colors active:scale-90"
      >
        <CheckIcon v-if="copied" class="w-4 h-4 text-emerald-500" />
        <ClipboardDocumentIcon v-else class="w-4 h-4" />
      </button>
      <button 
        @click.stop="emit('delete', item.id)" 
        class="absolute top-2 right-2 p-1.5 text-gray-300 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors active:scale-90"
      >
        <TrashIcon class="w-4 h-4" />
      </button>
    </template>

    <!-- Content Wrapper -->
    <div :class="viewMode === 'list' ? 'flex items-center gap-4 flex-1 cursor-pointer select-none' : 'w-full flex flex-col items-center gap-2 cursor-pointer select-none'">
      
      <!-- Checkbox / Status Indicator -->
      <div v-if="viewMode === 'list'" class="text-emerald-500 transition-colors duration-300" :class="{ 'text-gray-300': !item.isDone }">
        <CheckCircleIcon class="w-6 h-6" v-if="item.isDone" />
        <div v-else class="w-6 h-6 rounded-full border-2 border-gray-200 group-hover:border-emerald-400 transition-colors"></div>
      </div>
      
      <!-- Icon & Name -->
      <span class="font-medium text-gray-700 flex " :class="viewMode === 'list' ? 'flex-col text-left' : 'flex-col items-center w-full'">
         <!-- Done State Strikethrough logic applied to wrapper or text -->
        <span 
          class="flex gap-2" 
          :class="[
            viewMode === 'list' ? 'items-center' : 'flex-col items-center gap-1', 
            { 'line-through text-gray-400 decoration-gray-300': item.isDone }
          ]"
        >
          <span :class="viewMode === 'list' ? 'text-2xl' : 'text-4xl mb-1 filter drop-shadow-sm'">{{ item.icon || item.categoryIcon }}</span>
          <span :class="viewMode === 'list' ? 'text-lg tracking-tight' : 'text-sm leading-tight line-clamp-2 w-full px-1'">{{ item.name }}</span>
        </span>
        
        <!-- Date -->
        <span 
          class="text-xs text-gray-400 font-medium tracking-wide uppercase opacity-70"
          :class="viewMode === 'list' ? 'ml-9 mt-0.5' : 'mt-2'"
        >
          {{ new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) }}
        </span>
      </span>
    </div>
    
    <!-- List View Actions (Horizontal) -->
    <div v-if="viewMode === 'list'" class="flex items-center gap-1">
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

    <!-- Grid View Checked Indicator (Overlay or element) -->
    <div v-if="viewMode === 'grid' && item.isDone" class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <CheckCircleIcon class="w-12 h-12 text-emerald-500/20" />
    </div>
  </div>
</template>
