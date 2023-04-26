<template>
  <div class="">Page Not Found</div>
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
