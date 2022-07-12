import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@/views/Home')
const NotFound = () => import('@/views/Home')

export const routes = [
  {
    path: '/',
    name: 'app',
    redirect: { name: 'patients' }
  },
  {
    path: '/pacientes/:id?',
    name: 'patients',
    component: Home
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
