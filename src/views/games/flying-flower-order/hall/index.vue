<template>
  <div class="container">
    <Breadcrumb :items="['游戏列表', '飞花令']" />
    <a-card class="general-card">
      <a-space class="ffo-hall-header">
        <a-input
          :style="{ width: '400px' }"
          placeholder="请输入房间号或房间名"
          allow-clear
        ></a-input>
        <a-button type="primary">搜索房间</a-button>
        <a-button type="outline" @click="ffoCreateHandleClick"
          >创建房间</a-button
        >
        <a-modal
          v-model:visible="ffoModalVisible"
          :on-before-ok="ffoCreateHandleBeforeOk"
          ok-text="创建房间"
          @cancel="ffoCreateHandleCancel"
        >
          <template #title> 创建飞花令游戏房间 </template>
          <FfoForm v-model:data="ffoForm"></FfoForm>
        </a-modal>
      </a-space>
      <div class="ffo-game-room-list">
        <FfoShowRoom
          v-for="item in ffoGameRoomList"
          :key="item.id"
          :ffo-game-room-res-v-o="item"
          class="ffo-game-room"
        ></FfoShowRoom>
      </div>
      <!--      <Chatroom></Chatroom>-->
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import {
    createFfoGameRoom,
    FfoGamePoemType,
    FfoGameRoomReqVO,
    FfoGameRoomResVO,
    queryFfoGameRooms,
  } from '@/api/flying-flower-order';
  import FfoShowRoom from '@/views/games/flying-flower-order/hall/components/ffo-show-room.vue';
  import FfoForm from '@/components/ffo/ffo-form.vue';
  import { useUserStore } from '@/store';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const userInfo = useUserStore();
  const ffoGameRoomList = ref<FfoGameRoomResVO[]>([]);
  const ffoModalVisible = ref(false);
  const ffoForm = reactive<FfoGameRoomReqVO>({
    name: `${userInfo.nickname}的游戏房间`,
    maxPlayers: 5,
    keyword: '花',
    // @ts-ignore 由于组件不能接受布尔类型，所以转换为字符型
    allowWordInAny: 'true',
    playerPreparationSecond: 30,
    maxSentenceLength: 7,
    // @ts-ignore 由于组件不能接受布尔类型，所以转换为字符型
    constantSentenceLength: 'true',
    // @ts-ignore 由于组件不能接受布尔类型，所以转换为字符型
    display: 'true',
    ffoGamePoemType: FfoGamePoemType.ONLY_ANCIENTS_POEM,
  });

  const ffoCreateHandleClick = () => {
    ffoModalVisible.value = true;
  };

  const ffoCreateHandleCancel = () => {
    ffoModalVisible.value = false;
  };

  const ffoCreateHandleBeforeOk = () => {
    ffoModalVisible.value = false;
    createFfoGameRoom(ffoForm).then((res) => {
      const rooId = res.data;
      router.push({ name: 'ffoGameRoom', params: { roomId: rooId } });
    });
  };

  const initData = async () => {
    const { data } = await queryFfoGameRooms();
    ffoGameRoomList.value = data;
  };
  initData();

  const checkLocalUserPlaying = () => {};
</script>

<style scoped>
  .ffo-hall-header {
    margin: 10px 0 10px;
  }

  .ffo-game-room-list {
    display: flex;

    /* flex-direction: column; */
    flex-wrap: wrap;
  }

  .ffo-game-room {
    margin: 5px 5px 5px 0;
  }

  .container {
    padding: 0 20px 20px 20px;
  }
</style>
