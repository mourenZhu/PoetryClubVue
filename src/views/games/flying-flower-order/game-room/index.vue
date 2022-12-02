<template>
  <div class="container">
    <Breadcrumb
      :items="['游戏列表', '飞花令', `房间: ${route.params.roomId}`]"
    />
    <a-card class="general-card">
      <div class="ffo-room-layout">
        <a-layout style="height: 600px">
          <a-layout-header>
            <div class="room-header">
              <room-info></room-info>
              <a-button
                v-if="isHomeowner && isWaiting"
                type="primary"
                @click="startFfoGame"
                >开始游戏</a-button
              >
              <a-button type="outline" @click="clickLeaveGameRoom"
                >离开房间</a-button
              >
            </div>
          </a-layout-header>
          <a-layout>
            <a-layout-content>
              <!--              <game-alert></game-alert>-->
              <a-card
                hoverable
                :style="{ width: '100%', height: '300px', marginBottom: '3px' }"
              >
                <span v-if="isWaiting"> 游戏未开始，等待房主开启游戏 </span>
                <!--                游戏主体-->
                <ffo-game-body v-show="!isWaiting"></ffo-game-body>
              </a-card>
              <player-list></player-list>
            </a-layout-content>
            <a-layout-sider :width="300">
              <ChatRoom :room-id="roomId"></ChatRoom>
            </a-layout-sider>
          </a-layout>
        </a-layout>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import ChatRoom from '@/components/chatroom/index.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { leaveGameRoom, startGame } from '@/api/flying-flower-order';
  import { computed, ref, watch } from 'vue';
  import PlayerList from '@/views/games/flying-flower-order/game-room/components/player-list.vue';
  import { useFfoRoomStore, useStompStore, useUserStore } from '@/store';
  import { IFrame } from '@stomp/stompjs/src/i-frame';
  import RoomInfo from '@/views/games/flying-flower-order/game-room/components/room-info.vue';
  import GameAlert from '@/views/games/flying-flower-order/game-room/components/game-alert.vue';
  import FfoGameBody from '@/views/games/flying-flower-order/game-room/components/ffo-game-body.vue';

  const route = useRoute();
  const router = useRouter();
  const roomId = ref<string>(route.params.roomId as string);

  const stompStore = useStompStore();
  const userStore = useUserStore();
  const ffoRoomStore = useFfoRoomStore();

  const updateFfoRoom = (message: IFrame) => {
    console.log('ffoRoom = ', JSON.parse(message.body));
    ffoRoomStore.update(JSON.parse(message.body));
  };

  stompStore.initClient();
  watch(
    () => stompStore.connected,
    (newConnected) => {
      if (newConnected)
        stompStore
          .getClient()
          .subscribe(
            `/user/${userStore.userInfo.username}/game/ffo/room`,
            updateFfoRoom
          );
    }
  );

  const startFfoGame = () => {
    startGame().then((res) => {
      console.log(res);
    });
  };

  const clickLeaveGameRoom = async () => {
    const { data } = await leaveGameRoom();
    stompStore.disconnect();
    if (data) {
      await router.push({ name: 'FfoHall' });
    }
  };

  const isHomeowner = computed(() => {
    return (
      ffoRoomStore.ffoRoom.homeowner.username === userStore.userInfo.username
    );
  });

  const isWaiting = computed(() => {
    return ffoRoomStore.ffoRoom.ffoStateType === 'WAITING';
  });
</script>

<style scoped>
  .ffo-room-layout :deep(.arco-layout-header),
  .ffo-room-layout :deep(.arco-layout-footer),
  .ffo-room-layout :deep(.arco-layout-sider-children),
  .ffo-room-layout :deep(.arco-layout-content) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: var(--color-white);
    font-size: 16px;
    font-stretch: condensed;
    text-align: center;
  }

  .ffo-room-layout :deep(.arco-layout-header) {
    /* background-color: aqua; */
  }

  .ffo-room-layout :deep(.arco-layout-sider-children) {
    /* background-color: darkgray; */
  }

  .container {
    padding: 0 20px 20px 20px;
  }

  .room-header {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px 10px 0;
  }
</style>
