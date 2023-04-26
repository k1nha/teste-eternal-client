<template>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Header from '../../components/header/Header.vue';

export default defineComponent({
  name: 'Finance',
  components: {
    Header,
  },
  setup() {
    return {
      text: ref(''),
    };
  },
});
</script>