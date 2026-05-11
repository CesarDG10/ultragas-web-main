<template>
  <div id="map-container" class="flex-1 h-full map-bg relative">
    <!-- Roads -->
    <div class="map-road w-full h-[12px] top-[20%] left-0 transform -rotate-2 absolute"></div>
    <div class="map-road w-full h-[8px] top-[60%] left-0 transform rotate-1 absolute"></div>
    <div class="map-road w-[10px] h-full top-0 left-[30%] transform rotate-12 absolute"></div>
    <div class="map-road w-[14px] h-full top-0 left-[65%] transform -rotate-6 absolute"></div>
    <div class="map-road w-[8px] h-full top-0 left-[80%] transform rotate-3 absolute"></div>

    <!-- Water areas -->
    <div class="absolute bottom-0 right-0 w-[40%] h-[30%] bg-blue-100 opacity-50 rounded-tl-[100px]"></div>
    <div class="absolute top-10 left-10 w-[20%] h-[15%] bg-blue-100 opacity-40 rounded-full blur-xl"></div>

    <!-- Map Controls -->
    <div class="absolute bottom-8 right-6 flex flex-col gap-2 z-10">
      <button class="bg-white w-10 h-10 rounded-xl shadow-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center font-bold text-lg border border-gray-200 hover:border-brand-blue transition-all">+</button>
      <button class="bg-white w-10 h-10 rounded-xl shadow-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center font-bold text-lg border border-gray-200 hover:border-brand-blue transition-all">-</button>
    </div>

    <!-- Map Attribution -->
    <div class="absolute bottom-1 left-1 text-[10px] text-gray-500 bg-white/80 px-2 py-0.5 rounded z-10">
      © Mapbox © OpenStreetMap <strong>Improve this map</strong>
    </div>

    <!-- Map Pins -->
    <!-- Main pin (selected) -->
    <div
      class="absolute top-[45%] left-[52%] cursor-pointer group z-20"
      @click="$emit('select-station', mainStation)"
    >
      <div class="relative">
        <div class="w-12 h-12 bg-white rounded-full shadow-lg border-2 border-white flex items-center justify-center z-20 relative overflow-hidden">
          <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg" alt="Logo" class="w-full h-full object-cover opacity-90"/>
          <div class="absolute inset-0 bg-brand-blue/10"></div>
          <span class="absolute text-[8px] font-bold text-brand-blue bg-white px-1 rounded-sm shadow-sm">LOGO</span>
        </div>
        <div class="absolute top-11 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white"></div>
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-brand-blue/30 rounded-full animate-pulse -z-10"></div>
      </div>
    </div>

    <!-- Other pins -->
    <div
      v-for="pin in mapPins"
      :key="pin.id"
      :class="`absolute cursor-pointer map-pin z-20`"
      :style="{ top: pin.top, left: pin.left }"
      @click="pin.cluster ? null : $emit('select-station', pin)"
    >
      <template v-if="pin.cluster">
        <div :class="`w-9 h-9 ${pin.bgColor} rounded-full shadow-md border-2 border-white flex items-center justify-center text-white font-bold text-xs`">
          {{ pin.count }}
        </div>
      </template>
      <template v-else>
        <div class="relative">
          <div class="w-8 h-8 bg-white rounded-full shadow-md border-2 border-white flex items-center justify-center overflow-hidden">
            <i class="fa-solid fa-gas-pump text-brand-dark text-xs"></i>
          </div>
          <div class="absolute top-8 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-white"></div>
        </div>
      </template>
    </div>

    <!-- Mobile Toggle Filter -->
    <button
      @click="$emit('toggle-sidebar')"
      class="lg:hidden absolute bottom-6 right-6 z-50 bg-gradient-to-r from-brand-blue to-brand-purple text-white p-4 rounded-2xl shadow-xl hover:shadow-2xl flex items-center justify-center transition-all hover:-translate-y-1"
    >
      <i class="fa-solid fa-filter text-xl"></i>
    </button>
  </div>
</template>

<script setup>
defineEmits(['select-station', 'toggle-sidebar'])

const mainStation = {
  name: 'HEB Acapulco',
  permit: 'PL/2153/EXP/ES/2015',
  folio: '8974',
}

const mapPins = [
  { id: 1, top: '25%', left: '35%' },
  { id: 2, top: '65%', left: '70%' },
  { id: 3, top: '30%', left: '60%', cluster: true, count: 3, bgColor: 'bg-brand-blue' },
  { id: 4, top: '15%', left: '25%' },
  { id: 5, top: '75%', left: '40%' },
  { id: 6, top: '55%', left: '80%', cluster: true, count: 2, bgColor: 'bg-brand-purple' },
]
</script>
