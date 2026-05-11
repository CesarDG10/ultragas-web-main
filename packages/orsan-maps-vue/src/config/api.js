// URL base del API de estaciones.
// En deploy configurar con la variable de entorno VITE_API_BASE_URL
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082'
