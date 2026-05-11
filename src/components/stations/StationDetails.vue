<template>
  <Transition name="slide">
    <div
      v-if="visible"
      class="absolute z-40 top-0 right-0 h-full w-full md:w-[420px] bg-gradient-to-b from-white to-slate-50 shadow-2xl flex flex-col border-l border-gray-200"
    >
      <!-- Header -->
      <div class="p-6 pb-4 flex-none border-b border-gray-100 bg-white">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold gradient-text-brand">Detalles de la Estación</h2>
          <button @click="$emit('close')" class="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <i class="fa-solid fa-xmark text-gray-500 text-lg"></i>
          </button>
        </div>
        <h1 class="text-2xl font-bold text-brand-dark mb-2">{{ station.name }}</h1>
        <div class="flex items-center gap-3 mb-4">
          <span class="inline-flex items-center px-3 py-1.5 rounded-xl bg-blue-50 text-xs font-bold text-brand-blue border border-blue-100">
            {{ station.permit }}
            <i class="fa-regular fa-copy ml-2 cursor-pointer hover:text-brand-purple transition-colors"></i>
          </span>
          <span class="text-xs text-gray-500 font-medium">Folio: {{ station.folio }}</span>
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto sidebar-scroll p-6 pt-4">
        <!-- Address -->
        <div class="mb-6">
          <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <i class="fa-solid fa-location-dot text-brand-blue"></i>
            Dirección
          </p>
          <p class="text-sm text-gray-700 leading-relaxed mb-4 bg-white p-4 rounded-xl border border-gray-100">
            {{ station.address }}
          </p>
          <button class="bg-white border-2 border-brand-blue text-brand-blue hover:bg-blue-50 text-sm font-bold py-3 px-4 rounded-2xl shadow-sm transition-all flex items-center gap-2 w-full justify-center hover:-translate-y-0.5">
            <i class="fa-solid fa-location-arrow"></i>
            Cómo llegar
          </button>
        </div>

        <!-- Prices -->
        <div class="mb-8">
          <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <i class="fa-solid fa-dollar-sign text-brand-purple"></i>
            Precios Actuales
          </p>
          <div class="grid grid-cols-2 gap-3 mb-3">
            <div class="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden cursor-pointer hover:shadow-xl transition-all">
              <div class="absolute -right-4 -top-4 w-20 h-20 bg-white opacity-10 rounded-full"></div>
              <div class="relative z-10">
                <span class="text-xs font-bold tracking-wider opacity-90 block mb-2">PREMIUM</span>
                <div class="flex items-baseline mb-1">
                  <span class="text-lg font-bold">$</span>
                  <span class="text-4xl font-bold tracking-tight">{{ station.prices.premium.int }}</span>
                  <span class="text-lg font-bold">.{{ station.prices.premium.dec }}</span>
                </div>
                <div class="text-xs opacity-80 font-medium">por litro</div>
              </div>
            </div>
            <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden cursor-pointer hover:shadow-xl transition-all">
              <div class="absolute -right-4 -top-4 w-20 h-20 bg-white opacity-10 rounded-full"></div>
              <div class="relative z-10">
                <span class="text-xs font-bold tracking-wider opacity-90 block mb-2">MAGNA</span>
                <div class="flex items-baseline mb-1">
                  <span class="text-lg font-bold">$</span>
                  <span class="text-4xl font-bold tracking-tight">{{ station.prices.magna.int }}</span>
                  <span class="text-lg font-bold">.{{ station.prices.magna.dec }}</span>
                </div>
                <div class="text-xs opacity-80 font-medium">por litro</div>
              </div>
            </div>
          </div>
          <div class="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden cursor-pointer hover:shadow-xl transition-all mb-6">
            <div class="absolute -right-8 -top-8 w-32 h-32 bg-white opacity-5 rounded-full"></div>
            <div class="relative z-10 flex flex-col items-center">
              <span class="text-xs font-bold tracking-wider opacity-90 mb-2">DIESEL</span>
              <div class="flex items-baseline">
                <span class="text-lg font-bold">$</span>
                <span class="text-4xl font-bold tracking-tight">{{ station.prices.diesel.int }}</span>
                <span class="text-lg font-bold">.{{ station.prices.diesel.dec }}</span>
              </div>
              <div class="text-xs opacity-80 font-medium mt-1">por litro</div>
            </div>
          </div>

          <!-- Disclaimer -->
          <div class="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-2xl p-4 mb-8">
            <div class="flex items-start gap-3">
              <i class="fa-solid fa-info-circle text-orange-500 text-lg mt-0.5"></i>
              <div>
                <p class="text-xs text-orange-800 font-semibold mb-2">
                  Precios, amenidades y Diésel UBA son referenciales y pueden variar al momento de la visita.
                </p>
                <p class="text-[10px] text-orange-600 font-medium">
                  Actualizados: {{ station.updatedAt }}
                </p>
              </div>
            </div>
          </div>

          <!-- Amenities -->
          <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <i class="fa-solid fa-star text-brand-purple"></i>
            Amenidades
          </p>
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="amenity in station.amenities"
              :key="amenity.label"
              :class="`bg-gradient-to-br ${amenity.bgGradient} rounded-2xl p-4 flex items-center gap-3 border-2 ${amenity.borderColor} hover:shadow-md transition-all ${amenity.colSpan || ''}`"
            >
              <div :class="`w-10 h-10 rounded-xl ${amenity.iconBg} flex items-center justify-center`">
                <i :class="`${amenity.icon} ${amenity.iconColor} text-lg`"></i>
              </div>
              <div>
                <span class="text-sm font-bold text-gray-800 block">{{ amenity.label }}</span>
                <span v-if="amenity.sublabel" class="text-xs text-gray-500">{{ amenity.sublabel }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-gray-200 bg-white flex-none">
        <button class="w-full bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
          <i class="fa-solid fa-route"></i>
          Iniciar Ruta
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: false },
  station: {
    type: Object,
    default: () => ({
      name: 'HEB Acapulco',
      permit: 'PL/2153/EXP/ES/2015',
      folio: '8974',
      address: 'Ave. Acapulco N° 161, Col. Los Cristales, Guadalupe, Nuevo Leon, 0, México',
      updatedAt: '2026-02-16T13:00:01',
      prices: {
        premium: { int: '27', dec: '39' },
        magna: { int: '23', dec: '99' },
        diesel: { int: '0', dec: '00' },
      },
      amenities: [
        { label: '24 Horas', icon: 'fa-regular fa-clock', iconColor: 'text-brand-blue', iconBg: 'bg-blue-100', bgGradient: 'from-blue-50 to-white', borderColor: 'border-blue-100' },
        { label: 'Tienda', sublabel: '7-Eleven', icon: 'fa-solid fa-cart-shopping', iconColor: 'text-orange-600', iconBg: 'bg-orange-100', bgGradient: 'from-orange-50 to-white', borderColor: 'border-orange-100', colSpan: 'col-span-2' },
        { label: 'Posiciones de bomba', sublabel: '2 posiciones', icon: 'fa-solid fa-gas-pump', iconColor: 'text-gray-600', iconBg: 'bg-gray-100', bgGradient: 'from-gray-50 to-white', borderColor: 'border-gray-100', colSpan: 'col-span-2' },
      ],
    })
  }
})

defineEmits(['close'])
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
