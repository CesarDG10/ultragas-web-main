import { ref, onMounted, onUnmounted } from 'vue'

export function useCarousel({ interval = 4000 } = {}) {
  const scrollContainer = ref(null)
  let autoTimer = null
  let userInteracting = false
  let resumeTimer = null

  const getCardWidth = () => {
    if (!scrollContainer.value) return 0
    const firstCard = scrollContainer.value.children[0]
    if (!firstCard) return 0
    const gap = parseFloat(getComputedStyle(scrollContainer.value).gap) || 0
    return firstCard.offsetWidth + gap
  }

  const scroll = (direction) => {
    if (!scrollContainer.value) return
    const cardWidth = getCardWidth()
    scrollContainer.value.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    })
  }

  const autoScroll = () => {
    if (!scrollContainer.value || userInteracting) return
    const el = scrollContainer.value
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    if (isAtEnd) {
      el.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      scroll('right')
    }
  }

  const startAutoPlay = () => {
    stopAutoPlay()
    autoTimer = setInterval(autoScroll, interval)
  }

  const stopAutoPlay = () => {
    if (autoTimer) clearInterval(autoTimer)
  }

  const onUserInteraction = () => {
    userInteracting = true
    stopAutoPlay()
    if (resumeTimer) clearTimeout(resumeTimer)
    resumeTimer = setTimeout(() => {
      userInteracting = false
      startAutoPlay()
    }, interval * 1.5)
  }

  onMounted(() => {
    const el = scrollContainer.value
    if (!el) return
    el.addEventListener('touchstart', onUserInteraction, { passive: true })
    el.addEventListener('mousedown', onUserInteraction)
    el.addEventListener('wheel', onUserInteraction, { passive: true })
    startAutoPlay()
  })

  onUnmounted(() => {
    stopAutoPlay()
    if (resumeTimer) clearTimeout(resumeTimer)
    const el = scrollContainer.value
    if (!el) return
    el.removeEventListener('touchstart', onUserInteraction)
    el.removeEventListener('mousedown', onUserInteraction)
    el.removeEventListener('wheel', onUserInteraction)
  })

  return { scrollContainer, scroll }
}
