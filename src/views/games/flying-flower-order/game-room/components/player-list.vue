<template>
  <a-card hoverable :style="{ width: '100%', marginBottom: '3px' }">
    <draggable :list="players" class="players">
      <template #item="{ element }">
        <div class="player">
          <p>{{ element.nickname }}</p>
          <a-avatar>
            <img alt="avatar" :src="element.avatar" />
          </a-avatar>
        </div>
      </template>
    </draggable>
    <!--    {{ players }}-->
  </a-card>
</template>

<script lang="ts" setup>
  import { useStompStore, useUserStore } from '@/store';
  import { reactive, watch } from 'vue';
  import { UserDto } from '@/types/user-dto';
  import { IFrame } from '@stomp/stompjs/src/i-frame';
  import Draggable from 'vuedraggable';
  import Stomp from '@stomp/stompjs';

  const userStore = useUserStore();
  const stompStore = useStompStore();

  const players: UserDto[] = reactive([]);
  const updatePlayers = (message: IFrame) => {
    console.log('players = ', JSON.parse(message.body));
    players.length = 0;
    Object.assign(players, JSON.parse(message.body));
  };

  // stompStore.initClient();
  watch(
    () => stompStore.connected,
    (newConnected) => {
      if (newConnected)
        stompStore
          .getClient()
          .subscribe(
            `/user/${userStore.userInfo.username}/game/ffo/users`,
            updatePlayers
          );
    }
  );
</script>

<style scoped>
  .player {
    margin-right: 10px;
  }

  .players {
    display: flex;
    flex-direction: row;
  }
</style>
