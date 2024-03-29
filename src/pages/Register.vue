<template>
  <section class="bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 blue"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-white"
      >
        <img src="../assets/svg-path.svg" class="w-9 h-9 mr-2" alt="" />
        Eternal Tech
      </a>
      <div
        class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white text-center"
          >
            Create your account
          </h1>
          <q-form class="space-y-4 md:space-y-6" @submit="onSubmit">
            <div>
              <q-input
                standard
                label-color="primary"
                v-model="email"
                label="Your Email"
                class="border sm:text-sm rounded-lg h-14 focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                type="email"
                :rules="[val => !!val || 'Email is missing', isValidEmail]"
              />
            </div>
            <div>
              <q-input
                label-color="primary"
                standard
                v-model="password"
                label="Password"
                class="border sm:text-sm rounded-lg h-14 mt-4 focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                color=""
                :type="isPwd ? 'password' : 'text'"
                :rules="[
                  val =>
                    (val && val.length > 5) ||
                    'Password should be at least 5 characters',
                ]"
              >
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer text-white"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
            </div>

            <button
              type="submit"
              class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800"
            >
              Create Account
            </button>
            <p class="text-sm font-light text-gray-400">
              Do have an account yet?
              <router-link
                to="/"
                class="font-medium hover:underline text-primary"
              >
                Click here to login!
              </router-link>
            </p>
          </q-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from '../services/axios.js';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Register',
  setup() {
    const router = useRouter();
    return {
      isPwd: ref(true),
      email: ref(''),
      password: ref(''),
      dense: ref(false),
      router,
    };
  },

  methods: {
    async onSubmit() {
      try {
        const user = {
          email: this.email,
          password: this.password,
        };

        const { message } = await axios
          .post('/auth/register', user)
          .then(res => res.data);

        if (message == 'User already exists') {
          // TODO: toast this
        } else {
          this.router.push('/');
        }
      } catch (err) {
        console.log(err);
      }
    },

    isValidEmail(val: string) {
      const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
      return emailPattern.test(val) || 'Invalid email';
    },
  },
});
</script>
