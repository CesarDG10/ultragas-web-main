<template>
  <div class="bg-slate-50 text-slate-900">
    <HomeAnnouncementModal />
    <AppHeader />
    <main>
      <HeroSection />
      <VideoModal />
      <ProblemSection />
      <SolicitarInfoCta />
      <TechSection />
      <PartnersSection />
      <CoverageSection />
      <FeaturesGridSection />
      <SolicitarInfoCta />
      <ComparisonSection />
      <SuccessStoriesSection />
      <FaqSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import HomeAnnouncementModal from '../components/HomeAnnouncementModal.vue'

useHead({
  title: 'UltraGas Control Card | Control Inteligente de Combustible',
  meta: [
    { name: 'description', content: 'Controla el combustible de tu flota con tecnología avanzada. Elimina fugas, autoriza cargas, monitorea transacciones en tiempo real y recibe alertas instantáneas. Red de más de 2,000 estaciones en México.' },
    { property: 'og:title', content: 'UltraGas Control Card | Control Inteligente de Combustible' },
    { property: 'og:description', content: 'Controla el combustible de tu flota con tecnología avanzada. Elimina fugas, autoriza cargas y monitorea transacciones en tiempo real.' },
    { property: 'og:url', content: 'https://www.ultragas.com.mx/' },
  ],
})
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import HeroSection from '../components/home/HeroSection.vue'
import ProblemSection from '../components/home/ProblemSection.vue'
import TechSection from '../components/home/TechSection.vue'
import PartnersSection from '../components/home/PartnersSection.vue'
import CoverageSection from '../components/home/CoverageSection.vue'
import FeaturesGridSection from '../components/home/FeaturesGridSection.vue'
import ComparisonSection from '../components/home/ComparisonSection.vue'
import SuccessStoriesSection from '../components/home/SuccessStoriesSection.vue'
import FaqSection from '../components/home/FaqSection.vue'
import VideoModal from '../components/VideoModal.vue'
</script>
