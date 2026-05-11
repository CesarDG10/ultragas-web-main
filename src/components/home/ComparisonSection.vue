<template>
  <section id="comparison" class="pt-10 pb-10 sm:pt-14 sm:pb-14 lg:pt-20 lg:pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 rounded-full blur-3xl animate-pulse"></div>
    </div>

    <div class="max-w-[1440px] mx-auto px-2 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center mb-8 sm:mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 border border-brand-blue/30 backdrop-blur-sm mb-4 sm:mb-6">
          <i class="fa-solid fa-trophy text-brand-blue text-xs sm:text-sm"></i>
          <span class="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-brand-blue">Comparativa Inteligente</span>
        </div>
        <h2 class="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent px-2">
          ¿Por qué elegir UltraGas?
        </h2>
        <p class="text-sm sm:text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto px-1">
          Compara las ventajas de nuestro monedero electrónico frente a la competencia y métodos tradicionales
        </p>
      </div>

      <!-- Tabla Compacta y Responsiva -->
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-[1.4fr_1fr_1fr] sm:grid-cols-[2fr_1fr_1fr_1fr] gap-1 sm:gap-0">

          <!-- ── HEADER ROW ────────────────────────────── -->
          <!-- Celda vacía -->
          <div class="col-span-1 sm:border-b sm:border-slate-700/50"></div>

          <!-- UltraGas Header -->
          <div class="bg-gradient-to-br from-brand-blue to-brand-purple p-2 sm:px-4 sm:py-4 rounded-t-xl sm:rounded-t-xl border-2 border-brand-blue sm:border-x-0 sm:border-t-0 sm:border-b-0 sm:border-l sm:border-r sm:border-l-brand-blue/40 sm:border-r-brand-blue/40 shadow-lg shadow-brand-blue/20 sm:shadow-none relative overflow-hidden flex flex-col justify-center items-center">
            <div class="absolute inset-0 bg-white/5"></div>
            <div class="relative z-10 text-center w-full">
              <!-- Móvil: solo nombre pequeño -->
              <div class="sm:hidden flex flex-col items-center gap-0.5">
                <div class="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-1 backdrop-blur-sm">
                  <i class="fa-solid fa-crown text-sm text-yellow-300"></i>
                </div>
                <span class="text-[11px] font-black leading-tight">UltraGas</span>
              </div>
              <!-- Desktop: nombre + etiqueta compacta -->
              <div class="hidden sm:flex flex-col items-center gap-1.5">
                <span class="text-base font-black tracking-tight leading-none">Ultra<span class="text-yellow-300">Gas</span></span>
                <span class="text-[11px] text-blue-200 font-semibold tracking-wide">Control Card</span>
              </div>
            </div>
          </div>

          <!-- Otros Header -->
          <div class="bg-slate-800/50 p-2 sm:px-4 sm:py-4 rounded-t-xl sm:rounded-t-xl border border-slate-700 sm:border-x-0 sm:border-t-0 sm:border-b-0 sm:border-l sm:border-r sm:border-slate-700/40 flex flex-col justify-center items-center">
            <div class="text-center w-full">
              <div class="sm:hidden">
                <div class="w-6 h-6 bg-slate-700 rounded-lg flex items-center justify-center mx-auto mb-1">
                  <i class="fa-solid fa-credit-card text-xs text-gray-400"></i>
                </div>
                <span class="text-[11px] font-bold text-gray-300 leading-tight">Otros</span>
              </div>
              <div class="hidden sm:flex flex-col items-center gap-1.5">
                <i class="fa-solid fa-credit-card text-sm text-gray-400"></i>
                <div>
                  <p class="text-sm font-semibold text-gray-300 leading-none">Otros</p>
                  <p class="text-[11px] text-gray-500 mt-0.5">Monederos</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Efectivo Header (oculto en móvil) -->
          <div class="hidden sm:flex bg-slate-800/30 px-4 py-4 rounded-t-xl border border-slate-700/40 sm:border-x-0 sm:border-t-0 sm:border-b-0 sm:border-l sm:border-slate-700/30 flex-col justify-center items-center">
            <i class="fa-solid fa-money-bill-wave text-sm text-gray-500 mb-1.5"></i>
            <p class="text-sm font-semibold text-gray-400 leading-none">Efectivo</p>
            <p class="text-[11px] text-gray-600 mt-0.5">Sin Monedero</p>
          </div>

          <!-- ── SEPARADOR HEADER / FILAS (solo desktop) ─ -->
          <div class="hidden sm:block col-span-4 h-px bg-slate-700/60"></div>

          <!-- ── FEATURE ROWS ──────────────────────────── -->
          <template v-for="row in comparisonRows" :key="row.label">

            <!-- Label -->
            <div
              class="bg-slate-800/30 p-2 sm:px-5 sm:py-3 rounded-lg sm:rounded-none flex items-center sm:border-b sm:border-slate-700/40"
              :class="{ 'rounded-bl-xl': row.last }"
            >
              <i :class="`fa-solid ${row.icon} text-brand-purple/80 mr-1.5 sm:mr-3 text-[10px] sm:text-sm w-3 sm:w-4 text-center shrink-0`"></i>
              <span class="font-medium text-gray-300 text-[9px] sm:text-sm leading-tight">{{ row.label }}</span>
            </div>

            <!-- UltraGas -->
            <div
              class="bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 sm:bg-brand-blue/5 p-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-none border border-brand-blue/30 sm:border-0 sm:border-b sm:border-l sm:border-r sm:border-brand-blue/20 flex items-center justify-center"
              :class="{ 'rounded-b-xl sm:rounded-none': row.last }"
            >
              <div class="flex sm:flex-row flex-col items-center gap-0.5 sm:gap-2">
                <i class="fa-solid fa-check-circle text-sm sm:text-base text-green-400"></i>
                <p class="text-[8px] sm:text-xs font-semibold text-green-400 leading-tight">{{ row.ultragas }}</p>
              </div>
            </div>

            <!-- Otros -->
            <div class="bg-slate-800/30 sm:bg-transparent p-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-none border border-slate-700 sm:border-0 sm:border-b sm:border-slate-700/40 flex items-center justify-center">
              <div class="flex sm:flex-row flex-col items-center gap-0.5 sm:gap-2">
                <i :class="`fa-solid ${row.othersIcon} text-sm sm:text-base ${row.othersColor}`"></i>
                <p v-if="row.othersLabel" :class="`text-[8px] sm:text-xs font-medium leading-tight ${row.othersColor}`">{{ row.othersLabel }}</p>
              </div>
            </div>

            <!-- Efectivo (oculto en móvil) -->
            <div class="hidden sm:flex bg-transparent px-4 py-3 rounded-none border-b border-slate-700/30 items-center justify-center">
              <div class="flex items-center gap-2">
                <i class="fa-solid fa-xmark text-base text-red-400/70"></i>
                <p v-if="row.noWalletLabel" class="text-xs font-medium text-red-400/70">{{ row.noWalletLabel }}</p>
              </div>
            </div>

          </template>
        </div>
      </div>

      <!-- CTA -->
      <div class="flex justify-center mt-10 sm:mt-12">
        <button
          @click="openModal('Solicitar Información')"
          class="bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold px-8 py-3.5 sm:px-10 sm:py-4 rounded-full hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base"
        >
          Solicitar Información
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useContactModal } from '../../composables/useContactModal'

const { openModal } = useContactModal()

const comparisonRows = [
  { label: 'Cobertura Nacional', icon: 'fa-map-location-dot', ultragas: '+2,000 Est.', othersIcon: 'fa-circle-half-stroke', othersColor: 'text-yellow-500', othersLabel: 'Limitada' },
  { label: 'App Móvil', icon: 'fa-mobile-screen', ultragas: 'iOS & Android', othersIcon: 'fa-check-circle', othersColor: 'text-gray-500', othersLabel: 'Básica' },
  { label: 'Seguridad', icon: 'fa-shield-halved', ultragas: 'RFID', othersIcon: 'fa-circle-half-stroke', othersColor: 'text-yellow-500', othersLabel: 'Básica' },
  { label: 'Reportes en Tiempo Real', icon: 'fa-chart-line', ultragas: '24 / 7', othersIcon: 'fa-xmark', othersColor: 'text-red-400' },
  { label: 'Integración ERP', icon: 'fa-network-wired', ultragas: 'API Completa', othersIcon: 'fa-xmark', color: 'text-red-400' },
  { label: 'CFDI Automático', icon: 'fa-file-invoice-dollar', ultragas: 'Avalado SAT', othersIcon: 'fa-check-circle', othersColor: 'text-gray-500' },
  { label: 'Control de Fraude', icon: 'fa-lock', ultragas: 'IA Avanzada', othersIcon: 'fa-circle-half-stroke', othersColor: 'text-yellow-500', noWalletLabel: 'Alto Riesgo' },
  { label: 'Soporte', icon: 'fa-headset', ultragas: '24/7 Dedicado', othersIcon: 'fa-check-circle', othersColor: 'text-gray-500', othersLabel: 'Básico', last: true },
]
</script>
