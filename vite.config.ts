import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// 引入svg需要用到的插件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    // svgicon
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
    },
  },
  // scss 全局变量配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variable.scss";`,
        javascriptEnabled: true,
      },
    },
  },
});
