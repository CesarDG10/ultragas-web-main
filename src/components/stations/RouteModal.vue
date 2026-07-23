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
            ref="formPanelEl"
            @scroll="updateScrollHint"
            class="relative w-full lg:w-[380px] flex-shrink-0 bg-slate-50 border-b-2 border-gray-200 lg:border-b-0 lg:border-r lg:border-gray-200 shadow-[0_8px_10px_-8px_rgba(0,0,0,0.2)] lg:shadow-none overflow-y-auto max-h-[40vh] lg:max-h-none lg:h-full"
          >
            <div ref="formContentEl" class="p-5">
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
                      {{ idx === 0 ? 'Ruta más rápida' : `Alternativa ${idx}` }}
                    </span>
                    <span class="flex items-center gap-1 text-xs font-bold text-brand-blue flex-shrink-0">
                      <i class="fa-solid fa-gas-pump"></i> {{ opt.stations.length }}
                    </span>
                  </div>
                  <p class="text-xs text-gray-500 mt-1">{{ opt.distanceKm }} km &middot; {{ opt.durationLabel }}</p>
                </button>
              </div>
            </div>

            <div v-else-if="routeSummary" class="mt-4 flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm">
              <div>
                <p class="text-gray-500 text-xs">Distancia</p>
                <p class="font-bold text-gray-900">{{ routeSummary.distanceKm }} km</p>
              </div>
              <div>
                <p class="text-gray-500 text-xs">Duración aprox.</p>
                <p class="font-bold text-gray-900">{{ routeSummary.durationLabel }}</p>
              </div>
            </div>

            <div v-if="stations.length" class="mt-5">
              <h3 class="text-sm font-bold text-gray-900 mb-2">
                Estaciones en la ruta ({{ stations.length }})
              </h3>
              <div class="space-y-2">
                <div
                  v-for="s in stations"
                  :key="s.id"
                  class="border border-gray-200 rounded-xl p-3 hover:border-brand-blue/50 transition-colors"
                >
                  <p class="font-semibold text-gray-900 text-sm truncate">{{ s.name || 'Estación de servicio' }}</p>
                  <p class="text-xs text-gray-500 truncate">
                    {{ [s.address?.city, s.address?.state].filter(Boolean).join(', ') }}
                  </p>
                  <p v-if="stationPL(s)" class="text-[11px] text-gray-400 mt-1">
                    PL: {{ stationPL(s) }}
                  </p>
                  <p v-if="stationCoords(s)" class="text-[11px] text-gray-400 font-mono">
                    {{ stationCoords(s) }}
                  </p>
                </div>
              </div>
            </div>

            <div v-else-if="searched && !tracing" class="mt-5 text-sm text-gray-500">
              No se encontraron estaciones cercanas a esta ruta.
            </div>
            </div>

            <!-- Aviso de que hay más contenido abajo (solo móvil). Es un botón real
                 (no solo decorativo) para que el toque no "atraviese" a lo que hay detrás -->
            <button
              v-if="showScrollHint"
              type="button"
              @click="scrollPanelHint"
              class="lg:hidden absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent flex items-end justify-center pb-1.5"
            >
              <span class="w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center">
                <i class="fa-solid fa-chevron-down text-brand-blue text-sm animate-bounce"></i>
              </span>
            </button>
          </div>

          <!-- Mapa -->
          <div class="flex-1 relative min-h-[300px] lg:min-h-0">
            <div ref="mapEl" class="absolute inset-0"></div>

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

defineEmits(['close'])

const MAX_STOPS = 5
const MAX_POINTS = MAX_STOPS + 2

const mapEl = ref(null)
let map = null
let waypointMarkers = []
let stationMarkers = []
let userLocationMarker = null

const formPanelEl = ref(null)
const formContentEl = ref(null)
const showScrollHint = ref(false)

function updateScrollHint() {
  const el = formPanelEl.value
  if (!el) {
    showScrollHint.value = false
    return
  }
  const hasOverflow = el.scrollHeight > el.clientHeight + 4
  const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 16
  showScrollHint.value = hasOverflow && !nearBottom
}

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

const allPointsReady = computed(() => points.value.every(p => p.place?.location))

function stationPL(station) {
  return station.plCode ?? station.pl_code ?? null
}

function stationCoords(station) {
  const lat = parseFloat(station.location?.latitude)
  const lng = parseFloat(station.location?.longitude)
  if (!isFinite(lat) || !isFinite(lng)) return null
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`
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

function scrollPanelHint() {
  const el = formPanelEl.value
  if (!el) return
  el.scrollBy({ top: Math.round(el.clientHeight * 0.6), behavior: 'smooth' })
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

function usePointCurrentLocation(index) {
  if (!navigator.geolocation) {
    error.value = 'Tu navegador no soporta geolocalización.'
    return
  }
  locatingIndex.value = index
  navigator.geolocation.getCurrentPosition(
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

function plotStations(list) {
  clearMarkers(stationMarkers)
  stationMarkers = list
    .filter(s => s.location?.latitude != null && s.location?.longitude != null)
    .map(s => {
      const marker = new mapboxgl.Marker({ color: '#2563eb' })
        .setLngLat([parseFloat(s.location.longitude), parseFloat(s.location.latitude)])
        .setPopup(new mapboxgl.Popup({ offset: 16 }).setHTML(`<strong>${s.name || 'Estación'}</strong>`))
        .addTo(map)
      marker.getElement().style.zIndex = '1'
      return marker
    })
}

async function buildRouteOption(route, refLat) {
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
    stations: routeStations
  }
}

function selectRoute(index) {
  const option = routeOptions.value[index]
  if (!option) return
  selectedRouteIndex.value = index
  routeSummary.value = { distanceKm: option.distanceKm, durationLabel: option.durationLabel }
  stations.value = option.stations
  drawRoute(option.geometry)
  plotStations(option.stations)
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

  try {
    const coordsStr = points.value.map(p => `${p.place.location.lng},${p.place.location.lat}`).join(';')
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordsStr}?geometries=geojson&overview=full&alternatives=true&access_token=${MAPBOX_TOKEN}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('No se pudo calcular la ruta.')
    const data = await res.json()
    const routes = data.routes || []
    if (!routes.length) throw new Error('No se encontró una ruta entre esos puntos.')

    const refLat = points.value.reduce((sum, p) => sum + p.place.location.lat, 0) / points.value.length
    routeOptions.value = await Promise.all(routes.map(r => buildRouteOption(r, refLat)))

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
let formResizeObserver = null

onMounted(() => {
  formResizeObserver = new ResizeObserver(() => updateScrollHint())
  if (formContentEl.value) formResizeObserver.observe(formContentEl.value)
  requestAnimationFrame(updateScrollHint)

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
    navigator.geolocation.getCurrentPosition(
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
  if (formResizeObserver) formResizeObserver.disconnect()
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
</style>
