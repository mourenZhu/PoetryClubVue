<template>
  <a-list v-if="ranking.length !== 0" :scrollbar="true">
    <template #header> 游戏结束 {{ endTime }} </template>
    <a-list-item v-for="(item, index) in ranking" :key="item.username">
      <a-list-item-meta>
        <template #title> 第 {{ index + 1 }} 名: {{ item.nickname }} </template>
        <template #avatar>
          <a-avatar shape="square">
            <img :src="item.avatar" alt="avatar" />
          </a-avatar>
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import { useStompStore, useUserStore } from '@/store';
  import { IFrame } from '@stomp/stompjs/src/i-frame';
  import { UserDto } from '@/types/user-dto';

  const userStore = useUserStore();
  const stompStore = useStompStore();

  const ranking = reactive<UserDto[]>([]);
  const endTime = ref<string>('');

  const ffoGameOver = (message: IFrame) => {
    console.log('游戏结束', message.body);
    Object.assign(ranking, JSON.parse(message.body).ranking);
    endTime.value = JSON.parse(message.body).endTime;
    // ffoGameStore.addSentence(JSON.parse(message.body));
  };

  watch(
    () => stompStore.connected,
    (newConnected) => {
      if (newConnected) {
        stompStore
          .getClient()
          .subscribe(
            `/user/${userStore.userInfo.username}/game/ffo/end`,
            ffoGameOver
          );
      }
    }
  );
</script>

<style scoped></style>
