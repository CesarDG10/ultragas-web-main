<template>
  <!-- Agregamos py-12 o my-8 para darle espacio con las secciones de arriba y abajo -->
  <section class="w-full max-w-5xl mx-auto px-4 py-12">
    <div class="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
      
      <!-- Frame del video -->
      <div class="aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-md">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/23yagESFh0M?si=rezWUB_0PvogJG08"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
          class="w-full h-full"
        ></iframe>
      </div>

      <!-- Título y descripción -->
      <div class="mt-6 text-center">
        <h3 class="text-2xl font-bold text-slate-900 mb-2">UltraGas Control Card</h3>
        <p class="text-slate-600 text-base max-w-2xl mx-auto">
          Descubre cómo revolucionamos el control de combustible para flotillas.
        </p>
      </div>

    </div>
  </section>
</template>