<template>
  <section class="bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 blue"
    >
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold dark:text-white"
      >
        <img src="../assets/svg-path.svg" class="w-9 h-9 mr-2" alt="" />
        Eternal Tech
      </a>
      <div
        class="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white"
          >
            Sign in to your account
          </h1>
          <q-form class="space-y-4 md:space-y-6" @submit="onSubmit">
            <div>
              <q-input
                standard
                label-color="primary"
                v-model="email"
                label="Your Email"
                class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                type="email"
              />
            </div>
            <div>
              <q-input
                label-color="primary"
                standard
                v-model="password"
                label="Password"
                class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full px-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                color=""
                :type="isPwd ? 'password' : 'text'"
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
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    class="w-4 h-4 border rounded focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label for="remember" class="text-gray-300"
                    >Remember me</label
                  >
                </div>
              </div>
              <a
                href="#"
                class="text-sm font-medium hover:underline text-primary"
                >Forgot password?</a
              >
            </div>
            <button
              type="submit"
              class="w-full text-white bg-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-primary-700 focus:ring-primary-800"
            >
              Sign in
            </button>
            <p class="text-sm font-light text-gray-400">
              Don’t have an account yet?
              <a href="#" class="font-medium hover:underline text-primary"
                >Sign up</a
              >
            </p>
          </q-form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from '../services/axios';
import { useAuth } from '../store/useAuth';

const auth = useAuth();
export default defineComponent({
  name: 'Home',
  setup() {
    return {
      isPwd: ref(true),
      email: ref(''),
      password: ref(''),
      dense: ref(false),
    };
  },

  methods: {
    async onSubmit() {
      try {
        const user = {
          email: this.email,
          password: this.password,
        };

        console.log(user);

        const { message }: any = await axios.post('/auth/user'); //TODO: Type this response

        auth.setAuthToken(message.token);
        auth.setAuthUser(message.user);
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>
