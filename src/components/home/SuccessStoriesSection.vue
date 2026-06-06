<template>
  <div class="bg-white py-20 border-b border-gray-100 w-full">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      
      <div class="text-center max-w-3xl mx-auto mb-12">
        <h2 class="text-2xl font-extrabold text-slate-900 sm:text-3xl tracking-tight">
          Casos de éxito que inspiran confianza
        </h2>
        <p class="mt-3 text-base text-slate-500">
          Descubre cómo ayudamos a las industrias y flotillas más grandes del país a optimizar su consumo y asegurar su continuidad operativa.
        </p>
      </div>

     
      <div 
        ref="carouselRef"
        class="flex overflow-x-auto gap-5 pb-6 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory lg:grid lg:grid-cols-3 lg:gap-6 lg:pb-0 lg:overflow-x-visible"
      >
     
        <div 
          v-for="(story, index) in stories" 
          :key="index" 
          class="w-[85vw] sm:w-[420px] lg:w-full shrink-0 snap-center bg-slate-50 rounded-xl border border-slate-100 p-6 flex flex-col justify-between hover:bg-slate-100/70 transition-all duration-300 relative overflow-hidden group"
        >
          <div class="absolute top-0 right-0 w-20 h-20 bg-blue-600/5 rounded-bl-full translate-x-6 -translate-y-6 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-300"></div>

          <div>
            
            <div class="flex items-center gap-0.5 mb-3">
              <svg v-for="i in 5" :key="i" class="w-3.5 h-3.5 text-amber-400 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
            </div>

            
            <div class="text-xl sm:text-2xl font-black text-blue-600 mb-2 flex flex-wrap items-baseline gap-x-1.5 tracking-tight">
              {{ story.metric }}
              <span class="text-[9px] font-semibold text-slate-400 uppercase tracking-wider block"></span>
            </div>

            <p class="text-slate-600 italic text-[13px] sm:text-sm leading-relaxed mb-0 relative z-10">
              "{{ story.quote }}"
            </p>
          </div>

          <!-- Firma del Cliente Compacta en un solo bloque -->
          <div class="flex items-center mt-5 pt-4 border-t border-slate-200/50 w-full">
            <div class="h-9 w-9 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0 tracking-wider">
              {{ story.initials }}
            </div>
            <div class="ml-3 min-w-0">
              <h4 class="text-xs font-bold text-slate-900 truncate">{{ story.author }}</h4>
              <p class="text-[11px] text-slate-500 font-medium truncate leading-normal">
                {{ story.position }} <br> en <span class="font-semibold text-blue-600">{{ story.company }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Controles del Carrusel Móvil -->
      <div class="flex items-center justify-center gap-4 mt-6 lg:hidden">
        <button 
          @click="scrollCarousel('left')"
          class="p-2.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 transition-all border border-slate-200"
          aria-label="Anterior testimonio"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          @click="scrollCarousel('right')"
          class="p-2.5 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 transition-all border border-slate-200"
          aria-label="Siguiente testimonio"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
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
    metric: '-34% en gastos de combustible', 
    quote: 'Antes de UltraGas, teníamos conductores que pagaban el combustible con efectivo y las cuentas nunca cuadraban al final del mes. Llevábamos meses buscando una solución que nos diera visibilidad real sin complicar la operación. Desde que implementamos Ultra Gas, cada litro queda registrado en tiempo real y los reportes llegan solos al sistema. Recuperamos el control sin agregar más trabajo administrativo.',
    author: 'Ing. Carlos Mendoza Ríos',
    position: 'Gerente de Flotilla y Logística',
    company: 'Líder en la Industria de Alimentos y Consumo',
    initials: 'CM' 
  },
  {
    metric: '0 errores en facturación y conciliación ',
    quote: 'Lo que más nos convenció fue la facturación centralizada. Antes recibíamos tickets de diferentes estaciones, en diferentes formatos y con errores frecuentes al momento de la deducción fiscal. Hoy recibimos un solo CFDI mensual, validado ante el SAT, con el detalle exacto de cada carga por unidad y conductor. Eso no tiene precio en temporada de cierre. Y si alguna tarjeta se pierde, la bloqueamos desde la app en segundos.',
    author: 'CP. Jorge Alvarado Montoya',
    position: 'Gerente de Tesorería y Control de Gastos',
    company: 'Cadena Líder de Retail y Supermercados en México',
    initials: 'JA'
  },
  {
    metric: '0 incidentes por falta de combustible',
    quote: 'En nuestra operación no hay margen para imprevistos: si un camión se queda sin combustible, perdemos toda la carga. Con Ultra Gas tenemos límites configurados por unidad, alertas en tiempo real y la tranquilidad de que en cualquiera de las 2,000 estaciones afiliadas nuestros operadores pueden recargar sin efectivo. La integración con nuestro ERP fue más rápida de lo que esperábamos y hoy tenemos todo centralizado.',
    author: 'Lic. Adriana Fuentes Vega',
    position: 'Directora de Operaciones — Zona Norte',
    company: 'Productora Multinacional de Alimentos y Proteínas',
    initials: 'AF'
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