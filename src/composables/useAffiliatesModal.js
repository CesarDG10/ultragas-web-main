import { ref } from 'vue'

const isOpen = ref(false)

export function useAffiliatesModal() {
  function openAffiliatesModal() {
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  function closeAffiliatesModal() {
    isOpen.value = false
    document.body.style.overflow = 'auto'
  }

  return { isOpen, openAffiliatesModal, closeAffiliatesModal }
}
