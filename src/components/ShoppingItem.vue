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
    class="group relative bg-white dark:bg-gray-800 rounded-2xl border border-gray-100/50 dark:border-gray-700/50 hover:shadow-[0_8px_16px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col"
    :class="[
      { 'opacity-70 bg-gray-50/50 dark:bg-gray-800/50 shadow-none ring-1 ring-gray-100 dark:ring-gray-700': item.isDone },
      viewMode === 'list' 
        ? 'flex-row items-center justify-between p-4 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-none' 
        : 'text-center aspect-[4/5] shadow-sm dark:shadow-none justify-between'
    ]"
    @click="emit('toggle', item.id)"
  >
    <!-- Content Wrapper -->
    <div :class="viewMode === 'list' ? 'flex items-center gap-4 flex-1 cursor-pointer select-none' : 'w-full flex-1 flex flex-col items-center justify-center gap-2 cursor-pointer select-none p-4'">
      
      <!-- Checkbox (List View Only) -->
      <div v-if="viewMode === 'list'" class="text-emerald-500 transition-colors duration-300" :class="{ 'text-gray-300 dark:text-gray-600': !item.isDone }">
        <CheckCircleIcon class="w-6 h-6" v-if="item.isDone" />
        <div v-else class="w-6 h-6 rounded-full border-2 border-gray-200 dark:border-gray-600 group-hover:border-emerald-400 transition-colors"></div>
      </div>
      
      <!-- Icon & Name -->
      <span class="font-medium text-gray-700 dark:text-gray-200 flex " :class="viewMode === 'list' ? 'flex-col text-left' : 'flex-col items-center w-full'">
         <!-- Done State Strikethrough logic -->
        <span 
          class="flex gap-2" 
          :class="[
            viewMode === 'list' ? 'items-center' : 'flex-col items-center gap-2', 
            { 'line-through text-gray-400 dark:text-gray-500 decoration-gray-300 dark:decoration-gray-600': item.isDone && viewMode === 'list' }
          ]"
        >
          <span :class="viewMode === 'list' ? 'text-2xl' : 'text-5xl mb-1 filter drop-shadow-sm'">{{ item.icon || item.categoryIcon }}</span>
          <span 
            :class="[
              viewMode === 'list' ? 'text-lg tracking-tight' : 'text-sm font-semibold leading-tight line-clamp-2 w-full px-1',
              { 'line-through text-gray-400 dark:text-gray-500': item.isDone && viewMode === 'grid'}
            ]"
          >
            {{ item.name }}
          </span>
        </span>
        
        <!-- Date -->
        <span 
          class="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide uppercase opacity-70"
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
        class="text-gray-400 hover:text-emerald-600 dark:text-gray-500 dark:hover:text-emerald-400 p-2 rounded-full hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors active:scale-90"
        aria-label="Copy item"
      >
        <CheckIcon v-if="copied" class="w-5 h-5 text-emerald-500" />
        <ClipboardDocumentIcon v-else class="w-5 h-5" />
      </button>
      <button 
        @click.stop="emit('delete', item.id)" 
        class="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors active:scale-90 focus:outline-none"
        aria-label="Delete item"
      >
        <TrashIcon class="w-5 h-5" />
      </button>
    </div>

    <!-- Grid View Actions (Bottom Row) -->
    <div v-if="viewMode === 'grid'" class="flex items-center border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 divide-x divide-gray-100 dark:divide-gray-700">
        <button 
        @click.stop="copyItem" 
        class="flex-1 py-3 text-gray-400 hover:text-emerald-600 dark:text-gray-500 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-gray-700 transition-colors active:bg-gray-100 dark:active:bg-gray-600 flex items-center justify-center font-medium text-xs gap-1"
      >
        <CheckIcon v-if="copied" class="w-4 h-4 text-emerald-500" />
        <ClipboardDocumentIcon v-else class="w-4 h-4" />
        <span v-if="copied" class="text-emerald-500">Copied</span>
      </button>
      <button 
        @click.stop="emit('delete', item.id)" 
        class="flex-1 py-3 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 hover:bg-white dark:hover:bg-gray-700 transition-colors active:bg-gray-100 dark:active:bg-gray-600 flex items-center justify-center"
      >
        <TrashIcon class="w-4 h-4" />
      </button>
    </div>

    <!-- Grid View Checked Indicator (Corner Badge) -->
    <div v-if="viewMode === 'grid' && item.isDone" class="absolute top-2 right-2 flex items-center justify-center pointer-events-none animate-in fade-in zoom-in duration-200">
        <div class="bg-emerald-500 text-white rounded-full p-1 shadow-md">
            <CheckIcon class="w-3 h-3 stroke-[3]" />
        </div>
    </div>
  </div>
</template>
