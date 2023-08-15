<template>
  <svg :style="{ width, height }">
    <use :xlink:href="prefix + name" :fill="fill"></use>
  </svg>
</template>

<script setup lang="ts">
import { ref } from "vue";
defineProps({
  // 宽度
  width: {
    type: String,
    default: "16px",
  },
  // 高度
  height: {
    type: String,
    default: "16px",
  },
  // xlink:href前缀
  prefix: {
    type: String,
    default: "#icon-",
  },
  // 图标名称
  name: {
    type: String,
    required: true,
  },
  // 颜色
  fill: {
    type: String,
    default: "",
  },
});
</script>

<style scoped></style>
