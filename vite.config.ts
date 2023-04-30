import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import replace from '@rollup/plugin-replace';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    vue({
      template: {
        transformAssetUrls,
      },
    }),
    replace({
      'process.env': 'import.meta.env',
    }),

    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
  ],
});
