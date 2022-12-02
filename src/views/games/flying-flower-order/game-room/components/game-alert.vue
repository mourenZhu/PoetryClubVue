<template>
  <div class="game-alert">
    <span style="color: black">剩余时间: {{}} 秒</span>
  </div>
</template>

<script lang="ts" setup>
  const now = Date.now();
</script>

<style scoped>
  .game-alert {
    display: flex;
  }
</style>
