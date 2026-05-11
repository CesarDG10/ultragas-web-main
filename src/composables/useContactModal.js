import { ref } from 'vue'

const isOpen = ref(false)
const modalTitle = ref('Contratar Ahora')

export function useContactModal() {
  function openModal(title = 'Contratar Ahora') {
    modalTitle.value = title
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  function closeModal() {
    isOpen.value = false
    document.body.style.overflow = 'auto'
  }

  return { isOpen, modalTitle, openModal, closeModal }
}
