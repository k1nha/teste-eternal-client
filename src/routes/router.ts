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
    path: '/dashboard',
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

// router.beforeEach(async (to, from, next) => {
//   if (to.meta?.auth) {
//     const auth = useAuth();
//     if (auth.token && auth.user) {
//       const isAuth = await auth.checkAuthToken();
//       if (isAuth) {
//         next();
//       }
//     }
//   }
// });

export default router;
