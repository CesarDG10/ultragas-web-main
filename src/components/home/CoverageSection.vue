<template>
  <section id="coverage" class="relative pt-12 pb-12 sm:pt-20 sm:pb-16 lg:pt-24 lg:pb-20 bg-blue-50/50 overflow-hidden min-h-[520px] sm:min-h-[640px] lg:h-[800px]">
    <!-- Map: Mapbox (puntos dentro de fronteras) o imagen estática si no hay token -->
    <CoverageMapbox />

    <!-- Content -->
    <div class="relative z-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between pt-8 sm:pt-12 pb-12 sm:pb-20">
      <div class="text-center max-w-3xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6">
          <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span class="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-gray-600">Cobertura Nacional Activa</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark mb-4 sm:mb-6">
          Tu flota cubierta en <br><span class="gradient-text-brand">todo México</span>
        </h2>
        <p class="text-base sm:text-lg lg:text-xl text-gray-600">
          Desde Tijuana hasta Cancún. Nuestra red estratégica garantiza el abasto de combustible en las rutas más importantes del país.
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="mt-auto relative max-w-5xl mx-auto w-full">
        <div ref="scrollContainer" class="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory py-12 -my-12 md:py-0 md:my-0 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible hide-scrollbar">
          <div class="w-[85vw] sm:w-[350px] md:w-auto shrink-0 snap-center group bg-white/55 backdrop-blur-xl border border-white/40 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(37,115,217,0.2)] hover:-translate-y-1 transition-all duration-300">
          <div class="flex items-start justify-between mb-3 sm:mb-4">
            <div class="p-2.5 sm:p-3 bg-blue-50/80 rounded-lg sm:rounded-xl text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
              <i class="fa-solid fa-gas-pump text-lg sm:text-xl"></i>
            </div>
          </div>
          <div class="space-y-1">
            <h3 class="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">+2,000</h3>
            <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Estaciones Afiliadas</p>
          </div>
          <div class="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full bg-brand-blue w-3/4 rounded-full"></div>
          </div>
        </div>

        <div class="w-[85vw] sm:w-[350px] md:w-auto shrink-0 snap-center group bg-white/55 backdrop-blur-xl border border-white/40 p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(132,52,225,0.2)] hover:-translate-y-1 transition-all duration-300">
          <div class="flex items-start justify-between mb-3 sm:mb-4">
            <div class="p-2.5 sm:p-3 bg-purple-50/80 rounded-lg sm:rounded-xl text-brand-purple group-hover:bg-brand-purple group-hover:text-white transition-colors">
              <i class="fa-solid fa-route text-lg sm:text-xl"></i>
            </div>
          </div>
          <div class="space-y-1">
            <h3 class="text-3xl sm:text-4xl font-black text-brand-dark tracking-tight">32</h3>
            <p class="text-sm font-semibold text-gray-500 uppercase tracking-wide">Estados Cubiertos</p>
          </div>
          <div class="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full bg-brand-purple w-full rounded-full"></div>
          </div>
        </div>

        <div class="w-[85vw] sm:w-[350px] md:w-auto shrink-0 snap-center group bg-gradient-to-br from-brand-blue to-brand-purple p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden text-white hover:-translate-y-1 transition-all duration-300">
          <div class="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div class="relative z-10">
            <h3 class="text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2">Mapa Interactivo</h3>
            <p class="text-blue-100 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">Ubica la estación más cercana en tiempo real desde nuestra app o web.</p>
          </div>
          <RouterLink
            to="/cobertura"
            class="relative z-10 w-full bg-white text-brand-blue text-sm sm:text-base font-bold py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg"
          >
            <span>Ver Mapa Completo</span>
            <i class="fa-solid fa-arrow-right text-sm"></i>
          </RouterLink>
        </div>

        </div>

        <!-- Navigation Buttons (Mobile only) -->
        <div class="flex justify-center gap-3 mt-4 md:hidden">
          <button @click="scroll('left')" class="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 flex items-center justify-center text-brand-blue hover:bg-white transition-all shadow-sm" aria-label="Anterior">
            <i class="fa-solid fa-chevron-left text-sm"></i>
          </button>
          <button @click="scroll('right')" class="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 flex items-center justify-center text-brand-blue hover:bg-white transition-all shadow-sm" aria-label="Siguiente">
            <i class="fa-solid fa-chevron-right text-sm"></i>
          </button>
        </div>

        <!-- CTA -->
        <div class="flex justify-center mt-8 sm:mt-10">
          <button
            @click="openModal('Solicitar Información')"
            class="bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold px-8 py-3.5 sm:px-10 sm:py-4 rounded-full hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
          >
            Solicitar Información
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import CoverageMapbox from './CoverageMapbox.vue'
import { useCarousel } from '../../composables/useCarousel'
import { useContactModal } from '../../composables/useContactModal'

const { scrollContainer, scroll } = useCarousel({ interval: 5000 })
const { openModal } = useContactModal()
</script>
