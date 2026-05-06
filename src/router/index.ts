import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home', component: () => import('../pages/Home.vue') },
  { path: '/projects', name: 'projects', component: () => import('../pages/Projects.vue') },
  {
    path: '/projects/:slug',
    name: 'project-detail',
    component: () => import('../pages/ProjectDetail.vue'),
  },
  { path: '/demos', name: 'demos', component: () => import('../pages/Demos.vue') },
  {
    path: '/demos/:slug',
    name: 'demo-detail',
    component: () => import('../pages/DemoDetail.vue'),
  },
  { path: '/notes', name: 'notes', component: () => import('../pages/Notes.vue') },
  {
    path: '/notes/:slug',
    name: 'note-detail',
    component: () => import('../pages/NoteDetail.vue'),
  },
  { path: '/about', name: 'about', component: () => import('../pages/About.vue') },
  { path: '/uses', name: 'uses', component: () => import('../pages/Uses.vue') },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../pages/NotFound.vue'),
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})
