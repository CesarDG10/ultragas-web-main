<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end sm:items-center justify-center sm:p-4"
      @click.self="closeModal"
    >
      <div
        class="modal-panel relative bg-white w-full sm:rounded-3xl sm:max-w-2xl shadow-2xl overflow-hidden h-full sm:h-auto sm:max-h-[90vh] flex flex-col rounded-t-3xl"
      >
        <!-- Header -->
        <div class="bg-gradient-to-r from-brand-blue to-brand-bluedark p-8 pb-6 relative overflow-hidden flex-none">
          <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <button
            @click="closeModal"
            class="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors z-10"
          >
            <i class="fa-solid fa-xmark text-white text-sm"></i>
          </button>
          <div class="relative z-10">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-3">
              <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Un asesor te contactará pronto
            </div>
            <h2 class="text-2xl font-black text-white">{{ modalTitle }}</h2>
            <p class="text-white/80 text-sm mt-1">Completa el formulario y te contactaremos a la brevedad.</p>
          </div>
        </div>

        <!-- Pipedrive Web Form -->
        <div class="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0">
          <div ref="pipedriveHost" class="pipedrive-host w-full min-h-[480px]"></div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useContactModal } from '../composables/useContactModal'

const PIPEDRIVE_FORM_URL =
  'https://webforms.pipedrive.com/f/bYWhvz0VWMLG6fmrdkGVnReLHIVfZH6XaZB33VDTsz88oce5wzGiABgJvih3DEkyf9'
const PIPEDRIVE_LOADER_SRC = 'https://webforms.pipedrive.com/f/loader'

const { isOpen, modalTitle, closeModal } = useContactModal()

const pipedriveHost = ref(null)

function mountPipedriveEmbed() {
  const host = pipedriveHost.value
  if (!host) return

  host.innerHTML = ''

  const wrap = document.createElement('div')
  wrap.className = 'pipedriveWebForms'
  wrap.setAttribute('data-pd-webforms', PIPEDRIVE_FORM_URL)

  const script = document.createElement('script')
  script.src = PIPEDRIVE_LOADER_SRC
  script.async = true

  wrap.appendChild(script)
  host.appendChild(wrap)
}

watch(isOpen, async (open) => {
  if (!open) return
  await nextTick()
  mountPipedriveEmbed()
})
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
  transform: translateY(100%);
}

@media (min-width: 640px) {
  .modal-enter-from .modal-panel,
  .modal-leave-to .modal-panel {
    transform: scale(0.95) translateY(8px);
  }
}

/* El embed de Pipedrive suele renderizar iframe; ocupar el ancho del modal */
.pipedrive-host :deep(iframe) {
  width: 100% !important;
  max-width: 100%;
}
</style>
