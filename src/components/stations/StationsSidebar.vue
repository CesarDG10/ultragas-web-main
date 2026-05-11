<template>
  <aside
    id="sidebar-panel"
    :class="[
      'w-full lg:w-[420px] bg-gradient-to-b from-white to-slate-50 shadow-2xl flex flex-col border-l border-gray-200 h-full',
      mobileOpen ? '' : 'max-lg:hidden'
    ]"
  >
    <!-- Search -->
    <div class="p-6 pb-4 border-b border-gray-100 flex-none bg-white">
      <h1 class="text-3xl font-bold mb-6">
        <span class="gradient-text-brand">Buscar</span> Estaciones
      </h1>
      <div class="relative group">
        <i class="fa-solid fa-magnifying-glass absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-brand-blue transition-colors"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Ciudad, Estado o Nombre de Estación"
          class="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 text-base shadow-sm focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue transition-all outline-none"
        />
      </div>
    </div>

    <!-- Filters -->
    <div class="flex-1 overflow-y-auto sidebar-scroll p-6 pt-4">
      <!-- Productos -->
      <div class="mb-8 mt-4">
        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <i class="fa-solid fa-gas-pump text-brand-blue"></i>
          Productos
        </h3>
        <div class="grid grid-cols-2 gap-3">
          <label v-for="fuel in fuelTypes" :key="fuel.name" class="cursor-pointer group relative">
            <input type="checkbox" v-model="fuel.checked" class="peer sr-only" />
            <div
              :class="[
                'p-4 bg-white border-2 border-gray-200 rounded-2xl flex items-center gap-3 transition-all hover:border-gray-300',
                fuel.checked ? `border-${fuel.color}-500 bg-${fuel.color}-50` : ''
              ]"
            >
              <div :class="[
                'w-5 h-5 border-2 border-gray-300 rounded-lg bg-white transition-all flex items-center justify-center text-white shadow-sm flex-shrink-0',
                fuel.checked ? `bg-${fuel.color}-500 border-${fuel.color}-500` : ''
              ]">
                <i v-if="fuel.checked" class="fa-solid fa-check text-xs"></i>
              </div>
              <span :class="['text-sm font-bold text-gray-700', fuel.checked ? `text-${fuel.color}-600` : '']">{{ fuel.label }}</span>
            </div>
          </label>
        </div>
      </div>

      <!-- Amenidades -->
      <div class="mb-8">
        <h3 class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <i class="fa-solid fa-star text-brand-purple"></i>
          Amenidades
        </h3>
        <div class="space-y-2">
          <label
            v-for="amenity in amenities"
            :key="amenity.label"
            class="flex items-center gap-3 cursor-pointer group p-3 bg-white hover:bg-blue-50 rounded-xl transition-all border-2 border-transparent hover:border-brand-blue/20"
          >
            <div class="relative flex items-center">
              <input type="checkbox" v-model="amenity.checked" class="peer sr-only" />
              <div :class="[
                'w-6 h-6 border-2 border-gray-300 rounded-lg bg-white transition-all flex items-center justify-center text-white shadow-sm',
                amenity.checked ? 'bg-gradient-to-br from-brand-blue to-brand-purple border-transparent' : ''
              ]">
                <i v-if="amenity.checked" class="fa-solid fa-check text-xs"></i>
              </div>
            </div>
            <div class="flex items-center gap-3 text-gray-700 flex-1">
              <div :class="`w-10 h-10 rounded-xl ${amenity.bg} flex items-center justify-center`">
                <i :class="`${amenity.icon} ${amenity.iconColor}`"></i>
              </div>
              <span class="text-sm font-semibold">{{ amenity.label }}</span>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="p-6 border-t border-gray-200 bg-white flex-none">
      <div class="flex gap-3">
        <button
          @click="applyFilters"
          class="flex-1 bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold py-3.5 px-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
        >
          <i class="fa-solid fa-filter"></i>
          Filtrar
        </button>
        <button
          @click="resetFilters"
          class="flex-1 bg-white border-2 border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3.5 px-4 rounded-2xl transition-all hover:border-gray-300"
        >
          Cancelar
        </button>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  mobileOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['filter'])

const searchQuery = ref('')

const fuelTypes = ref([
  { name: 'premium', label: 'Premium', color: 'red', checked: false },
  { name: 'magna', label: 'Magna', color: 'green', checked: false },
  { name: 'diesel', label: 'Diesel', color: 'slate', checked: true },
  { name: 'uba', label: 'UBA', color: 'purple', checked: false },
])

const amenities = ref([
  { label: 'Abierto 24 Horas', icon: 'fa-regular fa-clock', iconColor: 'text-brand-blue', bg: 'bg-blue-100', checked: true },
  { label: 'Baños', icon: 'fa-solid fa-restroom', iconColor: 'text-brand-purple', bg: 'bg-purple-100', checked: false },
  { label: 'Área de Descanso', icon: 'fa-solid fa-couch', iconColor: 'text-orange-500', bg: 'bg-orange-100', checked: false },
  { label: 'Tienda de Conveniencia', icon: 'fa-solid fa-cart-shopping', iconColor: 'text-brand-red', bg: 'bg-red-100', checked: true },
  { label: 'Restaurante', icon: 'fa-solid fa-utensils', iconColor: 'text-yellow-600', bg: 'bg-yellow-100', checked: false },
  { label: 'Carga Eléctrica', icon: 'fa-solid fa-bolt', iconColor: 'text-yellow-400', bg: 'bg-yellow-100', checked: false },
  { label: 'Parada de Camiones', icon: 'fa-solid fa-bus', iconColor: 'text-indigo-500', bg: 'bg-indigo-100', checked: false },
])

function applyFilters() {
  emit('filter', { fuels: fuelTypes.value, amenities: amenities.value, search: searchQuery.value })
}

function resetFilters() {
  searchQuery.value = ''
  fuelTypes.value.forEach(f => f.checked = false)
  amenities.value.forEach(a => a.checked = false)
}
</script>
