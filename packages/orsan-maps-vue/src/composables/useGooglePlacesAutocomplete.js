import { ref, onMounted, onUnmounted } from 'vue'
import { GOOGLE_MAPS_API_KEY } from '../config/google.js'
import { logger } from '../utils/logger.js'

let googleMapsLoadPromise = null

function loadGoogleMapsScript() {
  if (window.google?.maps?.places) return Promise.resolve()

  if (googleMapsLoadPromise) return googleMapsLoadPromise

  googleMapsLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src*="maps.googleapis.com"]')
    if (existing) {
      existing.addEventListener('load', resolve)
      existing.addEventListener('error', reject)
      return
    }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&language=es&loading=async`
    script.async = true
    script.defer = true
    script.onload = resolve
    script.onerror = () => reject(new Error('No se pudo cargar el script de Google Maps'))
    document.head.appendChild(script)
  })

  return googleMapsLoadPromise
}

/**
 * Composable para manejar el autocompletado de Google Places
 * Enfocado en ciudades y estados de México
 * Usa AutocompleteService y PlacesService para mayor control
 */
export function useGooglePlacesAutocomplete() {
  const autocompleteService = ref(null)
  const placesService = ref(null)
  const geocoder = ref(null)
  const predictions = ref([])
  const selectedPlace = ref(null)
  const isLoaded = ref(false)
  const error = ref(null)
  const isSearching = ref(false)

  /**
   * Inicializar los servicios de Google Places
   */
  const initServices = () => {
    // Verificar si la API de Google está disponible
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      error.value = 'Google Maps API no está cargada'
      logger.error('Google Maps API no disponible')
      return false
    }

    try {
      // Inicializar AutocompleteService
      autocompleteService.value = new window.google.maps.places.AutocompleteService()
      
      // Inicializar PlacesService (necesita un div temporal)
      const dummyDiv = document.createElement('div')
      placesService.value = new window.google.maps.places.PlacesService(dummyDiv)
      
      // Inicializar Geocoder
      geocoder.value = new window.google.maps.Geocoder()

      isLoaded.value = true
      error.value = null
      logger.debug('Servicios de Google Places inicializados correctamente')
      return true
    } catch (err) {
      error.value = `Error al inicializar servicios: ${err.message}`
      logger.error('Error al inicializar Google Places Services:', err)
      return false
    }
  }

  /**
   * Buscar predicciones basadas en el input del usuario
   */
  const searchPlaces = async (input) => {
    if (!input || input.trim().length < 3) {
      predictions.value = []
      return
    }

    if (!autocompleteService.value) {
      logger.warn('AutocompleteService no está inicializado')
      return
    }

    isSearching.value = true

    try {
      const request = {
        input: input.trim(),
        types: ['(regions)'], // Regiones incluye ciudades y estados
        componentRestrictions: { country: 'mx' }, // Restringir a México
        language: 'es'
      }

      autocompleteService.value.getPlacePredictions(request, (results, status) => {
        isSearching.value = false
        
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          predictions.value = results.map(prediction => ({
            placeId: prediction.place_id,
            description: prediction.description,
            mainText: prediction.structured_formatting.main_text,
            secondaryText: prediction.structured_formatting.secondary_text
          }))
          logger.debug('Predicciones encontradas:', predictions.value.length)
        } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          predictions.value = []
          logger.debug('No se encontraron resultados')
        } else {
          logger.warn('Error al buscar predicciones:', status)
          predictions.value = []
        }
      })
    } catch (err) {
      logger.error('Error en searchPlaces:', err)
      isSearching.value = false
      predictions.value = []
    }
  }

  /**
   * Obtener detalles de un lugar seleccionado usando su place_id
   */
  const selectPrediction = async (prediction) => {
    if (!placesService.value || !prediction.placeId) {
      logger.warn('PlacesService no disponible o placeId inválido')
      return
    }

    try {
      const request = {
        placeId: prediction.placeId,
        fields: ['name', 'formatted_address', 'geometry', 'address_components', 'place_id']
      }

      placesService.value.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          const location = place.geometry?.location
          const viewport = place.geometry?.viewport

          selectedPlace.value = {
            name: place.name || prediction.mainText,
            formattedAddress: place.formatted_address,
            placeId: place.place_id,
            location: location ? {
              lat: location.lat(),
              lng: location.lng()
            } : null,
            viewport: viewport ? {
              northeast: {
                lat: viewport.getNorthEast().lat(),
                lng: viewport.getNorthEast().lng()
              },
              southwest: {
                lat: viewport.getSouthWest().lat(),
                lng: viewport.getSouthWest().lng()
              }
            } : null,
            addressComponents: place.address_components || []
          }

          logger.debug('Lugar seleccionado:', selectedPlace.value)
          
          // Limpiar predicciones después de seleccionar
          predictions.value = []
        } else {
          logger.error('Error al obtener detalles del lugar:', status)
        }
      })
    } catch (err) {
      logger.error('Error en selectPrediction:', err)
    }
  }

  /**
   * Obtener detalles de un lugar por place_id (retorna Promise para uso en MapView móvil)
   */
  const getPlaceDetails = (placeId) => {
    return new Promise((resolve, reject) => {
      if (!placesService.value || !placeId) {
        reject(new Error('PlacesService no disponible o placeId inválido'))
        return
      }
      const request = {
        placeId,
        fields: ['name', 'formatted_address', 'geometry']
      }
      placesService.value.getDetails(request, (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
          const location = place.geometry?.location
          const viewport = place.geometry?.viewport
          resolve({
            name: place.name,
            formattedAddress: place.formatted_address,
            location: location ? { lat: location.lat(), lng: location.lng() } : null,
            viewport: viewport ? {
              northeast: { lat: viewport.getNorthEast().lat(), lng: viewport.getNorthEast().lng() },
              southwest: { lat: viewport.getSouthWest().lat(), lng: viewport.getSouthWest().lng() }
            } : null
          })
        } else {
          reject(new Error(status || 'Error al obtener detalles del lugar'))
        }
      })
    })
  }

  /**
   * Limpiar predicciones
   */
  const clearPredictions = () => {
    predictions.value = []
  }

  /**
   * Resetear el lugar seleccionado
   */
  const resetSelectedPlace = () => {
    selectedPlace.value = null
  }

  // Cargar el script de Google Maps e inicializar servicios
  onMounted(async () => {
    try {
      await loadGoogleMapsScript()
      initServices()
    } catch (err) {
      error.value = 'No se pudo cargar Google Maps API'
      logger.error('Error al cargar Google Maps script:', err)
    }
  })

  return {
    predictions,
    selectedPlace,
    isLoaded,
    isSearching,
    error,
    searchPlaces,
    selectPrediction,
    getPlaceDetails,
    clearPredictions,
    resetSelectedPlace
  }
}
