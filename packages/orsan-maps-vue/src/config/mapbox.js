// Token Mapbox: usar VITE_MAPBOX_TOKEN (preferido) o VITE_MAPBOX_ACCESS_TOKEN (legacy home).
// En producción debe configurarse en el .env del servidor; no usar pk.tu_token_aqui.
const rawToken =
  import.meta.env.VITE_MAPBOX_TOKEN ||
  import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ||
  ''

export const MAPBOX_TOKEN =
  rawToken && !rawToken.includes('tu_token') ? rawToken : ''

