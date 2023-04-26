import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../services/axios';

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

  async function checkAuthToken() {
    try {
      const userToken = 'Bearer ' + token.value;
      const { message }: any = await axios.get('/auth/verify', {
        headers: {
          Authorization: userToken,
        },
      });

      return message;
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
  };
});
