<template>
  <div class="bg-slate-50 text-slate-900">
    <AppHeader />

    <main>
      <!-- ─── HERO + VIDEO ──────────────────────────────────────────────────── -->
      <section class="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-28 sm:pt-32 lg:pt-36 pb-8 overflow-x-hidden">
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-0 right-0 w-[700px] h-[700px] bg-brand-purple/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <!-- Breadcrumb -->
          <div class="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <RouterLink to="/" class="hover:text-white transition-colors">Inicio</RouterLink>
            <i class="fa-solid fa-chevron-right text-xs text-slate-600"></i>
            <span class="text-white font-medium">¿Qué es Ultra Gas?</span>
          </div>

          <!-- Heading -->
          <div class="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
              ¿Qué es <span class="gradient-text-brand">Ultra Gas</span>?
            </h1>
            <p class="text-lg text-slate-400 leading-relaxed">
              Mira el video y descubre cómo funciona nuestra solución de control de combustible.
            </p>
          </div>

          <!-- VIDEO PRINCIPAL -->
          <div class="relative max-w-4xl mx-auto">
            <div class="absolute inset-0 bg-gradient-to-r from-brand-blue/30 to-brand-purple/30 rounded-3xl blur-2xl scale-105"></div>
            <div class="relative rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <div
                v-if="!videoPlaying"
                class="relative cursor-pointer group aspect-video bg-slate-900"
                @click="videoPlaying = true"
              >
                <img
                  src="/images/ultragas-video-poster.svg"
                  alt="Video explicativo ¿Qué es Ultra Gas? – Control de combustible para flotillas"
                  class="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/10"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="relative">
                    <div class="absolute inset-0 bg-brand-purple/40 rounded-full blur-2xl scale-150 group-hover:scale-175 transition-transform duration-500"></div>
                    <div class="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                      <i class="fa-solid fa-play text-brand-purple text-3xl sm:text-4xl ml-2"></i>
                    </div>
                  </div>
                </div>
                <div class="absolute bottom-5 left-0 right-0 flex justify-center">
                  <span class="bg-black/60 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2 rounded-full border border-white/10">
                    <i class="fa-brands fa-youtube text-red-500 mr-2"></i>
                    Ver video completo
                  </span>
                </div>
              </div>
              <div v-else class="aspect-video bg-slate-900">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/23yagESFh0M?autoplay=1&rel=0"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="w-full h-full"
                  title="¿Qué es Ultra Gas? - Control de combustible para flotillas en México"
                ></iframe>
              </div>
            </div>
          </div>

          <!-- Stats pill that bleeds into next section -->
          <div class="relative -mb-14 mt-10 max-w-3xl mx-auto z-10">
            <div class="bg-white rounded-2xl shadow-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100">
              <div class="py-4 px-5 text-center">
                <div class="text-2xl font-extrabold gradient-text-brand">+6,000</div>
                <div class="text-xs text-slate-500 mt-0.5">Clientes activos</div>
              </div>
              <div class="py-4 px-5 text-center">
                <div class="text-2xl font-extrabold gradient-text-brand">+2,000</div>
                <div class="text-xs text-slate-500 mt-0.5">Estaciones afiliadas</div>
              </div>
              <div class="py-4 px-5 text-center">
                <div class="text-2xl font-extrabold gradient-text-brand">99.9%</div>
                <div class="text-xs text-slate-500 mt-0.5">Uptime garantizado</div>
              </div>
              <div class="py-4 px-5 text-center">
                <div class="text-2xl font-extrabold gradient-text-brand">24/7</div>
                <div class="text-xs text-slate-500 mt-0.5">Soporte experto</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── QUÉ ES (COMPACTO) ─────────────────────────────────────────────── -->
      <section class="pt-20 pb-16 bg-white">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-3xl mx-auto text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-5">
              El monedero inteligente para<br class="hidden sm:block" /> el control de tu <span class="gradient-text-brand">flotilla</span>
            </h2>
            <p class="text-slate-600 text-lg leading-relaxed">
              Ultra Gas es una plataforma que permite a las empresas administrar el combustible de su flotilla a través de una <strong class="text-slate-800">tarjeta RFID (Control Card)</strong>. Los conductores cargan en más de 2,000 estaciones afiliadas sin manejar efectivo, mientras el administrador tiene visibilidad total de cada transacción desde el portal web o la app móvil.
            </p>
          </div>

          <!-- 4 pilares compactos -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div class="flex flex-col items-center text-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mb-3 shadow-md shadow-brand-purple/20">
                <i class="fa-solid fa-credit-card text-white"></i>
              </div>
              <span class="text-sm font-bold text-slate-800">Tarjeta RFID</span>
              <span class="text-xs text-slate-500 mt-1">Sin efectivo en la flotilla</span>
            </div>
            <div class="flex flex-col items-center text-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mb-3 shadow-md shadow-brand-purple/20">
                <i class="fa-solid fa-chart-line text-white"></i>
              </div>
              <span class="text-sm font-bold text-slate-800">Tiempo real</span>
              <span class="text-xs text-slate-500 mt-1">Visibilidad de cada carga</span>
            </div>
            <div class="flex flex-col items-center text-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mb-3 shadow-md shadow-brand-purple/20">
                <i class="fa-solid fa-file-invoice-dollar text-white"></i>
              </div>
              <span class="text-sm font-bold text-slate-800">CFDI incluido</span>
              <span class="text-xs text-slate-500 mt-1">100% deducible ante el SAT</span>
            </div>
            <div class="flex flex-col items-center text-center p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <div class="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mb-3 shadow-md shadow-brand-purple/20">
                <i class="fa-solid fa-location-dot text-white"></i>
              </div>
              <span class="text-sm font-bold text-slate-800">Cobertura nacional</span>
              <span class="text-xs text-slate-500 mt-1">+2,000 estaciones en México</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── PREGUNTAS FRECUENTES ───────────────────────────────────────────── -->
      <section class="py-16 lg:py-24 bg-slate-50">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div class="max-w-2xl mx-auto">
            <div class="text-center mb-10">
              <span class="inline-block text-brand-purple font-bold text-sm tracking-widest uppercase mb-3">FAQ</span>
              <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900">Preguntas frecuentes</h2>
            </div>

            <div class="space-y-3">
              <div
                v-for="(item, index) in faq"
                :key="index"
                class="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
                :class="{ 'shadow-md border-brand-purple/30': openIndex === index }"
              >
                <button
                  class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  @click="openIndex = openIndex === index ? null : index"
                >
                  <span class="font-semibold text-slate-900 text-base leading-snug">{{ item.q }}</span>
                  <span
                    class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                    :class="openIndex === index ? 'bg-brand-purple text-white rotate-45' : 'bg-slate-100 text-slate-500'"
                  >
                    <i class="fa-solid fa-plus text-xs"></i>
                  </span>
                </button>
                <div
                  v-show="openIndex === index"
                  class="px-6 pb-5"
                >
                  <p class="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">{{ item.a }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ─── CTA ───────────────────────────────────────────────────────────── -->
      <section class="py-16 bg-white">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">¿Tienes más preguntas?</h2>
          <p class="text-slate-500 mb-8 max-w-md mx-auto">Uno de nuestros asesores te contactará en menos de 24 horas para resolver todas tus dudas.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="openModal('¿Qué es Ultra Gas? - Solicitar info')"
              class="bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold px-8 py-4 rounded-full hover:shadow-xl hover:shadow-brand-purple/30 hover:-translate-y-1 transition-all duration-300"
            >
              Solicitar información
            </button>
            <RouterLink
              to="/cobertura"
              class="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 font-semibold px-8 py-4 rounded-full hover:border-brand-purple/40 hover:text-brand-purple transition-all duration-300"
            >
              <i class="fa-solid fa-map-location-dot text-sm"></i>
              Ver cobertura
            </RouterLink>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { useContactModal } from '../composables/useContactModal'

const { openModal } = useContactModal()
const videoPlaying = ref(false)
const openIndex = ref(null)

const faq = [
  {
    q: '¿Para quién es Ultra Gas?',
    a: 'Ultra Gas está diseñado para cualquier empresa que administre una flotilla de vehículos y requiera controlar, registrar y deducir fiscalmente el gasto en combustible. Desde pequeñas empresas con 3 unidades hasta grandes corporativos con cientos de vehículos.'
  },
  {
    q: '¿Cómo funciona la tarjeta Control Card?',
    a: 'La Control Card es una tarjeta RFID (identificación por radiofrecuencia) que se asigna a cada unidad o conductor. Al llegar a cualquier estación afiliada, el operador la acerca al terminal y el sistema valida la transacción en tiempo real, descontando el monto del saldo de la cuenta correspondiente.'
  },
  {
    q: '¿En cuántas estaciones puedo cargar combustible?',
    a: 'Contamos con una red de más de 2,000 estaciones de servicio afiliadas distribuidas a lo largo y ancho del territorio nacional. Puedes consultar las estaciones disponibles en nuestra sección de Cobertura.'
  },
  {
    q: '¿Cómo se factura el combustible con Ultra Gas?',
    a: 'Ultra Gas emite un CFDI de ingresos mensual a nombre de tu empresa, desglosando la comisión y todos los consumos de combustible. La factura incluye un complemento de estado de cuenta con el detalle de cada carga: fecha, estación, litros y precio unitario. Con este documento, los consumos son 100% deducibles ante el SAT.'
  },
  {
    q: '¿Puedo establecer límites o restricciones por tarjeta?',
    a: 'Sí. Desde el portal de administración puedes configurar límites de gasto diario o semanal, tipos de combustible permitidos, días y horarios de uso, y bloquear o activar tarjetas de manera inmediata desde el portal web o la app móvil.'
  },
  {
    q: '¿Qué pasa si un conductor extravía su tarjeta?',
    a: 'Puedes bloquear la tarjeta de forma inmediata desde la app móvil o el portal web, en cualquier momento. Una vez bloqueada, ninguna transacción puede realizarse con esa tarjeta. Después puedes solicitar una nueva tarjeta de reposición.'
  },
  {
    q: '¿Ultra Gas se integra con mi sistema ERP o contabilidad?',
    a: 'Sí. Ofrecemos una API REST que permite sincronizar datos de consumo y facturación directamente con sistemas como SAP, Oracle, o cualquier ERP que soporte integración vía API. También exportamos reportes en formatos estándar (Excel, CSV, XML).'
  },
  {
    q: '¿Cuánto tiempo tarda la implementación?',
    a: 'El proceso de alta y configuración inicial suele tomar entre 3 y 5 días hábiles, incluyendo la entrega de tarjetas, la configuración del portal y la capacitación al equipo administrador. Para flotillas grandes con integración ERP, el tiempo puede extenderse según los requerimientos técnicos.'
  }
]
</script>
