// Clave de Google Maps: configurar VITE_GOOGLE_MAPS_API_KEY en el .env del servidor.
const rawKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''

export const GOOGLE_MAPS_API_KEY =
  rawKey && !rawKey.includes('tu_clave') ? rawKey : ''
