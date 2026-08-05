<template>
  <div class="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
    <AppHeader />

    <main class="flex-1 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16 sm:pt-20 lg:pt-24">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div class="relative max-w-2xl mx-auto px-4 sm:px-6 py-24 text-center">
        <p class="text-7xl sm:text-8xl font-black gradient-text-brand mb-2">404</p>
        <h1 class="text-2xl sm:text-3xl font-bold text-white mb-4">
          No encontramos esta página
        </h1>
        <p class="text-slate-300 text-base sm:text-lg mb-10">
          El enlace puede estar roto o la página se movió. Prueba desde el inicio o consulta nuestra cobertura de estaciones.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <RouterLink
            to="/"
            class="w-full sm:w-auto bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Ir al inicio
          </RouterLink>
          <RouterLink
            to="/cobertura"
            class="w-full sm:w-auto bg-white/5 backdrop-blur-sm border border-white/15 text-white font-bold py-3.5 px-8 rounded-2xl hover:bg-white/10 transition-all"
          >
            Ver cobertura
          </RouterLink>
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { useHead } from '@unhead/vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'

useHead({
  title: 'Página no encontrada | UltraGas Control Card',
  meta: [
    { name: 'robots', content: 'noindex, follow' },
  ],
})
</script>
