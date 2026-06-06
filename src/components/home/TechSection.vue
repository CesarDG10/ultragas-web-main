<template>
  <section id="features" class="pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
    <!-- Animated background -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 rounded-full blur-3xl animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-brand-purple/15 to-brand-blue/15 rounded-full blur-3xl animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]" style="animation-delay:2s"></div>
      <div class="absolute inset-0 opacity-5">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="w-full h-full">
          <defs>
            <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M10,2 L10,8 L18,8 L18,18 L2,18 L2,12 L8,12" stroke="currentColor" stroke-width="0.5" fill="none" opacity="0.3"></path>
              <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.5"></circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"></rect>
        </svg>
      </div>
    </div>

    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header -->
      <div class="text-center mb-12 sm:mb-20">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 border border-brand-blue/30 backdrop-blur-sm mb-4 sm:mb-6">
          <div class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-blue animate-pulse"></div>
          <span class="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-brand-blue">Tecnología Avanzada</span>
        </div>
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent px-2">
          Ecosistema Tecnológico Integral
        </h2>
        <p class="text-base sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed px-1">
          Plataforma completa con app móvil, sitio web e integración total con ERP's
        </p>
      </div>

      <!-- Technology Grid -->
      <div class="relative">
        <div
          ref="scrollContainer"
          class="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory py-12 -my-12 md:py-0 md:my-0 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible hide-scrollbar"
        >
          <!-- App Móvil -->
          <div class="w-[78vw] md:w-auto shrink-0 snap-center md:snap-align-none group relative bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-5 sm:p-8 border border-slate-600/30 hover:border-brand-blue/50 transition-all duration-500 hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="w-11 h-11 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-brand-blue/20">
                <i class="fa-solid fa-mobile-screen text-lg sm:text-2xl text-white"></i>
              </div>
              <h3 class="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-white group-hover:text-brand-blue transition-colors">App Móvil Inteligente</h3>
              <p class="text-gray-400 text-sm sm:text-base mb-5 sm:mb-8 leading-relaxed">Control total desde tu smartphone. Autoriza cargas, monitorea transacciones y recibe alertas instantáneas.</p>
              <!-- Phone mockup -->
              <div class="relative w-36 h-60 sm:w-48 sm:h-80 mx-auto bg-gradient-to-b from-slate-900 to-slate-800 rounded-[2rem] sm:rounded-[2.5rem] border-4 border-slate-600 shadow-2xl overflow-hidden group-hover:shadow-brand-blue/20 transition-all duration-500">
                <div class="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-1 bg-slate-600 rounded-full"></div>
                <div class="pt-9 sm:pt-12 p-3 sm:p-4 h-full flex flex-col">
                  <div class="flex items-center justify-between mb-4 sm:mb-6">
                    <div class="text-white text-xs sm:text-sm font-bold">UltraGas</div>
                    <div class="flex gap-1">
                      <div class="w-1 h-1 bg-brand-blue rounded-full animate-pulse"></div>
                      <div class="w-1 h-1 bg-brand-blue rounded-full animate-pulse" style="animation-delay:0.5s"></div>
                      <div class="w-1 h-1 bg-brand-blue rounded-full animate-pulse" style="animation-delay:1s"></div>
                    </div>
                  </div>
                  <div class="space-y-2 sm:space-y-3 flex-1">
                    <div class="bg-gradient-to-r from-green-500/20 to-green-400/20 p-2 sm:p-3 rounded-xl border border-green-400/30">
                      <div class="flex items-center gap-2 mb-1">
                        <i class="fa-solid fa-check text-green-400 text-xs"></i>
                        <span class="text-green-400 text-[10px] sm:text-xs font-bold">AUTORIZADA</span>
                      </div>
                      <p class="text-white text-xs sm:text-sm">Unidad 4582</p>
                      <p class="text-gray-400 text-[10px] sm:text-xs">$1,250.00</p>
                    </div>
                    <div class="bg-slate-700/50 p-2 sm:p-3 rounded-xl border border-slate-600">
                      <p class="text-white text-[10px] sm:text-xs mb-1">Saldo Disponible</p>
                      <p class="text-brand-blue text-sm sm:text-lg font-bold">$15,750.00</p>
                    </div>
                    <div class="grid grid-cols-2 gap-1.5 sm:gap-2">
                      <div class="bg-slate-700/30 p-1.5 sm:p-2 rounded-lg text-center">
                        <i class="fa-solid fa-gas-pump text-brand-blue text-xs sm:text-sm mb-0.5"></i>
                        <p class="text-white text-[10px] sm:text-xs">Cargas</p>
                      </div>
                      <div class="bg-slate-700/30 p-1.5 sm:p-2 rounded-lg text-center">
                        <i class="fa-solid fa-chart-line text-brand-purple text-xs sm:text-sm mb-0.5"></i>
                        <p class="text-white text-[10px] sm:text-xs">Reportes</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Seguridad RFID -->
          <div class="w-[78vw] md:w-auto shrink-0 snap-center md:snap-align-none group relative bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-5 sm:p-8 border border-slate-600/30 hover:border-brand-purple/50 transition-all duration-500 hover:-translate-y-2">
            <div class="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="w-11 h-11 sm:w-16 sm:h-16 bg-gradient-to-br from-brand-purple to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-brand-purple/20">
                <i class="fa-solid fa-shield-halved text-lg sm:text-2xl text-white"></i>
              </div>
              <h3 class="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-white group-hover:text-brand-purple transition-colors">Seguridad RFID</h3>
              <p class="text-gray-400 text-sm sm:text-base mb-5 sm:mb-8 leading-relaxed">Tecnología de transacciones con la seguridad que tu negocio necesita para estar siempre tranquilo con tu operación.</p>
              <div class="relative">
                <div class="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-5 sm:mb-6">
                  <div class="absolute inset-0 bg-gradient-to-r from-brand-purple/20 to-brand-blue/20 rounded-full animate-pulse"></div>
                  <div class="absolute inset-2 bg-gradient-to-r from-brand-purple to-brand-blue rounded-full flex items-center justify-center">
                    <i class="fa-solid fa-lock text-white text-lg sm:text-2xl"></i>
                  </div>
                  <div class="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500/20 rounded-full border-2 border-green-400 flex items-center justify-center animate-[spin_12s_linear_infinite]">
                    <i class="fa-solid fa-fingerprint text-green-400 text-[9px] sm:text-xs"></i>
                  </div>
                  <div class="absolute top-1/2 -right-1.5 sm:-right-2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/20 rounded-full border-2 border-blue-400 flex items-center justify-center animate-[spin_12s_linear_infinite]" style="animation-delay:1s">
                    <i class="fa-solid fa-key text-blue-400 text-[9px] sm:text-xs"></i>
                  </div>
                  <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/20 rounded-full border-2 border-purple-400 flex items-center justify-center animate-[spin_12s_linear_infinite]" style="animation-delay:2s">
                    <i class="fa-solid fa-eye text-purple-400 text-[9px] sm:text-xs"></i>
                  </div>
                </div>
                <div class="space-y-2 sm:space-y-3">
                  <div class="flex items-center gap-3 text-xs sm:text-sm">
                    <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse shrink-0"></div>
                    <span class="text-gray-300">Tecnología RFID</span>
                  </div>
                  <div class="flex items-center gap-3 text-xs sm:text-sm">
                    <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse shrink-0" style="animation-delay:0.5s"></div>
                    <span class="text-gray-300">Terminales especializadas</span>
                  </div>
                  <div class="flex items-center gap-3 text-xs sm:text-sm">
                    <div class="w-2 h-2 bg-purple-400 rounded-full animate-pulse shrink-0" style="animation-delay:1s"></div>
                    <span class="text-gray-300">Validaciones de seguridad y restricciones</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Integración ERP -->
          <div class="w-[78vw] md:w-auto shrink-0 snap-center md:snap-align-none group relative bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-2xl lg:rounded-3xl p-5 sm:p-8 border border-slate-600/30 hover:border-emerald-500/50 transition-all duration-500 hover:-translate-y-2 md:col-span-2 lg:col-span-1">
            <div class="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl lg:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div class="relative z-10">
              <div class="w-11 h-11 sm:w-16 sm:h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/20">
                <i class="fa-solid fa-network-wired text-lg sm:text-2xl text-white"></i>
              </div>
              <h3 class="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-white group-hover:text-emerald-400 transition-colors">Integración ERP</h3>
              <p class="text-gray-400 text-sm sm:text-base mb-5 sm:mb-8 leading-relaxed">API robusta para integración completa con tu sistema ERP. Sincronización automática y reportes unificados.</p>
              <div class="relative">
                <div class="relative flex items-center justify-center mb-5 sm:mb-8">
                  <div class="w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <span class="text-white font-bold text-xs">API</span>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-3 sm:gap-4">
                  <div class="relative mt-5 sm:mt-8">
                    <div class="bg-slate-700/50 p-3 sm:p-4 rounded-xl border border-slate-600 text-center group-hover:border-emerald-400/30 transition-colors">
                      <i class="fa-solid fa-building text-emerald-400 text-base sm:text-lg mb-1 sm:mb-2"></i>
                      <p class="text-white text-xs font-bold">Tu ERP</p>
                      <p class="text-gray-400 text-[10px]">SAP, Oracle, etc.</p>
                    </div>
                    <div class="absolute -top-5 sm:-top-8 left-1/2 w-px h-5 sm:h-8 bg-gradient-to-t from-emerald-400 to-transparent"></div>
                  </div>
                  <div class="relative mt-5 sm:mt-8">
                    <div class="bg-slate-700/50 p-3 sm:p-4 rounded-xl border border-slate-600 text-center group-hover:border-emerald-400/30 transition-colors">
                      <i class="fa-solid fa-gas-pump text-emerald-400 text-base sm:text-lg mb-1 sm:mb-2"></i>
                      <p class="text-white text-xs font-bold">UltraGas</p>
                      <p class="text-gray-400 text-[10px]">Tiempo real</p>
                    </div>
                    <div class="absolute -top-5 sm:-top-8 left-1/2 w-px h-5 sm:h-8 bg-gradient-to-t from-emerald-400 to-transparent"></div>
                  </div>
                </div>
                <div class="flex justify-center mt-4 sm:mt-6 space-x-1">
                  <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                  <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style="animation-delay:0.2s"></div>
                  <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style="animation-delay:0.4s"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Buttons (Mobile only) -->
        <div class="flex justify-center gap-3 mt-6 md:hidden">
          <button
            @click="scroll('left')"
            class="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-600/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-blue/20 hover:border-brand-blue/50 transition-all shadow-lg backdrop-blur-sm"
            aria-label="Anterior"
          >
            <i class="fa-solid fa-chevron-left text-sm"></i>
          </button>
          <button
            @click="scroll('right')"
            class="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-600/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-brand-blue/20 hover:border-brand-blue/50 transition-all shadow-lg backdrop-blur-sm"
            aria-label="Siguiente"
          >
            <i class="fa-solid fa-chevron-right text-sm"></i>
          </button>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-12 sm:mt-16">
        <button
          @click="openModal('Solicitar Información')"
          class="bg-gradient-to-r from-brand-blue to-brand-purple text-white text-sm sm:text-base font-bold px-8 py-3.5 sm:px-10 sm:py-4 rounded-full hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300"
        >
          Ver demo del ecosistema
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useContactModal } from '../../composables/useContactModal'
import { useCarousel } from '../../composables/useCarousel'

const { openModal } = useContactModal()
const { scrollContainer, scroll } = useCarousel({ interval: 4000 })
</script>
