# Instrucciones de despliegue — Ultra Gas (orsan-ug-web)

Documento para el equipo que publica el sitio en **IIS**.  
Proyecto: sitio estático **Vue 3 + Vite**.

> **Importante:** las variables `VITE_*` se **incrustan al compilar**. Cambiar `.env` en el servidor **sin** ejecutar `npm run build` **no** tiene efecto.

---

## Cambios recientes (incluir en este despliegue)

| Tema | Detalle |
|------|---------|
| **Video** | Poster local `/images/ultragas-video-poster.svg` (ya no usa `img.youtube.com`). |
| **CSP** | El iframe de YouTube requiere `frame-src` con dominios de YouTube en IIS. |
| **Pipedrive** | Puede requerir hash en `script-src` para `prepare.js`. |
| **Consola** | El build elimina `console.*` del código del sitio. |
| **Mapbox** | Un solo token: `VITE_MAPBOX_TOKEN` (también acepta `VITE_MAPBOX_ACCESS_TOKEN`). |
| **Seguridad** | `dist/web.config` incluye headers CSP, X-Frame-Options, etc. |

---

## 1. Requisitos

| Herramienta | Versión |
|-------------|---------|
| Node.js | ≥ 20.19.0 |
| npm | Incluido con Node |
| Servidor web | IIS 10+ con **URL Rewrite Module** |

---

## 2. Variables de entorno

Crear `.env` en la raíz del repositorio (plantilla: `.env.example`). **No subir** `.env` con secretos al repositorio.

```env
# Mapbox — obligatorio (home + /cobertura)
VITE_MAPBOX_TOKEN=pk.XXXXXXXX

# API de estaciones Orsan
VITE_API_BASE_URL=https://ultragas-api.ers.lat

# Google Maps — autocompletado en /cobertura
VITE_GOOGLE_MAPS_API_KEY=AIzaXXXXXXXX
```

### Validaciones antes del build

- [ ] Sin placeholders (`pk.tu_token_aqui`, `tu_clave_aqui`).
- [ ] Token Mapbox activo en [mapbox.com](https://account.mapbox.com/access-tokens/).
- [ ] Clave Google con **Maps JavaScript API** y **Places API** habilitadas.
- [ ] Restricción por dominio en Mapbox y Google apuntando al **dominio de producción**.

---

## 3. Compilar el sitio

```bash
cd orsan-ug-web
npm ci
npm run build
```

**Salida:** carpeta `dist/` → es lo que se copia a IIS.

### Archivos que no deben faltar en `dist/`

| Archivo / carpeta | Función |
|-------------------|---------|
| `index.html` | Entrada de la SPA |
| `assets/*` | JavaScript y CSS compilados |
| `web.config` | Rutas SPA + headers de seguridad (CSP) |
| `js/pipedrive-leadbooster-init.js` | Configuración del chat Pipedrive |
| `images/ultragas-video-poster.svg` | Imagen previa del video en /que-es-ultragas |
| `icons/*` | Iconos del mapa |

---

## 4. Publicar en IIS

1. **Detener** o preparar el sitio (según procedimiento del equipo).
2. Copiar **todo** el contenido de `dist/` al directorio físico del sitio  
   (ejemplo: `C:\inetpub\wwwroot\ultragas`).
3. En **IIS Manager**:
   - El sitio debe apuntar a esa carpeta.
   - **Application Pool:** *Sin código administrado* (sitio estático), salvo política distinta.
4. Confirmar que está instalado **URL Rewrite** (necesario para `web.config`).
5. **Reiniciar** el sitio o el Application Pool.
6. Probar en navegador (idealmente ventana de incógnito).

### Rutas que deben funcionar al refrescar (F5)

- `/`
- `/cobertura`
- `/que-es-ultragas`
- `/fiscal`

---

## 5. Content Security Policy (CSP)

### ¿Dónde se configura?

- Opción A: `dist/web.config` (incluido en el build).
- Opción B: Otro `web.config` o reglas IIS a nivel sitio que **sobrescriben** el del repo.

### Cómo saber qué CSP está activo

1. Abrir el sitio en Chrome o Edge.
2. **F12** → pestaña **Network**.
3. Clic en el documento HTML (primera fila).
4. **Response Headers** → leer `Content-Security-Policy`.

Si el valor **no** coincide con el de `dist/web.config`, hay que editar el CSP **activo en IIS**, no solo desplegar el front.

### 5.1 Video de YouTube (obligatorio)

Sin esto, al dar play en **¿Qué es Ultra Gas?** el iframe se bloquea.

Agregar en **`frame-src`**:

```text
https://www.youtube.com
https://www.youtube-nocookie.com
https://*.youtube.com
```

### 5.2 Chat Pipedrive — script inline

Si en consola aparece:

```text
Executing inline script violates… prepare.js
```

Agregar en **`script-src`**:

```text
'sha256-3bzWVxQE32IZQKH9eh8KzyHuhXOlMrboDVVBRd0fWTU='
```

Si el error muestra **otro** hash, usar el que indique el navegador (Pipedrive puede cambiarlo al actualizar el widget).

### 5.3 API de estaciones

El mapa llama a:

```http
GET https://ultragas-api.ers.lat/api/stations/nearby?latitude=...&longitude=...&radius=...
```

Ese host debe estar permitido en **`connect-src`**.

Si el API usa otro dominio, actualizar `VITE_API_BASE_URL` en `.env`, **recompilar** y agregar el host al CSP.

### 5.4 Fragmento CSP de referencia

```text
frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://*.youtube.com;
connect-src 'self' https://ultragas-api.ers.lat https://*.mapbox.com https://api.mapbox.com https://events.mapbox.com https://maps.googleapis.com https://*.pipedrive.com;
script-src 'self' 'wasm-unsafe-eval' 'sha256-3bzWVxQE32IZQKH9eh8KzyHuhXOlMrboDVVBRd0fWTU=' https://*.pipedrive.com https://leadbooster-chat.pipedrive.com https://maps.googleapis.com https://maps.gstatic.com;
```

**Nota:** el poster del video es **local** (`/images/ultragas-video-poster.svg`). No hace falta permitir `img.youtube.com`.

---

## 6. API Orsan (coordinación con backend)

Estas tareas las hace quien administra **`ultragas-api`**, no quien solo despliega el front.

| Verificación | Acción |
|--------------|--------|
| **CORS** | Permitir el origen HTTPS del sitio (ej. `https://www.tudominio.com`) en `GET /api/stations/nearby`. |
| **HTTPS** | Certificado válido en la URL configurada en `VITE_API_BASE_URL`. |
| **Formato JSON** | Respuesta `{ "data": [ ... ] }` con `location.latitude` y `location.longitude` en cada estación. |

### Prueba desde terminal

```bash
curl -s "https://ultragas-api.ers.lat/api/stations/nearby?latitude=25.6866&longitude=-100.3161&radius=50" | head -c 500
```

Debe responder **HTTP 200** y JSON con estaciones.

---

## 7. Checklist post-despliegue

Marcar cada ítem en producción:

- [ ] **Home:** mapa de cobertura visible, sin error Mapbox 401 en consola.
- [ ] **`/cobertura`:** mapa carga, aparecen estaciones, búsqueda de ciudad funciona.
- [ ] **`/que-es-ultragas`:** se ve el poster; al hacer clic se reproduce el video.
- [ ] **Chat Pipedrive:** visible, sin errores CSP de `prepare.js`.
- [ ] **Rutas:** F5 en `/cobertura` y `/que-es-ultragas` no devuelve 404.
- [ ] **Headers:** existen `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`.
- [ ] **API:** en Network aparece `stations/nearby` con status **200**.

---

## 8. Errores frecuentes

| Síntoma | Causa probable | Qué hacer |
|---------|----------------|-----------|
| Mapbox **401** en consola | Token inválido o placeholder en el build | Token real en `.env` → `npm run build` → redesplegar `dist/` |
| Mapa sin estaciones | CORS del API o API caído | Revisar CORS y `curl` al endpoint |
| Video: pantalla negra antes del play | Build viejo o falta `ultragas-video-poster.svg` | Redesplegar `dist/` completo |
| Video: no reproduce al play | Falta `frame-src` YouTube en CSP | Actualizar CSP en IIS (sección 5.1) |
| Error CSP `prepare.js` | Falta hash en `script-src` | Sección 5.2 |
| Cambié `.env` en el servidor y no cambia nada | Vite no lee `.env` en runtime | Rebuild local/CI y volver a copiar `dist/` |
| `img.youtube.com` bloqueado en CSP | Código antiguo en producción | Desplegar build actual (ya no usa esa URL) |

---

## 9. Desarrollo local (opcional)

```bash
npm install
cp .env.example .env
# Editar .env con tokens de desarrollo
npm run dev
```

URL: `http://localhost:5173`

---

## 10. Contactos sugeridos

| Tema | Responsable |
|------|-------------|
| Tokens Mapbox / Google | Administrador de cuentas en consolas cloud |
| CORS y API `stations/nearby` | Equipo backend `ultragas-api` |
| IIS, CSP, certificados | Infraestructura / hosting |

---

*Última actualización: correcciones de video, CSP, Mapbox unificado y limpieza de consola en producción.*
