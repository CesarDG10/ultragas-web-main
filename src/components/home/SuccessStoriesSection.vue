<template>
  <div class="bg-white py-24 border-b border-gray-100 w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
          Casos de Éxito que inspiran confianza
        </h2>
        <p class="mt-4 text-lg text-slate-500">
          Descubre cómo ayudamos a las industrias y flotillas más grandes del país a optimizar su consumo y asegurar su continuidad operativa.
        </p>
      </div>

      <div 
        ref="carouselRef"
        class="flex overflow-x-auto gap-6 pb-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:gap-8 lg:pb-0 lg:overflow-x-visible"
      >
        <div 
          v-for="(story, index) in stories" 
          :key="index" 
          class="w-[85vw] sm:w-[450px] lg:w-full shrink-0 snap-center bg-slate-50 rounded-2xl border border-slate-100 p-8 flex flex-col justify-between hover:bg-slate-100/70 transition-all duration-300 relative overflow-hidden group"
        >
          <div class="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-bl-full translate-x-6 -translate-y-6 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300"></div>

          <div>
            <div class="text-2xl sm:text-3xl font-black text-blue-600 mb-4 flex flex-wrap items-baseline gap-x-2 tracking-tight">
              {{ story.metric }}
              <span class="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider block">garantizado</span>
            </div>

            <p class="text-slate-600 italic text-base leading-relaxed mb-6 relative z-10">
              "{{ story.quote }}"
            </p>
          </div>

          <div class="flex items-center mt-6 pt-6 border-t border-slate-200/60">
            <div class="h-11 w-11 rounded-full bg-slate-800 text-white font-bold text-sm flex items-center justify-center shrink-0 tracking-wider">
              {{ story.initials }}
            </div>
            <div class="ml-4">
              <h4 class="text-sm font-bold text-slate-900">{{ story.author }}</h4>
              <p class="text-xs text-slate-500 font-medium">
                {{ story.position }} 
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center gap-4 mt-4 lg:hidden">
        <button 
          @click="scrollCarousel('left')"
          class="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 transition-all border border-slate-200"
          aria-label="Anterior testimonio"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          @click="scrollCarousel('right')"
          class="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 transition-all border border-slate-200"
          aria-label="Siguiente testimonio"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const carouselRef = ref(null)

const stories = [
  {
    metric: '-14% en Costos',
    quote: 'Centralizar el suministro de combustible para nuestra flota de distribución redujo drásticamente las fugas de capital. El rendimiento por kilómetro nunca había sido tan transparente.',
    author: 'Ing. Alejandro Gómez',
    position: 'Director de Logística',
    company: 'Flensa',
    initials: 'FL'
  },
  {
    metric: '0 Paros de Planta',
    quote: 'En las plantas de producción no podemos darnos el lujo de parar. Con el servicio programado de UltraGas nos olvidamos de la falta de combustible y aseguramos que la operación ruede sin problemas todo el año.',
    author: 'Lic. Beatriz Mendoza',
    position: 'Gerente de Operaciones',
    company: 'Sigma Alimentos',
    initials: 'SG'
  },
 {
    metric: '100% a Tiempo',
    quote: 'La puntualidad en la entrega de sus facturas y reportes nos ahorró días de trabajo. Todo llega exactamente cuando lo necesitamos para procesar los cierres contables sin contratiempos.',
    author: 'CP. Carlos Villarreal',
    position: 'Contador Técnico',
    company: 'Johnson Controls',
    initials: 'JC'
  }
]


const scrollCarousel = (direction) => {
  if (carouselRef.value) {
    
    const scrollAmount = carouselRef.value.clientWidth * 0.85 
    if (direction === 'left') {
      carouselRef.value.scrollLeft -= scrollAmount
    } else {
      carouselRef.value.scrollLeft += scrollAmount
    }
  }
}
</script>