<template>
  <a-card :style="{ width: '900px', marginBottom: '3px' }" hoverable>
    <div style="display: flex; justify-content: space-between">
      <div class="ffo-conf-info-list">
        <p
          >令: <span>{{ data.keyword }}</span></p
        >
        <p
          >令的位置: <span>{{ lingIndex }}</span></p
        >
        <p
          >句子最大长度: <span>{{ data.maxSentenceLength }}</span></p
        >
        <p
          >句子长度: <span>{{ constantSentenceLength }}</span></p
        >
        <p
          >句子类型: <span>{{ poemType }}</span></p
        >
        <p
          >玩家等待时间: <span>{{ data.playerPreparationSecond }} 秒</span></p
        >
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
  import { FfoGameResVo } from '@/api/flying-flower-order';
  import { computed } from 'vue';

  const props = defineProps<{
    data: FfoGameResVo;
  }>();

  const lingIndex = computed(() => {
    return props.data.allowWordInAny ? '任意位置' : '固定位置';
  });

  const constantSentenceLength = computed(() => {
    return props.data.constantSentenceLength ? '固定' : '不固定';
  });

  const poemType = computed(() => {
    if (props.data.ffoGamePoemType === 'ONLY_ANCIENTS_POEM') {
      return '仅允许古诗';
    }
    if (props.data.ffoGamePoemType === 'ONLY_SELF_CREAT') {
      return '仅自己创作';
    }
    return '任意';
  });
</script>

<style scoped>
  .ffo-conf-info-list {
    display: flex;
    flex-direction: row;
  }

  .ffo-conf-info-list p {
    margin: 7px;
  }
</style>
