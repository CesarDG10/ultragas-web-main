import { ref } from 'vue'

const isOpen = ref(false)

export function usePortalModal() {
  function openPortalModal() {
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  function closePortalModal() {
    isOpen.value = false
    document.body.style.overflow = 'auto'
  }

  return { isOpen, openPortalModal, closePortalModal }
}
