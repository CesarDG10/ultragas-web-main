<template>
  <section class="py-8 sm:py-10 flex justify-center">
    <div class="max-w-[1440px] mx-auto px-8 w-full text-center">
      <button
        @click="openModal('Solicitar Información')"
        class="bg-gradient-to-r from-brand-blue to-brand-purple text-white font-bold px-8 py-4 rounded-full hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 transition-all duration-300"
      >
        Solicitar información
      </button>
    </div>
  </section>
</template>

<script setup>
import { useContactModal } from '../composables/useContactModal'

const { openModal } = useContactModal()
</script>
