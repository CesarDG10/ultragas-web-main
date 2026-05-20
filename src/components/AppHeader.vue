<template>
  <header
    id="header"
    :class="[
      'fixed top-0 w-full z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-100',
      scrolled ? 'shadow-lg' : ''
    ]"
  >
    <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 lg:h-24 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center cursor-pointer h-full py-3 lg:py-4">
        <RouterLink to="/" @click="mobileOpen = false">
          <img
            alt="UltraGas Logo"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5WMOvALLUpMglBBkn5uPihELqOU2%2F41af6505-af0d-4e06-ad4e-83e70bda49a0.png"
            class="h-8 sm:h-9 lg:h-full object-contain"
          />
        </RouterLink>
      </div>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-8">
        <RouterLink
          to="/"
          class="text-sm font-medium text-gray-600 hover:text-brand-purple transition-colors"
          :class="{ 'text-brand-purple': $route.name === 'home' }"
        >Producto</RouterLink>
        <RouterLink
          to="/cobertura"
          class="text-sm font-medium text-gray-600 hover:text-brand-purple transition-colors"
          :class="{ 'text-brand-purple': $route.name === 'cobertura' }"
        >Cobertura</RouterLink>
        <RouterLink
          to="/fiscal"
          class="text-sm font-medium text-gray-600 hover:text-brand-purple transition-colors"
          :class="{ 'text-brand-purple': $route.name === 'fiscal' }"
        >Fiscal</RouterLink>
        <RouterLink
          to="/que-es-ultragas"
          class="text-sm font-medium text-gray-600 hover:text-brand-purple transition-colors"
          :class="{ 'text-brand-purple': $route.name === 'que-es-ultragas' }"
        >¿Qué es UltraGas?</RouterLink>
        <a href="#" class="text-sm font-medium text-gray-600 hover:text-brand-purple transition-colors">Soporte</a>
      </nav>

      <!-- Desktop CTAs -->
      <div class="hidden md:flex items-center gap-4">
        <AccessDropdown
          afiliados-url="https://ultragas.com.mx/Afiliadas/"
          clientesviejo-url="https://ultragas.com.mx/Consultas2/"
          clientesnuevo-url="https://ultragas.com.mx/Clientes"
          @open-portal-modal="openPortalModal"
        />
        <button
          @click="openModal('Contratar Ahora')"
          class="bg-gradient-to-r from-brand-blue to-brand-purple text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-brand-purple/30 transition-all"
        >
          Contratar Ahora
        </button>
      </div>

      <!-- Mobile: botón hamburguesa -->
      <button
        type="button"
        class="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
        aria-label="Menú"
        @click="mobileOpen = true"
      >
        <i class="fa-solid fa-bars text-xl text-gray-700"></i>
      </button>
    </div>
  </header>

  <!-- Portal Modal -->
  <PortalModal
    clientesviejo-url="https://ultragas.com.mx/Consultas2/"
    clientesnuevo-url="https://ultragas.com.mx/Clientes"
  />

  <!-- Mobile Drawer Overlay -->
  <Teleport to="body">
    <Transition name="fade-overlay">
      <div
        v-if="mobileOpen"
        class="fixed inset-0 bg-black/40 z-[60] md:hidden"
        @click="mobileOpen = false"
      ></div>
    </Transition>

    <Transition name="slide-drawer">
      <div
        v-if="mobileOpen"
        class="fixed top-0 right-0 bottom-0 w-[85vw] max-w-xs bg-white z-[70] md:hidden flex flex-col shadow-2xl"
      >
        <!-- Drawer header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <img
            alt="UltraGas Logo"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5WMOvALLUpMglBBkn5uPihELqOU2%2F41af6505-af0d-4e06-ad4e-83e70bda49a0.png"
            class="h-8 object-contain"
          />
          <button
            type="button"
            @click="mobileOpen = false"
            class="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Cerrar menú"
          >
            <i class="fa-solid fa-xmark text-gray-600"></i>
          </button>
        </div>

        <!-- Nav links -->
        <nav class="flex flex-col px-3 py-4 gap-1 flex-1 overflow-y-auto">
          <RouterLink
            to="/"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-purple-50/60 transition-colors"
            :class="{ 'text-brand-purple bg-purple-50/60': $route.name === 'home' }"
            @click="mobileOpen = false"
          >
            <i class="fa-solid fa-house text-sm w-4 text-center text-gray-400"></i>
            Producto
          </RouterLink>
          <RouterLink
            to="/cobertura"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-purple-50/60 transition-colors"
            :class="{ 'text-brand-purple bg-purple-50/60': $route.name === 'cobertura' }"
            @click="mobileOpen = false"
          >
            <i class="fa-solid fa-map-location-dot text-sm w-4 text-center text-gray-400"></i>
            Cobertura
          </RouterLink>
          <RouterLink
            to="/fiscal"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-purple-50/60 transition-colors"
            :class="{ 'text-brand-purple bg-purple-50/60': $route.name === 'fiscal' }"
            @click="mobileOpen = false"
          >
            <i class="fa-solid fa-file-invoice-dollar text-sm w-4 text-center text-gray-400"></i>
            Fiscal
          </RouterLink>
          <RouterLink
            to="/que-es-ultragas"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-purple-50/60 transition-colors"
            :class="{ 'text-brand-purple bg-purple-50/60': $route.name === 'que-es-ultragas' }"
            @click="mobileOpen = false"
          >
            <i class="fa-solid fa-circle-play text-sm w-4 text-center text-gray-400"></i>
            ¿Qué es UltraGas?
          </RouterLink>
          <a
            href="#"
            class="flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-gray-700 hover:text-brand-purple hover:bg-purple-50/60 transition-colors"
          >
            <i class="fa-solid fa-headset text-sm w-4 text-center text-gray-400"></i>
            Soporte
          </a>
        </nav>

        <!-- Accesos + CTA -->
        <div class="px-4 py-5 border-t border-gray-100 flex flex-col gap-3 flex-shrink-0">
          <p class="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-1">Accesos</p>
          <a
            href="https://ultragas.com.mx/Consultas2/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:border-brand-purple/40 hover:text-brand-purple transition-colors"
            @click="mobileOpen = false"
          >
            <i class="fa-solid fa-user-tie text-gray-400 w-4 text-center"></i>
            Acceso a clientes
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-gray-300 ml-auto"></i>
          </a>
          <a
            href="https://ultragas.com.mx/Afiliadas/"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:border-brand-purple/40 hover:text-brand-purple transition-colors"
            @click="mobileOpen = false"
          >
            <i class="fa-solid fa-store text-gray-400 w-4 text-center"></i>
            Acceso a afiliados
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-gray-300 ml-auto"></i>
          </a>
          <button
            @click="openModal('Contratar Ahora'); mobileOpen = false"
            class="w-full bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold py-3.5 px-4 rounded-xl text-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all mt-1"
          >
            Contratar Ahora
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useContactModal } from '../composables/useContactModal'
import { useVideoModal } from '../composables/useVideoModal'
import { usePortalModal } from '../composables/usePortalModal'
import AccessDropdown from './AccessDropdown.vue'
import PortalModal from './PortalModal.vue'

const { openModal } = useContactModal()
const { openVideo } = useVideoModal()
const { openPortalModal } = usePortalModal()

const scrolled = ref(false)
const mobileOpen = ref(false)

watch(mobileOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

function handleScroll() {
  scrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.fade-overlay-enter-active,
.fade-overlay-leave-active {
  transition: opacity 0.25s ease;
}
.fade-overlay-enter-from,
.fade-overlay-leave-to {
  opacity: 0;
}

.slide-drawer-enter-active,
.slide-drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.slide-drawer-enter-from,
.slide-drawer-leave-to {
  transform: translateX(100%);
}
</style>
