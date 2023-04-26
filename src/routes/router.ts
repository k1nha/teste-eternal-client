// Packages
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
// Components
import Home from '../pages/Home.vue';
import PageNotFound from '../pages/PageNotFound.vue';
import Dashboard from '../pages/Dashboard.vue';
import { useAuth } from '../store/useAuth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      auth: true,
    },
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

router.beforeEach((to, from, next) => {
  if (to.meta?.auth) {
    const auth = useAuth();
    if (auth.token && auth.user) {
      
    }
  }
});

export default router;
