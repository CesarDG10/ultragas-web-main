/**
 * Frontera oficial de México (GeoJSON) para filtrar puntos dentro del territorio.
 * Fuente: https://github.com/johan/world.geo.json
 */
import mexicoGeo from './mexico.geo.json'

const exteriorRing = mexicoGeo.geometry.coordinates[0]

/**
 * Ray-casting (point-in-polygon): true si el punto [lng, lat] está dentro del polígono.
 * Polígono: array de [lng, lat] (GeoJSON: anillo cerrado, primer punto = último).
 */
function pointInPolygon(lng, lat, polygon) {
  const x = lng
  const y = lat
  let inside = false
  const n = polygon.length
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = polygon[i][0]
    const yi = polygon[i][1]
    const xj = polygon[j][0]
    const yj = polygon[j][1]
    if (yi === yj) continue
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside
    }
  }
  return inside
}

export function isInsideMexico(lng, lat) {
  return pointInPolygon(lng, lat, exteriorRing)
}

const ring = exteriorRing
let minLng = ring[0][0]
let maxLng = ring[0][0]
let minLat = ring[0][1]
let maxLat = ring[0][1]
for (let i = 1; i < ring.length; i++) {
  minLng = Math.min(minLng, ring[i][0])
  maxLng = Math.max(maxLng, ring[i][0])
  minLat = Math.min(minLat, ring[i][1])
  maxLat = Math.max(maxLat, ring[i][1])
}

export const MEXICO_BBOX = [minLng, minLat, maxLng, maxLat]

function seededRandom(seed) {
  return function () {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
}

/**
 * Genera N puntos [lng, lat] aleatorios solo dentro del territorio mexicano.
 */
export function randomPointsInsideMexico(count, seed = 42) {
  const random = seededRandom(seed)
  const [minLng, minLat, maxLng, maxLat] = MEXICO_BBOX
  const points = []
  let attempts = 0
  const maxAttempts = count * 25
  while (points.length < count && attempts < maxAttempts) {
    const lng = minLng + random() * (maxLng - minLng)
    const lat = minLat + random() * (maxLat - minLat)
    if (isInsideMexico(lng, lat)) {
      points.push([lng, lat])
    }
    attempts++
  }
  return points
}
