<template>
  <div class="bg-gradient-to-b from-white to-slate-50 flex flex-col h-full min-h-0 border-l border-gray-200 shadow-2xl">
    <!-- Header del panel -->
    <div class="p-6 pb-4 flex-none border-b border-gray-100 bg-white">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold gradient-text-brand">Detalles de la Estación</h2>
        <button
          @click="handleClose"
          class="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          aria-label="Cerrar"
        >
          <i class="fa-solid fa-xmark text-gray-500 text-lg"></i>
        </button>
      </div>
      <!-- Nombre de la estación -->
      <h1 class="text-2xl font-bold text-brand-dark mb-2">{{ station.name || 'Estación de servicio' }}</h1>
      <p v-if="station.chain?.name" class="text-base text-gray-600 mb-2">{{ station.chain.name }}</p>
      <div v-if="creID || folioPemex" class="flex flex-wrap items-center gap-3 mb-4">
        <button
          v-if="creID"
          type="button"
          @click="copyCreId"
          class="inline-flex items-center px-3 py-1.5 rounded-xl bg-blue-50 text-xs font-bold text-brand-blue border border-blue-100 hover:bg-blue-100 transition-colors"
          :aria-label="creIdCopied ? 'Copiado' : 'Copiar CRE ID'"
        >
          <span>{{ creID }}</span>
          <i :class="creIdCopied ? 'fa-solid fa-check text-green-600 ml-2' : 'fa-regular fa-copy ml-2 cursor-pointer hover:text-brand-purple transition-colors'"></i>
        </button>
        <span v-if="folioPemex" class="text-xs text-gray-500 font-medium">Folio: {{ folioPemex }}</span>
      </div>
    </div>

    <!-- Contenido del panel -->
    <div class="flex-1 min-h-0 overflow-y-auto overscroll-contain sidebar-scroll p-6 pt-4 bg-gradient-to-b from-white to-slate-50">
      <!-- Dirección -->
      <div class="mb-6">
        <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
          <i class="fa-solid fa-location-dot text-brand-blue"></i>
          Dirección
        </p>
        <p class="text-sm text-gray-700 leading-relaxed mb-4 bg-white p-4 rounded-xl border border-gray-100">{{ fullAddress }}</p>
        <a
          :href="googleMapsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white border-2 border-brand-blue text-brand-blue hover:bg-blue-50 text-sm font-bold py-3 px-4 rounded-2xl shadow-sm transition-all flex items-center gap-2 w-full justify-center hover:-translate-y-0.5"
        >
          <i class="fa-solid fa-location-arrow"></i>
          Cómo llegar
        </a>
      </div>

      <!-- Combustibles disponibles -->
      <div v-if="availableServices.length > 0" class="mb-8">
        <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <i class="fa-solid fa-gas-pump text-brand-purple"></i>
          Combustibles
        </p>
        <div class="grid grid-cols-2 gap-3">
          <!-- Premium -->
          <div
            v-if="hasService('premium')"
            class="bg-gradient-to-br from-red-500 to-red-600 rounded-xl px-4 py-3 text-white shadow-lg relative overflow-hidden flex items-center gap-3"
          >
            <div class="absolute -right-3 -top-3 w-14 h-14 bg-white opacity-10 rounded-full"></div>
            <i class="fa-solid fa-gas-pump text-xl opacity-90 flex-shrink-0"></i>
            <span class="text-sm font-bold tracking-wider relative z-10">PREMIUM</span>
          </div>

          <!-- Magna -->
          <div
            v-if="hasService('magna')"
            class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl px-4 py-3 text-white shadow-lg relative overflow-hidden flex items-center gap-3"
          >
            <div class="absolute -right-3 -top-3 w-14 h-14 bg-white opacity-10 rounded-full"></div>
            <i class="fa-solid fa-gas-pump text-xl opacity-90 flex-shrink-0"></i>
            <span class="text-sm font-bold tracking-wider relative z-10">MAGNA</span>
          </div>

          <!-- Diesel -->
          <div
            v-if="hasService('diesel')"
            class="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl px-4 py-3 text-white shadow-lg relative overflow-hidden flex items-center gap-3"
            :class="!hasService('dieselUba') ? 'col-span-2' : ''"
          >
            <div class="absolute -right-3 -top-3 w-14 h-14 bg-white opacity-5 rounded-full"></div>
            <i class="fa-solid fa-gas-pump text-xl opacity-90 flex-shrink-0"></i>
            <span class="text-sm font-bold tracking-wider relative z-10">DIÉSEL</span>
          </div>

          <!-- Diesel UBA -->
          <div
            v-if="hasService('dieselUba')"
            class="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl px-4 py-3 text-white shadow-lg relative overflow-hidden flex items-center gap-3"
            :class="!hasService('diesel') ? 'col-span-2' : ''"
          >
            <div class="absolute -right-3 -top-3 w-14 h-14 bg-white opacity-5 rounded-full"></div>
            <i class="fa-solid fa-gas-pump text-xl opacity-90 flex-shrink-0"></i>
            <span class="text-sm font-bold tracking-wider relative z-10">DIÉSEL UBA</span>
          </div>
        </div>
      </div>

      <!-- Otros servicios adicionales -->
      <div v-if="otherServices.length > 0" class="mb-6">
        <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Servicios Adicionales</h4>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="service in otherServices" 
            :key="service"
            class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
          >
            {{ service }}
          </span>
        </div>
      </div>

      <!-- Horario -->
      <div v-if="station.schedule" class="mb-6">
        <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Horario</h4>
        <p class="text-base text-gray-700">{{ station.schedule }}</p>
      </div>

      <!-- Contacto -->
      <div v-if="station.phone" class="mb-6">
        <h4 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Teléfono</h4>
        <a 
          :href="`tel:${station.phone}`"
          class="text-base text-blue-600 hover:text-blue-700 hover:underline"
        >
          {{ station.phone }}
        </a>
      </div>

      <!-- Amenidades -->
      <div v-if="hasAmenities" class="mb-8">
        <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <i class="fa-solid fa-star text-brand-purple"></i>
          Amenidades
        </p>
        <div class="grid grid-cols-2 gap-3">
          <!-- Abierto 24 horas -->
          <div v-if="station.amenities?.isOpen24Hours" class="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 flex items-center gap-3 border-2 border-blue-100 hover:shadow-md transition-all">
            <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <i class="fa-regular fa-clock text-brand-blue text-lg"></i>
            </div>
            <span class="text-sm font-bold text-gray-800">24 Horas</span>
          </div>
          <div v-if="station.amenities?.hasRestrooms" class="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-4 flex items-center gap-3 border-2 border-purple-100 hover:shadow-md transition-all">
            <div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <i class="fa-solid fa-restroom text-brand-purple text-lg"></i>
            </div>
            <span class="text-sm font-bold text-gray-800">Baños</span>
          </div>
          <div v-if="station.amenities?.hasRestArea" class="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-4 flex items-center gap-3 border-2 border-orange-100 hover:shadow-md transition-all">
            <div class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <i class="fa-solid fa-couch text-orange-500 text-lg"></i>
            </div>
            <span class="text-sm font-bold text-gray-800">Área de Descanso</span>
          </div>
          <div v-if="station.amenities?.hasConvenienceStore" class="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-4 flex flex-col gap-2 border-2 border-orange-100 hover:shadow-md transition-all col-span-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <i class="fa-solid fa-cart-shopping text-orange-600 text-lg"></i>
              </div>
              <div>
                <span class="text-sm font-bold text-gray-800 block">Tienda</span>
                <span v-if="station.amenities?.convenienceStoreName" class="text-xs text-gray-500">{{ station.amenities.convenienceStoreName }}</span>
              </div>
            </div>
          </div>
          <div v-if="station.amenities?.hasRestaurant" class="bg-gradient-to-br from-red-50 to-white rounded-2xl p-4 flex items-center gap-3 border-2 border-red-100 hover:shadow-md transition-all col-span-2">
            <div class="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <i class="fa-solid fa-utensils text-red-600 text-lg"></i>
            </div>
            <div>
              <span class="text-sm font-bold text-gray-800 block">Restaurante</span>
              <span v-if="station.amenities?.restaurantName" class="text-xs text-gray-500">{{ station.amenities.restaurantName }}</span>
            </div>
          </div>
          <div v-if="(station.amenities?.fuelPumpPositions ?? 0) > 0" class="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 flex items-center gap-3 border-2 border-gray-100 hover:shadow-md transition-all col-span-2">
            <div class="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <i class="fa-solid fa-gas-pump text-gray-600 text-lg"></i>
            </div>
            <div>
              <span class="text-sm font-bold text-gray-800 block">Posiciones de bomba</span>
              <span class="text-xs text-gray-500">{{ station.amenities.fuelPumpPositions }} posiciones</span>
            </div>
          </div>
          <div v-if="(station.amenities?.chargingPositions ?? 0) > 0" class="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-4 flex items-center gap-3 border-2 border-yellow-100 hover:shadow-md transition-all">
            <div class="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
              <i class="fa-solid fa-bolt text-yellow-600 text-lg"></i>
            </div>
            <div>
              <span class="text-sm font-bold text-gray-800 block">Carga Eléctrica</span>
              <span class="text-xs text-gray-500">{{ station.amenities.chargingPositions || 0 }} posiciones</span>
            </div>
          </div>
          <div v-if="station.amenities?.hasTruckStop" class="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-4 flex items-center gap-3 border-2 border-indigo-100 hover:shadow-md transition-all">
            <div class="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <i class="fa-solid fa-bus text-indigo-500 text-lg"></i>
            </div>
            <span class="text-sm font-bold text-gray-800">Parada de Camiones</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer con botón Iniciar Ruta -->
    <div class="p-6 border-t border-gray-200 bg-white flex-none">
      <a
        :href="googleMapsUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="w-full bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
      >
        <i class="fa-solid fa-route"></i>
        Iniciar Ruta
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  station: {
    type: Object,
    required: true
  },
  isMobile: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const creIdCopied = ref(false)
let copyTimeout = null
function copyCreId() {
  const value = props.station.creID ?? props.station.creId ?? props.station.cre_id
  if (!value) return
  navigator.clipboard.writeText(value).then(() => {
    creIdCopied.value = true
    if (copyTimeout) clearTimeout(copyTimeout)
    copyTimeout = setTimeout(() => { creIdCopied.value = false }, 2000)
  }).catch(() => {})
}

// Campos normalizados (API puede enviar camelCase o snake_case)
const folioPemex = computed(() => props.station.folioPemex ?? props.station.folio_pemex)
const creID = computed(() => props.station.creID ?? props.station.creId ?? props.station.cre_id ?? '')
const fechaActualizacionPrecios = computed(() => {
  const raw = props.station.fechaActualizacionPrecios ?? props.station.fecha_actualizacion_precios
  if (!raw) return ''
  try {
    const d = new Date(raw)
    return Number.isNaN(d.getTime()) ? raw : d.toLocaleDateString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return String(raw)
  }
})

const fullAddress = computed(() => {
  const address = props.station.address
  if (!address) return 'Dirección no disponible'
  const parts = [
    address.street,
    address.city,
    address.state,
    address.postalCode,
    address.country
  ].filter(Boolean)
  return parts.join(', ').trim() || 'Dirección no disponible'
})

// Generar enlace de Google Maps para navegación
const googleMapsUrl = computed(() => {
  // Intentar usar coordenadas si están disponibles (más preciso)
  if (props.station.location?.latitude && props.station.location?.longitude) {
    const lat = props.station.location.latitude
    const lng = props.station.location.longitude
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
  }
  
  // Fallback: usar la dirección completa
  const address = fullAddress.value
  if (address && address !== 'Dirección no disponible') {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
  }
  
  // Si no hay datos, devolver un enlace a Google Maps genérico
  return 'https://www.google.com/maps'
})

// Determinar qué servicios de combustible están disponibles (services[].slug, precios camelCase/snake_case)
const availableServices = computed(() => {
  const services = []
  const stationServices = props.station.services || []
  const amenities = props.station.amenities || {}

  // Por array de servicios (slug o name): API nueva usa slug "magna", "premium", "diesel"
  if (Array.isArray(stationServices) && stationServices.length > 0) {
    stationServices.forEach(service => {
      const slug = (typeof service === 'string' ? service : (service.slug || '')).toLowerCase()
      const name = (typeof service === 'string' ? service : (service.name || '')).toLowerCase()
      if (slug === 'premium' || name.includes('premium')) services.push('premium')
      if (slug === 'magna' || name.includes('magna') || name.includes('regular')) services.push('magna')
      if (name.includes('diesel') && name.includes('uba')) services.push('dieselUba')
      else if (slug === 'diesel' || name.includes('diesel')) services.push('diesel')
    })
  }

  // Por precios (nuevos: precioMagna, precioPremium, precioDiesel; antiguos: price_*)
  if (props.station.precioPremium ?? props.station.price_premium) services.push('premium')
  if (props.station.precioMagna ?? props.station.price_regular) services.push('magna')
  if (props.station.precioDiesel ?? props.station.price_diesel) services.push('diesel')
  if (props.station.price_diesel_uba) services.push('dieselUba')
  if (amenities.hasDieselUba) services.push('dieselUba')

  if (services.length === 0) return ['premium', 'magna', 'diesel', 'dieselUba']
  return [...new Set(services)]
})

// Verificar si un servicio específico está disponible
const hasService = (serviceType) => {
  return availableServices.value.includes(serviceType)
}

// Obtener precio (precioMagna/precioPremium/precioDiesel o price_*)
const getPrice = (serviceType) => {
  const s = props.station
  if (serviceType === 'premium') {
    const v = s.precioPremium ?? s.price_premium
    if (v != null) return parseFloat(v)
  }
  if (serviceType === 'magna') {
    const v = s.precioMagna ?? s.price_regular
    if (v != null) return parseFloat(v)
  }
  if (serviceType === 'diesel') {
    const v = s.precioDiesel ?? s.price_diesel
    if (v != null) return parseFloat(v)
  }
  if (serviceType === 'dieselUba' && s.price_diesel_uba != null) {
    return parseFloat(s.price_diesel_uba)
  }
  const simulatedPrices = { premium: 24.50, magna: 22.80, diesel: 23.90, dieselUba: 25.20 }
  return simulatedPrices[serviceType] || 0
}

// Obtener parte entera del precio
const getPriceInteger = (serviceType) => {
  const price = getPrice(serviceType)
  return Math.floor(price).toString()
}

// Obtener parte decimal del precio
const getPriceDecimals = (serviceType) => {
  const price = getPrice(serviceType)
  const decimals = (price % 1).toFixed(2).substring(2)
  return decimals
}

// Servicios adicionales que no son combustibles (por name o slug)
const otherServices = computed(() => {
  const stationServices = props.station.services || []
  if (!Array.isArray(stationServices)) return []
  const fuelSlugs = ['premium', 'magna', 'regular', 'diesel']
  return stationServices.filter(service => {
    const slug = (typeof service === 'string' ? service : (service.slug || '')).toLowerCase()
    const name = (typeof service === 'string' ? service : (service.name || '')).toLowerCase()
    return !fuelSlugs.includes(slug) && !name.includes('premium') && !name.includes('magna') && !name.includes('regular') && !name.includes('diesel')
  }).map(service => typeof service === 'string' ? service : (service.name || service.slug || ''))
})

// Verificar si hay amenidades disponibles (incl. fuelPumpPositions)
const hasAmenities = computed(() => {
  const a = props.station.amenities
  if (!a) return false
  return a.isOpen24Hours ||
         a.hasRestrooms ||
         a.hasRestArea ||
         a.hasConvenienceStore ||
         a.hasRestaurant ||
         (a.chargingPositions && a.chargingPositions > 0) ||
         (a.fuelPumpPositions && a.fuelPumpPositions > 0) ||
         a.hasTruckStop
})

const handleClose = () => {
  emit('close')
}
</script>
