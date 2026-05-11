<template>
  <section
    id="hero"
    class="relative overflow-hidden bg-white flex items-center tech-bg-circuit min-h-[auto] pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 lg:min-h-[800px] pl-0"
  >
    <!-- Background decorative elements -->
    <div class="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-radial from-purple-100/40 to-transparent rounded-full blur-3xl"></div>
      <div class="absolute top-[20%] -left-[10%] w-[600px] h-[600px] bg-radial from-blue-100/50 to-transparent rounded-full blur-3xl"></div>
    </div>

    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center relative z-10 w-full">
      <!-- Left Content -->
      <div class="space-y-5 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 rounded-full bg-blue-50 border border-blue-100 text-brand-blue text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-sm">
          <span class="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand-blue animate-pulse"></span>
          Tecnología en Control de Flotillas
        </div>

        <h1 class="text-3xl sm:text-4xl lg:text-6xl font-extrabold leading-tight tracking-tight text-brand-dark">
          Control <span class="gradient-text-brand">Inteligente</span> <br>
          para tu Combustible.
        </h1>

        <p class="text-base sm:text-lg lg:text-xl text-gray-600 max-w-lg leading-relaxed">
          La solución tecnológica más avanzada y segura para flotas en México.
          Elimina fugas, optimiza rutas y obtén visibilidad total con nuestra plataforma digital.
        </p>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
          <button
            @click="openModal('Comenzar Ahora')"
            class="bg-gradient-to-r from-brand-blue to-brand-purple text-white text-sm sm:text-base font-bold px-6 py-3.5 sm:px-8 sm:py-4 rounded-full hover:shadow-xl hover:shadow-purple-900/20 hover:-translate-y-1 transition-all w-full sm:w-auto"
          >
            Comenzar Ahora
          </button>
          <button
            @click="openVideo()"
            class="bg-white text-brand-dark border border-gray-200 text-sm sm:text-base font-semibold px-6 py-3.5 sm:px-8 sm:py-4 rounded-full hover:bg-gray-50 transition-all hover:border-brand-purple/30 flex items-center justify-center gap-2 group shadow-sm w-full sm:w-auto"
          >
            <div class="w-7 h-7 sm:w-8 sm:h-8 bg-purple-50 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors">
              <i class="fa-solid fa-play text-brand-purple text-xs"></i>
            </div>
            Ver Video
          </button>
        </div>

        <div class="pt-4 sm:pt-6 border-t border-gray-200 mt-4 sm:mt-6">
          <!-- Móvil: grid 3 columnas compacto -->
          <div class="grid grid-cols-3 sm:hidden gap-3 text-center">
            <div>
              <p class="text-xl font-bold text-brand-dark">+6,000</p>
              <p class="text-[10px] text-gray-500 font-medium leading-tight">Clientes Activos</p>
            </div>
            <div class="border-x border-gray-200">
              <p class="text-xl font-bold text-brand-dark">99.9%</p>
              <p class="text-[10px] text-gray-500 font-medium leading-tight">Uptime</p>
            </div>
            <div>
              <p class="text-xl font-bold text-brand-dark">2,000+</p>
              <p class="text-[10px] text-gray-500 font-medium leading-tight">Estaciones</p>
            </div>
          </div>
          <!-- Tablet/Desktop: fila horizontal con separadores -->
          <div class="hidden sm:flex items-center gap-6 lg:gap-8">
            <div>
              <p class="text-3xl font-bold text-brand-dark">+6,000</p>
              <p class="text-sm text-gray-500 font-medium">Clientes Activos</p>
            </div>
            <div class="w-px h-12 bg-gray-200"></div>
            <div>
              <p class="text-3xl font-bold text-brand-dark">99.9%</p>
              <p class="text-sm text-gray-500 font-medium">Uptime Garantizado</p>
            </div>
            <div class="hidden lg:block w-px h-12 bg-gray-200"></div>
            <div class="hidden lg:block">
              <p class="text-3xl font-bold text-brand-dark">2,000+</p>
              <p class="text-sm text-gray-500 font-medium">Estaciones</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: Card Image -->
      <div class="relative flex justify-center items-center min-h-[200px] sm:min-h-[280px] lg:min-h-0 lg:h-full order-1 lg:order-2">
        <!-- Glow de fondo -->
        <div class="absolute w-[220px] h-[140px] sm:w-[360px] sm:h-[240px] lg:w-[420px] lg:h-[280px] bg-brand-purple/20 blur-3xl rounded-full z-0"></div>

        <!-- Tarjeta -->
        <div
          ref="cardContainer"
          class="relative z-10 animate-[float_6s_ease-in-out_infinite] w-[72%] max-w-[240px] sm:max-w-[340px] lg:w-auto lg:max-w-[500px]"
          style="perspective: 1000px;"
          @mousemove="onCardMove"
          @mouseleave="onCardLeave"
        >
          <img
            ref="card"
            src="/tarjeta-control-card.png"
            alt="UltraGas Control Card"
            class="w-full max-w-full rounded-2xl"
            style="
              transition: transform 0.12s ease;
              transform-style: preserve-3d;
              box-shadow: 0 30px 60px rgba(37, 115, 217, 0.35), 0 0 40px rgba(132, 52, 225, 0.2);
            "
          />
        </div>

        <!-- Badge: Transacción Aprobada — visible desde sm -->
        <div
          class="absolute top-4 -right-1 sm:top-12 sm:right-2 lg:top-20 lg:right-4 bg-white px-3 py-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl animate-[float_6s_ease-in-out_infinite] hidden sm:block z-20"
          style="animation-delay: 1s"
        >
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <i class="fa-solid fa-check text-xs sm:text-base"></i>
            </div>
            <div>
              <p class="text-[9px] sm:text-xs text-gray-500 font-bold uppercase">Transacción Aprobada</p>
              <p class="text-xs sm:text-sm font-bold text-gray-800">$1,250.00 MXN</p>
            </div>
          </div>
        </div>

        <!-- Badge: Litros Cargados — visible desde sm -->
        <div
          class="absolute bottom-4 -left-1 sm:bottom-12 sm:left-2 lg:bottom-20 lg:left-4 bg-white px-3 py-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl animate-[float_6s_ease-in-out_infinite] hidden sm:block z-20"
          style="animation-delay: 2s"
        >
          <div class="flex items-center gap-2 sm:gap-3">
            <div class="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center text-brand-blue">
              <i class="fa-solid fa-gas-pump text-xs sm:text-base"></i>
            </div>
            <div>
              <p class="text-[9px] sm:text-xs text-gray-500 font-bold uppercase">Litros Cargados</p>
              <p class="text-xs sm:text-sm font-bold text-gray-800">55.4 L</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useContactModal } from '../../composables/useContactModal'
import { useVideoModal } from '../../composables/useVideoModal'

const { openModal } = useContactModal()
const { openVideo } = useVideoModal()

const card = ref(null)
const cardContainer = ref(null)

function onCardMove(e) {
  if (!card.value || !cardContainer.value) return
  const rect = cardContainer.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = (y - centerY) / 10
  const rotateY = (centerX - x) / 10
  card.value.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

function onCardLeave() {
  if (card.value) card.value.style.transform = 'rotateX(0) rotateY(0)'
}

</script>
