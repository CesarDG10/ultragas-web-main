<template>
  <Teleport to="body">
  <Transition name="modal">
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      @click.self="dismiss"
    >
      <div class="modal-panel relative bg-white w-full rounded-3xl max-w-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">

        <!-- Botón cerrar -->
        <button
          @click="dismiss"
          class="absolute top-4 right-4 z-10 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-colors"
        >
          <i class="fa-solid fa-xmark text-white text-sm"></i>
        </button>

        <!-- Header con gradiente de marca -->
        <div class="relative bg-gradient-to-br from-brand-blue to-brand-purple px-8 pt-8 pb-8 overflow-hidden text-center">
          <!-- Círculos decorativos de fondo -->
          <div class="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-white/10"></div>
          <div class="absolute -bottom-10 -left-10 w-52 h-52 rounded-full bg-white/5"></div>
          <div class="absolute top-6 left-10 w-3 h-3 rounded-full bg-white/30"></div>
          <div class="absolute bottom-8 right-14 w-2 h-2 rounded-full bg-white/40"></div>
          <div class="absolute top-10 right-20 w-1.5 h-1.5 rounded-full bg-white/20"></div>

          <!-- Icono bomba de gasolina -->
          <div class="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm mb-5 shadow-xl">
            <i class="fa-solid fa-car text-white text-4xl"></i>
          </div>

          <!-- Título -->
          <h2 class="relative text-white font-extrabold text-2xl sm:text-3xl leading-tight">
            ¡Tu gestión de<br>flotilla evoluciona!
          </h2>
        </div>

        <!-- Contenido -->
        <div class="px-8 py-7">
          <!-- Mensaje principal -->
          <p class="text-slate-900 text-center text-base leading-relaxed mb-7">
            Estamos preparando un portal más rápido, seguro e intuitivo para ti.
          </p>

          <!-- Lista de mejoras -->
          <div class="flex flex-col gap-4 mb-7">
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 rounded-2xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-compass text-brand-blue text-lg"></i>
              </div>
              <span class="text-sm text-slate-700 font-semibold leading-snug">Navegación más limpia</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 rounded-2xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-chart-line text-brand-blue text-lg"></i>
              </div>
              <span class="text-sm text-slate-700 font-semibold leading-snug">Visibilidad mejorada de control de combustible</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 rounded-2xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-palette text-brand-blue text-lg"></i>
              </div>
              <span class="text-sm text-slate-700 font-semibold leading-snug">Interfaz modernizada</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-11 h-11 rounded-2xl bg-brand-blue/10 flex items-center justify-center shrink-0">
                <i class="fa-solid fa-map-location-dot text-brand-blue text-lg"></i>
              </div>
              <span class="text-sm text-slate-700 font-semibold leading-snug">Cobertura Nacional</span>
            </div>
          </div>

          <!-- Botón de cierre -->
          <button
            @click="dismiss"
            class="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-bluedark text-white font-bold text-base hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

// Clave única para guardar en el almacenamiento local del navegador
const STORAGE_KEY = 'ultragas_modal_announcement_seen'

onMounted(() => {
  // 1. Verificamos si el usuario ya vio el modal previamente
  const hasSeenModal = localStorage.getItem(STORAGE_KEY)

  // 2. Si NO lo ha visto, mostramos el modal y bloqueamos el scroll
  if (!hasSeenModal) {
    isVisible.value = true
    document.body.style.overflow = 'hidden'
  }
})

function dismiss() {
  isVisible.value = false
  document.body.style.overflow = 'auto'
  
  // 3. Guardamos la marca en localStorage para que no se vuelva a mostrar
  localStorage.setItem(STORAGE_KEY, 'true')
}
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
