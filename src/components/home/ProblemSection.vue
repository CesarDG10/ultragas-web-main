<template>
  <section id="problem" class="pt-4 pb-6 sm:pt-0 sm:pb-8 lg:pt-12 lg:pb-12 bg-white relative overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-radial from-slate-100 to-transparent opacity-50 pointer-events-none -z-10"></div>
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-4xl mx-auto mb-12 sm:mb-20">
        <div class="inline-block bg-gray-100 px-3 py-1.5 sm:px-4 rounded-lg mb-4 sm:mb-6">
          <span class="text-[10px] sm:text-xs font-bold tracking-widest text-gray-500 uppercase">¡YA BASTA!</span>
        </div>
        <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-dark px-2">Olvídate para siempre de...</h2>
      </div>

      <div class="relative">
        <div ref="scrollContainer" class="flex md:grid md:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory py-12 -my-12 md:py-0 md:my-0 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible hide-scrollbar">
          <!-- Card 1: Fugas -->
        <div class="w-[85vw] sm:w-[400px] md:w-auto shrink-0 snap-center group relative bg-[#FFF3E0] rounded-2xl sm:rounded-[32px] p-6 sm:p-10 min-h-[420px] sm:h-[560px] flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-100 hover:-translate-y-2">
          <div class="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
            <i class="fa-solid fa-gas-pump text-xl sm:text-2xl text-orange-500"></i>
          </div>
          <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">Fugas de recursos</h3>
          <p class="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-[90%]">
            Pérdidas constantes sin visibilidad sobre dónde va el combustible de tu flota.
          </p>
          <div class="mt-auto relative w-full h-48 flex justify-center items-center flex-col">
            <img
              alt="Fugas de recursos"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5WMOvALLUpMglBBkn5uPihELqOU2%2Fbf3f6286-cea7-4f77-891b-cc0c5b3ab6d7.png"
              class="h-36 object-contain"
            />
          </div>
        </div>

        <!-- Card 2: Efectivo -->
        <div class="w-[85vw] sm:w-[400px] md:w-auto shrink-0 snap-center group relative bg-[#EBF3FF] rounded-2xl sm:rounded-[32px] p-6 sm:p-10 min-h-[420px] sm:h-[560px] flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2">
          <div class="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
            <i class="fa-solid fa-money-bill-wave text-xl sm:text-2xl text-brand-blue"></i>
          </div>
          <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">Uso de efectivo</h3>
          <p class="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-[90%]">
            Riesgo de robo, falta de trazabilidad y complicaciones administrativas.
          </p>
          <div class="mt-auto relative w-full h-48 flex items-center justify-center">
            <img
              alt="Uso de efectivo"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5WMOvALLUpMglBBkn5uPihELqOU2%2Fd31bac47-9966-448c-97f8-016433e78331.png"
              class="h-36 object-contain"
            />
          </div>
        </div>

        <!-- Card 3: Visibilidad -->
        <div class="w-[85vw] sm:w-[400px] md:w-auto shrink-0 snap-center group relative bg-[#E6FFFA] rounded-2xl sm:rounded-[32px] p-6 sm:p-10 min-h-[420px] sm:h-[560px] flex flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-teal-100 hover:-translate-y-2">
          <div class="w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
            <i class="fa-solid fa-eye-slash text-xl sm:text-2xl text-teal-600"></i>
          </div>
          <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 tracking-tight">Poca Visibilidad</h3>
          <p class="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-[90%]">
            Desconoces cuándo, dónde y cuánto combustible consume cada unidad.
          </p>
          <div class="mt-auto relative w-full h-48 flex justify-center items-center">
            <img
              alt="Poca visibilidad"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5WMOvALLUpMglBBkn5uPihELqOU2%2F4687d4bd-9167-44a7-be67-01aa12243a4f.png"
              class="h-48 w-48 object-contain rotate-45"
            />
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-12 sm:mt-16">
        <button
          @click="openModal('Solicitar Información')"
          class="bg-gradient-to-r from-brand-blue to-brand-purple text-white text-sm sm:text-base font-bold px-8 py-3.5 sm:px-10 sm:py-4 rounded-full hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300"
        >
          Quiero eliminar las fugas de combustible
        </button>
      </div>
  
      <!-- Navigation Buttons (Mobile only) -->
      <div class="flex justify-center gap-3 mt-4 md:hidden">
        <button @click="scroll('left')" class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand-blue hover:border-brand-blue/30 transition-all shadow-sm" aria-label="Anterior">
          <i class="fa-solid fa-chevron-left text-sm"></i>
        </button>
        <button @click="scroll('right')" class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand-blue hover:border-brand-blue/30 transition-all shadow-sm" aria-label="Siguiente">
          <i class="fa-solid fa-chevron-right text-sm"></i>
        </button>
      </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { useContactModal } from '../../composables/useContactModal'
import { useCarousel } from '../../composables/useCarousel'

const { openModal } = useContactModal()

const { scrollContainer, scroll } = useCarousel({ interval: 5000 })
</script>
