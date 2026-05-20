<template>
  <div class="bg-slate-50 text-slate-900 flex flex-col min-h-screen">
    <AppHeader />

    <!-- Page Title (offset por el header fixed: h-16 sm:h-20 lg:h-24) -->
    <section class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700 flex-none pt-16 sm:pt-20 lg:pt-24">
      <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div class="flex items-center justify-between gap-4">
          <div>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-4">
              Cobertura <span class="gradient-text-brand">Nacional</span>
            </h1>
            <p class="text-sm sm:text-base lg:text-xl text-gray-400 max-w-2xl">
              Encuentra la estación más cercana en nuestra red de más de 2,000 puntos a nivel nacional
            </p>
          </div>
          <div class="hidden lg:flex items-center gap-4 flex-shrink-0">
            <div class="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-4 flex items-center gap-3">
              <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center">
                <i class="fa-solid fa-map-location-dot text-white text-xl"></i>
              </div>
              <div>
                <p class="text-xs text-gray-400 font-semibold">Estaciones Activas</p>
                <p class="text-2xl font-bold text-white">2,000+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mapa interactivo real -->
    <main class="w-full h-[600px] sm:h-[700px] lg:h-[800px]">
      <OrsanMapView />
    </main>

    <CoverageStatsSection />
    <SolicitarInfoCta />
    <CoverageCtaSection />
    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import SolicitarInfoCta from '../components/SolicitarInfoCta.vue'
import AppFooter from '../components/AppFooter.vue'
import CoverageStatsSection from '../components/stations/CoverageStatsSection.vue'
import CoverageCtaSection from '../components/stations/CoverageCtaSection.vue'
import { OrsanMapView } from 'orsan-maps-vue'

onMounted(() => {
  document.body.classList.add('hide-chatbot')
})

onUnmounted(() => {
  document.body.classList.remove('hide-chatbot')
})
</script>
