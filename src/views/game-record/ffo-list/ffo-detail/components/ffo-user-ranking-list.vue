<template>
  <a-list v-if="data" :scrollbar="true">
    <a-list-item v-for="(item, index) in topUser" :key="item.userVo.username">
      <a-list-item-meta>
        <template #title>
          第 {{ index + 1 }} 名: {{ item.userVo.nickname }}
        </template>
        <template #avatar>
          <a-avatar shape="square">
            <img :src="item.userVo.avatar" alt="avatar" />
          </a-avatar>
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script lang="ts" setup>
  import { FfoGameUserInfoResVo } from '@/api/flying-flower-order';
  import { computed } from 'vue';

  const props = defineProps<{
    data: FfoGameUserInfoResVo[];
  }>();

  const topUser = computed(() => {
    const data: FfoGameUserInfoResVo[] = [];
    props.data.forEach((d) => {
      data.splice(d.ranking - 1, 0, d);
    });
    return data;
  });
</script>

<style scoped></style>
