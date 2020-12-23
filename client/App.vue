<style scoped lang='less'>
#cesium-box {
    width: 100%;
    height: 100%;
}
  .system-content {
    z-index: 10;
  }
</style>

<template>
  <div id="cesium-box">
    <router-view class="system-content" />
  </div>
</template>

<script>
export default {
    name: "App"
};
</script>
