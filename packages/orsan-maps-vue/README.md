# orsan-maps-vue

Carpeta **lista para copiar** en otro proyecto Vue 3 (Vite). Incluye el mapa de estaciones, filtros, detalle y Places.

## 1. Copiar

Copia toda la carpeta `orsan-maps-vue` dentro del otro repo, por ejemplo:

`src/vendor/orsan-maps-vue/`

## 2. Dependencias en el proyecto host

```bash
npm install mapbox-gl vue
```

(`vue` ya lo tendrás si es un proyecto Vue 3.)

## 3. Recursos estáticos

- Copia **`public/icons/ug-marker.png`** desde este monorepo al `public/icons/` del host (o usa la prop `marker-icon-url`).

## 4. Google Maps (Places)

En el `index.html` del host (sustituye la API key si usas la tuya):

```html
<script src="https://maps.googleapis.com/maps/api/js?key=TU_KEY&libraries=places&language=es&region=MX"></script>
```

También puedes definir `VITE_GOOGLE_MAPS_API_KEY` si en el futuro cargas el script dinámicamente.

## 5. Variables de entorno (`.env` del host)

```env
VITE_API_BASE_URL=https://tu-api.com
VITE_MAPBOX_TOKEN=pk...
```

Opcional: `VITE_GOOGLE_MAPS_API_KEY` (coherente con la key del script).

## 6. CSS (Tailwind v4)

El mapa usa clases como `brand-blue`, `gradient-text-brand`, etc.

1. Añade la carpeta del paquete al **content** de Tailwind en el host, por ejemplo en `vite.config` o donde configures `@tailwindcss/vite`:

   ```js
   // ejemplo: incluir en content globs del postcss/vite tailwind
   './src/vendor/orsan-maps-vue/**/*.vue'
   ```

2. Importa el tema después de tailwind en tu CSS global:

   ```css
   @import "tailwindcss";
   @import "./src/vendor/orsan-maps-vue/src/styles/orsan-maps-theme.css";
   ```

3. Fuentes e iconos (recomendado en `index.html` del host), como en este proyecto:

   - Font Awesome 6
   - Google Font **Inter**

## 7. Uso en una vista

```vue
<script setup>
import { OrsanMapView } from '@/vendor/orsan-maps-vue/src/index.js'
import 'mapbox-gl/dist/mapbox-gl.css'
</script>

<template>
  <div class="w-full h-[100dvh]">
    <OrsanMapView />
    <!-- Marcador desde CDN u otra ruta: -->
    <!-- <OrsanMapView marker-icon-url="https://ejemplo.com/ug-marker.png" /> -->
  </div>
</template>
```

Ajusta el import según donde hayas pegado la carpeta (`@/`, alias, etc.).

## 8. Alias opcional (Vite)

```js
// vite.config.js
resolve: {
  alias: {
    '@orsan/maps': fileURLToPath(new URL('./src/vendor/orsan-maps-vue/src', import.meta.url))
  }
}
```

Luego: `import { OrsanMapView } from '@orsan/maps/index.js'`.

## Exportaciones

| Ruta | Descripción |
|------|-------------|
| `OrsanMapView` | Componente principal del mapa |
| `useGooglePlacesAutocomplete` | Composable Places |
| `API_BASE_URL`, `MAPBOX_TOKEN`, `GOOGLE_MAPS_API_KEY` | Config (lectura; el token real suele ir por env) |

---

**Nota:** Si montas **varias** instancias del mapa a la vez en la misma página, el cambio desktop/móvil por ancho de ventana puede requerir re-inicializar el mapa; el uso típico es una sola vista de mapa a pantalla completa.
