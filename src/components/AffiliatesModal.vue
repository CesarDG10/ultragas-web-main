<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      @click.self="closeAffiliatesModal"
    >
      <div
        class="modal-panel relative bg-white w-full rounded-3xl max-w-lg shadow-2xl overflow-hidden"
      >
        <button
          @click="closeAffiliatesModal"
          class="absolute top-3 right-3 z-10 w-7 h-7 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-colors"
        >
          <i class="fa-solid fa-xmark text-gray-600 text-xs"></i>
        </button>

        <div class="px-6 pt-8 pb-2 text-center">
          <h3 class="text-lg font-bold text-brand-dark">Portal de Afiliados</h3>
          <p class="text-sm text-gray-500 mt-1">Selecciona a qué portal deseas ingresar</p>
        </div>

        <!-- Botones -->
        <div class="px-4 pb-4 pt-4 flex flex-col sm:flex-row gap-3">
          <a
            :href="afiliadosclasicoUrl"
            target="_blank"
            rel="noopener noreferrer"
            @click="closeAffiliatesModal"
            class="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-brand-red/20 hover:border-brand-red hover:bg-brand-red/5 transition-all group"
          >
            <div class="w-9 h-9 rounded-xl bg-brand-red/10 group-hover:bg-brand-red/20 flex items-center justify-center transition-colors flex-shrink-0">
              <i class="fa-solid fa-store text-brand-red text-sm"></i>
            </div>
            <p class="font-bold text-brand-dark group-hover:text-brand-red transition-colors text-sm">Portal Clásico</p>
          </a>

          <div
            class="relative flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed select-none"
            aria-disabled="true"
          >
            <div class="w-9 h-9 rounded-xl bg-gray-300 flex items-center justify-center flex-shrink-0">
              <i class="fa-solid fa-rocket text-white text-sm"></i>
            </div>
            <p class="font-bold text-gray-500 text-sm">Portal Nuevo</p>
            <span class="ml-auto text-[10px] font-bold uppercase tracking-wide bg-gray-300 text-gray-600 px-2 py-1 rounded-full">Próximamente</span>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { useAffiliatesModal } from '../composables/useAffiliatesModal'

defineProps({
  afiliadosclasicoUrl: { type: String, default: '#' },
  sistemaafiliadasUrl: { type: String, default: '#' },
})

const { isOpen, closeAffiliatesModal } = useAffiliatesModal()
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .modal-panel,
.modal-leave-active .modal-panel {
  transition: transform 0.3s ease;
}
.modal-enter-from .modal-panel,
.modal-leave-to .modal-panel {
  transform: scale(0.95) translateY(8px);
}
</style>
