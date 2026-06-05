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
            <p class="text-white/80 text-sm mt-1">Cuéntanos sobre tu flota y un especialista en gestión de combustible te contactará en menos de 24 horas para mostrarte cómo podemos ayudarte.</p>
          </div>
        </div>
        
        <!-- Pipedrive Web Form -->
        <div class="p-4 sm:p-6 overflow-y-auto flex-1 min-h-0">
          <div ref="pipedriveHost" class="pipedrive-host w-full min-h-[480px]"></div>
        
          <div class="mt-5 flex flex-col items-center justify-center gap-2 text-center text-[11px] sm:text-xs text-slate-500"></div>
                      
              <p class="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-600 font-medium w-full">
                <span class="flex-shrink-0">🔒</span>
                <span>Sin spam. Solo te contactaremos una vez para agendar tu asesoría.</span>
              </p>

              
              <p class="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-slate-400 w-full">
                <span class="flex-shrink-0 text-xs">⏱</span>
                <span>Tiempo de respuesta promedio: menos de 2 horas en días hábiles</span>
              </p>

              <hr class="w-200 border-slate-200 my-1 mt-4 mb-3" />

              <!-- SELLOS DE SEGURIDAD Y CERTIFICACIÓN  -->
              <div class="flex flex-wrap items-center justify-center gap-2.5 w-full mt-1">
                
                
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 text-emerald-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  Datos Protegidos
                </span>

                
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <span class="text-xs inline-flex items-center">🇲🇽</span>
                  Empresa Mexicana
                </span>

                
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 text-blue-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 9h3.75M11.25 12h-.008v.008h.008V12Zm.375 0h.008v.008h-.008V12Zm-.375 3h-.008v.008h.008V15Zm.375 0h.008v.008h-.008V15Zm-.375-6h-.008v.008h.008V9Zm.375 0h.008v.008h-.008V9ZM3 20.25h18M3.75 6h16.5M21 20.25V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v14.25" />
                  </svg>
                  SAT Validado
                </span>

              </div>
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
