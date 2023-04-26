import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../services/axios';

export const useAuth = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token'));
  const user = ref(JSON.stringify(localStorage.getItem('user') || '{}'));

  function setAuthToken(tokenStorage: string) {
    localStorage.setItem('token', tokenStorage);
    token.value = tokenStorage;
  }

  function setAuthUser(userStorage: string) {
    localStorage.setItem('user', userStorage);
    user.value = userStorage;
  }

  function authClear() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    token.value = '';
    user.value = '';
  }

  async function checkAuthToken() {
    try {
      const userToken = 'Bearer ' + token.value;
      const response = await axios
        .get('/auth/verify', {
          headers: {
            Authorization: userToken,
          },
        })
        .then(res => res.data);

      return response;
    } catch (err) {
      console.error(err);
    }
  }

  return {
    user,
    token,
    setAuthToken,
    setAuthUser,
    checkAuthToken,
    authClear,
  };
});
