<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      @click.self="closePortalModal"
    >
      <div
        class="modal-panel relative bg-white w-full rounded-3xl max-w-lg shadow-2xl overflow-hidden max-h-[90dvh] overflow-y-auto"
      >
        <!-- Botón cerrar flotante sobre la imagen -->
        <button
          @click="closePortalModal"
          class="absolute top-3 right-3 z-10 w-7 h-7 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center transition-colors"
        >
          <i class="fa-solid fa-xmark text-white text-xs"></i>
        </button>

        <!-- Aviso promocional -->
        <div class="overflow-hidden">
          <img
            :src="`${base}images/Aviso_Portal.jpg`"
            alt="Aviso promocional"
            class="w-full h-auto object-cover sm:max-h-[calc(90dvh-90px)]"
          />
        </div>

        <!-- Footer con botones -->
        <div class="bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-4 flex flex-col sm:flex-row gap-3 relative overflow-hidden">
          <a
            :href="clientesviejoUrl"
            target="_blank"
            rel="noopener noreferrer"
            @click="closePortalModal"
            class="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-white/20 hover:border-white/60 hover:bg-white/10 transition-all group"
          >
            <div class="w-9 h-9 rounded-xl bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0">
              <i class="fa-solid fa-user-tie text-white/70 text-sm"></i>
            </div>
            <p class="font-bold text-white group-hover:text-white transition-colors text-sm">Portal Clásico</p>
          </a>

          <a
            :href="clientesnuevoUrl"
            target="_blank"
            rel="noopener noreferrer"
            @click="closePortalModal"
            class="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl border-2 border-white/20 hover:border-brand-purple hover:bg-white/10 transition-all group"
          >
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center shadow-md flex-shrink-0">
              <i class="fa-solid fa-rocket text-white text-sm"></i>
            </div>
            <p class="font-bold text-white group-hover:text-brand-purple transition-colors text-sm">Nuevo Portal</p>
          </a>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { usePortalModal } from '../composables/usePortalModal'

defineProps({
  clientesviejoUrl: { type: String, default: '#' },
  clientesnuevoUrl: { type: String, default: '#' },
})

const { isOpen, closePortalModal } = usePortalModal()
const base = import.meta.env.BASE_URL
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
