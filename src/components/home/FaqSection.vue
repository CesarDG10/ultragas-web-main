<template>
  <section id="faq" class="pt-14 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28 bg-white relative overflow-hidden">
    <!-- Decoración de fondo -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-radial from-brand-purple/5 to-transparent"></div>
    </div>

    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Cabecera -->
      <div class="text-center mb-10 sm:mb-14">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 border border-brand-purple/20 mb-4 sm:mb-5">
          <i class="fa-solid fa-circle-question text-brand-purple text-xs sm:text-sm"></i>
          <span class="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-brand-purple">Preguntas Frecuentes</span>
        </div>
        <h2 class="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight">
          Todo lo que necesitas<br class="hidden sm:block">
          <span class="gradient-text-brand"> saber</span>
        </h2>
        <p class="text-gray-500 text-sm sm:text-lg mt-3 sm:mt-4 max-w-2xl mx-auto">
          Resolvemos las dudas más comunes sobre UltraGas y la Control Card.
        </p>
      </div>

      <!-- Contenido: acordeón + tarjeta de contacto -->
      <div class="max-w-6xl mx-auto grid md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">

        <!-- Acordeón -->
        <div class="space-y-3">
          <div
            v-for="(item, index) in faq"
            :key="index"
            class="border rounded-2xl overflow-hidden transition-all duration-200"
            :class="openIndex === index
              ? 'bg-white border-brand-purple/30 shadow-lg shadow-brand-purple/5'
              : 'bg-slate-50 border-slate-200 hover:border-slate-300'"
          >
            <button
              class="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left"
              @click="openIndex = openIndex === index ? null : index"
            >
              <span class="font-semibold text-slate-900 text-sm sm:text-base leading-snug">{{ item.q }}</span>
              <span
                class="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                :class="openIndex === index
                  ? 'bg-brand-purple text-white rotate-45'
                  : 'bg-white text-slate-400 border border-slate-200'"
              >
                <i class="fa-solid fa-plus text-xs"></i>
              </span>
            </button>
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-1"
            >
              <div v-if="openIndex === index" class="px-5 pb-5 sm:px-6 sm:pb-6">
                <p class="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">{{ item.a }}</p>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Tarjeta de contacto -->
        <div class="md:sticky md:top-24 lg:top-28">
          <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 md:p-7 lg:p-8 text-white relative overflow-hidden shadow-2xl">
            <div class="absolute -top-10 -right-10 w-40 h-40 bg-brand-purple/20 rounded-full blur-3xl pointer-events-none"></div>
            <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl pointer-events-none"></div>
            <div class="relative z-10">
              <div class="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-purple rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                <i class="fa-solid fa-headset text-white text-xl"></i>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold mb-2">¿Tienes más dudas?</h3>
              <p class="text-slate-400 text-sm leading-relaxed mb-6">
                Uno de nuestros asesores te contactará en menos de 24 horas para resolver cualquier pregunta.
              </p>
              <button
                @click="openModal('FAQ - Solicitar información')"
                class="w-full bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold py-3.5 rounded-xl hover:shadow-lg hover:shadow-brand-purple/30 hover:-translate-y-0.5 transition-all duration-300 text-sm mb-3"
              >
                Solicitar información
              </button>
              <RouterLink
                to="/cobertura"
                class="w-full flex items-center justify-center gap-2 border border-slate-700 text-slate-300 font-semibold py-3.5 rounded-xl hover:border-brand-blue/50 hover:text-white transition-all duration-300 text-sm"
              >
                <i class="fa-solid fa-map-location-dot text-xs"></i>
                Ver cobertura
              </RouterLink>
              <!-- Stats rápidos -->
              <div class="grid grid-cols-2 gap-3 mt-6 pt-6 border-t border-slate-700/50">
                <div class="text-center">
                  <p class="text-2xl font-black gradient-text-brand">2,000+</p>
                  <p class="text-xs text-slate-500 mt-0.5">Estaciones</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-black gradient-text-brand">24/7</p>
                  <p class="text-xs text-slate-500 mt-0.5">Soporte</p>
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
import { ref } from 'vue'
import { useContactModal } from '../../composables/useContactModal'

const { openModal } = useContactModal()
const openIndex = ref(null)

const faq = [
  {
    q: '¿Para quién es UltraGas?',
    a: 'UltraGas está diseñado para cualquier empresa que administre una flotilla de vehículos y requiera controlar, registrar y deducir fiscalmente el gasto en combustible. Desde pequeñas empresas con 3 unidades hasta grandes corporativos con cientos de vehículos.',
  },
  {
    q: '¿Cómo funciona la tarjeta Control Card?',
    a: 'La Control Card es una tarjeta RFID que se asigna a cada unidad o conductor. Al llegar a cualquier estación afiliada, el operador la acerca al terminal y el sistema valida la transacción en tiempo real, descontando el monto del saldo de la cuenta correspondiente.',
  },
  {
    q: '¿En cuántas estaciones puedo cargar combustible?',
    a: 'Contamos con una red de más de 2,000 estaciones de servicio afiliadas distribuidas a lo largo de todo el territorio nacional. Puedes consultar las estaciones disponibles en nuestra sección de Cobertura.',
  },
  {
    q: '¿Cómo se factura el combustible con UltraGas?',
    a: 'UltraGas emite un CFDI mensual a nombre de tu empresa, desglosando todos los consumos de combustible. La factura incluye el detalle de cada carga: fecha, estación, litros y precio unitario. Con este documento los consumos son 100% deducibles ante el SAT.',
  },
  {
    q: '¿Puedo establecer límites o restricciones por tarjeta?',
    a: 'Sí. Desde el portal de administración puedes configurar límites de gasto diario o semanal, tipos de combustible permitidos, días y horarios de uso, y bloquear o activar tarjetas de manera inmediata desde el portal web o la app móvil.',
  },
  {
    q: '¿Qué pasa si un conductor extravía su tarjeta?',
    a: 'Puedes bloquear la tarjeta de forma inmediata desde la app móvil o el portal web en cualquier momento. Una vez bloqueada, ninguna transacción puede realizarse con esa tarjeta, y puedes solicitar una tarjeta de reposición.',
  },
  {
    q: '¿UltraGas se integra con mi sistema ERP o contabilidad?',
    a: 'Sí. Ofrecemos una API REST que permite sincronizar datos de consumo y facturación con sistemas como SAP, Oracle o cualquier ERP que soporte integración vía API. También exportamos reportes en formatos estándar (Excel, CSV, XML).',
  },
  {
    q: '¿Cuánto tiempo tarda la implementación?',
    a: 'El proceso de alta y configuración inicial suele tomar entre 3 y 5 días hábiles, incluyendo la entrega de tarjetas, configuración del portal y capacitación al equipo administrador. Para flotillas grandes con integración ERP, el tiempo puede extenderse según los requerimientos técnicos.',
  },
]
</script>
