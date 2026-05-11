<template>
  <section class="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-brand-blue/20 to-transparent rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-brand-purple/20 to-transparent rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-[1440px] mx-auto px-8 relative z-10">
      <div class="max-w-5xl mx-auto">
        <!-- Main CTA Card -->
        <div class="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-gray-100">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <!-- Left Content -->
            <div class="p-12 lg:p-16 flex flex-col justify-center">
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 border border-brand-blue/20 mb-6 w-fit">
                <i class="fa-solid fa-plus text-brand-blue text-sm"></i>
                <span class="text-xs font-bold tracking-widest uppercase text-brand-blue">Expansión de Red</span>
              </div>
              <h2 class="text-4xl lg:text-5xl font-black text-brand-dark mb-6 leading-tight">
                ¿Necesitas mayor <span class="gradient-text-brand">cobertura?</span>
              </h2>
              <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                ¿Necesitas cobertura específica? UG puede diseñar un traje a la medida para ti.
              </p>
              <div>
                <button
                  @click="openModal('Solicitar Información')"
                  class="bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold px-8 py-4 rounded-2xl hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
                >
                  <span>Solicitar Información</span>
                  <i class="fa-solid fa-arrow-right text-sm transform group-hover:translate-x-1 transition-transform"></i>
                </button>
              </div>
            </div>

            <!-- Right Visual -->
            <div class="bg-gradient-to-br from-brand-blue to-brand-purple p-12 lg:p-16 flex items-center justify-center relative overflow-hidden">
              <div class="absolute inset-0 opacity-10">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
              </div>
              <div class="relative z-10 text-center">
                <div class="w-48 h-48 mx-auto bg-white/10 backdrop-blur-sm rounded-[40px] flex items-center justify-center relative">
                  <div class="absolute inset-0 bg-white/5 rounded-[40px] animate-pulse"></div>
                  <i class="fa-solid fa-location-dot text-white text-8xl relative z-10"></i>
                  <div class="absolute inset-0 flex items-center justify-center">
                    <div class="w-32 h-32 bg-white/20 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useContactModal } from '../../composables/useContactModal'

const { openModal } = useContactModal()
</script>
