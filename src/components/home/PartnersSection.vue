<template>
  <div class="bg-white py-14 border-b border-gray-100 overflow-hidden w-full select-none">
    <div class="max-w-7xl mx-auto px-4">
      <p class="text-center text-base font-bold text-gray-400 uppercase tracking-widest mb-12">
        Empresas que confían en nuestro suministro
      </p>
      
      <div class="marquee-wrapper relative w-full overflow-hidden flex whitespace-nowrap group">
        
        <div class="marquee-track flex items-center justify-around opacity-50 grayscale hover:opacity-90 transition-opacity duration-300">
          <img v-for="(logo, index) in logos" :key="'f1-' + index" :src="logo.src" :alt="logo.alt" class="logo-item" />
        </div>

        <div class="marquee-track flex items-center justify-around opacity-50 grayscale hover:opacity-90 transition-opacity duration-300">
          <img v-for="(logo, index) in logos" :key="'f2-' + index" :src="logo.src" :alt="logo.alt" class="logo-item" />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
const logos = [
  { src: '/images/2024-04-flensa-logo.png', alt: 'Flensa' },
  { src: '/images/JHONSON CONTROLS.png', alt: 'Jhonson Controls' },
  { src: '/images/La_Costeña_logo.png', alt: 'La Costeña' },
  { src: '/images/Sigma_Alimentos_logotipo.png', alt: 'Sigma Alimentos' },
  { src: '/images/TS Trucking logo.jpg', alt: 'TS Trucking' },
  { src: '/images/Tum Logistica.jpg', alt: 'Tum Logistica' },
  { src: '/images/liverpool-logo.png', alt: 'Liverpool' },
  { src: '/images/logo-embotelladora-aga 1.png', alt: 'Aga embotelladora' },
  { src: '/images/pilgrims.png', alt: 'Pilgrims' },
  { src: '/images/soriana-seeklogo.png', alt: 'Soriana' },
  { src: '/images/zemog-logo.png', alt: 'Zemog' },
]
</script>
<style scoped>
.marquee-wrapper {
  display: flex;
  width: 100%;
  
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}

.marquee-track {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
 
  width: max-content; 
  gap: 5rem; 
  padding-right: 5rem; 
  flex-shrink: 0;
  
  animation: scrollLogos 35s linear infinite;
}


.marquee-wrapper:hover .marquee-track {
  animation-play-state: paused;
}


.logo-item {
  height: 4rem; 
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
}
.logo-item[alt="Liverpool"] {
  height: 6rem; 
}
.logo-item[alt="Soriana"] {
  height: 2.5rem; 
}
.logo-item[alt="Flensa"] {
  height: 3rem; 
}
.logo-item[alt="Pilgrims"] {
  height: 6rem; 
}
.logo-item[alt="Zemog"] {
  height: 6rem; 
}


@keyframes scrollLogos {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>