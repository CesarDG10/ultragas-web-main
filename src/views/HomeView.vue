<template>
  <div class="bg-slate-50 text-slate-900">
    <AppHeader />
    <main>
      <HeroSection />
      <ProblemSection />
      <SolicitarInfoCta />
      <TechSection />
      <CoverageSection />
      <FeaturesGridSection />
      <SolicitarInfoCta />
      <ComparisonSection />
      <FaqSection />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import SolicitarInfoCta from '../components/SolicitarInfoCta.vue'
import HeroSection from '../components/home/HeroSection.vue'
import ProblemSection from '../components/home/ProblemSection.vue'
import TechSection from '../components/home/TechSection.vue'
import CoverageSection from '../components/home/CoverageSection.vue'
import FeaturesGridSection from '../components/home/FeaturesGridSection.vue'
import ComparisonSection from '../components/home/ComparisonSection.vue'
import FaqSection from '../components/home/FaqSection.vue'
</script>
