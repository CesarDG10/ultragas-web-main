<template>
  <div class="absolute inset-0 z-0 bg-[#eef2f6]">
    <template v-if="token">
      <div ref="mapContainer" class="absolute inset-0 w-full h-full mapbox-container" />
    </template>
    <template v-else>
      <img
        src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5WMOvALLUpMglBBkn5uPihELqOU2%2Fcad05934-3cce-4d8b-a946-821772c7b319.png"
        alt="Mapa de Cobertura"
        class="absolute inset-0 w-full h-full object-cover object-center opacity-30"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { MAPBOX_TOKEN } from 'orsan-maps-vue'
import { CDMX, highlightedCities, ambientPointsCoords } from '../../data/mexicoMapPoints.js'

const mapContainer = ref(null)
const map = ref(null)
let animId = null

const token = MAPBOX_TOKEN

// Bounding box exacto de México continental
const MEXICO_BOUNDS = [[-118.5, 14.3], [-86.5, 32.72]]

const colorMap = {
  'bg-brand-blue':   '#2573D9',
  'bg-brand-purple': '#8434E1',
  'bg-slate-400':    '#94a3b8',
}
const sizeMap = {
  'w-4 h-4': 6,
  'w-3 h-3': 4,
  'w-2 h-2': 3,
}

onMounted(async () => {
  // Esperar a que el DOM tenga dimensiones reales antes de inicializar Mapbox
  await nextTick()
  await new Promise(r => setTimeout(r, 50))

  if (!token || !mapContainer.value) return

  mapboxgl.accessToken = token

  const mapInstance = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-102.5, 23.6],
    zoom: 4.2,
    attributionControl: false,
    interactive: false,
  })

  mapInstance.on('load', () => {
    // Medir el contenedor real y encuadrar México automáticamente
    mapInstance.resize()
    mapInstance.fitBounds(MEXICO_BOUNDS, { padding: 30, animate: false })

    // ── Construir GeoJSON con todos los puntos ────────────────────────────────
    const allPoints = [{ ...CDMX }, ...highlightedCities, ...ambientPointsCoords]

    const features = allPoints.map(p => ({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [p.lng, p.lat] },
      properties: {
        color:  colorMap[p.color] || '#2573D9',
        radius: sizeMap[p.size]  || 3,
      },
    }))

    // ── 3 grupos para pulso escalonado ────────────────────────────────────────
    const PHASES = 3
    for (let ph = 0; ph < PHASES; ph++) {
      const phFeatures = features.filter((_, i) => i % PHASES === ph)
      mapInstance.addSource(`pulse-src-${ph}`, {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: phFeatures },
      })
      mapInstance.addLayer({
        id: `pulse-ring-${ph}`,
        type: 'circle',
        source: `pulse-src-${ph}`,
        paint: {
          'circle-radius': 4,
          'circle-color': ['get', 'color'],
          'circle-opacity': 0,
          'circle-stroke-width': 0,
          'circle-pitch-alignment': 'map',
        },
      })
    }

    // ── Capa base de puntos (encima de los anillos) ───────────────────────────
    mapInstance.addSource('city-dots-src', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features },
    })
    mapInstance.addLayer({
      id: 'city-dots',
      type: 'circle',
      source: 'city-dots-src',
      paint: {
        'circle-radius': ['get', 'radius'],
        'circle-color': ['get', 'color'],
        'circle-stroke-width': 1.5,
        'circle-stroke-color': 'rgba(255,255,255,0.85)',
        'circle-opacity': 1,
        'circle-pitch-alignment': 'map',
      },
    })

    // ── Punto interior blanco de CDMX ─────────────────────────────────────────
    mapInstance.addSource('cdmx-src', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{ type: 'Feature', geometry: { type: 'Point', coordinates: [CDMX.lng, CDMX.lat] }, properties: {} }],
      },
    })
    mapInstance.addLayer({
      id: 'cdmx-inner',
      type: 'circle',
      source: 'cdmx-src',
      paint: {
        'circle-radius': 2.5,
        'circle-color': 'white',
        'circle-opacity': 1,
        'circle-pitch-alignment': 'map',
      },
    })

    // ── Animación de pulso escalonada ─────────────────────────────────────────
    const CYCLE = 2200
    const PHASE_OFFSET = CYCLE / PHASES

    function animate(ts) {
      for (let ph = 0; ph < PHASES; ph++) {
        const progress = ((ts + ph * PHASE_OFFSET) % CYCLE) / CYCLE
        const r = 3 + progress * 16
        const opacity = progress < 0.08
          ? progress / 0.08 * 0.55
          : Math.max(0, 0.55 * (1 - (progress - 0.08) / 0.92))
        try {
          mapInstance.setPaintProperty(`pulse-ring-${ph}`, 'circle-radius', r)
          mapInstance.setPaintProperty(`pulse-ring-${ph}`, 'circle-opacity', opacity)
        } catch (_) { /* capa aún no lista */ }
      }
      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)
  })

  map.value = mapInstance
})

onUnmounted(() => {
  if (animId) cancelAnimationFrame(animId)
  if (map.value) map.value.remove()
})
</script>

<style scoped>
/* El canvas a 50% de opacidad (sin multiply): el agua azul y las costas quedan
   claramente visibles como referencia geográfica, mientras el fondo sigue siendo
   sutil. Los dots (GeoJSON layers sobre el mismo canvas) están en el mismo
   sistema de coordenadas → alineación perfecta garantizada. */
.mapbox-container :deep(.mapboxgl-canvas) {
  opacity: 0.5;
}
.mapbox-container :deep(.mapboxgl-ctrl-logo),
.mapbox-container :deep(.mapboxgl-ctrl-attrib) {
  display: none !important;
}
</style>
