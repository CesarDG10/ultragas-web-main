<template>
  <div class="flex flex-col h-full min-h-0 border-l border-gray-200 shadow-2xl bg-gradient-to-b from-white to-slate-50 transition-all duration-300">
    <!-- Vista colapsada -->
    <div v-if="collapsed" class="flex flex-col items-center justify-start h-full min-h-0 py-8">
      <button
        @click="handleExpand"
        class="flex flex-col items-center justify-center p-4 rounded-2xl hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-blue"
        :title="`${activeFiltersCount} filtro(s) activo(s)`"
      >
        <div class="relative">
          <i class="fa-solid fa-filter text-2xl text-brand-blue"></i>
          <span 
            v-if="activeFiltersCount > 0"
            class="absolute -top-2 -right-2 flex items-center justify-center min-w-[24px] h-6 px-1.5 text-xs font-bold text-white bg-gradient-to-r from-brand-blue to-brand-purple rounded-full"
          >
            {{ activeFiltersCount }}
          </span>
        </div>
        <span class="mt-4 text-xs font-semibold text-gray-500 writing-mode-vertical transform rotate-180">FILTROS</span>
      </button>
    </div>

    <!-- Vista expandida -->
    <div v-else class="flex flex-col h-full min-h-0">
      <!-- Header del panel -->
      <div class="p-6 pb-4 border-b border-gray-100 flex-none bg-white">
        <div v-if="isMobile" class="flex items-center gap-3 mb-4">
          <button
            @click="emit('close')"
            class="p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Volver"
          >
            <i class="fa-solid fa-arrow-left text-gray-600 text-lg"></i>
          </button>
          <span class="text-sm font-medium text-gray-500">Filtros</span>
        </div>
        <h1 class="text-3xl font-bold mb-6"><span class="gradient-text-brand">Buscar</span> Estaciones</h1>
        <div class="relative group">
          <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors"></i>
          <input
            ref="searchInputRef"
            v-model="searchQuery"
            @input="handleSearchInput"
            @focus="showPredictions = true"
            @blur="handleBlur"
            @keydown.enter="handleEnterKey"
            type="text"
            placeholder="Ciudad, Estado o Nombre de Estación"
            class="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 text-base shadow-sm focus:ring-2 focus:ring-[#2573D9]/20 focus:border-[#2573D9] transition-all outline-none"
          />
          <!-- Dropdown combinado: estaciones + ubicaciones Google Places -->
          <div
            v-if="showPredictions && (stationSuggestions.length > 0 || predictions.length > 0)"
            class="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl max-h-80 overflow-y-auto"
          >
            <!-- Sección Estaciones -->
            <div v-if="stationSuggestions.length > 0">
              <div class="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100 flex items-center gap-1.5">
                <i class="fa-solid fa-gas-pump"></i> Estaciones
              </div>
              <div
                v-for="station in stationSuggestions"
                :key="station.id"
                @mousedown="handleStationSelect(station)"
                class="px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
              >
                <div class="flex items-start gap-3">
                  <i class="fa-solid fa-gas-pump text-brand-blue mt-0.5 flex-shrink-0"></i>
                  <div class="flex-1 min-w-0">
                    <div class="font-semibold text-gray-900 truncate">{{ station.name }}</div>
                    <div class="text-xs text-gray-500 truncate">
                      {{ [station.address?.city, station.address?.state].filter(Boolean).join(', ') }}
                      <span v-if="station.folioPemex ?? station.folio_pemex" class="ml-1 text-gray-400">· {{ station.folioPemex ?? station.folio_pemex }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Separador entre secciones -->
            <div v-if="stationSuggestions.length > 0 && predictions.length > 0" class="border-t border-gray-200"></div>

            <!-- Sección Ubicaciones (Google Places) -->
            <div v-if="predictions.length > 0">
              <div class="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-50 border-b border-gray-100 flex items-center gap-1.5">
                <i class="fa-solid fa-location-dot"></i> Ubicaciones
              </div>
              <div
                v-for="prediction in predictions"
                :key="prediction.placeId"
                @mousedown="handlePredictionSelect(prediction)"
                class="px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
              >
                <div class="flex items-start gap-3">
                  <i class="fa-solid fa-location-dot text-brand-blue mt-0.5 flex-shrink-0"></i>
                  <div class="flex-1 min-w-0">
                    <div class="font-semibold text-gray-900 truncate">{{ prediction.mainText }}</div>
                    <div class="text-sm text-gray-500 truncate">{{ prediction.secondaryText }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <!-- Indicador de carga -->
        <div v-if="isSearching" class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
          <i class="fa-solid fa-spinner animate-spin text-brand-blue"></i>
        </div>
        </div>
      </div>

      <!-- Contenido del panel -->
      <div class="flex-1 min-h-0 overflow-y-auto overscroll-contain sidebar-scroll p-6 pt-4">
      <!-- Sección de Productos -->
      <div class="mb-8 mt-4">
        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <i class="fa-solid fa-gas-pump text-brand-blue"></i>
          Productos
        </h3>
        <div class="grid grid-cols-2 gap-3">
          <!-- Premium -->
          <label class="cursor-pointer group relative">
            <input
              v-model="selectedProducts.premium"
              type="checkbox"
              class="peer sr-only"
            />
            <div 
              class="p-4 bg-white border-2 border-gray-200 rounded-2xl flex items-center gap-3 transition-all hover:border-gray-300"
              :class="selectedProducts.premium ? 'border-red-500 bg-red-50' : ''"
            >
              <div 
                class="w-5 h-5 border-2 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                :class="selectedProducts.premium ? 'border-red-500 bg-red-500' : 'border-gray-300 bg-white'"
              >
                <i v-if="selectedProducts.premium" class="fa-solid fa-check text-xs text-white"></i>
              </div>
              <span 
                class="text-sm font-bold"
                :class="selectedProducts.premium ? 'text-red-600' : 'text-gray-700'"
              >Premium</span>
            </div>
          </label>
          <!-- Magna -->
          <label class="cursor-pointer group relative">
            <input
              v-model="selectedProducts.magna"
              type="checkbox"
              class="peer sr-only"
            />
            <div 
              class="p-4 bg-white border-2 border-gray-200 rounded-2xl flex items-center gap-3 transition-all hover:border-gray-300"
              :class="selectedProducts.magna ? 'border-green-500 bg-green-50' : ''"
            >
              <div 
                class="w-5 h-5 border-2 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                :class="selectedProducts.magna ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white'"
              >
                <i v-if="selectedProducts.magna" class="fa-solid fa-check text-xs text-white"></i>
              </div>
              <span 
                class="text-sm font-bold"
                :class="selectedProducts.magna ? 'text-green-600' : 'text-gray-700'"
              >Magna</span>
            </div>
          </label>
          <!-- Diesel -->
          <label class="cursor-pointer group relative">
            <input
              v-model="selectedProducts.diesel"
              type="checkbox"
              class="peer sr-only"
            />
            <div 
              class="p-4 bg-white border-2 border-gray-200 rounded-2xl flex items-center gap-3 transition-all hover:border-gray-300"
              :class="selectedProducts.diesel ? 'border-slate-600 bg-slate-50' : ''"
            >
              <div 
                class="w-5 h-5 border-2 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                :class="selectedProducts.diesel ? 'border-slate-600 bg-slate-600' : 'border-gray-300 bg-white'"
              >
                <i v-if="selectedProducts.diesel" class="fa-solid fa-check text-xs text-white"></i>
              </div>
              <span 
                class="text-sm font-bold"
                :class="selectedProducts.diesel ? 'text-slate-700' : 'text-gray-700'"
              >Diesel</span>
            </div>
          </label>
          <!-- Diesel UBA -->
          <label class="cursor-pointer group relative">
            <input
              v-model="selectedProducts.dieselUba"
              type="checkbox"
              class="peer sr-only"
            />
            <div 
              class="p-4 bg-white border-2 border-gray-200 rounded-2xl flex items-center gap-3 transition-all hover:border-gray-300"
              :class="selectedProducts.dieselUba ? 'border-slate-700 bg-slate-50' : ''"
            >
              <div 
                class="w-5 h-5 border-2 rounded-lg flex items-center justify-center flex-shrink-0 transition-all"
                :class="selectedProducts.dieselUba ? 'border-slate-700 bg-slate-700' : 'border-gray-300 bg-white'"
              >
                <i v-if="selectedProducts.dieselUba" class="fa-solid fa-check text-xs text-white"></i>
              </div>
              <span 
                class="text-sm font-bold"
                :class="selectedProducts.dieselUba ? 'text-slate-800' : 'text-gray-700'"
              >Diesel UBA</span>
            </div>
          </label>
        </div>
      </div>

      <!-- Sección de Amenidades -->
      <div class="mb-8">
        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <i class="fa-solid fa-star text-brand-purple"></i>
          Amenidades
        </h3>
        <div class="space-y-2">
          <label class="flex items-center gap-3 cursor-pointer group p-3 bg-white hover:bg-blue-50 rounded-xl transition-all border-2 border-transparent hover:border-[#2573D9]/20">
            <div class="relative flex items-center">
              <input v-model="selectedAmenities.isOpen24Hours" type="checkbox" class="sr-only" />
              <div 
                class="w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all shadow-sm"
                :class="selectedAmenities.isOpen24Hours ? 'bg-gradient-to-br from-[#2573D9] to-[#8434E1] border-transparent text-white' : 'border-gray-300 bg-white'"
              >
                <i class="fa-solid fa-check text-xs" :class="selectedAmenities.isOpen24Hours ? 'opacity-100' : 'opacity-0'"></i>
              </div>
            </div>
            <div class="flex items-center gap-3 text-gray-700 flex-1">
              <div class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <i class="fa-regular fa-clock text-brand-blue"></i>
              </div>
              <span class="text-sm font-semibold">Abierto 24 Horas</span>
            </div>
          </label>
          <label class="flex items-center gap-3 cursor-pointer group p-3 bg-white hover:bg-blue-50 rounded-xl transition-all border-2 border-transparent hover:border-[#2573D9]/20">
            <div class="relative flex items-center">
              <input v-model="selectedAmenities.hasRestrooms" type="checkbox" class="sr-only" />
              <div 
                class="w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all shadow-sm"
                :class="selectedAmenities.hasRestrooms ? 'bg-gradient-to-br from-[#2573D9] to-[#8434E1] border-transparent text-white' : 'border-gray-300 bg-white'"
              >
                <i class="fa-solid fa-check text-xs" :class="selectedAmenities.hasRestrooms ? 'opacity-100' : 'opacity-0'"></i>
              </div>
            </div>
            <div class="flex items-center gap-3 text-gray-700 flex-1">
              <div class="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <i class="fa-solid fa-restroom text-brand-purple"></i>
              </div>
              <span class="text-sm font-semibold">Baños</span>
            </div>
          </label>
          <label class="flex items-center gap-3 cursor-pointer group p-3 bg-white hover:bg-blue-50 rounded-xl transition-all border-2 border-transparent hover:border-[#2573D9]/20">
            <div class="relative flex items-center">
              <input v-model="selectedAmenities.hasRestArea" type="checkbox" class="sr-only" />
              <div 
                class="w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all shadow-sm"
                :class="selectedAmenities.hasRestArea ? 'bg-gradient-to-br from-[#2573D9] to-[#8434E1] border-transparent text-white' : 'border-gray-300 bg-white'"
              >
                <i class="fa-solid fa-check text-xs" :class="selectedAmenities.hasRestArea ? 'opacity-100' : 'opacity-0'"></i>
              </div>
            </div>
            <div class="flex items-center gap-3 text-gray-700 flex-1">
              <div class="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <i class="fa-solid fa-couch text-orange-500"></i>
              </div>
              <span class="text-sm font-semibold">Área de Descanso</span>
            </div>
          </label>
          <label class="flex items-center gap-3 cursor-pointer group p-3 bg-white hover:bg-blue-50 rounded-xl transition-all border-2 border-transparent hover:border-[#2573D9]/20">
            <div class="relative flex items-center">
              <input v-model="selectedAmenities.hasConvenienceStore" type="checkbox" class="sr-only" />
              <div 
                class="w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all shadow-sm"
                :class="selectedAmenities.hasConvenienceStore ? 'bg-gradient-to-br from-[#2573D9] to-[#8434E1] border-transparent text-white' : 'border-gray-300 bg-white'"
              >
                <i class="fa-solid fa-check text-xs" :class="selectedAmenities.hasConvenienceStore ? 'opacity-100' : 'opacity-0'"></i>
              </div>
            </div>
            <div class="flex items-center gap-3 text-gray-700 flex-1">
              <div class="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                <i class="fa-solid fa-cart-shopping text-brand-red"></i>
              </div>
              <span class="text-sm font-semibold">Tienda de Conveniencia</span>
            </div>
          </label>
          <label class="flex items-center gap-3 cursor-pointer group p-3 bg-white hover:bg-blue-50 rounded-xl transition-all border-2 border-transparent hover:border-[#2573D9]/20">
            <div class="relative flex items-center">
              <input v-model="selectedAmenities.hasRestaurant" type="checkbox" class="sr-only" />
              <div 
                class="w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all shadow-sm"
                :class="selectedAmenities.hasRestaurant ? 'bg-gradient-to-br from-[#2573D9] to-[#8434E1] border-transparent text-white' : 'border-gray-300 bg-white'"
              >
                <i class="fa-solid fa-check text-xs" :class="selectedAmenities.hasRestaurant ? 'opacity-100' : 'opacity-0'"></i>
              </div>
            </div>
            <div class="flex items-center gap-3 text-gray-700 flex-1">
              <div class="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                <i class="fa-solid fa-utensils text-yellow-600"></i>
              </div>
              <span class="text-sm font-semibold">Restaurante</span>
            </div>
          </label>
          <label class="flex items-center gap-3 cursor-pointer group p-3 bg-white hover:bg-blue-50 rounded-xl transition-all border-2 border-transparent hover:border-[#2573D9]/20">
            <div class="relative flex items-center">
              <input v-model="selectedAmenities.hasChargingPositions" type="checkbox" class="sr-only" />
              <div 
                class="w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all shadow-sm"
                :class="selectedAmenities.hasChargingPositions ? 'bg-gradient-to-br from-[#2573D9] to-[#8434E1] border-transparent text-white' : 'border-gray-300 bg-white'"
              >
                <i class="fa-solid fa-check text-xs" :class="selectedAmenities.hasChargingPositions ? 'opacity-100' : 'opacity-0'"></i>
              </div>
            </div>
            <div class="flex items-center gap-3 text-gray-700 flex-1">
              <div class="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center">
                <i class="fa-solid fa-bolt text-yellow-400"></i>
              </div>
              <span class="text-sm font-semibold">Carga Eléctrica</span>
            </div>
          </label>
          <label class="flex items-center gap-3 cursor-pointer group p-3 bg-white hover:bg-blue-50 rounded-xl transition-all border-2 border-transparent hover:border-[#2573D9]/20">
            <div class="relative flex items-center">
              <input v-model="selectedAmenities.hasTruckStop" type="checkbox" class="sr-only" />
              <div 
                class="w-6 h-6 border-2 rounded-lg flex items-center justify-center transition-all shadow-sm"
                :class="selectedAmenities.hasTruckStop ? 'bg-gradient-to-br from-[#2573D9] to-[#8434E1] border-transparent text-white' : 'border-gray-300 bg-white'"
              >
                <i class="fa-solid fa-check text-xs" :class="selectedAmenities.hasTruckStop ? 'opacity-100' : 'opacity-0'"></i>
              </div>
            </div>
            <div class="flex items-center gap-3 text-gray-700 flex-1">
              <div class="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
                <i class="fa-solid fa-bus text-indigo-500"></i>
              </div>
              <span class="text-sm font-semibold">Parada de Camiones</span>
            </div>
          </label>
        </div>
      </div>
    </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import { useGooglePlacesAutocomplete } from '../composables/useGooglePlacesAutocomplete.js'

const props = defineProps({
  initialFilters: {
    type: Object,
    default: () => ({
      searchQuery: '',
      products: [],
      amenities: {}
    })
  },
  collapsed: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  stations: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['filter', 'cancel', 'expand', 'location-selected', 'close', 'station-selected'])

// Referencia al input de búsqueda
const searchInputRef = ref(null)

// Estado para controlar la visibilidad del dropdown de predicciones
const showPredictions = ref(false)

// Inicializar Google Places Autocomplete
const { 
  predictions, 
  selectedPlace, 
  isLoaded: placesLoaded, 
  isSearching, 
  error: placesError,
  searchPlaces,
  selectPrediction,
  clearPredictions
} = useGooglePlacesAutocomplete()

// Debounce timer para la búsqueda
let searchDebounceTimer = null
// Flag para evitar el loop: props → estado interno → emit → props → ...
let syncingFromProps = false

const PRODUCT_KEYS = ['premium', 'magna', 'diesel', 'dieselUba']

function parseInitialProducts(products) {
  const out = { premium: false, magna: false, diesel: false, dieselUba: false }
  if (!products) return out
  const arr = Array.isArray(products) ? products : (products ? [products] : [])
  arr.forEach(p => {
    const raw = (p || '').toLowerCase()
    if (raw === 'diesel-uba' || raw === 'dieseluba') out.dieselUba = true
    else if (raw === 'premium') out.premium = true
    else if (raw === 'magna') out.magna = true
    else if (raw === 'diesel') out.diesel = true
  })
  return out
}

const normalize = (str) =>
  (str || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const stationSuggestions = computed(() => {
  if (!searchQuery.value || searchQuery.value.trim().length < 2) return []
  const term = normalize(searchQuery.value.trim())
  return (props.stations || [])
    .filter(station => {
      return (
        normalize(station.name).includes(term) ||
        normalize(station.folioPemex ?? station.folio_pemex).includes(term) ||
        normalize(station.creID ?? station.cre_id).includes(term) ||
        normalize(station.plCode ?? station.pl_code).includes(term) ||
        normalize(station.address?.city).includes(term) ||
        normalize(station.address?.state).includes(term)
      )
    })
    .slice(0, 5)
})

const searchQuery = ref(props.initialFilters.searchQuery || '')
const selectedProducts = ref(parseInitialProducts(props.initialFilters.products ?? props.initialFilters.product))
const selectedAmenities = ref({
  isOpen24Hours: props.initialFilters.amenities?.isOpen24Hours || false,
  hasRestrooms: props.initialFilters.amenities?.hasRestrooms || false,
  hasRestArea: props.initialFilters.amenities?.hasRestArea || false,
  hasConvenienceStore: props.initialFilters.amenities?.hasConvenienceStore || false,
  hasRestaurant: props.initialFilters.amenities?.hasRestaurant || false,
  hasChargingPositions: props.initialFilters.amenities?.hasChargingPositions || false,
  hasTruckStop: props.initialFilters.amenities?.hasTruckStop || false
})

// Observar cambios en los filtros iniciales
watch(() => props.initialFilters, (newFilters) => {
  syncingFromProps = true
  searchQuery.value = newFilters.searchQuery || ''
  selectedProducts.value = parseInitialProducts(newFilters.products ?? newFilters.product)
  if (newFilters.amenities) {
    selectedAmenities.value = {
      isOpen24Hours: newFilters.amenities.isOpen24Hours || false,
      hasRestrooms: newFilters.amenities.hasRestrooms || false,
      hasRestArea: newFilters.amenities.hasRestArea || false,
      hasConvenienceStore: newFilters.amenities.hasConvenienceStore || false,
      hasRestaurant: newFilters.amenities.hasRestaurant || false,
      hasChargingPositions: newFilters.amenities.hasChargingPositions || false,
      hasTruckStop: newFilters.amenities.hasTruckStop || false
    }
  }
  nextTick(() => { syncingFromProps = false })
}, { deep: true })

const handleSearchInput = () => {
  if (searchDebounceTimer) {
    clearTimeout(searchDebounceTimer)
  }

  if (!searchQuery.value || searchQuery.value.trim().length === 0) {
    clearPredictions()
    showPredictions.value = false
    handleFilter()
    return
  }

  showPredictions.value = true
  searchDebounceTimer = setTimeout(() => {
    searchPlaces(searchQuery.value)
  }, 300)
}

const handleStationSelect = (station) => {
  searchQuery.value = station.name
  showPredictions.value = false
  clearPredictions()
  emit('station-selected', station)
}

const handlePredictionSelect = (prediction) => {
  selectPrediction(prediction)
  searchQuery.value = prediction.mainText
  showPredictions.value = false
}

const handleBlur = () => {
  // Usar setTimeout para permitir que el click en una predicción se registre primero
  setTimeout(() => {
    showPredictions.value = false
  }, 200)
}

const handleEnterKey = (event) => {
  // Si hay predicciones visibles, no hacer nada (dejar que el usuario seleccione)
  if (showPredictions.value && predictions.value.length > 0) {
    // Opcionalmente, podríamos seleccionar la primera predicción automáticamente
    // pero es mejor dejar que el usuario elija explícitamente
    return
  }
  
  // Si no hay predicciones o están ocultas, aplicar el filtro como búsqueda de texto
  if (searchQuery.value && searchQuery.value.trim()) {
    //console.log('Enter presionado sin selección de ubicación, aplicando filtro de texto')
    // Ocultar predicciones si están visibles
    showPredictions.value = false
    clearPredictions()
    
    // Aplicar el filtro
    handleFilter()
  }
}

watch([selectedProducts, selectedAmenities], () => {
  if (!syncingFromProps) {
    handleFilter()
  }
}, { deep: true })

// Observar cambios en selectedPlace para emitir el evento de selección de ubicación
watch(selectedPlace, (newPlace) => {
  if (newPlace && newPlace.location) {
    //console.log('Ubicación geográfica seleccionada:', newPlace)
    // Emitir evento con los datos de la ubicación
    emit('location-selected', {
      name: newPlace.name,
      formattedAddress: newPlace.formattedAddress,
      location: newPlace.location,
      viewport: newPlace.viewport
    })
  }
})

const handleFilter = () => {
  const products = PRODUCT_KEYS.filter(k => selectedProducts.value[k]).map(k => k === 'dieselUba' ? 'diesel-uba' : k)
  const filters = {
    searchQuery: searchQuery.value.trim(),
    products: products.length ? products : null,
    amenities: { ...selectedAmenities.value }
  }
  emit('filter', filters)
}

const handleCancel = () => {
  // Resetear a valores iniciales
  searchQuery.value = ''
  selectedProducts.value = { premium: false, magna: false, diesel: false, dieselUba: false }
  selectedAmenities.value = {
    isOpen24Hours: false,
    hasRestrooms: false,
    hasRestArea: false,
    hasConvenienceStore: false,
    hasRestaurant: false,
    hasChargingPositions: false,
    hasTruckStop: false
  }
  emit('cancel')
}

const handleExpand = () => {
  emit('expand')
}

// Calcular el número de filtros activos
const activeFiltersCount = computed(() => {
  let count = 0
  if (searchQuery.value && searchQuery.value.trim()) {
    count++
  }
  const productsCount = PRODUCT_KEYS.filter(k => selectedProducts.value[k]).length
  if (productsCount > 0) count += productsCount
  // Contar amenidades seleccionadas
  Object.values(selectedAmenities.value).forEach(value => {
    if (value) count++
  })
  return count
})
</script>

<style scoped>
.writing-mode-vertical {
  writing-mode: vertical-rl;
}
</style>
