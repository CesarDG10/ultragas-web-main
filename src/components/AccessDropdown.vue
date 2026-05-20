<template>
  <div class="relative" ref="dropdownRef">
    <button
      type="button"
      @click="open = !open"
      class="text-sm font-medium text-gray-600 hover:text-brand-purple px-3 py-2 rounded-lg hover:bg-gray-100/80 transition-colors inline-flex items-center gap-1.5"
    >
      <span>Accesos</span>
      <i
        class="fa-solid fa-chevron-down text-[10px] text-gray-400 transition-transform duration-200"
        :class="{ 'rotate-180': open }"
      ></i>
    </button>

    <Transition name="dropdown">
      <div
        v-if="open"
        class="absolute right-0 top-full mt-1 min-w-[200px] py-1.5 bg-white rounded-xl shadow-lg border border-gray-100 z-50"
      >
        <button
          type="button"
          @click="emit('open-portal-modal'); open = false"
          class="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-purple transition-colors first:rounded-t-xl text-left"
        >
          <i class="fa-solid fa-user-tie text-gray-400 text-xs w-4 text-center"></i>
          Portal de Clientes
        </button>
        <a
          :href="afiliadosUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-purple transition-colors last:rounded-b-xl"
        >
          <i class="fa-solid fa-store text-gray-400 text-xs w-4 text-center"></i>
          Portal de Afiliados
        </a>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['open-portal-modal'])

defineProps({
  clientesviejoUrl: { type: String, default: '#' },
  clientesnuevoUrl: { type: String, default: '#' },
  afiliadosUrl: { type: String, default: '#' },
})

const open = ref(false)
const dropdownRef = ref(null)

function closeOnClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('click', closeOnClickOutside))
onUnmounted(() => document.removeEventListener('click', closeOnClickOutside))
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
