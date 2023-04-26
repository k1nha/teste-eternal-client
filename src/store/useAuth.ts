import { defineStore } from 'pinia';
import { ref } from 'vue';
import instanceAxios from '../services/axios';
import router from '../routes/router';

export const useAuth = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'));
  const user = ref(JSON.parse(localStorage.getItem('user') || '{}'));

  function setAuthToken(tokenStorage: string) {
    localStorage.setItem('token', tokenStorage);
    token.value = tokenStorage;
  }

  function setAuthUser(userStorage: string) {
    localStorage.setItem('user', userStorage);
    user.value = userStorage;
  }

  return {
    setAuthToken,
    setAuthUser,
  };
});

export const useAuthTeste = defineStore({
  id: 'authteste',
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || '{}'),
    token: localStorage.getItem('token'),
    returnUrl: null,
  }),
  actions: {
    async login(username: string, password: string) {
      const user = await instanceAxios.post('/auth/user', {
        username,
        password,
      });

      this.user = user;

      localStorage.setItem('user', JSON.stringify(user));

      router.push(this.returnUrl || '/dashboard');
    },

    logout() {
      this.user = null;
      localStorage.removeItem('user');
      router.push('/login');
    },
  },
});
