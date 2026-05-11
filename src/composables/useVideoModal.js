import { ref } from 'vue'

const VIDEO_URL = 'https://www.youtube.com/embed/23yagESFh0M'

const isOpen = ref(false)
const videoUrl = ref('')

export function useVideoModal() {
  function openVideo() {
    videoUrl.value = VIDEO_URL
    isOpen.value = true
    document.body.style.overflow = 'hidden'
  }

  function closeVideo() {
    isOpen.value = false
    videoUrl.value = ''
    document.body.style.overflow = 'auto'
  }

  return { isOpen, videoUrl, openVideo, closeVideo }
}
