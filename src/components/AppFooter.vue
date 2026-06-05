<template>
  <footer class="bg-white text-gray-600 py-16 border-t border-gray-200">
    <div class="max-w-[1440px] mx-auto px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div>
          <RouterLink to="/" class="inline-block mb-4">
            <img
              alt="UltraGas Logo"
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/5WMOvALLUpMglBBkn5uPihELqOU2%2F41af6505-af0d-4e06-ad4e-83e70bda49a0.png"
              class="h-10 object-contain"
            />
          </RouterLink>
          <p class="text-sm leading-relaxed text-gray-500">Control total de combustible para flotillas empresariales.</p>
        </div>

        <div>
          <h4 class="text-brand-dark font-bold mb-4">Producto</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#features-2" class="hover:text-brand-purple transition-colors">Características</a></li>
            <li>
              <RouterLink to="/cobertura" class="hover:text-brand-purple transition-colors">Cobertura</RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-brand-dark font-bold mb-4">Empresa</h4>
          <ul class="space-y-2 text-sm">
            <!-- AL HACER CLIC EJECUTAMOS LA FUNCIÓN DE NUESTRO COMPOSABLE -->
            <li>
              <a href="#" @click.prevent="openFormWithTitle" class="hover:text-brand-purple transition-colors">
                Contacto
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-brand-dark font-bold mb-4">Legal</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-brand-purple transition-colors">Privacidad</a></li>
            <li><a href="#" class="hover:text-brand-purple transition-colors">Términos</a></li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex gap-4">
          <a href="https://www.facebook.com/UltraGasFleetCard" class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors text-gray-600">
            <i class="fa-brands fa-facebook-f"></i>
          </a>
          <a href="https://www.linkedin.com/company/ultragas/" class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors text-gray-600">
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="https://www.instagram.com/ultragas_controlcard/" class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors text-gray-600">
            <i class="fa-brands fa-instagram"></i>
          </a>
           <a href="https://www.tiktok.com/@ultragas_controlcard" class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors text-gray-600">
            <i class="fa-brands fa-tiktok"></i>
          </a>
        </div>
        <p class="text-sm text-gray-500">© 2024 UltraGas Control Card. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useContactModal } from '../composables/useContactModal'

// Extraemos los controles del estado global compartidos con el modal
const { isOpen, modalTitle } = useContactModal()

const openFormWithTitle = () => {
  // Cambiamos el título que mostrará el encabezado del modal de Pipedrive
  modalTitle.value = 'Contactar con un Ejecutivo'
  // Cambiamos el estado global a true para que se renderice el modal
  isOpen.value = true
}
</script>