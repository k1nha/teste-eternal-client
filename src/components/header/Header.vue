<template>
  <div
    class="bg-white/50 backdrop-blur-sm w-56 duration-150 rounded-2xl py-5 relative h-[calc(100vh-20px)] flex flex-col justify-between"
  >
    <div class="">
      <h1 class="text-xl text-center text-primary">
        Eternal<span class="text-white">Tech</span>
      </h1>

      <div class="px-6">
        <span class="inline-block border-b border-white/50 w-full"></span>
      </div>

      <div class="px-8 pt-3 flex gap-4">
        <span class="text-xs font-medium text-gray-200 h-4">User</span>
        <span class="text-xs font-medium text-white h-4">Euclides Da Cunha</span>
      </div>

      <div class="px-6">
        <span class="inline-block border-b border-white/50 w-full"></span>
      </div>

      <ul class="px-3">
        <CardBar
          icon="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
          name="Dashboard"
          link="/dashboard"
        />

        <CardBar
          name="Pedidos"
          link="/pedidos"
          icon="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />

        <CardBar
          name="Histórico"
          link="/historico"
          icon="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
        />
      </ul>

      <div class="px-6">
        <span class="inline-block border-b border-white/50 w-full"></span>
      </div>

      <ul class="px-3">
        <CardBar
          name="Funcionários"
          link="/funcionarios"
          icon="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
        />

        <CardBar
          name="Categoria"
          link="/categoria"
          icon="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />

        <CardBar
          name="Produtos"
          link="/produtos"
          icon="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
        />
      </ul>
    </div>

    <div class="px-3">
      <router-link
        to="/"
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
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
          />
        </svg>
        Sair
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardBar from './CardBar.vue';

export default defineComponent({
  name: 'Header',
  components: {
    CardBar,
  },
});
</script>
