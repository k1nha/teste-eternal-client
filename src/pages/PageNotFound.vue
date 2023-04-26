<template>
  <div class="">Page Not Found</div>
  <q-input outlined v-model="text" label="Outlined" />
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
