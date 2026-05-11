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
            <li><a href="#" class="hover:text-brand-purple transition-colors">Características</a></li>
            <li><a href="#" class="hover:text-brand-purple transition-colors">Precios</a></li>
            <li>
              <RouterLink to="/cobertura" class="hover:text-brand-purple transition-colors">Cobertura</RouterLink>
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-brand-dark font-bold mb-4">Empresa</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-brand-purple transition-colors">Nosotros</a></li>
            <li><a href="#" class="hover:text-brand-purple transition-colors">Blog</a></li>
            <li><a href="#" class="hover:text-brand-purple transition-colors">Contacto</a></li>
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
        <p class="text-sm text-gray-500">© 2024 UltraGas Control Card. Todos los derechos reservados.</p>
        <div class="flex gap-4">
          <a href="#" class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors text-gray-600">
            <i class="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors text-gray-600">
            <i class="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="#" class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-colors text-gray-600">
            <i class="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
