<template>
  <div class="album">
    <el-scrollbar ref="scrollbarRef" height="100%">
      <el-image
        fit="fill"
        v-for="(url, index) in albumList"
        :key="url"
        :src="url"
        :initial-index="index"
        :zoom-rate="1.2"
        lazy
        :preview-src-list="albumList"
      />
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick, onMounted } from "vue";
import { ElScrollbar } from "element-plus";
const scrollbarRef = ref();
let albumList = reactive([]);
window.electronApi.onOpenAlbum(async (_event, value) => {
  // console.log(value, "onOpenAlbum");
  // 滚动条回到顶部
  scrollbarRef.value.setScrollTop(0);
  await nextTick();
  albumList.length = 0;
  albumList.push(...value);
});
onMounted(() => {
  window.electronApi.getAlbum();
});
</script>

<style scoped lang="scss">
.album {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  padding: 20px;
  .el-image {
    width: 50%;
    padding: 10px;
    cursor: pointer;
  }
}
</style>
