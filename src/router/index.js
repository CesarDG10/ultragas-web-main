import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StationsView from '../views/StationsView.vue'
import FiscalView from '../views/FiscalView.vue'
import QueEsUltraGasView from '../views/QueEsUltraGasView.vue'
import GraciasView from '../views/GraciasView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/cobertura', name: 'cobertura', component: StationsView },
    { path: '/fiscal', name: 'fiscal', component: FiscalView },
    { path: '/que-es-ultragas', name: 'que-es-ultragas', component: QueEsUltraGasView },
    { path: '/gracias', name: 'gracias', component: GraciasView },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
