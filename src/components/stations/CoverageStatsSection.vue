<template>
  <section class="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-brand-purple/10 to-brand-blue/10 rounded-full blur-3xl animate-pulse"></div>
    </div>

    <div class="max-w-[1440px] mx-auto px-8 relative z-10">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 border border-brand-blue/30 backdrop-blur-sm mb-6">
          <i class="fa-solid fa-chart-simple text-brand-blue text-sm"></i>
          <span class="text-xs font-bold tracking-widest uppercase text-brand-blue">Indicadores de Cobertura</span>
        </div>
        <h2 class="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Nuestra Presencia en Números
        </h2>
        <p class="text-lg text-gray-400 max-w-2xl mx-auto">
          Datos actualizados en tiempo real de nuestra red nacional
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="group bg-gradient-to-br from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-3xl p-8 border border-slate-600/30 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
          :class="`hover:border-${stat.hoverColor}/50`"
        >
          <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" :class="`from-${stat.hoverColor}/5 to-transparent`"></div>
          <div class="relative z-10">
            <div class="flex items-center justify-between mb-6">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg" :class="`bg-gradient-to-br ${stat.iconGradient}`">
                <i :class="`fa-solid ${stat.icon} text-white text-2xl`"></i>
              </div>
            </div>
            <h3 class="text-5xl font-black text-white mb-2">{{ stat.value }}</h3>
            <p class="text-gray-400 font-semibold">{{ stat.label }}</p>
            <div class="mt-4 h-1 w-full bg-slate-700 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full"
                :class="[`bg-gradient-to-r ${stat.barGradient}`, stat.animated ? 'animate-pulse' : '']"
                :style="{ width: stat.barWidth }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  {
    label: 'Estaciones Afiliadas',
    value: '2,153',
    icon: 'fa-gas-pump',
    iconGradient: 'from-brand-blue to-blue-600',
    hoverColor: 'brand-blue',
    barGradient: 'from-brand-blue to-brand-purple',
    barWidth: '100%',
  },
  {
    label: 'Estados Cubiertos',
    value: '32',
    icon: 'fa-map',
    iconGradient: 'from-brand-purple to-purple-600',
    hoverColor: 'brand-purple',
    barGradient: 'from-brand-purple to-pink-500',
    barWidth: '100%',
  },
  {
    label: 'Ciudades Principales',
    value: '450+',
    icon: 'fa-city',
    iconGradient: 'from-emerald-500 to-green-600',
    hoverColor: 'emerald-500',
    barGradient: 'from-emerald-500 to-green-400',
    barWidth: '83%',
  },
  {
    label: 'Transacciones Diarias',
    value: '18K+',
    icon: 'fa-chart-line',
    iconGradient: 'from-orange-500 to-red-500',
    hoverColor: 'orange-500',
    barGradient: 'from-orange-500 to-red-400',
    barWidth: '80%',
    animated: true,
  },
]
</script>
