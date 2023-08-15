import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import pinia from "./stores";
const app = createApp(App);

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// 国际化
app.use(ElementPlus, {
  locale: zhCn,
  size: "large",
});
// 引入全局样式
import "@/styles/index.scss";
// svg插件需要的配置
import "virtual:svg-icons-register";
import gloalComponent from "@/components";
app.use(gloalComponent); // 全局安装自定义组件
app.use(pinia);
app.mount("#app");
