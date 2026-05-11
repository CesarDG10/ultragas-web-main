<template>
  <section id="features-2" class="pt-6 pb-6 sm:pt-8 sm:pb-8 md:pt-10 md:pb-10 lg:pt-14 lg:pb-14 bg-slate-50 relative overflow-hidden">
    <div class="absolute inset-0 tech-bg-circuit opacity-30 pointer-events-none"></div>
    <div class="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 relative z-10 min-w-0">
      <div class="mb-6 sm:mb-8 md:mb-12 text-center max-w-3xl mx-auto px-1">
        <span class="text-brand-purple font-bold tracking-wider uppercase text-xs sm:text-sm mb-2 block">Potencia Sin Límites</span>
        <h2 class="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-dark tracking-tight leading-tight">
          Todo lo que hace a UltraGas<br>
          <span class="gradient-text-brand">la mejor opción.</span>
        </h2>
      </div>

      <!-- Grid: móvil 1 col compacto; sm 2 cols; md/lg 4–6 cols con filas fijas -->
      <div class="relative">
        <div ref="scrollContainer" class="flex sm:grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5 lg:gap-6 sm:auto-rows-[minmax(150px,200px)] md:[auto-rows:unset] md:grid-rows-[200px_200px] lg:[auto-rows:unset] lg:grid-rows-[200px_200px] overflow-x-auto snap-x snap-mandatory py-12 -my-12 sm:py-0 sm:my-0 -mx-3 px-3 sm:mx-0 sm:px-0 sm:overflow-visible hide-scrollbar">

          <!-- 1. Dashboard -->
        <div class="w-[85vw] sm:w-auto shrink-0 snap-center group col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-3 row-span-2 bg-[#1D1D1B] rounded-xl sm:rounded-2xl lg:rounded-[32px] overflow-hidden relative border border-gray-800 shadow-2xl hover:shadow-brand-purple/20 transition-all duration-300 min-h-[380px] sm:min-h-0 min-w-0 flex flex-col">
          <div class="absolute top-0 right-0 w-full h-full bg-radial from-brand-blue/10 to-transparent opacity-50 pointer-events-none"></div>

          <!-- MOBILE layout -->
          <div class="lg:hidden flex flex-col h-full p-5 relative z-10 gap-4">
            <div class="flex justify-between items-start">
              <h3 class="text-2xl font-bold text-white leading-tight">Control Total<br><span class="text-gray-400 font-normal text-lg">en Tiempo Real</span></h3>
              <div class="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 px-2.5 py-1 rounded-full">
                <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                <span class="text-[10px] font-bold text-green-400 uppercase tracking-wider">En vivo</span>
              </div>
            </div>
            <!-- 4 KPIs 2x2 -->
            <div class="grid grid-cols-2 gap-2">
              <div class="bg-white/5 rounded-xl p-3 border border-white/10">
                <p class="text-[10px] text-gray-400 mb-1">Consumo Hoy</p>
                <p class="text-lg font-bold text-white">$45,230</p>
                <p class="text-[10px] text-green-400 mt-0.5">↑ 12% vs ayer</p>
              </div>
              <div class="bg-white/5 rounded-xl p-3 border border-white/10">
                <p class="text-[10px] text-gray-400 mb-1">Litros Cargados</p>
                <p class="text-lg font-bold text-brand-blue">1,850 L</p>
                <p class="text-[10px] text-gray-500 mt-0.5">de 2,400 L límite</p>
              </div>
              <div class="bg-white/5 rounded-xl p-3 border border-white/10">
                <p class="text-[10px] text-gray-400 mb-1">Unidades Activas</p>
                <p class="text-lg font-bold text-purple-400">24 / 30</p>
                <p class="text-[10px] text-gray-500 mt-0.5">6 sin actividad</p>
              </div>
              <div class="bg-white/5 rounded-xl p-3 border border-white/10">
                <p class="text-[10px] text-gray-400 mb-1">Alertas</p>
                <p class="text-lg font-bold text-amber-400">3</p>
                <p class="text-[10px] text-amber-500/80 mt-0.5">Requieren atención</p>
              </div>
            </div>
            <!-- Chart -->
            <div class="flex-1 min-h-[80px] bg-[#252525] rounded-xl border border-gray-700 p-3 overflow-hidden transform group-hover:-translate-y-1 transition-transform duration-500">
              <p class="text-[10px] text-gray-500 mb-2">Consumo últimos 7 días</p>
              <svg viewBox="0 0 100 35" preserveAspectRatio="none" class="w-full h-full">
                <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2573D9" stop-opacity="0.4"/><stop offset="100%" stop-color="#2573D9" stop-opacity="0"/></linearGradient></defs>
                <path d="M0,35 L0,28 C10,32 20,8 30,18 C40,28 50,12 60,22 C70,32 80,7 90,12 L100,26 L100,35 Z" fill="url(#cg)" opacity="0.5"/>
                <path d="M0,28 C10,32 20,8 30,18 C40,28 50,12 60,22 C70,32 80,7 90,12 L100,26" fill="none" stroke="#2573D9" stroke-width="1.5"/>
              </svg>
            </div>
          </div>

          <!-- DESKTOP layout -->
          <div class="hidden lg:flex flex-col h-full p-6 xl:p-8 relative z-10 gap-5">
            <div class="flex justify-between items-center">
              <h3 class="text-2xl xl:text-3xl font-bold text-white leading-tight">Control Total <span class="text-gray-400 font-normal">en Tiempo Real</span></h3>
              <div class="flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 px-3 py-1.5 rounded-full">
                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span class="text-xs font-bold text-green-400 uppercase tracking-wider">En vivo</span>
              </div>
            </div>
            <!-- 4 KPIs en fila -->
            <div class="grid grid-cols-4 gap-3">
              <div class="bg-white/5 rounded-xl p-3 border border-white/10">
                <p class="text-[10px] text-gray-400 mb-1">Consumo Hoy</p>
                <p class="text-lg font-bold text-white">$45,230</p>
                <p class="text-[10px] text-green-400 mt-0.5">↑ 12% vs ayer</p>
              </div>
              <div class="bg-white/5 rounded-xl p-3 border border-white/10">
                <p class="text-[10px] text-gray-400 mb-1">Litros</p>
                <p class="text-lg font-bold text-brand-blue">1,850 L</p>
                <p class="text-[10px] text-gray-500 mt-0.5">de 2,400 L límite</p>
              </div>
              <div class="bg-white/5 rounded-xl p-3 border border-white/10">
                <p class="text-[10px] text-gray-400 mb-1">Unidades Activas</p>
                <p class="text-lg font-bold text-purple-400">24 / 30</p>
                <p class="text-[10px] text-gray-500 mt-0.5">6 sin actividad</p>
              </div>
              <div class="bg-white/5 rounded-xl p-3 border border-amber-500/10">
                <p class="text-[10px] text-gray-400 mb-1">Alertas</p>
                <p class="text-lg font-bold text-amber-400">3</p>
                <p class="text-[10px] text-amber-500/80 mt-0.5">Requieren atención</p>
              </div>
            </div>
            <!-- Chart + actividad reciente -->
            <div class="flex-1 min-h-0 flex gap-4">
              <div class="flex-1 bg-[#252525] rounded-xl border border-gray-700 p-4 overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-500 flex flex-col">
                <p class="text-xs text-gray-500 mb-3">Consumo últimos 7 días</p>
                <div class="flex-1 min-h-0">
                  <svg viewBox="0 0 100 40" preserveAspectRatio="none" class="w-full h-full">
                    <defs><linearGradient id="cgd" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2573D9" stop-opacity="0.4"/><stop offset="100%" stop-color="#2573D9" stop-opacity="0"/></linearGradient></defs>
                    <line x1="0" y1="10" x2="100" y2="10" stroke="#333" stroke-width="0.5"/>
                    <line x1="0" y1="25" x2="100" y2="25" stroke="#333" stroke-width="0.5"/>
                    <path d="M0,40 L0,30 C10,35 20,10 30,20 C40,30 50,15 60,25 C70,35 80,10 90,15 L100,30 L100,40 Z" fill="url(#cgd)" opacity="0.5"/>
                    <path d="M0,30 C10,35 20,10 30,20 C40,30 50,15 60,25 C70,35 80,10 90,15 L100,30" fill="none" stroke="#2573D9" stroke-width="1.5"/>
                    <circle cx="90" cy="15" r="2" fill="#2573D9"/>
                  </svg>
                </div>
              </div>
              <!-- Mini actividad -->
              <div class="w-36 xl:w-44 flex flex-col gap-2">
                <p class="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">Última actividad</p>
                <div class="flex flex-col gap-1.5 flex-1">
                  <div class="bg-white/5 rounded-lg p-2 border border-white/5">
                    <p class="text-[10px] font-bold text-white truncate">Unidad #42</p>
                    <p class="text-[9px] text-gray-500">30.2 L · $860</p>
                  </div>
                  <div class="bg-white/5 rounded-lg p-2 border border-white/5">
                    <p class="text-[10px] font-bold text-white truncate">Unidad #18</p>
                    <p class="text-[9px] text-gray-500">45.0 L · $1,280</p>
                  </div>
                  <div class="bg-white/5 rounded-lg p-2 border border-white/5">
                    <p class="text-[10px] font-bold text-white truncate">Unidad #07</p>
                    <p class="text-[9px] text-gray-500">52.1 L · $1,485</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Seguridad RFID -->
        <div class="w-[85vw] sm:w-auto shrink-0 snap-center group col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-1 row-span-2 bg-gradient-to-br from-[#8434E1] to-[#5b1da8] rounded-xl sm:rounded-2xl lg:rounded-[32px] p-4 sm:p-6 relative overflow-hidden text-white hover:-translate-y-1 transition-transform duration-300 shadow-xl min-h-[320px] sm:min-h-0 min-w-0 flex flex-col">
          <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div class="h-full flex flex-col justify-between relative z-10 min-w-0">
            <div class="min-w-0">
              <div class="w-12 h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 backdrop-blur-sm shrink-0">
                <i class="fa-solid fa-microchip text-2xl"></i>
              </div>
              <h3 class="text-xl lg:text-2xl font-bold mb-1 sm:mb-2">Seguridad<br>Tecnológica</h3>
              <p class="text-purple-100 text-sm leading-relaxed">Tecnología RFID para autenticar cada transacción y NIP dinámico vía app móvil.</p>
            </div>
            <!-- RFID Card Visual -->
            <div class="mt-6 flex flex-col items-center gap-3 sm:gap-4">
              <div class="w-full max-w-[240px] sm:max-w-[180px] mx-auto bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 sm:p-3 flex items-center gap-3 group-hover:border-white/40 transition-colors">
                <div class="w-10 h-7 bg-gradient-to-br from-yellow-300 to-yellow-400 rounded-md flex items-center justify-center shrink-0">
                  <i class="fa-solid fa-microchip text-yellow-800 text-[10px]"></i>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="h-2 w-16 bg-white/40 rounded mb-2"></div>
                  <div class="h-1.5 w-12 bg-white/20 rounded"></div>
                </div>
                <div class="flex flex-col gap-1 items-center shrink-0">
                  <div class="w-0.5 h-2 bg-white/30 rounded-full"></div>
                  <div class="w-0.5 h-3 bg-white/50 rounded-full"></div>
                  <div class="w-0.5 h-4 bg-white/80 rounded-full animate-pulse"></div>
                </div>
              </div>
              <div class="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 border border-white/20">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span class="text-xs font-bold text-white">RFID Verificado</span>
              </div>
              <div class="grid grid-cols-2 gap-3 w-full max-w-[240px] sm:max-w-full mx-auto">
                <div class="bg-white/10 rounded-lg p-2 text-center border border-white/10">
                  <p class="text-[10px] text-purple-200 mb-0.5">Cifrado</p>
                  <p class="text-xs font-bold text-white">AES-256</p>
                </div>
                <div class="bg-white/10 rounded-lg p-2 text-center border border-white/10">
                  <p class="text-[10px] text-purple-200 mb-0.5">NIP</p>
                  <p class="text-xs font-bold text-white">Dinámico</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. CFDI -->
        <div class="w-[85vw] sm:w-auto shrink-0 snap-center group col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2 row-span-1 bg-white border border-gray-200 rounded-xl sm:rounded-2xl lg:rounded-[32px] p-5 sm:p-6 flex flex-col justify-between hover:border-brand-blue/50 transition-colors shadow-sm hover:shadow-lg relative overflow-hidden min-h-[320px] sm:min-h-0 min-w-0">
          <div class="absolute right-0 bottom-0 opacity-[0.03] transform translate-x-4 translate-y-4 pointer-events-none">
            <i class="fa-solid fa-file-invoice-dollar text-9xl text-brand-dark"></i>
          </div>
          
          <div class="relative z-10 flex-1 flex flex-col min-w-0">
            <div class="flex justify-between items-start gap-2 mb-4">
              <div class="min-w-0">
                <h3 class="text-xl sm:text-xl font-bold text-gray-900 leading-tight">Facturación<br>100% Deducible</h3>
                <p class="text-gray-500 text-sm mt-2">Un solo CFDI mensual por todos tus consumos.</p>
              </div>
              <div class="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center text-green-600 shrink-0">
                <i class="fa-solid fa-check text-2xl"></i>
              </div>
            </div>

            <!-- Visual representation of invoice -->
            <div class="mt-auto mb-4 bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col gap-2 lg:hidden">
              <div class="flex items-center justify-between border-b border-gray-200 pb-2">
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-file-lines text-gray-400"></i>
                  <span class="text-xs font-bold text-gray-700">CFDI_Mensual.pdf</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500">1.2 MB</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <i class="fa-solid fa-code text-gray-400"></i>
                  <span class="text-xs font-bold text-gray-700">CFDI_Mensual.xml</span>
                </div>
                <span class="text-[10px] font-mono text-gray-500">845 KB</span>
              </div>
            </div>
            
            <div class="flex flex-wrap items-center gap-3 lg:mt-auto">
              <!-- Desktop simple tags -->
              <div class="hidden lg:block bg-gray-100 px-2 py-1 rounded text-[10px] font-mono text-gray-600 border border-gray-200">XML</div>
              <div class="hidden lg:block bg-gray-100 px-2 py-1 rounded text-[10px] font-mono text-gray-600 border border-gray-200">PDF</div>
              <div class="hidden lg:block h-px flex-1 bg-gray-200 min-w-[10px]"></div>

              <span class="flex items-center gap-1.5 text-xs lg:text-[10px] xl:text-xs font-bold text-brand-blue bg-blue-50 px-3 lg:px-2 xl:px-3 py-1.5 lg:py-1 xl:py-1.5 rounded-lg border border-blue-100">
                <i class="fa-solid fa-check-circle"></i> SAT Validado
              </span>
              <span class="flex items-center gap-1.5 text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100 lg:hidden xl:flex">
                <i class="fa-solid fa-bolt"></i> Automático
              </span>
            </div>
          </div>
        </div>

        <!-- 4. Anti-Fraude -->
        <div class="w-[85vw] sm:w-auto shrink-0 snap-center group col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-1 row-span-1 bg-white border border-red-100 rounded-xl sm:rounded-2xl lg:rounded-[32px] relative overflow-hidden hover:shadow-red-100/50 hover:shadow-xl transition-all min-h-[320px] sm:min-h-0 min-w-0 flex flex-col">

          <!-- MOBILE layout -->
          <div class="lg:hidden flex flex-col justify-between flex-1 p-5">
            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 shrink-0">
                  <i class="fa-solid fa-shield-halved text-2xl"></i>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 leading-tight">Anti-Fraude IA</h3>
                  <p class="text-sm text-gray-500 mt-0.5">Detección en tiempo real.</p>
                </div>
              </div>
            </div>
            <div class="space-y-2.5 mt-auto">
              <div class="bg-red-50 rounded-xl p-3 flex items-center gap-3 border border-red-100">
                <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                  <i class="fa-solid fa-triangle-exclamation text-red-500 text-sm"></i>
                </div>
                <div class="min-w-0">
                  <p class="text-xs font-bold text-red-600">Carga doble detectada</p>
                  <p class="text-[10px] text-red-400">Unidad #482 · Hace 2 min</p>
                </div>
                <div class="w-2 h-2 bg-red-500 rounded-full animate-pulse shrink-0 ml-auto"></div>
              </div>
              <div class="bg-amber-50 rounded-xl p-3 flex items-center gap-3 border border-amber-100">
                <div class="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                  <i class="fa-solid fa-clock text-amber-500 text-sm"></i>
                </div>
                <div class="min-w-0">
                  <p class="text-xs font-bold text-amber-700">Exceso de límite diario</p>
                  <p class="text-[10px] text-amber-500">Tarjeta #019 · Bloqueada</p>
                </div>
              </div>
              <div class="bg-green-50 rounded-xl p-3 flex items-center gap-3 border border-green-100">
                <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                  <i class="fa-solid fa-check text-green-500 text-sm"></i>
                </div>
                <div class="min-w-0">
                  <p class="text-xs font-bold text-green-700">12 transacciones validadas</p>
                  <p class="text-[10px] text-green-500">Últimas 24 horas · Normal</p>
                </div>
              </div>
            </div>
          </div>

          <!-- DESKTOP layout: compacto -->
          <div class="hidden lg:flex flex-col justify-between flex-1 p-5">
            <div class="flex items-start justify-between gap-2">
              <div>
                <h3 class="text-base font-bold text-gray-900 leading-tight">Anti-Fraude IA</h3>
                <p class="text-xs text-gray-500 mt-0.5">Detección en tiempo real.</p>
              </div>
              <div class="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500 shrink-0">
                <i class="fa-solid fa-shield-halved text-base"></i>
              </div>
            </div>
            <div class="space-y-1.5">
              <div class="bg-red-50 rounded-lg p-2 flex items-center gap-2 border border-red-100">
                <div class="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shrink-0"></div>
                <span class="text-[11px] font-bold text-red-600 truncate">Carga doble detectada</span>
              </div>
              <div class="bg-amber-50 rounded-lg p-2 flex items-center gap-2 border border-amber-100">
                <div class="w-1.5 h-1.5 bg-amber-500 rounded-full shrink-0"></div>
                <span class="text-[11px] font-medium text-amber-700 truncate">Exceso de límite</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 5. Coverage Map -->
        <div class="w-[85vw] sm:w-auto shrink-0 snap-center group col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-1 row-span-1 bg-slate-900 rounded-xl sm:rounded-2xl lg:rounded-[32px] relative overflow-hidden shadow-lg min-h-[320px] sm:min-h-0 min-w-0 flex flex-col justify-between">
          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5WMOvALLUpMglBBkn5uPihELqOU2%2Fcad05934-3cce-4d8b-a946-821772c7b319.png" class="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-700" alt="" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20"></div>

          <!-- MOBILE layout: rich con ruta SVG -->
          <div class="lg:hidden flex flex-col justify-between h-full p-5 sm:p-6 relative z-10">
            <div class="absolute inset-0 z-0 pointer-events-none">
              <svg class="w-full h-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
                <path d="M 30,150 C 70,110 90,140 130,90 C 160,50 170,70 180,40" fill="none" stroke="#3B82F6" stroke-width="2" stroke-dasharray="4 4" opacity="0.8" />
                <circle cx="30" cy="150" r="4" fill="#3B82F6" />
                <circle cx="30" cy="150" r="10" fill="#3B82F6" opacity="0.25" />
                <circle cx="130" cy="90" r="3" fill="#10B981" />
                <circle cx="130" cy="90" r="8" fill="#10B981" opacity="0.25" />
                <circle cx="180" cy="40" r="4" fill="#8B5CF6" />
                <circle cx="180" cy="40" r="12" fill="#8B5CF6" opacity="0.25" />
              </svg>
              <div class="absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full flex items-center gap-2 -rotate-6 shadow-xl">
                <i class="fa-solid fa-route text-brand-blue text-xs"></i>
                <span class="text-[10px] font-bold text-white">Ruta Optimizada</span>
              </div>
            </div>
            <div class="relative z-10">
              <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <i class="fa-solid fa-map-location-dot text-white text-xl"></i>
              </div>
            </div>
            <div class="relative z-10">
              <h3 class="text-white font-bold text-2xl mb-1">+2,000 Estaciones</h3>
              <p class="text-gray-300 text-sm mb-3 leading-tight">Arma tus rutas con la mayor red de cobertura del país.</p>
              <div class="flex items-center gap-2 bg-white/10 w-fit px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm">
                <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span class="text-xs font-semibold text-green-400 uppercase tracking-wider">Nacional</span>
              </div>
            </div>
          </div>

          <!-- DESKTOP layout: limpio y minimalista -->
          <div class="hidden lg:flex flex-col justify-between h-full p-5 relative z-10">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/20">
              <i class="fa-solid fa-map-location-dot text-white text-base"></i>
            </div>
            <div>
              <p class="text-3xl font-black text-white leading-none">+2,000</p>
              <p class="text-sm font-semibold text-gray-300 mt-0.5">Estaciones</p>
              <div class="flex items-center gap-1.5 mt-3">
                <span class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                <span class="text-[11px] font-semibold text-green-400 uppercase tracking-wider">Cobertura Nacional</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 6. App Móvil -->
        <div class="w-[85vw] sm:w-auto shrink-0 snap-center group col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-1 min-h-[320px] sm:min-h-0 min-w-0 bg-brand-blue rounded-xl sm:rounded-2xl lg:rounded-[32px] pt-6 px-6 pb-0 sm:p-5 lg:p-6 relative overflow-hidden text-white shadow-xl hover:shadow-brand-blue/30 transition-all flex flex-col sm:block">
          <div class="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
          
          <div class="relative z-10 w-full sm:max-w-[50%] text-center sm:text-left mb-auto sm:mb-0">
            <h3 class="text-2xl sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-1">App Móvil</h3>
            <p class="text-blue-100 text-sm lg:text-base leading-snug">Tu monedero en el celular. Control total en tu bolsillo.</p>
            <div class="flex gap-3 sm:gap-2 mt-4 justify-center sm:justify-start">
              <div class="bg-white/20 w-12 h-12 sm:w-10 sm:h-10 rounded-xl sm:rounded-lg backdrop-blur-sm flex items-center justify-center">
                <i class="fa-brands fa-apple text-xl sm:text-lg"></i>
              </div>
              <div class="bg-white/20 w-12 h-12 sm:w-10 sm:h-10 rounded-xl sm:rounded-lg backdrop-blur-sm flex items-center justify-center">
                <i class="fa-brands fa-android text-xl sm:text-lg"></i>
              </div>
            </div>
          </div>

          <!-- Phone Mockup Peeking -->
          <div class="relative sm:absolute mt-8 sm:mt-0 -bottom-2 sm:-bottom-6 mx-auto sm:mx-0 sm:-right-2 w-48 sm:w-36 lg:w-44 h-56 sm:h-44 lg:h-52 bg-white rounded-t-3xl shadow-2xl border-4 border-gray-100 overflow-hidden transform group-hover:-translate-y-2 transition-transform duration-500 z-10 flex-shrink-0">
            <!-- Notch -->
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-16 sm:w-12 h-4 bg-gray-100 rounded-b-xl"></div>
            <!-- Screen Content -->
            <div class="pt-8 sm:pt-6 lg:pt-8 px-4 sm:px-3 lg:px-4">
              <div class="flex justify-between items-center mb-4 sm:mb-3 lg:mb-4">
                <div class="w-16 sm:w-12 lg:w-16 h-2.5 sm:h-2 lg:h-2.5 bg-gray-200 rounded-full"></div>
                <div class="w-5 h-5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 bg-brand-blue/20 rounded-full"></div>
              </div>
              <div class="w-full h-16 sm:h-12 lg:h-16 bg-gradient-to-r from-brand-blue to-brand-purple rounded-xl mb-3 sm:mb-2 lg:mb-3"></div>
              <div class="w-full h-12 sm:h-8 lg:h-10 bg-gray-100 rounded-lg"></div>
            </div>
          </div>
        </div>

        <!-- 7. Soporte 24/7 -->
        <div class="w-[85vw] sm:w-auto shrink-0 snap-center group col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-1 row-span-1 bg-[#FFF8E1] rounded-xl sm:rounded-2xl lg:rounded-[32px] hover:shadow-lg transition-all border border-orange-100 min-h-[320px] sm:min-h-0 min-w-0 overflow-hidden flex flex-col">

          <!-- MOBILE layout -->
          <div class="lg:hidden flex flex-col justify-between flex-1 p-5">
            <div class="flex items-center gap-3">
              <div class="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 shrink-0">
                <i class="fa-solid fa-headset text-2xl"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-xl leading-tight">Soporte 24/7</h3>
                <p class="text-sm text-gray-500 mt-0.5">Expertos reales, siempre disponibles.</p>
              </div>
            </div>

            <!-- Fake chat bubble visual -->
            <div class="flex flex-col gap-2 my-4">
              <div class="flex items-end gap-2">
                <div class="w-7 h-7 bg-orange-200 rounded-full flex items-center justify-center shrink-0">
                  <i class="fa-solid fa-headset text-orange-600 text-[10px]"></i>
                </div>
                <div class="bg-white rounded-2xl rounded-bl-sm px-3 py-2 shadow-sm border border-orange-100 max-w-[80%]">
                  <p class="text-xs text-gray-700">¡Hola! ¿En qué puedo ayudarte hoy?</p>
                </div>
              </div>
              <div class="flex items-end gap-2 flex-row-reverse">
                <div class="bg-orange-400 rounded-2xl rounded-br-sm px-3 py-2 max-w-[70%]">
                  <p class="text-xs text-white">Necesito bloquear una tarjeta.</p>
                </div>
              </div>
              <div class="flex items-end gap-2">
                <div class="w-7 h-7 bg-orange-200 rounded-full flex items-center justify-center shrink-0">
                  <i class="fa-solid fa-headset text-orange-600 text-[10px]"></i>
                </div>
                <div class="bg-white rounded-2xl rounded-bl-sm px-3 py-2 shadow-sm border border-orange-100 max-w-[80%]">
                  <p class="text-xs text-gray-700">Claro, <span class="font-bold text-orange-500">tarjeta bloqueada</span> al instante ✓</p>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2 bg-white/60 w-fit px-3 py-1.5 rounded-lg border border-orange-100 shadow-sm">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></div>
              <span class="text-xs font-semibold text-green-700">Agente disponible ahora</span>
            </div>
          </div>

          <!-- DESKTOP layout: compacto -->
          <div class="hidden lg:flex flex-col justify-between flex-1 p-5">
            <div class="flex flex-col gap-2">
              <div class="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
                <i class="fa-solid fa-headset text-base"></i>
              </div>
              <div>
                <h3 class="font-bold text-gray-900 text-base leading-tight">Soporte 24/7</h3>
                <p class="text-xs text-gray-500 mt-0.5">Expertos reales, siempre disponibles.</p>
              </div>
            </div>
            <div class="flex items-center gap-2 bg-white/60 w-fit px-2.5 py-1.5 rounded-lg border border-orange-100">
              <div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shrink-0"></div>
              <span class="text-[11px] font-semibold text-green-700">Agente disponible</span>
            </div>
          </div>
        </div>

        <!-- 8. API -->
        <div class="w-[85vw] sm:w-auto shrink-0 snap-center group col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-1 row-span-1 bg-[#1E2433] rounded-xl sm:rounded-2xl lg:rounded-[32px] hover:bg-[#161C2A] transition-colors shadow-lg min-h-[320px] sm:min-h-0 min-w-0 overflow-hidden flex flex-col">

          <!-- MOBILE layout -->
          <div class="lg:hidden flex flex-col justify-between flex-1 p-5 gap-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-bold text-white text-xl">API Robusta</h3>
                <p class="text-sm text-gray-400 mt-1">Conecta tu ERP en minutos.</p>
              </div>
              <span class="text-xs font-mono text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-1 rounded shrink-0">REST</span>
            </div>
            <!-- Diagrama de integración -->
            <div class="flex items-center justify-between gap-2">
              <div class="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <i class="fa-solid fa-building text-blue-400 text-xl mb-1"></i>
                <p class="text-[10px] font-bold text-white">Tu ERP</p>
                <p class="text-[9px] text-gray-500">SAP · Oracle</p>
              </div>
              <div class="flex flex-col items-center gap-1 px-1">
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div class="w-8 h-px bg-green-400/50"></div>
                <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse" style="animation-delay:0.4s"></div>
              </div>
              <div class="flex-1 bg-brand-blue/20 border border-brand-blue/30 rounded-xl p-3 text-center">
                <i class="fa-solid fa-bolt text-brand-blue text-xl mb-1"></i>
                <p class="text-[10px] font-bold text-white">UltraGas API</p>
                <p class="text-[9px] text-gray-400">Tiempo real</p>
              </div>
            </div>
            <!-- Code snippet -->
            <div class="bg-black/50 rounded-xl p-3 font-mono border border-white/5">
              <div class="text-xs text-green-400">GET /api/v1/transacciones</div>
              <div class="text-xs text-gray-500 mt-1.5">Authorization: Bearer <span class="text-yellow-400">••••••</span></div>
              <div class="text-xs text-blue-400 mt-1.5">→ 200 <span class="text-gray-400">&#123; data: [...] &#125;</span></div>
            </div>
          </div>

          <!-- DESKTOP layout: compacto -->
          <div class="hidden lg:flex flex-col justify-between flex-1 p-5">
            <div class="flex justify-between items-start gap-2 min-w-0">
              <div class="min-w-0">
                <h3 class="font-bold text-white text-base leading-tight">API Robusta</h3>
                <p class="text-xs text-gray-400 mt-1">Conecta tu ERP en minutos.</p>
              </div>
              <span class="text-[10px] font-mono text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-1 rounded shrink-0">REST</span>
            </div>
            <div class="bg-black/50 rounded-xl p-3 font-mono border border-white/5 min-w-0 overflow-hidden">
              <div class="text-[9px] xl:text-[11px] text-green-400 truncate">GET /api/v1/transacciones</div>
              <div class="text-[9px] xl:text-[11px] text-gray-500 mt-1.5 truncate">Auth: Bearer <span class="text-yellow-400">••••</span></div>
              <div class="text-[9px] xl:text-[11px] text-blue-400 mt-1.5 truncate">→ 200 <span class="text-gray-400">&#123; data: [...] &#125;</span></div>
            </div>
          </div>
        </div>

        <!-- 9. Multi-Usuario -->
        <div class="w-[85vw] sm:w-auto shrink-0 snap-center group col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-2 row-span-1 bg-white border border-gray-200 rounded-xl sm:rounded-2xl lg:rounded-[32px] p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 sm:gap-6 hover:shadow-xl transition-all overflow-hidden relative min-h-[220px] sm:min-h-0 min-w-0 text-center sm:text-left">
          <div class="absolute -right-4 -bottom-4 bg-brand-purple/5 w-40 h-40 rounded-full pointer-events-none"></div>
          <div class="flex -space-x-4 relative z-10 shrink-0">
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="" class="w-14 h-14 rounded-full border-4 border-white shadow-md"/>
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg" alt="" class="w-14 h-14 rounded-full border-4 border-white shadow-md"/>
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="" class="w-14 h-14 rounded-full border-4 border-white shadow-md"/>
            <div class="w-14 h-14 rounded-full border-4 border-white shadow-md bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">+50</div>
          </div>
          <div class="relative z-10 min-w-0">
            <h3 class="font-bold text-gray-900 text-lg sm:text-xl mb-1">Multi-Usuario</h3>
            <p class="text-sm text-gray-500">Permisos granulares por rol y departamento.</p>
          </div>
        </div>

      </div>

      <!-- Navigation Buttons (Mobile only) -->
      <div class="flex justify-center gap-3 mt-4 sm:hidden">
        <button @click="scroll('left')" class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand-purple hover:border-brand-purple/30 transition-all shadow-sm" aria-label="Anterior">
          <i class="fa-solid fa-chevron-left text-sm"></i>
        </button>
        <button @click="scroll('right')" class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-brand-purple hover:border-brand-purple/30 transition-all shadow-sm" aria-label="Siguiente">
          <i class="fa-solid fa-chevron-right text-sm"></i>
        </button>
      </div>

    </div>
    </div>
  </section>
</template>

<script setup>
import { useCarousel } from '../../composables/useCarousel'

const { scrollContainer, scroll } = useCarousel({ interval: 3500 })
</script>
