<template>
  <li>
    <router-link
      :to="link"
      class="text-white flex items-center whitespace-nowrap overflow-hidden rounded-2xl py-2 px-3 hover:bg-blue-500/80 hover:text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="{1.5}"
        stroke="currentColor"
        class="w-5 h-5 mr-2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" :d="icon" />
      </svg>
      {{ name }}
    </router-link>
  </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Card Bar',
  props: {
    name: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },
  setup() {},
});
</script>
