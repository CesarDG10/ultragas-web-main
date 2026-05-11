<template>
  <Transition name="modal">
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      @click.self="closeVideo"
    >
      <div class="relative bg-white rounded-2xl p-6 max-w-4xl w-full mx-4">
        <button
          @click="closeVideo"
          class="absolute top-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <i class="fa-solid fa-xmark text-gray-600"></i>
        </button>
        <div class="aspect-video bg-gray-900 rounded-xl overflow-hidden">
          <iframe
            v-if="videoUrl"
            frameborder="0"
            width="100%"
            height="100%"
            :src="videoUrl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            class="w-full h-full"
          ></iframe>
        </div>
        <div class="mt-4 text-center">
          <h3 class="text-xl font-bold text-gray-900 mb-2">UltraGas Control Card</h3>
          <p class="text-gray-600">Descubre cómo revolucionamos el control de combustible para flotillas</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useVideoModal } from '../composables/useVideoModal'

const { isOpen, videoUrl, closeVideo } = useVideoModal()

function handleKeydown(e) {
  if (e.key === 'Escape' && isOpen.value) closeVideo()
}

onMounted(() => document.addEventListener('keydown', handleKeydown))
onUnmounted(() => document.removeEventListener('keydown', handleKeydown))
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
