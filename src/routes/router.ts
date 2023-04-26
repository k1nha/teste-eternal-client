// Packages
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// Components
import Home from '../pages/Home.vue';
import PageNotFound from '../pages/PageNotFound.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/:catchAll(.*)*',
    name: 'PageNotFound',
    component: PageNotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
