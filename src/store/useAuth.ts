import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from '../services/axios';
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

  async function checkAuthToken(tkn: string) {
    try {
      const userToken = 'Bearer ' + token.value;
      const { message } = await axios.get('');
    } catch (err) {
      console.error(err);
    }
  }

  return {
    user,
    token,
    setAuthToken,
    setAuthUser,
  };
});
