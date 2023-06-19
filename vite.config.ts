import {resolve} from "path";
import {defineConfig} from "vite"
import Vue from "@vitejs/plugin-vue"
import Icons from "unplugin-icons/vite"
import AutoImport from "unplugin-auto-import/vite"
import IconsResolver from "unplugin-icons/resolver"
import Components from "unplugin-vue-components/vite"
import viteCompression from "vite-plugin-compression";
import DefineOptions from "unplugin-vue-define-options/vite"

export default defineConfig({
  plugins: [
    Vue({
      script: {
        defineModel: true
      }
    }),
    Icons(),
    DefineOptions(),
    viteCompression(),
    Components({
      resolvers: [IconsResolver()]
    }),
    AutoImport({
      resolvers: [IconsResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${resolve(__dirname, "src/assets/styles/base.less")}";`,
        javascriptEnabled: true,
        math: "always"
      }
    }
  }
})
