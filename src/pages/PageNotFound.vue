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
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8 text-center text-white">
          <h1 class="text-3xl">You're lost?</h1>
          <q-btn class="bg-primary">Come back</q-btn>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageNotFound',
  setup() {
    return {
      text: ref(''),
    };
  },
});
</script>
