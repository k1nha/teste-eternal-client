<template>
  <div class="bg-cover w-screen h-screen flex p-2 bg-gray-900">
    <Header />
    <div
      class="w-[calc(100%-240px)] bg-white/50 backdrop-blur-sm duration-150 rounded-2xl py-5 relative h-[calc(100vh-20px)] ml-3 flex flex-col items-center text-white"
    >
      History
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '../../components/header/Header.vue';

export default defineComponent({
  name: 'History',
  components: {
    Header,
  },
});
</script>
