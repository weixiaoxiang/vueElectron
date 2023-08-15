import SvgIcon from "@/components/SvgIcon/index.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const allGlobalComponents = {
  SvgIcon,
};

// 对外暴露插件对象
export default {
  // 务必有install方法
  install(app) {
    Object.keys(allGlobalComponents).forEach((key) => {
      // 注册为全局组件
      app.component(key, allGlobalComponents[key]);
    });
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component);
    }
  },
};
