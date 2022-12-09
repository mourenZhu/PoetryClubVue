<template>
  <a-card hoverable :style="{ width: '100%', marginBottom: '3px' }">
    <draggable
      :list="players"
      :disabled="!isHomeowner"
      class="players"
      @end="onEnd"
    >
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
  import { useFfoRoomStore, useStompStore, useUserStore } from '@/store';
  import { computed, reactive, watch } from 'vue';
  import { UserDto } from '@/types/user-dto';
  import { IFrame } from '@stomp/stompjs/src/i-frame';
  import Draggable from 'vuedraggable';
  import Stomp from '@stomp/stompjs';

  const userStore = useUserStore();
  const stompStore = useStompStore();
  const ffoRoomStore = useFfoRoomStore();

  const players: UserDto[] = reactive([]);
  const updatePlayers = (message: IFrame) => {
    console.log('players = ', JSON.parse(message.body));
    players.length = 0;
    Object.assign(players, JSON.parse(message.body));
  };

  const isHomeowner = computed<boolean>(() => {
    console.log('ffoRoomStore.isHomeowner', ffoRoomStore.isHomeowner());
    return ffoRoomStore.isHomeowner();
  });

  const onEnd = () => {
    if (isHomeowner.value) {
      const users: string[] = [];
      players.forEach((player) => {
        users.push(player.username);
      });
      console.log('移动后的users ', users);
      stompStore
        .getClient()
        .send(
          `/app/ffo/${ffoRoomStore.ffoRoom.id}/users`,
          {},
          JSON.stringify(users)
        );
    }
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
