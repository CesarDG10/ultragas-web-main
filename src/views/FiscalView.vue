<template>
  <div class="bg-slate-50 text-slate-900">
    <AppHeader />

    <main>
      <!-- Hero Section -->
      <section class="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-28 sm:pt-32 lg:pt-36 pb-20 lg:pb-28 overflow-hidden">
        <!-- Background decoration -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <!-- Breadcrumb -->
          <div class="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <RouterLink to="/" class="hover:text-white transition-colors">Inicio</RouterLink>
            <i class="fa-solid fa-chevron-right text-xs text-slate-600"></i>
            <span class="text-white font-medium">Fiscal</span>
          </div>

          <div class="max-w-3xl">
            <div class="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple border border-brand-purple/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <i class="fa-solid fa-file-invoice-dollar text-xs"></i>
              Cumplimiento Fiscal
            </div>
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Esquema <span class="gradient-text-brand">Fiscal</span><br class="hidden sm:block" />
              Ultra Gas
            </h1>
            <p class="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl">
              Esquema fiscal de adquisición de combustible con el monedero Ultra Gas. Facturación electrónica (CFDI) con complemento de estado de cuenta para deducibilidad total.
            </p>
          </div>

          <!-- Stats row -->
          <div class="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
              <div class="text-3xl font-extrabold gradient-text-brand mb-1">100%</div>
              <div class="text-sm text-slate-300">Deducible</div>
            </div>
            <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
              <div class="text-3xl font-extrabold gradient-text-brand mb-1">CFDI</div>
              <div class="text-sm text-slate-300">Factura electrónica</div>
            </div>
            <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
              <div class="text-3xl font-extrabold gradient-text-brand mb-1">SAT</div>
              <div class="text-sm text-slate-300">Cumplimiento</div>
            </div>
            <div class="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
              <div class="text-3xl font-extrabold gradient-text-brand mb-1">DIOT</div>
              <div class="text-sm text-slate-300">Compatible</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Process Section -->
      <section class="py-20 lg:py-28 bg-white">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Section header -->
          <div class="text-center mb-14">
            <span class="inline-block text-brand-purple font-bold text-sm tracking-widest uppercase mb-4">Proceso</span>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4">
              Cliente –
              <span class="gradient-text-brand">Ultra Gas</span>
              – Estación de servicio
            </h2>
            <p class="text-slate-500 text-lg max-w-2xl mx-auto">
              Conoce cómo funciona el flujo fiscal completo de adquisición de combustible con el monedero Ultra Gas.
            </p>
          </div>

          <!-- Diagram image -->
          <div class="flex justify-center mb-16">
            <div class="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl max-w-2xl w-full">
              <img
                src="https://www.ultragas.com.mx/wp-content/uploads/2020/09/Diagrama-Fiscal4-01-600x540.png"
                alt="Diagrama del esquema fiscal Ultra Gas – relación entre Cliente, Ultra Gas y Estación de Servicio"
                class="w-full h-auto rounded-xl"
                loading="lazy"
              />
            </div>
          </div>

          <!-- Steps grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Paso 1 -->
            <div class="group relative bg-slate-50 hover:bg-white border border-slate-200 hover:border-brand-purple/30 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:shadow-brand-purple/10 hover:-translate-y-1">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-purple/20">
                  <span class="text-white font-extrabold text-lg">1</span>
                </div>
                <h3 class="text-xl font-bold text-slate-900">Paso 1</h3>
              </div>
              <p class="text-slate-600 leading-relaxed">
                El cliente adquiere combustible pagando con el monedero Ultra Gas a la estación de servicio.
              </p>
              <div class="mt-5 pt-5 border-t border-slate-200 flex items-center gap-2 text-sm font-semibold text-brand-purple">
                <i class="fa-solid fa-gas-pump text-xs"></i>
                Carga de combustible
              </div>
            </div>

            <!-- Paso 2 -->
            <div class="group relative bg-slate-50 hover:bg-white border border-slate-200 hover:border-brand-purple/30 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:shadow-brand-purple/10 hover:-translate-y-1">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-purple/20">
                  <span class="text-white font-extrabold text-lg">2</span>
                </div>
                <h3 class="text-xl font-bold text-slate-900">Paso 2</h3>
              </div>
              <p class="text-slate-600 leading-relaxed">
                Ultra Gas le entrega al cliente la factura (CFDI de ingresos) desglosando la comisión y los consumos de combustibles, con un complemento de estado de cuenta de combustibles. El complemento detalla la información de todas las cargas realizadas en las estaciones de servicio.
              </p>
              <div class="mt-5 pt-5 border-t border-slate-200 flex items-center gap-2 text-sm font-semibold text-brand-purple">
                <i class="fa-solid fa-file-invoice-dollar text-xs"></i>
                CFDI de ingresos
              </div>
            </div>

            <!-- Paso 3 -->
            <div class="group relative bg-slate-50 hover:bg-white border border-slate-200 hover:border-brand-purple/30 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:shadow-brand-purple/10 hover:-translate-y-1">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-purple/20">
                  <span class="text-white font-extrabold text-lg">3</span>
                </div>
                <h3 class="text-xl font-bold text-slate-900">Paso 3</h3>
              </div>
              <p class="text-slate-600 leading-relaxed">
                Con esta factura y su complemento de estado de cuenta, el cliente hace deducibles los consumos de combustibles.
              </p>
              <div class="mt-5 pt-5 border-t border-slate-200 flex items-center gap-2 text-sm font-semibold text-brand-purple">
                <i class="fa-solid fa-circle-check text-xs"></i>
                Deducción fiscal
              </div>
            </div>

            <!-- Paso 4 -->
            <div class="group relative bg-slate-50 hover:bg-white border border-slate-200 hover:border-brand-purple/30 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:shadow-brand-purple/10 hover:-translate-y-1">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-purple/20">
                  <span class="text-white font-extrabold text-lg">4</span>
                </div>
                <h3 class="text-xl font-bold text-slate-900">Paso 4</h3>
              </div>
              <p class="text-slate-600 leading-relaxed">
                Ultra Gas le entrega a la estación de servicio la factura (CFDI de egresos) semanal con el detalle de los consumos.
              </p>
              <div class="mt-5 pt-5 border-t border-slate-200 flex items-center gap-2 text-sm font-semibold text-brand-purple">
                <i class="fa-solid fa-receipt text-xs"></i>
                CFDI de egresos
              </div>
            </div>

            <!-- Paso 5 -->
            <div class="group relative bg-slate-50 hover:bg-white border border-slate-200 hover:border-brand-purple/30 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:shadow-brand-purple/10 hover:-translate-y-1 sm:col-span-2 lg:col-span-2">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-purple/20">
                  <span class="text-white font-extrabold text-lg">5</span>
                </div>
                <h3 class="text-xl font-bold text-slate-900">Paso 5</h3>
              </div>
              <p class="text-slate-600 leading-relaxed">
                La estación de servicio elabora una factura (CFDI de ingresos) al público en general con los consumos en la estación en forma semanal, por lo que la estación de servicio <strong class="text-slate-800">no debe facturar al cliente los consumos realizados</strong>.
              </p>
              <div class="mt-5 pt-5 border-t border-slate-200 flex items-center gap-2 text-sm font-semibold text-brand-purple">
                <i class="fa-solid fa-building text-xs"></i>
                Facturación de la estación
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Invoice Example Section -->
      <section class="py-20 lg:py-28 bg-slate-50">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <!-- Text column -->
            <div>
              <span class="inline-block text-brand-purple font-bold text-sm tracking-widest uppercase mb-4">Facturación</span>
              <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
                Ejemplo de <span class="gradient-text-brand">factura</span><br />
                con complemento de<br />estado de cuenta
              </h2>
              <p class="text-slate-600 text-lg leading-relaxed mb-8">
                Es importante considerar que los proveedores de combustible son las estaciones de servicio relacionadas en el complemento de estado de cuenta, los cuales se deberán relacionar con RFC y el IVA correspondiente en el formato <strong class="text-slate-800">DIOT</strong> (Declaración informativa de operaciones con terceros).
              </p>

              <!-- Key features -->
              <div class="space-y-4">
                <div class="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center flex-shrink-0">
                    <i class="fa-solid fa-file-lines text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 mb-1">CFDI con complemento</h4>
                    <p class="text-sm text-slate-500">Factura electrónica que incluye el complemento de estado de cuenta de combustibles, detallando cada carga realizada.</p>
                  </div>
                </div>
                <div class="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center flex-shrink-0">
                    <i class="fa-solid fa-building-columns text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 mb-1">Declaración DIOT</h4>
                    <p class="text-sm text-slate-500">Las estaciones de servicio aparecen con su RFC en el complemento, facilitando el llenado de la Declaración Informativa de Operaciones con Terceros.</p>
                  </div>
                </div>
                <div class="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center flex-shrink-0">
                    <i class="fa-solid fa-percent text-white text-sm"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-900 mb-1">IVA desglosado</h4>
                    <p class="text-sm text-slate-500">El IVA correspondiente se desglosa correctamente en la factura para efectos de acreditamiento ante el SAT.</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Image column -->
            <div class="flex justify-center lg:justify-end">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-purple/20 rounded-3xl blur-2xl scale-110"></div>
                <div class="relative bg-white rounded-3xl shadow-2xl p-4 border border-slate-200">
                  <img
                    src="https://www.ultragas.com.mx/wp-content/uploads/2020/09/Factura-UG2-01.png"
                    alt="Ejemplo de factura CFDI Ultra Gas con complemento de estado de cuenta de combustibles"
                    class="w-full max-w-md h-auto rounded-xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits Section -->
      <section class="py-20 lg:py-24 bg-white">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-14">
            <span class="inline-block text-brand-purple font-bold text-sm tracking-widest uppercase mb-4">Beneficios</span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
              ¿Por qué elegir Ultra Gas para tu <span class="gradient-text-brand">gestión fiscal</span>?
            </h2>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="text-center p-6">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand-purple/20">
                <i class="fa-solid fa-shield-halved text-white text-xl"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">Cumplimiento SAT</h3>
              <p class="text-slate-500 text-sm leading-relaxed">Facturación 100% alineada a los requisitos del SAT para la deducción de combustibles.</p>
            </div>
            <div class="text-center p-6">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand-purple/20">
                <i class="fa-solid fa-chart-line text-white text-xl"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">Control total</h3>
              <p class="text-slate-500 text-sm leading-relaxed">Estado de cuenta detallado de todas las cargas realizadas en cualquier estación afiliada.</p>
            </div>
            <div class="text-center p-6">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand-purple/20">
                <i class="fa-solid fa-clock-rotate-left text-white text-xl"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">Ahorro de tiempo</h3>
              <p class="text-slate-500 text-sm leading-relaxed">Un solo CFDI consolida todos los consumos del periodo, eliminando la gestión de múltiples facturas.</p>
            </div>
            <div class="text-center p-6">
              <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center mx-auto mb-5 shadow-lg shadow-brand-purple/20">
                <i class="fa-solid fa-money-bill-trend-up text-white text-xl"></i>
              </div>
              <h3 class="text-lg font-bold text-slate-900 mb-3">Máxima deducción</h3>
              <p class="text-slate-500 text-sm leading-relaxed">Deduce el 100% de tus consumos de combustible con la documentación fiscal correcta y completa.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="py-20 lg:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/15 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
          <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/15 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>
        </div>
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            ¡Mejora el proceso de consumo<br class="hidden sm:block" />
            de combustible ahora!
          </h2>
          <p class="text-xl text-slate-300 mb-10 max-w-xl mx-auto">
            Contáctanos y en menos de 24 horas nos pondremos en contacto contigo.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              @click="openModal('Fiscal - Solicitar información')"
              class="bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold px-10 py-4 rounded-full hover:shadow-2xl hover:shadow-brand-purple/40 hover:-translate-y-1 transition-all duration-300 text-lg"
            >
              Solicitar información
            </button>
            <RouterLink
              to="/cobertura"
              class="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 text-lg"
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
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import { useContactModal } from '../composables/useContactModal'

const { openModal } = useContactModal()
</script>
