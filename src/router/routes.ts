import { RouteRecordRaw } from "vue-router";
// 对外暴露配置路由（常量路由）
export const constantRouter: Array<RouteRecordRaw> = [
  {
    path: "/404",
    component: () => import("@/views/404/index.vue"),
    name: "404",
  },
  // 任意路由重定向到404
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "any",
  },
];
