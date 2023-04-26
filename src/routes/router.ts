// Packages
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Pages
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import PageNotFound from '../pages/PageNotFound.vue';
import Dashboard from '../pages/principal/Dashboard.vue';
import Courses from '../pages/principal/Courses.vue';
import Students from '../pages/principal/Students.vue';
import Classes from '../pages/principal/Classes.vue';
import Frequency from '../pages/principal/Frequency.vue';
import Finance from '../pages/principal/Finance.vue';

// Components
import { useAuth } from '../store/useAuth';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
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
    path: '/students',
    name: 'Students',
    component: Students,
    meta: {
      auth: true,
    },
  },
  {
    path: '/classes',
    name: 'Classes',
    component: Classes,
    meta: {
      auth: true,
    },
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses,
    meta: {
      auth: true,
    },
  },
  {
    path: '/finance',
    name: 'Finance',
    component: Finance,
    meta: {
      auth: true,
    },
  },
  {
    path: '/frequency',
    name: 'Frequency',
    component: Frequency,
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

router.beforeEach(async (to, from, next) => {
  if (to.meta?.auth) {
    const auth = useAuth();
    if (auth.token && auth.user) {
      const isAuth = await auth.checkAuthToken();
      if (isAuth) {
        next();
      } else {
        next({ name: 'Home' });
      }
    } else {
      next({ name: 'Home' });
    }
  } else {
    next();
  }
});

export default router;
