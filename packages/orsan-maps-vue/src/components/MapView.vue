<template>
  <div class="w-full h-full overflow-hidden">
    <!-- Layout Desktop -->
    <div v-if="!isMobile" class="flex w-full h-full">
      <!-- Mapa -->
      <div class="relative flex-1 h-full">
        <div ref="mapContainerRef" class="w-full h-full orsan-map-canvas"></div>

        <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div class="text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p class="text-gray-600">Cargando mapa...</p>
          </div>
        </div>
        <div v-if="error" class="absolute top-4 left-4 bg-red-500 text-white p-4 rounded shadow-lg z-50 max-w-md">
          <p class="font-bold">Error al cargar el mapa:</p>
          <p class="text-sm">{{ error }}</p>
          <p class="text-xs mt-2">Revisa la consola del navegador para más detalles</p>
        </div>
      </div>
      
      <!-- Panel de detalles de la estación (solo visible cuando hay una estación seleccionada) -->
      <div v-if="selectedStation" class="w-[420px] flex-shrink-0 h-full min-h-0 self-stretch">
        <StationDetailsPanel
          :station="selectedStation"
          @close="closeStationDetails"
        />
      </div>
      
      <!-- Panel de filtros -->
      <div :class="selectedStation ? 'w-20' : 'w-[420px]'" class="flex-shrink-0 h-full min-h-0 self-stretch transition-all duration-300">
        <FilterPanel
          :initial-filters="currentFilters"
          :collapsed="!!selectedStation"
          @filter="applyFilters"
          @cancel="cancelFilters"
          @expand="closeStationDetails"
          @location-selected="handleLocationSelected"
        />
      </div>
    </div>

    <!-- Layout Mobile -->
    <div v-else class="relative w-full h-full">
      <!-- Mapa -->
      <div ref="mapContainerRef" class="w-full h-full orsan-map-canvas"></div>

      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
        <div class="text-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p class="text-gray-600">Cargando mapa...</p>
        </div>
      </div>
      <div v-if="error" class="absolute top-4 left-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg z-50">
        <p class="font-bold">Error al cargar el mapa:</p>
        <p class="text-sm">{{ error }}</p>
      </div>

      <!-- Controles flotantes en móvil: touch-action para que la búsqueda reciba toques y no el mapa -->
      <div class="absolute top-4 left-4 right-4 z-20 flex gap-2 map-mobile-controls">
        <!-- Caja de búsqueda con autocompletado -->
        <div class="flex-1 relative">
          <div class="bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden">
            <div class="relative">
              <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"></i>
              <input
                v-model="mobileSearchQuery"
                @input="handleMobileSearchInput"
                @focus="showMobilePredictions = true"
                @blur="handleMobileSearchBlur"
                @keydown.enter="handleMobileEnterKey"
                type="text"
                placeholder="Ciudad, Estado o Nombre de Estación"
                class="w-full pl-11 pr-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2573D9]/20 focus:border-[#2573D9]"
              />
            </div>
          </div>
          
          <!-- Dropdown de predicciones móvil -->
          <div 
            v-if="showMobilePredictions && mobilePredictions.length > 0"
            class="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl max-h-64 overflow-y-auto"
          >
            <div
              v-for="prediction in mobilePredictions"
              :key="prediction.placeId"
              @mousedown="handleMobilePredictionSelect(prediction)"
              class="px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
            >
              <div class="flex items-start gap-3">
                <!-- Icono de ubicación -->
                <svg class="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div class="flex-1 min-w-0">
                  <div class="font-semibold text-gray-900 truncate text-sm">{{ prediction.mainText }}</div>
                  <div class="text-xs text-gray-500 truncate">{{ prediction.secondaryText }}</div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Indicador de carga -->
          <div 
            v-if="isMobileSearching"
            class="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        </div>

        <!-- Botón de filtros -->
        <button
          @click="showMobileFilters = true"
          class="relative flex-shrink-0 p-4 bg-gradient-to-r from-brand-blue to-brand-purple text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 focus:outline-none"
        >
          <i class="fa-solid fa-filter text-xl"></i>
          <!-- Badge con número de filtros activos -->
          <span 
            v-if="mobileActiveFiltersCount > 0"
            class="absolute -top-1 -right-1 flex items-center justify-center min-w-[22px] h-[22px] px-1.5 text-xs font-bold text-white bg-white/30 rounded-full"
          >
            {{ mobileActiveFiltersCount }}
          </span>
        </button>
      </div>

      <!-- Panel de filtros fullscreen en móvil -->
      <div
        v-if="showMobileFilters"
        class="absolute inset-0 z-30 bg-gradient-to-b from-white to-slate-50"
      >
        <FilterPanel
          :initial-filters="currentFilters"
          :collapsed="false"
          :is-mobile="true"
          @filter="handleMobileFilter"
          @cancel="handleMobileCancel"
          @close="showMobileFilters = false"
          @location-selected="handleLocationSelected"
        />
      </div>

      <!-- Panel de detalles fullscreen en móvil -->
      <div
        v-if="selectedStation"
        class="absolute inset-0 z-30 bg-gradient-to-b from-white to-slate-50"
      >
        <StationDetailsPanel
          :station="selectedStation"
          :is-mobile="true"
          @close="closeStationDetails"
        />
      </div>
    </div>
  
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed, watch, nextTick, onBeforeUnmount } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN } from '../config/mapbox.js'
import { API_BASE_URL } from '../config/api.js'
import FilterPanel from './FilterPanel.vue'
import StationDetailsPanel from './StationDetailsPanel.vue'
import { useGooglePlacesAutocomplete } from '../composables/useGooglePlacesAutocomplete.js'

const props = defineProps({
  /** URL del PNG del marcador (copiar public/icons/ug-marker.png en el proyecto host) */
  markerIconUrl: {
    type: String,
    default: '/icons/ug-marker.png'
  }
})

const mapContainerRef = ref(null)
let map = null
const error = ref(null)
const loading = ref(true)
const loadingStations = ref(false)

const currentFilters = ref({
  searchQuery: '',
  products: [],
  amenities: {
    isOpen24Hours: false,
    hasRestrooms: false,
    hasRestArea: false,
    hasConvenienceStore: false,
    hasRestaurant: false,
    hasChargingPositions: false,
    hasTruckStop: false
  }
})
const allStations = ref([]) // Almacenar todas las estaciones sin filtrar
const selectedStation = ref(null) // Estación actualmente seleccionada

// Variables para móvil
const isMobile = ref(false)
const showMobileFilters = ref(false)
const showMobileSearch = ref(false)
const mobileSearchQuery = ref('')
const showMobilePredictions = ref(false)

// Composable de Google Places para búsqueda móvil
const {
  predictions: mobilePredictions,
  isSearching: isMobileSearching,
  searchPlaces: fetchMobilePredictions,
  getPlaceDetails: getMobilePlaceDetails,
  clearPredictions: clearMobilePredictions
} = useGooglePlacesAutocomplete()

// Detectar si es móvil
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768 // Tailwind 'md' breakpoint
}

// Contador de filtros activos para móvil
const mobileActiveFiltersCount = computed(() => {
  let count = 0
  if (currentFilters.value.searchQuery && currentFilters.value.searchQuery.trim()) {
    count++
  }
  if (currentFilters.value.products && currentFilters.value.products.length > 0) {
    count++
  }
  // Contar amenidades seleccionadas
  if (currentFilters.value.amenities) {
    Object.values(currentFilters.value.amenities).forEach(value => {
      if (value) count++
    })
  }
  return count
})

// Observar cambios en selectedStation para redimensionar el mapa
watch(selectedStation, async () => {
  // Esperar a que Vue actualice el DOM
  await nextTick()
  
  // Esperar un momento adicional para que las transiciones CSS terminen
  setTimeout(() => {
    if (map) {
      // Forzar redimensionamiento del mapa
      map.resize()
      console.log('Mapa redimensionado')
    }
  }, 350) // Esperar 350ms (un poco más que la duración de la transición de 300ms)
})

// Observar cambios en mobilePredictions para mostrar/ocultar dropdown
watch(() => mobilePredictions.value.length, (newLength) => {
  if (newLength > 0) {
    showMobilePredictions.value = true
  }
})

// Función para aplicar tonalidad azul a todo el mapa y reducir opacidad
function applyCustomRoadColors(mapInstance) {
  if (!mapInstance) return

  // Paleta de colores azul-grisáceos que armonizan con el diseño del sitio
  // Todas las calles están aclaradas al 50% (mayor luminosidad hacia el blanco)
  // Rango: #b8c0cb (más oscuro) a #d0d7e0 (más claro)
  const colorPalette = {
    // Calles y carreteras - aclaradas al 50% (mayor exposición/luminosidad)
    highway: '#b8c0cb',      // Gris azulado medio aclarado (más oscuro del rango) para autopistas
    primary: '#bdc5cf',      // Gris azulado medio-oscuro aclarado para calles principales
    secondary: '#c1c9d3',    // Gris azulado medio aclarado para calles secundarias
    tertiary: '#b8c0cb',     // Gris azulado medio aclarado (más oscuro del rango) para calles terciarias
    residential: '#d0d7e0',   // Gris azulado claro aclarado (más claro del rango) para calles residenciales
    service: '#d0d7e0',      // Gris azulado claro aclarado (más claro del rango) para vías de servicio
    
    // Edificios y estructuras
    building: '#E8F0F8',     // Azul muy claro para edificios
    buildingOutline: '#B8D0E8', // Azul claro para bordes de edificios
    
    // Áreas y fondos
    water: '#C8D8E8',        // Azul claro para agua
    park: '#D8E8F0',         // Azul muy claro para parques
    area: '#E8F0F8',         // Azul muy claro para áreas generales
    background: '#F5F8FA',   // Azul casi blanco para fondos
    
    // Otros elementos
    border: '#A0B8C8',       // Azul medio para bordes
    label: '#4A5A6A'         // Azul oscuro para etiquetas
  }

  // Obtener todas las capas del estilo
  const style = mapInstance.getStyle()
  if (!style || !style.layers) return

  // Iterar sobre todas las capas y aplicar tonalidades azules
  style.layers.forEach(layer => {
    if (!layer.id) return
    
    const layerId = layer.id.toLowerCase()
    
    try {
      if (mapInstance.getLayer(layer.id)) {
        // ===== CAPAS DE LÍNEAS (Calles y carreteras) =====
        if (layer.type === 'line') {
          if (layerId.includes('road') || layerId.includes('street') || layerId.includes('highway') || 
              layerId.includes('motorway') || layerId.includes('trunk') || layerId.includes('primary') ||
              layerId.includes('secondary') || layerId.includes('tertiary') || layerId.includes('residential') ||
              layerId.includes('service') || layerId.includes('path') || layerId.includes('pedestrian')) {
            
            // Determinar el color según el tipo de calle
            let color = colorPalette.secondary
            
            if (layerId.includes('highway') || layerId.includes('motorway') || layerId.includes('trunk')) {
              color = colorPalette.highway
            } else if (layerId.includes('primary')) {
              color = colorPalette.primary
            } else if (layerId.includes('secondary')) {
              color = colorPalette.secondary
            } else if (layerId.includes('tertiary')) {
              color = colorPalette.tertiary
            } else if (layerId.includes('residential') || layerId.includes('unclassified')) {
              color = colorPalette.residential
            } else if (layerId.includes('service') || layerId.includes('path') || layerId.includes('pedestrian')) {
              color = colorPalette.service
            }

            // Aplicar color
            const currentColor = mapInstance.getPaintProperty(layer.id, 'line-color')
            if (typeof currentColor === 'string' || currentColor === undefined) {
              mapInstance.setPaintProperty(layer.id, 'line-color', color)
            }
            
            // Reducir opacidad un 50% (multiplicar por 0.5)
            const currentOpacity = mapInstance.getPaintProperty(layer.id, 'line-opacity')
            if (currentOpacity !== undefined && typeof currentOpacity === 'number') {
              const newOpacity = Math.max(currentOpacity * 0.5, 0.1) // Mínimo 0.1 para visibilidad
              mapInstance.setPaintProperty(layer.id, 'line-opacity', newOpacity)
            }

            // Para capas "case" (bordes de calles) - usar el color más oscuro del rango aclarado
            if (layerId.includes('case')) {
              mapInstance.setPaintProperty(layer.id, 'line-color', '#b8c0cb')
            }
          }
        }
        
        // ===== CAPAS DE RELLENO (Edificios, áreas, agua) =====
        else if (layer.type === 'fill') {
          // Edificios
          if (layerId.includes('building')) {
            const currentFill = mapInstance.getPaintProperty(layer.id, 'fill-color')
            if (typeof currentFill === 'string' || currentFill === undefined) {
              mapInstance.setPaintProperty(layer.id, 'fill-color', colorPalette.building)
            }
            const currentOpacity = mapInstance.getPaintProperty(layer.id, 'fill-opacity')
            if (currentOpacity !== undefined && typeof currentOpacity === 'number') {
              mapInstance.setPaintProperty(layer.id, 'fill-opacity', Math.max(currentOpacity * 0.7, 0.1))
            }
            
            // Bordes de edificios
            const currentOutline = mapInstance.getPaintProperty(layer.id, 'fill-outline-color')
            if (typeof currentOutline === 'string' || currentOutline === undefined) {
              mapInstance.setPaintProperty(layer.id, 'fill-outline-color', colorPalette.buildingOutline)
            }
          }
          // Agua
          else if (layerId.includes('water')) {
            const currentFill = mapInstance.getPaintProperty(layer.id, 'fill-color')
            if (typeof currentFill === 'string' || currentFill === undefined) {
              mapInstance.setPaintProperty(layer.id, 'fill-color', colorPalette.water)
            }
            const currentOpacity = mapInstance.getPaintProperty(layer.id, 'fill-opacity')
            if (currentOpacity !== undefined && typeof currentOpacity === 'number') {
              mapInstance.setPaintProperty(layer.id, 'fill-opacity', Math.max(currentOpacity * 0.7, 0.2))
            }
          }
          // Parques y áreas verdes
          else if (layerId.includes('park') || layerId.includes('landuse') || layerId.includes('area')) {
            const currentFill = mapInstance.getPaintProperty(layer.id, 'fill-color')
            if (typeof currentFill === 'string' || currentFill === undefined) {
              mapInstance.setPaintProperty(layer.id, 'fill-color', colorPalette.park)
            }
            const currentOpacity = mapInstance.getPaintProperty(layer.id, 'fill-opacity')
            if (currentOpacity !== undefined && typeof currentOpacity === 'number') {
              mapInstance.setPaintProperty(layer.id, 'fill-opacity', Math.max(currentOpacity * 0.7, 0.15))
            }
          }
          // Otras áreas
          else if (layerId.includes('background') || layerId.includes('base')) {
            const currentFill = mapInstance.getPaintProperty(layer.id, 'fill-color')
            if (typeof currentFill === 'string' || currentFill === undefined) {
              mapInstance.setPaintProperty(layer.id, 'fill-color', colorPalette.background)
            }
          }
        }
        
        // ===== CAPAS DE FONDO =====
        else if (layer.type === 'background') {
          const currentColor = mapInstance.getPaintProperty(layer.id, 'background-color')
          if (typeof currentColor === 'string' || currentColor === undefined) {
            mapInstance.setPaintProperty(layer.id, 'background-color', colorPalette.background)
          }
          const currentOpacity = mapInstance.getPaintProperty(layer.id, 'background-opacity')
          if (currentOpacity !== undefined && typeof currentOpacity === 'number') {
            mapInstance.setPaintProperty(layer.id, 'background-opacity', Math.max(currentOpacity * 0.7, 0.3))
          }
        }
      }
    } catch (err) {
      // Ignorar errores silenciosamente - algunas capas pueden no ser modificables
      console.debug(`No se pudo modificar la capa ${layer.id}`)
    }
  })
}

// Función para calcular distancia en kilómetros entre dos puntos usando la fórmula de Haversine
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371 // Radio de la Tierra en kilómetros
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Función para calcular el radio en kilómetros basado en el viewport del mapa
function calculateRadiusFromMap(mapInstance) {
  if (!mapInstance) return 5 // Radio por defecto de 5 km
  
  const bounds = mapInstance.getBounds()
  const ne = bounds.getNorthEast() // Noreste
  const sw = bounds.getSouthWest() // Suroeste
  const center = mapInstance.getCenter()
  
  // Calcular la distancia desde el centro hasta las esquinas
  const distanceNE = calculateDistance(center.lat, center.lng, ne.lat, ne.lng)
  const distanceSW = calculateDistance(center.lat, center.lng, sw.lat, sw.lng)
  
  // Usar la distancia máxima para asegurar que cubra todo el viewport
  const maxDistance = Math.max(distanceNE, distanceSW)
  
  // Añadir un pequeño margen (10%) para asegurar que se obtengan todas las estaciones visibles
  return Math.ceil(maxDistance * 1.1)
}

// Función para obtener estaciones del backend
async function fetchStations(latitude, longitude, radius, filters = {}) {
  try {
    loadingStations.value = true
    const url = new URL(`${API_BASE_URL}/api/stations/nearby`)
    url.searchParams.append('latitude', latitude.toString())
    url.searchParams.append('longitude', longitude.toString())
    url.searchParams.append('radius', radius.toString())
    
    // Agregar parámetro de búsqueda si existe
    if (filters.searchQuery && filters.searchQuery.trim()) {
      url.searchParams.append('search', filters.searchQuery.trim())
    }
    
    // Agregar servicios si hay productos seleccionados
    const products = filters.products && Array.isArray(filters.products) ? filters.products : (filters.product ? [filters.product] : [])
    products.forEach(p => {
      if (p && String(p).trim()) {
        url.searchParams.append('services[]', String(p).trim())
      }
    })
    
    // Agregar filtros de amenidades (formato snake_case)
    if (filters.amenities) {
      // Mapeo de nombres camelCase a snake_case
      const amenitiesMapping = {
        isOpen24Hours: 'has_24_hours',
        hasRestrooms: 'has_restrooms',
        hasRestArea: 'has_rest_area',
        hasConvenienceStore: 'has_convenience_store',
        hasRestaurant: 'has_restaurant',
        hasChargingPositions: 'has_charging_positions',
        hasTruckStop: 'has_truck_stop'
      }
      
      Object.entries(filters.amenities).forEach(([key, value]) => {
        if (value === true && amenitiesMapping[key]) {
          url.searchParams.append(amenitiesMapping[key], 'true')
        }
      })
    }
    
    const response = await fetch(url.toString())
    
    if (!response.ok) {
      throw new Error(`Error al obtener estaciones: ${response.status} ${response.statusText}`)
    }
    
    const responseData = await response.json()
    console.log('Datos recibidos del API:', responseData)
    
    // La estructura esperada es: data -> array de estaciones
    // Cada estación tiene: index -> location -> lat / lon
    if (responseData && responseData.data && Array.isArray(responseData.data)) {
      return responseData.data
    }
    
    // Si data es un array directamente
    if (Array.isArray(responseData)) {
      return responseData
    }
    
    // Si no se puede determinar, retornar array vacío
    console.warn('Formato de respuesta del API no reconocido:', responseData)
    return []
  } catch (err) {
    console.error('Error al obtener estaciones:', err)
    error.value = `Error al obtener estaciones: ${err.message}`
    return []
  } finally {
    loadingStations.value = false
  }
}

// Convertir estaciones a formato GeoJSON
function createGeoJSON(stations) {
  if (!stations || !Array.isArray(stations) || stations.length === 0) {
    return {
      type: 'FeatureCollection',
      features: []
    }
  }
  
  return {
    type: 'FeatureCollection',
    features: stations
      .filter(station => {
        // Filtrar estaciones que no tengan coordenadas válidas
        // La estructura es: station.location.latitude / station.location.longitude
        const location = station?.location
        const latitude = location?.latitude
        const longitude = location?.longitude
        return latitude != null && longitude != null && !isNaN(latitude) && !isNaN(longitude)
      })
      .map(station => {
        // Extraer coordenadas desde station.location.latitude/longitude
        const location = station?.location || {}
        const latitude = location.latitude
        const longitude = location.longitude
        
        // Guardar toda la información de la estación para usarla en el popup
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          properties: {
            // Guardar toda la estación como JSON string para poder acceder a todos los datos
            stationData: JSON.stringify(station),
            // También guardar campos básicos para compatibilidad
            id: station.id,
            name: station.name || 'Estación de servicio'
          }
        }
      })
  }
}

// Función para filtrar estaciones según los criterios
function filterStations(stations) {
  if (!stations || stations.length === 0) return stations
  
  let filtered = [...stations]
  
  // Filtro por búsqueda de texto (nombre, dirección, cadena, folio, CRE, PL)
  if (currentFilters.value.searchQuery && currentFilters.value.searchQuery.trim()) {
    const searchTerm = currentFilters.value.searchQuery.toLowerCase().trim()
    filtered = filtered.filter(station => {
      const name = (station.name || '').toLowerCase()
      const address = station.address
      const addressStr = address
        ? `${address.street || ''} ${address.city || ''} ${address.state || ''} ${address.postalCode || ''}`.toLowerCase()
        : ''
      const chainName = (station.chain?.name || '').toLowerCase()
      const folio = ((station.folioPemex ?? station.folio_pemex) || '').toLowerCase()
      const cre = ((station.creID ?? station.cre_id) || '').toLowerCase()
      const pl = ((station.plCode ?? station.pl_code) || '').toLowerCase()
      return name.includes(searchTerm) ||
             addressStr.includes(searchTerm) ||
             chainName.includes(searchTerm) ||
             folio.includes(searchTerm) ||
             cre.includes(searchTerm) ||
             pl.includes(searchTerm)
    })
  }
  
  // Filtro por tipo de producto (varios permitidos: la estación debe tener al menos uno seleccionado)
  const products = currentFilters.value.products && Array.isArray(currentFilters.value.products)
    ? currentFilters.value.products
    : (currentFilters.value.product ? [currentFilters.value.product] : [])
  if (products.length > 0) {
    const productKeys = products.map(p => (p || '').toLowerCase())
    filtered = filtered.filter(station => {
      const services = station.services || station.products || station.fuel_types || []
      if (Array.isArray(services) && services.length > 0) {
        return productKeys.some(productKey =>
          services.some(s => {
            const slug = (typeof s === 'string' ? s : (s.slug || '')).toLowerCase()
            const name = (typeof s === 'string' ? s : (s.name || '')).toLowerCase()
            return slug === productKey || name.includes(productKey)
          })
        )
      }
      // Por precios cuando no hay array de servicios
      return productKeys.some(productKey => {
        if (productKey === 'premium' && (station.precioPremium ?? station.price_premium)) return true
        if (productKey === 'magna' && (station.precioMagna ?? station.price_regular)) return true
        if (productKey === 'diesel' && (station.precioDiesel ?? station.price_diesel)) return true
        if ((productKey === 'diesel-uba' || productKey === 'dieseluba') && station.price_diesel_uba) return true
        return false
      })
    })
  }
  
  return filtered
}

// Función para actualizar las estaciones en el mapa
async function updateStations() {
  console.log('updateStations() llamado')
  if (!map) {
    console.error('Map no está disponible en updateStations()')
    return
  }
  
  const center = map.getCenter()
  const radius = calculateRadiusFromMap(map)
  
  console.log(`Buscando estaciones cerca de (${center.lat}, ${center.lng}) con radio de ${radius} km`)
  console.log('Filtros actuales:', currentFilters.value)
  console.log('Llamando a fetchStations...')
  
  // Pasar los filtros actuales al endpoint
  const stations = await fetchStations(center.lat, center.lng, radius, currentFilters.value)
  console.log(`Estaciones recibidas: ${stations.length}`)
  
  // Guardar todas las estaciones recibidas (ya vienen filtradas del backend)
  allStations.value = stations
  
  // Verificar si la estación seleccionada todavía está en las estaciones actuales
  if (selectedStation.value) {
    const stillVisible = stations.some(s => s.id === selectedStation.value.id)
    if (!stillVisible) {
      // Si la estación seleccionada ya no está visible, deseleccionarla
      selectedStation.value = null
    }
  }
  
  // Ya no necesitamos filtrar en el frontend, el backend lo hace
  // Siempre actualizar el mapa, incluso si no hay estaciones
  const geoJSON = createGeoJSON(stations)
  const source = map.getSource('gasolineras')
  
  if (source) {
    source.setData(geoJSON)
    if (stations && stations.length > 0) {
      console.log(`Actualizadas ${geoJSON.features.length} estaciones en el mapa`)
    } else {
      console.log('No se encontraron estaciones en el área visible')
    }
    
    // Actualizar los colores de los puntos después de actualizar los datos
    updatePointColors()
  } else {
    console.warn('La fuente de datos "gasolineras" no existe aún')
  }
}

// Funciones para manejar el panel de filtros
function applyFilters(filters) {
  currentFilters.value = { ...filters }
  
  // Actualizar estaciones desde el backend con los nuevos filtros
  updateStations()
}

function cancelFilters() {
  currentFilters.value = {
    searchQuery: '',
    products: [],
    amenities: {
      isOpen24Hours: false,
      hasRestrooms: false,
      hasRestArea: false,
      hasConvenienceStore: false,
      hasRestaurant: false,
      hasChargingPositions: false,
      hasTruckStop: false
    }
  }
  
  // Actualizar estaciones desde el backend sin filtros
  updateStations()
}

// Funciones para manejar filtros en móvil
function handleMobileFilter(filters) {
  applyFilters(filters)
  showMobileFilters.value = false
}

function handleMobileCancel() {
  cancelFilters()
  showMobileFilters.value = false
}

function handleMobileSearchBlur() {
  // Esperar un momento antes de ocultar para permitir clicks en resultados
  setTimeout(() => {
    showMobileSearch.value = false
    showMobilePredictions.value = false
  }, 200)
}

// Función para manejar la entrada de texto en búsqueda móvil
function handleMobileSearchInput(event) {
  const inputValue = event.target.value
  if (inputValue && inputValue.trim()) {
    fetchMobilePredictions(inputValue)
  } else {
    clearMobilePredictions()
    showMobilePredictions.value = false
  }
}

// Función para manejar la selección de una predicción en móvil
async function handleMobilePredictionSelect(prediction) {
  try {
    // Obtener detalles del lugar seleccionado
    const placeDetails = await getMobilePlaceDetails(prediction.placeId)
    
    if (placeDetails) {
      // Actualizar la caja de búsqueda con el nombre seleccionado
      mobileSearchQuery.value = prediction.mainText
      
      // Ocultar las predicciones
      showMobilePredictions.value = false
      
      // Llamar a la función de centrado del mapa
      handleLocationSelected(placeDetails)
    }
  } catch (error) {
    console.error('Error al obtener detalles del lugar:', error)
  }
}

// Función para manejar Enter en búsqueda móvil
function handleMobileEnterKey() {
  // Si no hay predicción seleccionada, simplemente ocultar el dropdown
  showMobilePredictions.value = false
  
  // Actualizar los filtros con el texto de búsqueda
  currentFilters.value.searchQuery = mobileSearchQuery.value
  updateStations()
}

// Función para manejar la selección de una ubicación geográfica (ciudad/estado)
function handleLocationSelected(locationData) {
  if (!map || !locationData || !locationData.location) {
    console.error('Mapa o datos de ubicación no disponibles')
    return
  }
  
  console.log('Centrando mapa en:', locationData)
  
  const { location, viewport, name } = locationData
  
  // Cerrar panel de detalles de estación si está abierto
  if (selectedStation.value) {
    selectedStation.value = null
  }
  
  // Determinar el nivel de zoom basado en el viewport si está disponible
  let targetZoom = 12 // Zoom por defecto para ciudades
  
  if (viewport) {
    // Calcular la distancia diagonal del viewport para determinar el zoom apropiado
    const ne = viewport.northeast
    const sw = viewport.southwest
    const distance = calculateDistance(sw.lat, sw.lng, ne.lat, ne.lng)
    
    // Ajustar zoom basado en la distancia
    // Distancias más grandes = zoom más alejado
    if (distance > 200) {
      targetZoom = 8 // Estado completo
    } else if (distance > 100) {
      targetZoom = 9 // Región grande
    } else if (distance > 50) {
      targetZoom = 10 // Área metropolitana
    } else if (distance > 20) {
      targetZoom = 11 // Ciudad grande
    } else {
      targetZoom = 12 // Ciudad mediana/pequeña
    }
  }
  
  // Animar el movimiento del mapa hacia la ubicación seleccionada
  map.flyTo({
    center: [location.lng, location.lat],
    zoom: targetZoom,
    duration: 2000, // Duración de la animación en ms (2 segundos para efecto más dramático)
    essential: true, // Esta animación es esencial y no se puede cancelar
    curve: 1.5, // Curva de la animación (1.5 = más suave y elegante)
    easing: (t) => {
      // Función de easing personalizada para una transición más suave
      return t < 0.5
        ? 2 * t * t
        : -1 + (4 - 2 * t) * t
    }
  })
  
  // Actualizar las estaciones después de que termine la animación
  // Agregar un pequeño delay para asegurar que el mapa esté en su nueva posición
  map.once('moveend', () => {
    setTimeout(() => {
      console.log('Actualizando estaciones en la nueva ubicación...')
      updateStations()
    }, 300)
  })
}

// Funciones para manejar la selección de estaciones
function selectStation(station, coordinates) {
  selectedStation.value = station
  
  // Centrar el mapa en la estación seleccionada con animación suave
  if (map && coordinates) {
    map.flyTo({
      center: coordinates,
      zoom: Math.max(map.getZoom(), 14), // Asegurar un nivel de zoom mínimo
      duration: 1000 // Duración de la animación en ms
    })
  }
  
  // Actualizar los colores de los puntos
  updatePointColors()
}

function closeStationDetails() {
  selectedStation.value = null
  // Actualizar los colores de los puntos
  updatePointColors()
}

function updatePointColors() {
  if (!map || !map.getLayer('unclustered-point')) return
  
  // Si hay una estación seleccionada, hacer el icono más grande
  if (selectedStation.value && selectedStation.value.id) {
    // Cambiar tamaño del icono (más grande para la seleccionada)
    map.setLayoutProperty('unclustered-point', 'icon-size', [
      'case',
      ['==', ['get', 'id'], selectedStation.value.id],
      0.144, // Seleccionada: ~72px de altura (50% más grande que normal)
      0.096  // Normal: ~48px de altura (20% más grande que antes)
    ])
    
    // Actualizar capa de pulso
    updatePulseLayer()
  } else {
    // Si no hay estación seleccionada, todos los iconos tamaño normal
    map.setLayoutProperty('unclustered-point', 'icon-size', 0.096)
    
    // Ocultar capa de pulso
    updatePulseLayer()
  }
}

// Función para actualizar las capas de ondas concéntricas
function updatePulseLayer() {
  if (!map) return
  
  const layers = ['selected-point-pulse-1', 'selected-point-pulse-2', 'selected-point-pulse-3']
  
  layers.forEach(layerId => {
    if (!map.getLayer(layerId)) return
    
    if (selectedStation.value && selectedStation.value.id) {
      // Mostrar las ondas solo para la estación seleccionada
      map.setFilter(layerId, [
        '==', ['get', 'id'], selectedStation.value.id
      ])
    } else {
      // Ocultar las ondas
      map.setFilter(layerId, ['==', 'id', ''])
    }
  })
}

// Variables para la animación de ondas concéntricas
let pulseAnimationId = null
let pulsePhase = 0

// Función para animar el efecto de ondas concéntricas expansivas
function animatePulse() {
  if (!map) return
  
  // Incrementar la fase de la animación (más rápido para frecuencia ágil)
  pulsePhase += 0.04 // Aumentado de 0.02 a 0.04 para más velocidad
  
  // Parámetros de las ondas
  const radiusMin = 5   // Radio mínimo (cerca del pin)
  const radiusMax = 40  // Radio máximo (expansión completa)
  const waveInterval = Math.PI * 2 / 3 // Desfase entre cada onda (120 grados)
  
  // Configuración para cada onda
  const waves = [
    { id: 'selected-point-pulse-1', phase: pulsePhase },
    { id: 'selected-point-pulse-2', phase: pulsePhase + waveInterval },
    { id: 'selected-point-pulse-3', phase: pulsePhase + waveInterval * 2 }
  ]
  
  waves.forEach(wave => {
    if (!map.getLayer(wave.id)) return
    
    try {
      // Calcular el progreso de la onda (0 a 1) - solo expansión
      const progress = (Math.sin(wave.phase) * 0.5 + 0.5)
      
      // Radio: se expande del centro hacia afuera
      const radius = radiusMin + (radiusMax - radiusMin) * progress
      
      // Opacidad: alta al inicio, desaparece completamente al llegar al borde
      // Usar una curva exponencial para que desaparezca más rápido cerca del borde
      const opacityMax = 0.5 // Rojo tenue
      const fadePoint = 0.7 // Comienza a desaparecer más rápido después del 70%
      let opacity
      if (progress < fadePoint) {
        opacity = opacityMax * (1 - progress / fadePoint) * 0.8
      } else {
        const fadeProgress = (progress - fadePoint) / (1 - fadePoint)
        opacity = opacityMax * (1 - progress / fadePoint) * 0.8 * (1 - fadeProgress * fadeProgress)
      }
      
      // Opacidad del borde: sigue la misma curva pero un poco más visible
      const strokeOpacityMax = 0.6
      let strokeOpacity
      if (progress < fadePoint) {
        strokeOpacity = strokeOpacityMax * (1 - progress / fadePoint) * 0.9
      } else {
        const fadeProgress = (progress - fadePoint) / (1 - fadePoint)
        strokeOpacity = strokeOpacityMax * (1 - progress / fadePoint) * 0.9 * (1 - fadeProgress * fadeProgress)
      }
      
      // Grosor del borde: más delgado y consistente para efecto sutil
      const strokeWidth = 1.5 * (1 - progress * 0.3)
      
      // Actualizar propiedades de la onda
      map.setPaintProperty(wave.id, 'circle-radius', radius)
      map.setPaintProperty(wave.id, 'circle-opacity', Math.max(opacity, 0))
      map.setPaintProperty(wave.id, 'circle-stroke-opacity', Math.max(strokeOpacity, 0))
      map.setPaintProperty(wave.id, 'circle-stroke-width', Math.max(strokeWidth, 0.5))
    } catch (err) {
      // Ignorar errores si la capa no existe aún
    }
  })
  
  // Continuar la animación
  pulseAnimationId = requestAnimationFrame(animatePulse)
}


onMounted(async () => {
  // Detectar si es móvil y agregar listener
  checkMobile()
  window.addEventListener('resize', checkMobile)

  // Esperar a que Vue actualice el DOM y el navegador aplique los estilos CSS
  await nextTick()
  await new Promise(resolve => setTimeout(resolve, 50))

  try {
    {
      if (!MAPBOX_TOKEN) {
        error.value = 'Token de Mapbox no configurado'
        console.error('Token de Mapbox no encontrado')
        loading.value = false
        return
      }

      mapboxgl.accessToken = MAPBOX_TOKEN

      const mapContainer = mapContainerRef.value
      if (!mapContainer) {
        error.value = 'Contenedor del mapa no encontrado'
        console.error('No se encontró el contenedor del mapa (ref)')
        loading.value = false
        return
      }

      // Inicializar el mapa con configuración para evitar flotamiento
      // Usamos un estilo claro que armoniza con el diseño del sitio (azules/morados)
      map = new mapboxgl.Map({
        container: mapContainer,
        style: 'mapbox://styles/mapbox/light-v11', // Estilo claro que permite que los marcadores azules/morados destaquen
        center: [-100.3161, 25.6866], // Monterrey, Nuevo León
        zoom: 11,
        attributionControl: true,
        pitch: 30, // Inclinación ligera para perspectiva 3D
        bearing: 0, // Sin rotación
        dragRotate: false, // Deshabilitar rotación al arrastrar
        touchPitch: false, // Deshabilitar inclinación en touch (mantener pitch fijo)
        touchZoomRotate: true, // Permitir zoom con pellizco y arrastre en móvil
        minPitch: 30, // Mantener pitch mínimo
        maxPitch: 30, // Mantener pitch máximo (fijo en 30 grados)
      })

      map.on('error', (e) => {
        error.value = `Error de Mapbox: ${e.error?.message || 'Error desconocido'}`
        console.error('Error de Mapbox:', e)
        loading.value = false
      })

      map.on('load', async () => {
        console.log('Mapa cargado correctamente')
        error.value = null
        loading.value = false

        // Asegurar que el canvas mida el contenedor real después de que el CSS se aplicó
        map.resize()

        // En móvil: permitir zoom con pellizco pero deshabilitar rotación con dos dedos
        if (map.touchZoomRotate && typeof map.touchZoomRotate.disableRotation === 'function') {
          map.touchZoomRotate.disableRotation()
        }

        // Aplicar tonalidad azul y aumentar contraste en calles y carreteras
        applyCustomRoadColors(map)

        // Cargar el icono personalizado de UG (PNG), con fallback canvas
        const addUGMarkerFromCanvas = () => {
          if (map.hasImage('ug-marker')) return
          const W = 42, H = 54, R = 18
          const canvas = document.createElement('canvas')
          canvas.width = W
          canvas.height = H
          const ctx = canvas.getContext('2d')
          // Sombra
          ctx.shadowColor = 'rgba(0,0,0,0.28)'
          ctx.shadowBlur = 6
          ctx.shadowOffsetY = 3
          // Cuerpo del pin (círculo + triángulo)
          ctx.beginPath()
          ctx.arc(W / 2, R + 2, R, 0, Math.PI * 2)
          const grad = ctx.createLinearGradient(W / 2 - R, 2, W / 2 + R, R * 2 + 2)
          grad.addColorStop(0, '#2573D9')
          grad.addColorStop(1, '#8434E1')
          ctx.fillStyle = grad
          ctx.fill()
          // Punta
          ctx.shadowBlur = 0
          ctx.shadowOffsetY = 0
          ctx.beginPath()
          ctx.moveTo(W / 2 - 7, R + 2 + Math.sqrt(R * R - 49))
          ctx.lineTo(W / 2, H - 2)
          ctx.lineTo(W / 2 + 7, R + 2 + Math.sqrt(R * R - 49))
          ctx.fillStyle = '#8434E1'
          ctx.fill()
          // Círculo interno blanco
          ctx.beginPath()
          ctx.arc(W / 2, R + 2, R * 0.45, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(255,255,255,0.9)'
          ctx.fill()
          map.addImage('ug-marker', ctx.getImageData(0, 0, W, H))
          console.log('Icono UG generado con canvas')
        }

        try {
          map.loadImage(props.markerIconUrl, (err, image) => {
            if (err) {
              console.warn('PNG de marcador no encontrado, usando canvas:', err.message)
              addUGMarkerFromCanvas()
              return
            }
            if (!map.hasImage('ug-marker')) {
              map.addImage('ug-marker', image)
              console.log('Icono UG PNG cargado correctamente')
            }
          })
        } catch (err) {
          console.warn('Error al cargar icono UG, usando canvas:', err)
          addUGMarkerFromCanvas()
        }

        // Inicializar la fuente de datos con un FeatureCollection vacío
        console.log('Inicializando fuente de datos de estaciones...')
        map.addSource('gasolineras', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          },
          cluster: true, // Habilitar clustering
          clusterMaxZoom: 14, // Máximo zoom para clustering
          clusterRadius: 50, // Radio de clustering en píxeles
        })

        // Añadir layer para los clusters (círculos con número)
        // Paleta de colores azul-morado que armoniza con el diseño del sitio
        map.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'gasolineras',
          filter: ['has', 'point_count'],
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#60A5FA', // Azul 400 - 1-10 estaciones (claro)
              10,
              '#3B82F6', // Azul 500 - 11-50 estaciones (medio)
              50,
              '#6366F1', // Índigo 500 - 51-100 estaciones (azul-morado)
              100,
              '#8B5CF6' // Violeta 500 - 100+ estaciones (morado)
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20, // Radio base
              10,
              25, // 10-50 puntos
              50,
              30, // 50-100 puntos
              100,
              35 // 100+ puntos
            ],
            'circle-stroke-width': 3,
            'circle-stroke-color': '#FFFFFF' // Borde blanco para contraste
          }
        })

        // Añadir layer para el texto de los clusters
        map.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'gasolineras',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          },
          paint: {
            'text-color': '#fff'
          }
        })

        // Añadir capas para el efecto de ondas concéntricas expansivas (3 ondas)
        // Rojo tenue con perspectiva de plano horizontal
        // Onda 1 (más interna)
        map.addLayer({
          id: 'selected-point-pulse-1',
          type: 'circle',
          source: 'gasolineras',
          filter: ['==', 'id', ''], // Inicialmente oculto
          paint: {
            'circle-color': '#EF4444', // Rojo tenue
            'circle-radius': 15,
            'circle-opacity': 0.5,
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#DC2626',
            'circle-stroke-opacity': 0.6,
            'circle-pitch-alignment': 'map', // Alineado con el mapa para perspectiva
            'circle-pitch-scale': 'map' // Escalar con la perspectiva del mapa
          }
        })
        
        // Onda 2 (media)
        map.addLayer({
          id: 'selected-point-pulse-2',
          type: 'circle',
          source: 'gasolineras',
          filter: ['==', 'id', ''], // Inicialmente oculto
          paint: {
            'circle-color': '#EF4444',
            'circle-radius': 20,
            'circle-opacity': 0.35,
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#DC2626',
            'circle-stroke-opacity': 0.45,
            'circle-pitch-alignment': 'map',
            'circle-pitch-scale': 'map'
          }
        })
        
        // Onda 3 (más externa)
        map.addLayer({
          id: 'selected-point-pulse-3',
          type: 'circle',
          source: 'gasolineras',
          filter: ['==', 'id', ''], // Inicialmente oculto
          paint: {
            'circle-color': '#EF4444',
            'circle-radius': 25,
            'circle-opacity': 0.2,
            'circle-stroke-width': 1.5,
            'circle-stroke-color': '#DC2626',
            'circle-stroke-opacity': 0.3,
            'circle-pitch-alignment': 'map',
            'circle-pitch-scale': 'map'
          }
        })

        // Añadir layer para los puntos individuales con icono personalizado UG
        map.addLayer({
          id: 'unclustered-point',
          type: 'symbol',
          source: 'gasolineras',
          filter: ['!', ['has', 'point_count']],
          layout: {
            'icon-image': 'ug-marker',
            'icon-size': 0.096, // 20% más grande (~48px de altura)
            'icon-allow-overlap': true, // Permitir que los iconos se superpongan
            'icon-anchor': 'bottom' // Anclar el icono desde la parte inferior (punta del pin)
          }
        })
        
        // Iniciar animación de pulso
        animatePulse()

        // Manejar clicks en clusters
        map.on('click', 'clusters', (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
          })
          const clusterId = features[0].properties.cluster_id
          map.getSource('gasolineras').getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
              if (err) return
              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom
              })
            }
          )
        })

        // Manejar clicks en puntos individuales
        map.on('click', 'unclustered-point', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice()
          const props = e.features[0].properties

          // Asegurar que las coordenadas estén en el rango correcto
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }

          // Parsear los datos de la estación
          let station = null
          try {
            station = props.stationData ? JSON.parse(props.stationData) : null
          } catch (err) {
            console.error('Error al parsear datos de la estación:', err)
          }

          if (!station) {
            console.warn('No se pudieron cargar los datos de la estación')
            return
          }

          // Seleccionar la estación y centrar el mapa
          selectStation(station, coordinates)
        })

        // Cambiar cursor y estilo al pasar sobre clusters y puntos
        map.on('mouseenter', 'clusters', () => {
          map.getCanvas().style.cursor = 'pointer'
        })
        map.on('mouseleave', 'clusters', () => {
          map.getCanvas().style.cursor = ''
        })
        map.on('mouseenter', 'unclustered-point', () => {
          map.getCanvas().style.cursor = 'pointer'
        })
        map.on('mouseleave', 'unclustered-point', () => {
          map.getCanvas().style.cursor = ''
        })

        // Cargar estaciones iniciales
        console.log('Llamando a updateStations()...')
        updateStations()

        // Actualizar estaciones cuando el mapa se mueva o haga zoom
        let updateTimeout = null
        const handleMapChange = () => {
          // Debounce para evitar demasiadas llamadas al API
          if (updateTimeout) {
            clearTimeout(updateTimeout)
          }
          updateTimeout = setTimeout(() => {
            updateStations()
          }, 500) // Esperar 500ms después del último movimiento
        }

        map.on('moveend', handleMapChange)
        map.on('zoomend', handleMapChange)
      })

      map.on('style.load', () => {
        console.log('Estilo del mapa cargado')
      })
    }
  } catch (err) {
    error.value = `Error al inicializar el mapa: ${err.message}`
    console.error('Error al inicializar el mapa:', err)
    loading.value = false
  }
})

onUnmounted(() => {
  // Cancelar animación de pulso
  if (pulseAnimationId) {
    cancelAnimationFrame(pulseAnimationId)
  }
  
  // Remover listener de resize
  window.removeEventListener('resize', checkMobile)
  
  if (map) {
    map.remove()
  }
})
</script>

<style scoped>
/* En móvil: que los controles (búsqueda, botón filtros) reciban toques y no el mapa */
.map-mobile-controls {
  touch-action: manipulation;
  pointer-events: auto;
}
</style>