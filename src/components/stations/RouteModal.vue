<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-[1400px] lg:w-[95vw] h-[85vh] lg:h-[92vh] max-h-[1000px] flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="flex items-center justify-between px-5 sm:px-6 py-4 bg-gradient-to-r from-brand-blue to-brand-purple flex-shrink-0">
          <h2 class="text-white font-bold text-lg flex items-center gap-2">
            <i class="fa-solid fa-route"></i>
            Traza tu ruta
          </h2>
          <button @click="$emit('close')" class="text-white/80 hover:text-white transition-colors">
            <i class="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div class="flex flex-col lg:flex-row flex-1 min-h-0">
          <!-- Panel de formulario / resultados -->
          <div
            class="relative w-full lg:w-[380px] lg:flex-none bg-slate-50 lg:border-r lg:border-gray-200 overflow-y-auto lg:max-h-none lg:h-full lg:block"
            :class="showMobileMap ? 'hidden' : 'flex-1 block'"
          >
            <div class="p-5">
            <div
              v-for="(point, idx) in points"
              :key="idx"
              class="mb-4 rounded-xl transition-colors"
              :class="[
                draggingIndex === idx ? 'opacity-40' : '',
                dragOverIndex === idx && draggingIndex !== idx ? 'bg-blue-50 ring-2 ring-brand-blue/40' : ''
              ]"
              @dragover.prevent="onDragOver(idx)"
              @drop="onDrop(idx)"
            >
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center gap-1.5">
                  <span
                    v-if="idx !== 0"
                    draggable="true"
                    @dragstart="onDragStart(idx, $event)"
                    @dragend="onDragEnd"
                    class="hidden lg:inline-flex cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 px-0.5"
                    title="Arrastrar para reordenar"
                  >
                    <i class="fa-solid fa-grip-vertical text-xs"></i>
                  </span>
                  <div v-if="idx !== 0" class="lg:hidden flex flex-col">
                    <button
                      v-if="idx > 1"
                      @click="movePoint(idx, -1)"
                      type="button"
                      class="text-gray-400 hover:text-brand-blue leading-none px-0.5"
                      title="Subir"
                    >
                      <i class="fa-solid fa-chevron-up text-[10px]"></i>
                    </button>
                    <button
                      v-if="idx < points.length - 1"
                      @click="movePoint(idx, 1)"
                      type="button"
                      class="text-gray-400 hover:text-brand-blue leading-none px-0.5"
                      title="Bajar"
                    >
                      <i class="fa-solid fa-chevron-down text-[10px]"></i>
                    </button>
                  </div>
                  <label class="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {{ pointLabel(idx) }}
                  </label>
                </div>
                <button
                  v-if="idx !== 0 && idx !== points.length - 1"
                  @click="removeStop(idx)"
                  type="button"
                  class="text-xs text-gray-400 hover:text-red-500 transition-colors"
                  title="Quitar parada"
                >
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>

              <div class="relative">
                <i
                  v-if="idx === 0"
                  class="fa-solid fa-circle-dot absolute left-3 top-1/2 -translate-y-1/2 text-green-500 text-xs"
                ></i>
                <i
                  v-else-if="idx === points.length - 1"
                  class="fa-solid fa-location-dot absolute left-3 top-1/2 -translate-y-1/2 text-red-500 text-xs"
                ></i>
                <span
                  v-else
                  class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] flex items-center justify-center font-bold"
                >{{ idx }}</span>

                <input
                  v-model="point.query"
                  @input="onPointInput(idx)"
                  @focus="point.showPredictions = true"
                  @blur="hidePointPredictions(idx)"
                  type="text"
                  :placeholder="pointPlaceholder(idx)"
                  class="w-full pl-9 pr-9 py-2.5 border-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                  :class="pickIndex === idx ? 'border-brand-purple' : 'border-gray-200'"
                />

                <button
                  v-if="point.query"
                  @mousedown.prevent="clearPoint(idx)"
                  type="button"
                  class="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                  title="Borrar"
                >
                  <i class="fa-solid fa-circle-xmark text-sm"></i>
                </button>

                <div
                  v-if="point.showPredictions && pointSearchers[idx].predictions.value.length"
                  class="absolute z-20 w-full mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-xl max-h-56 overflow-y-auto"
                >
                  <div
                    v-for="pred in pointSearchers[idx].predictions.value"
                    :key="pred.placeId"
                    @mousedown="selectPointPrediction(idx, pred)"
                    class="px-3 py-2.5 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div class="font-semibold text-gray-900 text-sm truncate">{{ pred.mainText }}</div>
                    <div class="text-xs text-gray-500 truncate">{{ pred.secondaryText }}</div>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-3 mt-1.5">
                <button
                  @click="usePointCurrentLocation(idx)"
                  type="button"
                  :disabled="locatingIndex === idx"
                  class="text-xs text-brand-blue hover:underline flex items-center gap-1 disabled:opacity-50 disabled:no-underline"
                >
                  <i :class="locatingIndex === idx ? 'fa-solid fa-spinner fa-spin' : 'fa-solid fa-location-crosshairs'"></i>
                  {{ locatingIndex === idx ? 'Buscando...' : 'Mi ubicación' }}
                </button>
                <button
                  @click="togglePickOnMap(idx)"
                  type="button"
                  class="text-xs flex items-center gap-1 hover:underline"
                  :class="pickIndex === idx ? 'text-brand-purple font-semibold' : 'text-brand-blue'"
                >
                  <i class="fa-solid fa-map-location-dot"></i>
                  {{ pickIndex === idx ? 'Clic en el mapa...' : 'Elegir en el mapa' }}
                </button>
              </div>
            </div>

            <button
              v-if="points.length < MAX_POINTS"
              @click="addStop"
              type="button"
              class="w-full mb-4 flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 text-gray-500 hover:border-brand-blue hover:text-brand-blue rounded-xl py-2 text-sm font-medium transition-colors"
            >
              <i class="fa-solid fa-plus"></i> Agregar parada
            </button>

            <button
              @click="traceRoute"
              :disabled="!allPointsReady || tracing"
              class="w-full bg-gradient-to-r from-brand-blue to-brand-purple text-white font-semibold py-2.5 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-brand-purple/30 transition-all"
            >
              <i v-if="tracing" class="fa-solid fa-spinner fa-spin mr-2"></i>
              {{ tracing ? 'Trazando ruta...' : 'Trazar ruta' }}
            </button>

            <div v-if="error" class="mt-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3">
              {{ error }}
            </div>

            <div v-if="routeOptions.length > 1" class="mt-4">
              <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Opciones de ruta
              </h3>
              <div class="space-y-2">
                <button
                  v-for="(opt, idx) in routeOptions"
                  :key="idx"
                  @click="selectRoute(idx)"
                  type="button"
                  :class="[
                    'w-full text-left border-2 rounded-xl p-3 transition-colors',
                    idx === selectedRouteIndex ? 'border-brand-blue bg-blue-50' : 'border-gray-200 hover:border-brand-blue/40'
                  ]"
                >
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-semibold text-sm text-gray-900">
                      {{ opt.wasFastest ? 'Ruta más rápida' : `Alternativa ${idx}` }}
                    </span>
                    <span class="flex items-center gap-1 text-xs font-bold text-brand-blue flex-shrink-0">
                      <i class="fa-solid fa-gas-pump"></i> {{ opt.stations.length }}
                    </span>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">{{ opt.distanceKm }} km &middot; {{ opt.durationLabel }}</p>
                  <p v-if="opt.crossesBorder" class="text-[11px] font-semibold text-amber-600 mt-1 flex items-center gap-1">
                    <i class="fa-solid fa-triangle-exclamation"></i> Pasa por Estados Unidos
                  </p>
                </button>
              </div>
            </div>

            <div v-else-if="routeSummary" class="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm">
              <div class="flex items-center gap-4">
                <div>
                  <p class="text-gray-500 text-xs">Distancia</p>
                  <p class="font-bold text-gray-900">{{ routeSummary.distanceKm }} km</p>
                </div>
                <div>
                  <p class="text-gray-500 text-xs">Duración aprox.</p>
                  <p class="font-bold text-gray-900">{{ routeSummary.durationLabel }}</p>
                </div>
              </div>
              <p v-if="routeOptions[selectedRouteIndex]?.crossesBorder" class="text-[11px] font-semibold text-amber-600 mt-2 flex items-center gap-1">
                <i class="fa-solid fa-triangle-exclamation"></i> Esta ruta pasa por Estados Unidos
              </p>
            </div>

            <div v-if="stations.length" class="mt-5">
              <h3 class="text-sm font-bold text-gray-900 mb-2">
                Estaciones en la ruta ({{ filteredStations.length }}<template v-if="filteredStations.length !== stations.length">/{{ stations.length }}</template>)
              </h3>

              <div class="mb-3">
                <div class="flex items-center justify-between mb-2">
                  <p class="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                    <i class="fa-solid fa-gas-pump text-brand-blue"></i> Productos
                  </p>
                  <button
                    v-if="productFilter.length"
                    type="button"
                    @click="clearProductFilter"
                    class="text-[11px] font-medium text-gray-400 hover:text-red-500"
                  >
                    Quitar filtro
                  </button>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="fuel in FUEL_ORDER"
                    :key="fuel"
                    type="button"
                    @click="toggleProductFilter(fuel)"
                    class="p-2.5 bg-white border-2 rounded-xl flex items-center gap-2 transition-all text-left"
                    :class="productFilter.includes(fuel) ? fuelFilterActiveClass(fuel) : 'border-gray-200 hover:border-gray-300'"
                  >
                    <div
                      class="w-4 h-4 border-2 rounded-md flex items-center justify-center flex-shrink-0"
                      :class="productFilter.includes(fuel) ? fuelFilterCheckClass(fuel) : 'border-gray-300 bg-white'"
                    >
                      <i v-if="productFilter.includes(fuel)" class="fa-solid fa-check text-[9px] text-white"></i>
                    </div>
                    <span class="text-xs font-semibold text-gray-700">{{ fuelLabel(fuel) }}</span>
                  </button>
                </div>
              </div>

              <div v-if="filteredStations.length === 0" class="text-sm text-gray-500 mb-2">
                Ninguna estación en la ruta tiene los productos filtrados.
              </div>

              <div class="space-y-2">
                <div
                  v-for="s in filteredStations"
                  :key="s.id"
                  @click="selectStationFromList(s)"
                  class="border border-gray-200 rounded-xl p-3 hover:border-brand-blue/50 cursor-pointer transition-colors space-y-2"
                >
                  <div>
                    <p class="font-semibold text-gray-900 text-sm truncate">{{ s.name || 'Estación de servicio' }}</p>
                    <p v-if="previewAddress(s)" class="text-xs text-gray-500 truncate">
                      {{ previewAddress(s) }}
                    </p>
                  </div>

                  <div class="flex flex-wrap gap-1.5">
                    <span
                      v-if="stationPL(s)"
                      class="px-2 py-0.5 bg-blue-50 text-brand-blue text-[10px] font-bold rounded-lg border border-blue-100"
                    >
                      {{ stationPL(s) }}
                    </span>
                    <span
                      v-if="stationFolio(s)"
                      class="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-medium rounded-lg"
                    >
                      Folio: {{ stationFolio(s) }}
                    </span>
                  </div>

                  <p v-if="stationCoords(s)" class="text-[11px] text-gray-400 font-mono">
                    <i class="fa-solid fa-location-crosshairs mr-1"></i>{{ stationCoords(s) }}
                  </p>

                  <div v-if="stationFuels(s).length" class="flex flex-wrap gap-1.5">
                    <span
                      v-for="fuel in stationFuels(s)"
                      :key="fuel"
                      :class="fuelBadgeClass(fuel)"
                      class="px-2 py-0.5 rounded-full text-[10px] font-bold text-white flex items-center gap-1"
                    >
                      <i class="fa-solid fa-gas-pump text-[9px]"></i>
                      {{ fuelLabel(fuel) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="searched && !tracing" class="mt-5 text-sm text-gray-500">
              No se encontraron estaciones cercanas a esta ruta.
            </div>
            </div>
          </div>

          <!-- Mapa: en móvil ocupa el modal completo (no se divide con el formulario);
               aparece al trazar, al elegir un punto en el mapa, o con "Editar ruta" -->
          <div
            class="relative min-h-[300px] lg:min-h-0 lg:flex-1 lg:block"
            :class="showMobileMap ? 'flex-1 block' : 'hidden'"
          >
            <div ref="mapEl" class="absolute inset-0"></div>

            <button
              v-if="hasRoute && !mobileShowForm && pickIndex === null"
              @click="editRouteMobile"
              type="button"
              class="lg:hidden absolute top-3 left-3 z-20 text-brand-blue text-sm font-semibold border-[3px] border-transparent pl-3 pr-4 py-2 rounded-full shadow-lg flex items-center gap-2"
              style="background: linear-gradient(white, white) padding-box, linear-gradient(90deg, #2573D9, #8434E1) border-box;"
            >
              <i class="fa-solid fa-pen-to-square"></i> Editar ruta
            </button>

            <div
              v-if="pickIndex !== null"
              class="absolute top-3 left-3 right-3 z-20 bg-brand-purple text-white text-sm rounded-xl px-4 py-2.5 flex items-center justify-between shadow-lg"
            >
              <span><i class="fa-solid fa-hand-pointer mr-2"></i>Haz clic en el mapa para elegir: {{ pointLabel(pickIndex) }}</span>
              <button @click="pickIndex = null" type="button" class="text-white/80 hover:text-white ml-3">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div v-if="tracing" class="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
              <div class="text-center">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-blue mx-auto mb-3"></div>
                <p class="text-gray-600 text-sm">Calculando ruta y buscando estaciones...</p>
              </div>
            </div>

            <!-- Vista previa de estación (clic en la lista o en un pin del mapa):
                 tarjeta flotante sobre el mapa, no tapa el formulario ni la lista -->
            <div
              v-if="previewStation"
              class="absolute bottom-3 right-3 left-3 sm:left-auto sm:w-[320px] z-30 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[70%] flex flex-col"
            >
              <div class="bg-gradient-to-r from-brand-blue to-brand-purple px-4 py-3 flex items-center justify-between flex-shrink-0">
                <h3 class="text-white font-bold text-sm truncate pr-2">
                  {{ previewStation.name || 'Estación de servicio' }}
                </h3>
                <button @click="previewStation = null" type="button" class="text-white/80 hover:text-white flex-shrink-0">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>

              <div class="p-4 space-y-3 overflow-y-auto">
                <p v-if="previewAddress(previewStation)" class="text-sm text-gray-600">
                  {{ previewAddress(previewStation) }}
                </p>

                <div class="flex flex-wrap gap-2">
                  <span
                    v-if="stationPL(previewStation)"
                    class="px-2.5 py-1 bg-blue-50 text-brand-blue text-xs font-bold rounded-lg border border-blue-100"
                  >
                    {{ stationPL(previewStation) }}
                  </span>
                  <span
                    v-if="stationFolio(previewStation)"
                    class="px-2.5 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg"
                  >
                    Folio: {{ stationFolio(previewStation) }}
                  </span>
                </div>

                <p v-if="stationCoords(previewStation)" class="text-xs text-gray-400 font-mono">
                  <i class="fa-solid fa-location-crosshairs mr-1"></i>
                  {{ stationCoords(previewStation) }}
                </p>

                <div v-if="stationFuels(previewStation).length">
                  <p class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Productos</p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="fuel in stationFuels(previewStation)"
                      :key="fuel"
                      :class="fuelBadgeClass(fuel)"
                      class="px-3 py-1.5 rounded-full text-xs font-bold text-white flex items-center gap-1.5"
                    >
                      <i class="fa-solid fa-gas-pump text-[10px]"></i>
                      {{ fuelLabel(fuel) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN, API_BASE_URL, useGooglePlacesAutocomplete } from 'orsan-maps-vue'
import { isInsideMexico } from '../../data/mexicoBounds.js'

defineEmits(['close'])

const MAX_STOPS = 5
const MAX_POINTS = MAX_STOPS + 2

const mapEl = ref(null)
let map = null
let waypointMarkers = []
let stationMarkers = []
let stationMarkersById = new Map()
let userLocationMarker = null

// Un buscador de Google Places por cada posición posible (origen + paradas + destino).
// Los composables solo se pueden invocar durante el setup del componente, así que
// se crean todos de una vez y luego se usan según cuántos puntos tenga la ruta.
const pointSearchers = Array.from({ length: MAX_POINTS }, () => useGooglePlacesAutocomplete())

const points = ref([
  { query: '', place: null, showPredictions: false },
  { query: '', place: null, showPredictions: false }
])

const pickIndex = ref(null)
const locatingIndex = ref(null)
const draggingIndex = ref(null)
const dragOverIndex = ref(null)
const debounceTimers = []

const tracing = ref(false)
const searched = ref(false)
const error = ref(null)
const routeSummary = ref(null)
const stations = ref([])
const routeOptions = ref([])
const selectedRouteIndex = ref(0)
const previewStation = ref(null)
const productFilter = ref([])

// En móvil el mapa ocupa el modal completo en vez de compartir pantalla con
// el formulario. El mapa aparece: mientras se traza/hay una ruta, mientras
// se está eligiendo un punto en el mapa, o si el usuario pidió "Editar ruta"
// para volver; se oculta de nuevo solo al terminar de elegir un punto.
const hasRoute = computed(() => tracing.value || routeOptions.value.length > 0)
const mobileShowForm = ref(false)
const showMobileMap = computed(() => {
  if (pickIndex.value !== null) return true
  if (mobileShowForm.value) return false
  return hasRoute.value
})

function editRouteMobile() {
  mobileShowForm.value = true
}

const allPointsReady = computed(() => points.value.every(p => p.place?.location))

const FUEL_ORDER = ['premium', 'magna', 'diesel', 'dieselUba']

const availableFuelTypes = computed(() => {
  const present = new Set(stations.value.flatMap(s => stationFuels(s)))
  return FUEL_ORDER.filter(f => present.has(f))
})

const filteredStations = computed(() => {
  if (productFilter.value.length === 0) return stations.value
  return stations.value.filter(s => stationFuels(s).some(f => productFilter.value.includes(f)))
})

function toggleProductFilter(fuel) {
  productFilter.value = productFilter.value.includes(fuel)
    ? productFilter.value.filter(f => f !== fuel)
    : [...productFilter.value, fuel]
  plotStations(filteredStations.value)
}

function clearProductFilter() {
  productFilter.value = []
  plotStations(filteredStations.value)
}

// Clic en una tarjeta de la lista: abre la tarjeta flotante Y hace zoom +
// rebote en el mapa para señalar cuál estación es
function selectStationFromList(station) {
  previewStation.value = station
  mobileShowForm.value = false // en móvil, mostrar el mapa para ver dónde está la estación
  highlightStation(station)
}

// Mismos colores que el filtro de productos del mapa principal (FilterPanel.vue)
function fuelFilterActiveClass(fuel) {
  if (fuel === 'premium') return 'border-red-500 bg-red-50'
  if (fuel === 'magna') return 'border-green-500 bg-green-50'
  if (fuel === 'diesel') return 'border-slate-600 bg-slate-50'
  return 'border-slate-700 bg-slate-50'
}

function fuelFilterCheckClass(fuel) {
  if (fuel === 'premium') return 'border-red-500 bg-red-500'
  if (fuel === 'magna') return 'border-green-500 bg-green-500'
  if (fuel === 'diesel') return 'border-slate-600 bg-slate-600'
  return 'border-slate-700 bg-slate-700'
}

function stationPL(station) {
  // El permiso CRE viene formateado como "PL/573/EXP/ES/2015"; plCode/pl_code
  // no trae ese valor (por eso salía cortado), el campo correcto es el mismo
  // que usa el panel de detalles del mapa principal
  return station.creID ?? station.creId ?? station.cre_id ?? null
}

function stationCoords(station) {
  const lat = parseFloat(station.location?.latitude)
  const lng = parseFloat(station.location?.longitude)
  if (!isFinite(lat) || !isFinite(lng)) return null
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
}

function stationFolio(station) {
  return station.folioPemex ?? station.folio_pemex ?? null
}

function previewAddress(station) {
  const a = station.address
  if (!a) return ''
  return [a.street, a.city, a.state].filter(Boolean).join(', ')
}

const FUEL_LABELS = { premium: 'Premium', magna: 'Magna', diesel: 'Diésel', dieselUba: 'Diésel UBA' }
const FUEL_BADGE_CLASSES = {
  premium: 'bg-red-500',
  magna: 'bg-green-500',
  diesel: 'bg-slate-700',
  dieselUba: 'bg-slate-700'
}

function fuelLabel(fuel) {
  return FUEL_LABELS[fuel] || fuel
}

function fuelBadgeClass(fuel) {
  return FUEL_BADGE_CLASSES[fuel] || 'bg-gray-500'
}

// Misma lógica que el panel de detalles del mapa principal (StationDetailsPanel.vue)
// para que "traza tu ruta" muestre exactamente los mismos productos disponibles
function stationFuels(station) {
  const services = []
  const stationServices = station.services || []
  const priceRaw = {
    premium: station.precioPremium ?? station.PrecioPremium ?? station.price_premium ?? null,
    magna: station.precioMagna ?? station.PrecioMagna ?? station.price_regular ?? null,
    diesel: station.precioDiesel ?? station.PrecioDiesel ?? station.price_diesel ?? null,
    dieselUba: station.price_diesel_uba ?? null
  }
  const hayDatosDePrecio = Object.values(priceRaw).some(v => v != null)

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

  if (priceRaw.premium != null && parseFloat(priceRaw.premium) > 0) services.push('premium')
  if (priceRaw.magna != null && parseFloat(priceRaw.magna) > 0) services.push('magna')
  if (priceRaw.diesel != null && parseFloat(priceRaw.diesel) > 0) services.push('diesel')
  if (priceRaw.dieselUba != null && parseFloat(priceRaw.dieselUba) > 0) services.push('dieselUba')
  if (station.amenities?.hasDieselUba) services.push('dieselUba')

  const unique = [...new Set(services)].filter(svc => {
    const raw = priceRaw[svc]
    if (raw != null) return parseFloat(raw) > 0
    return true
  })

  if (unique.length === 0 && !hayDatosDePrecio && stationServices.length === 0) {
    return ['premium', 'magna', 'diesel']
  }
  return unique
}

function pointLabel(index) {
  if (index === 0) return 'Origen'
  if (index === points.value.length - 1) return 'Destino'
  return `Parada ${index}`
}

function pointPlaceholder(index) {
  if (index === 0) return 'Dirección de partida o "lat, lng"'
  if (index === points.value.length - 1) return 'Dirección de llegada o "lat, lng"'
  return `Parada ${index}: dirección o "lat, lng"`
}

// Permite escribir coordenadas directamente (ej. "19.4326, -99.1332") en vez
// de buscar una dirección
function parseCoordsInput(text) {
  const match = (text || '').trim().match(/^(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)$/)
  if (!match) return null
  const lat = parseFloat(match[1])
  const lng = parseFloat(match[2])
  if (!isFinite(lat) || !isFinite(lng)) return null
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null
  return { lat, lng }
}

function onPointInput(index) {
  points.value[index].place = null
  clearTimeout(debounceTimers[index])

  const coords = parseCoordsInput(points.value[index].query)
  if (coords) {
    pointSearchers[index].clearPredictions()
    points.value[index].showPredictions = false
    points.value[index].place = {
      location: coords,
      formattedAddress: `${coords.lat}, ${coords.lng}`
    }
    plotWaypointMarkers()
    return
  }

  debounceTimers[index] = setTimeout(() => {
    pointSearchers[index].searchPlaces(points.value[index].query, ['geocode'])
  }, 250)
}

function hidePointPredictions(index) {
  setTimeout(() => {
    if (points.value[index]) points.value[index].showPredictions = false
  }, 150)
}

async function selectPointPrediction(index, pred) {
  const details = await pointSearchers[index].getPlaceDetails(pred.placeId)
  points.value[index].place = details
  points.value[index].query = details.formattedAddress || details.name || pred.description
  pointSearchers[index].clearPredictions()
  points.value[index].showPredictions = false
  plotWaypointMarkers()
}

function clearPoint(index) {
  points.value[index].query = ''
  points.value[index].place = null
  pointSearchers[index].clearPredictions()
  plotWaypointMarkers()
}

// Reordenar arrastrando (el origen, índice 0, nunca es arrastrable ni un destino
// válido para soltar; se reconstruye el arreglo dejándolo aparte a propósito para
// que un reordenamiento de paradas/destino jamás pueda tocarlo por error)
function onDragStart(index, e) {
  if (index === 0) return
  // Cerrar cualquier dropdown de sugerencias abierto para que el layout no
  // se mueva a medio arrastre (eso podía hacer que el soltar cayera en la fila
  // equivocada)
  points.value.forEach(p => { p.showPredictions = false })
  draggingIndex.value = index
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', String(index))
}

function onDragOver(index) {
  if (draggingIndex.value === null) return
  if (index === 0) return
  dragOverIndex.value = index
}

// Mueve un punto de la posición "from" a "to" dejando el origen (índice 0)
// completamente aparte, para que ninguna operación de reordenar pueda tocarlo
function reorderPoints(from, to) {
  if (from === to) return
  if (from === 0 || to === 0) return
  if (to < 1 || to > points.value.length - 1) return

  const origin = points.value[0]
  const rest = points.value.slice(1)
  const moved = rest.splice(from - 1, 1)[0]
  rest.splice(to - 1, 0, moved)
  points.value = [origin, ...rest]

  plotWaypointMarkers()
  // Solo al reordenar (arrastrando o con las flechas) se vuelve a trazar sola;
  // agregar/quitar paradas sigue requiriendo darle "Trazar ruta" a propósito
  if (allPointsReady.value && (searched.value || routeOptions.value.length)) {
    traceRoute()
  }
}

function onDrop(index) {
  const from = draggingIndex.value
  draggingIndex.value = null
  dragOverIndex.value = null
  if (from === null) return
  reorderPoints(from, index)
}

function onDragEnd() {
  draggingIndex.value = null
  dragOverIndex.value = null
}

// Flechas para reordenar en móvil, donde arrastrar no es confiable con el dedo
function movePoint(index, direction) {
  reorderPoints(index, index + direction)
}

function addStop() {
  if (points.value.length >= MAX_POINTS) return
  points.value.splice(points.value.length - 1, 0, { query: '', place: null, showPredictions: false })
}

function removeStop(index) {
  if (index === 0 || index === points.value.length - 1) return
  points.value.splice(index, 1)
  plotWaypointMarkers()
}

// En Firefox y Edge, la primera vez que se concede el permiso de ubicación,
// la solicitud que disparó el diálogo a veces no se resuelve (falla con un
// error que no es "permiso denegado"): el permiso ya quedó guardado, pero esa
// llamada en particular se pierde. Se reintenta una vez automáticamente en
// vez de obligar al usuario a refrescar la página.
function getCurrentPositionWithRetry(onSuccess, onError, options) {
  navigator.geolocation.getCurrentPosition(
    onSuccess,
    (err) => {
      if (err.code === err.PERMISSION_DENIED) {
        onError(err)
        return
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options)
    },
    options
  )
}

function usePointCurrentLocation(index) {
  if (!navigator.geolocation) {
    error.value = 'Tu navegador no soporta geolocalización.'
    return
  }
  locatingIndex.value = index
  getCurrentPositionWithRetry(
    (pos) => {
      const { latitude, longitude } = pos.coords
      points.value[index].place = {
        location: { lat: latitude, lng: longitude },
        formattedAddress: 'Mi ubicación actual'
      }
      points.value[index].query = 'Mi ubicación actual'
      plotWaypointMarkers()
      if (map) map.flyTo({ center: [longitude, latitude], zoom: 12 })
      locatingIndex.value = null
    },
    () => {
      error.value = 'No se pudo obtener tu ubicación. Revisa los permisos de ubicación del navegador.'
      locatingIndex.value = null
    },
    // enableHighAccuracy:false usa la ubicación por wifi/red (mucho más rápida) en vez
    // de esperar un fix de GPS; maximumAge permite reusar una lectura reciente del navegador
    { enableHighAccuracy: false, timeout: 6000, maximumAge: 300000 }
  )
}

function togglePickOnMap(index) {
  pickIndex.value = pickIndex.value === index ? null : index
}

async function reverseGeocode(lng, lat) {
  try {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}&language=es&limit=1`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = await res.json()
    return data.features?.[0]?.place_name || null
  } catch {
    return null
  }
}

async function handleMapClick(e) {
  if (pickIndex.value === null) return
  const index = pickIndex.value
  const { lng, lat } = e.lngLat
  pickIndex.value = null

  const label = await reverseGeocode(lng, lat)
  points.value[index].place = { location: { lat, lng }, formattedAddress: label || `${lat.toFixed(5)}, ${lng.toFixed(5)}` }
  points.value[index].query = label || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
  plotWaypointMarkers()
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function sampleRoute(coords, stepKm = 15) {
  if (!coords.length) return []
  const samples = [coords[0]]
  let accumulated = 0
  for (let i = 1; i < coords.length; i++) {
    const [lng1, lat1] = coords[i - 1]
    const [lng2, lat2] = coords[i]
    accumulated += haversineKm(lat1, lng1, lat2, lng2)
    if (accumulated >= stepKm) {
      samples.push(coords[i])
      accumulated = 0
    }
  }
  samples.push(coords[coords.length - 1])
  return samples
}

const ROUTE_CORRIDOR_KM = 3

function toXY(lat, lng, refLat) {
  const kmPerDegLat = 111.32
  const kmPerDegLng = 111.32 * Math.cos(refLat * Math.PI / 180)
  return { x: lng * kmPerDegLng, y: lat * kmPerDegLat }
}

function pointToSegmentDistanceKm(p, a, b) {
  const abx = b.x - a.x
  const aby = b.y - a.y
  const abLenSq = abx * abx + aby * aby
  let t = abLenSq === 0 ? 0 : ((p.x - a.x) * abx + (p.y - a.y) * aby) / abLenSq
  t = Math.max(0, Math.min(1, t))
  const cx = a.x + t * abx
  const cy = a.y + t * aby
  return Math.hypot(p.x - cx, p.y - cy)
}

// Distancia mínima de un punto a la polilínea de la ruta (no solo a los puntos muestreados)
function distanceToRouteKm(lat, lng, coords, refLat) {
  const p = toXY(lat, lng, refLat)
  let min = Infinity
  for (let i = 1; i < coords.length; i++) {
    const a = toXY(coords[i - 1][1], coords[i - 1][0], refLat)
    const b = toXY(coords[i][1], coords[i][0], refLat)
    const dist = pointToSegmentDistanceKm(p, a, b)
    if (dist < min) min = dist
  }
  return min
}

async function fetchStationsNear(lat, lng, radius = 10) {
  try {
    const url = new URL(`${API_BASE_URL}/api/stations/nearby`)
    url.searchParams.set('latitude', lat)
    url.searchParams.set('longitude', lng)
    url.searchParams.set('radius', radius)
    const res = await fetch(url.toString())
    if (!res.ok) return []
    const data = await res.json()
    if (data?.data && Array.isArray(data.data)) return data.data
    if (Array.isArray(data)) return data
    return []
  } catch {
    return []
  }
}

function clearMarkers(list) {
  list.forEach(m => m && m.remove())
}

function drawRoute(geometry) {
  if (!map) return
  const apply = () => {
    if (map.getSource('route')) {
      map.getSource('route').setData({ type: 'Feature', geometry })
    } else {
      map.addSource('route', { type: 'geojson', data: { type: 'Feature', geometry } })
      map.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: { 'line-cap': 'round', 'line-join': 'round' },
        paint: { 'line-color': '#7c3aed', 'line-width': 5, 'line-opacity': 0.85 }
      })
    }
    const bounds = geometry.coordinates.reduce(
      (b, c) => b.extend(c),
      new mapboxgl.LngLatBounds(geometry.coordinates[0], geometry.coordinates[0])
    )
    map.fitBounds(bounds, { padding: 60, duration: 500 })
  }
  if (map.isStyleLoaded()) apply()
  else map.once('load', apply)
}

function createNumberedMarkerEl(number, color) {
  const el = document.createElement('div')
  el.style.cssText = `width:34px;height:34px;border-radius:9999px;background:${color};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;box-shadow:0 3px 8px rgba(0,0,0,0.45);border:3px solid white;`
  el.textContent = String(number)
  return el
}

// Los pines de origen/paradas/destino deben quedar siempre por encima de los
// pines de estaciones (que suelen ser muchos y del mismo tamaño por defecto)
function plotWaypointMarkers() {
  clearMarkers(waypointMarkers)
  waypointMarkers = points.value
    .map((p, idx) => {
      if (!p.place?.location) return null
      const isOrigin = idx === 0
      const isDestination = idx === points.value.length - 1
      const marker = isOrigin
        ? new mapboxgl.Marker({ color: '#16a34a', scale: 1.15 })
        : isDestination
          ? new mapboxgl.Marker({ color: '#dc2626', scale: 1.15 })
          : new mapboxgl.Marker({ element: createNumberedMarkerEl(idx, '#f97316') })
      marker.setLngLat([p.place.location.lng, p.place.location.lat]).addTo(map)
      marker.getElement().style.zIndex = '30'
      return marker
    })
    .filter(Boolean)
}

function showUserLocationMarker(lat, lng) {
  if (!map) return
  if (userLocationMarker) userLocationMarker.remove()
  const el = document.createElement('div')
  el.className = 'ug-user-location-dot'
  userLocationMarker = new mapboxgl.Marker({ element: el }).setLngLat([lng, lat]).addTo(map)
}

// Marcador propio (no el pin por defecto de Mapbox) para poder animar el
// "rebote" en un elemento interno sin pelear con el transform de posición
// que Mapbox aplica al elemento raíz del marcador
function createStationMarkerEl() {
  const outer = document.createElement('div')
  const inner = document.createElement('div')
  inner.className = 'ug-station-marker-inner'
  inner.innerHTML = '<i class="fa-solid fa-gas-pump"></i>'
  outer.appendChild(inner)
  return outer
}

function plotStations(list) {
  clearMarkers(stationMarkers)
  stationMarkersById = new Map()
  stationMarkers = list
    .filter(s => s.location?.latitude != null && s.location?.longitude != null)
    .map(s => {
      const marker = new mapboxgl.Marker({ element: createStationMarkerEl() })
        .setLngLat([parseFloat(s.location.longitude), parseFloat(s.location.latitude)])
        .addTo(map)
      marker.getElement().style.zIndex = '1'
      marker.getElement().style.cursor = 'pointer'
      marker.getElement().addEventListener('click', (e) => {
        e.stopPropagation()
        previewStation.value = s
      })
      // Si esta estación ya estaba seleccionada antes de reconstruir los pines
      // (p.ej. al cambiar el filtro), que se note cuál es sin tener que darle clic de nuevo
      if (previewStation.value?.id != null && s.id === previewStation.value.id) {
        marker.getElement().querySelector('.ug-station-marker-inner')?.classList.add('ug-station-marker-selected')
      }
      if (s.id != null) stationMarkersById.set(s.id, marker)
      return marker
    })
}

// Cambia el pin a morado cuando su estación es la seleccionada (tarjeta
// flotante abierta), sin reconstruir todos los marcadores
watch(previewStation, (newStation, oldStation) => {
  if (oldStation?.id != null) {
    stationMarkersById.get(oldStation.id)?.getElement()
      .querySelector('.ug-station-marker-inner')?.classList.remove('ug-station-marker-selected')
  }
  if (newStation?.id != null) {
    stationMarkersById.get(newStation.id)?.getElement()
      .querySelector('.ug-station-marker-inner')?.classList.add('ug-station-marker-selected')
  }
})

// Al hacer clic en una tarjeta de la lista: en vez de tapar la pantalla con
// la vista previa, se hace zoom hacia su pin en el mapa y se anima para
// señalar cuál es
function highlightStation(station) {
  const marker = station.id != null ? stationMarkersById.get(station.id) : null
  if (!marker || !map) return
  const lngLat = marker.getLngLat()
  map.flyTo({ center: [lngLat.lng, lngLat.lat], zoom: Math.max(map.getZoom(), 14), duration: 600 })

  const inner = marker.getElement().querySelector('.ug-station-marker-inner')
  if (!inner) return
  inner.classList.remove('ug-marker-bounce')
  void inner.offsetWidth // reinicia la animación si se hace clic varias veces seguidas
  inner.classList.add('ug-marker-bounce')
}

// Mapbox a veces calcula que la ruta "más rápida" entre dos ciudades mexicanas
// cruza por Estados Unidos (carreteras más rápidas del otro lado de la
// frontera). Se detecta muestreando la ruta y viendo qué tanto de ella cae
// fuera del polígono de México.
function routeCrossesBorder(coords) {
  const samples = sampleRoute(coords, 20)
  if (samples.length === 0) return false
  const outsideCount = samples.filter(([lng, lat]) => !isInsideMexico(lng, lat)).length
  return outsideCount / samples.length > 0.1
}

async function buildRouteOption(route, refLat, wasFastest) {
  const totalMinutes = Math.round(route.duration / 60)

  const samples = sampleRoute(route.geometry.coordinates, 15)
  const results = await Promise.all(samples.map(([lng, lat]) => fetchStationsNear(lat, lng, 10)))
  const byId = new Map()
  results.flat().forEach(s => {
    if (s?.id != null) byId.set(s.id, s)
  })

  // De los candidatos cercanos a los puntos muestreados, quedarnos solo con
  // los que realmente caen dentro del corredor de la ruta (no del área abierta)
  const routeStations = Array.from(byId.values()).filter(s => {
    const lat = parseFloat(s.location?.latitude)
    const lng = parseFloat(s.location?.longitude)
    if (!isFinite(lat) || !isFinite(lng)) return false
    return distanceToRouteKm(lat, lng, route.geometry.coordinates, refLat) <= ROUTE_CORRIDOR_KM
  })

  return {
    geometry: route.geometry,
    distanceKm: (route.distance / 1000).toFixed(0),
    durationLabel: totalMinutes >= 60
      ? `${Math.floor(totalMinutes / 60)} h ${totalMinutes % 60} min`
      : `${totalMinutes} min`,
    stations: routeStations,
    crossesBorder: routeCrossesBorder(route.geometry.coordinates),
    wasFastest
  }
}

function selectRoute(index) {
  const option = routeOptions.value[index]
  if (!option) return
  selectedRouteIndex.value = index
  routeSummary.value = { distanceKm: option.distanceKm, durationLabel: option.durationLabel }
  stations.value = option.stations
  drawRoute(option.geometry)
  // Respeta el filtro de producto activo (si ya estabas filtrando por diésel
  // y cambias de opción de ruta o reordenas, el mapa se queda filtrado igual)
  plotStations(filteredStations.value)
}

async function traceRoute() {
  if (!allPointsReady.value) return

  tracing.value = true
  searched.value = true
  error.value = null
  stations.value = []
  routeSummary.value = null
  routeOptions.value = []
  selectedRouteIndex.value = 0
  mobileShowForm.value = false

  try {
    const coordsStr = points.value.map(p => `${p.place.location.lng},${p.place.location.lat}`).join(';')
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordsStr}?geometries=geojson&overview=full&alternatives=true&access_token=${MAPBOX_TOKEN}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('No se pudo calcular la ruta.')
    const data = await res.json()
    const routes = data.routes || []
    if (!routes.length) throw new Error('No se encontró una ruta entre esos puntos.')

    const refLat = points.value.reduce((sum, p) => sum + p.place.location.lat, 0) / points.value.length
    const built = await Promise.all(routes.map((r, i) => buildRouteOption(r, refLat, i === 0)))
    // Priorizar las rutas que se quedan dentro de México sobre las que cruzan
    // a EE. UU., aunque Mapbox las haya marcado como "más rápidas"
    routeOptions.value = built.sort((a, b) => Number(a.crossesBorder) - Number(b.crossesBorder))

    plotWaypointMarkers()
    selectRoute(0)
  } catch (err) {
    error.value = err.message || 'Ocurrió un error al trazar la ruta.'
  } finally {
    tracing.value = false
  }
}

watch(pickIndex, (val) => {
  if (!map) return
  map.getCanvas().style.cursor = val !== null ? 'crosshair' : ''
})

let mapResizeObserver = null

onMounted(() => {
  mapboxgl.accessToken = MAPBOX_TOKEN
  map = new mapboxgl.Map({
    container: mapEl.value,
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-102.5, 23.6],
    zoom: 4.4
  })
  map.addControl(new mapboxgl.NavigationControl(), 'top-right')
  map.on('click', handleMapClick)

  // El canvas de Mapbox no se ajusta solo cuando su contenedor cambia de
  // tamaño (p.ej. al mostrar la lista de estaciones u opciones de ruta)
  mapResizeObserver = new ResizeObserver(() => {
    if (map) map.resize()
  })
  mapResizeObserver.observe(mapEl.value)

  if (navigator.geolocation) {
    getCurrentPositionWithRetry(
      (pos) => {
        const { latitude, longitude } = pos.coords
        showUserLocationMarker(latitude, longitude)
        if (map) map.flyTo({ center: [longitude, latitude], zoom: 10 })
      },
      () => {
        // Sin permiso o no disponible: es solo un plus visual, no bloquea nada
      },
      { enableHighAccuracy: false, timeout: 6000 }
    )
  }
})

onBeforeUnmount(() => {
  debounceTimers.forEach(t => clearTimeout(t))
  if (mapResizeObserver) mapResizeObserver.disconnect()
  if (map) map.remove()
})
</script>

<style>
.ug-user-location-dot {
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: #2563eb;
  border: 3px solid white;
  box-shadow: 0 0 0 rgba(37, 99, 235, 0.5);
  animation: ug-pulse 2s infinite;
}

@keyframes ug-pulse {
  0% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.5); }
  70% { box-shadow: 0 0 0 14px rgba(37, 99, 235, 0); }
  100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
}

.ug-station-marker-inner {
  width: 38px;
  height: 38px;
  border-radius: 9999px;
  background: #2563eb;
  border: 3px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  transition: background-color 0.2s ease;
}

.ug-station-marker-inner.ug-station-marker-selected {
  background: #7c3aed;
}

.ug-marker-bounce {
  animation: ug-marker-bounce 0.7s ease-out;
}

@keyframes ug-marker-bounce {
  0%, 100% { transform: scale(1) translateY(0); }
  30% { transform: scale(1.4) translateY(-12px); }
  55% { transform: scale(1) translateY(0); }
  75% { transform: scale(1.15) translateY(-5px); }
}
</style>
