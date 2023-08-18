<template>
  <div>404</div>
  <SvgIcon name="phone" width="100" height="100" fill="yellowgreen" />
  <el-button type="primary" @click="btnHandler">Primary</el-button>
  <el-input v-model="input" placeholder="Please input" @input="inputHandler" />
  <br />
  <el-button type="primary" @click="openFile">打开dialog</el-button>
</template>

<script setup lang="ts">
import type { IUser } from "@/types/IUser";
import { ref } from "vue";
const btnHandler = async () => {
  window.electronApi.test<string>("魏晓翔学Electron");
};
const input = ref<number>(0);
const inputHandler = () => {
  window.electronApi.test<number>(input.value);
};
const openFile = async () => {
  const filePath = await window.electronApi.openFile();
  console.log(filePath);
};

window.electronApi.onUpdateCounter((_event, value) => {
  input.value += value * 1;
  _event.sender.send("counter-value", input.value);
});
</script>

<style lang="scss" scoped>
.el-input {
  width: 300px;
}
</style>
