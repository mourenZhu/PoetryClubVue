<template>
  <a-card hoverable :style="{ width: '900px', marginBottom: '3px' }">
    <div style="display: flex; justify-content: space-between">
      <div v-if="ffoRoomStore.ffoRoom.homeowner">
        <div class="ffo-room-info-list">
          <p
            >房间类型: <span>{{ roomDisplay }}</span></p
          >
          <p
            >房间状态: <span>{{ roomState }}</span></p
          >
          <p
            >最大人数: <span>{{ ffoRoomStore.ffoRoom.maxPlayers }}</span></p
          >
          <p
            >房主: <span>{{ ffoRoomStore.ffoRoom.homeowner.nickname }}</span></p
          >
        </div>
        <div class="ffo-room-info-list">
          <p
            >令: <span>{{ ffoRoomStore.ffoRoom.keyword }}</span></p
          >
          <p
            >令的位置: <span>{{ lingIndex }}</span></p
          >
          <p
            >句子最大长度:
            <span>{{ ffoRoomStore.ffoRoom.maxSentenceLength }}</span></p
          >
          <p
            >句子长度: <span>{{ constantSentenceLength }}</span></p
          >
          <p
            >句子类型: <span>{{ poemType }}</span></p
          >
          <p
            >玩家等待时间:
            <span
              >{{ ffoRoomStore.ffoRoom.playerPreparationSecond }} 秒</span
            ></p
          >
        </div>
      </div>
      <div v-if="ffoRoomStore.ffoRoom">
        <a-button v-if="isHomeowner" type="primary" @click="openUpdateView"
          >修改房间</a-button
        >
        <a-modal
          v-model:visible="ffoModalVisible"
          ok-text="修改房间"
          @cancel="() => (ffoModalVisible = false)"
          @ok="updateGameRoom"
        >
          <template #title> 创建飞花令游戏房间 </template>
          <FfoForm v-model:data="ffoRoomForm"></FfoForm>
        </a-modal>
      </div>
    </div>

    <!--    <a-space direction="vertical" size="mini" fill>-->
    <!--      <a-space>-->
    <!--        -->
    <!--      </a-space>-->
    <!--      <a-space>-->
    <!--        -->
    <!--      </a-space>-->
    <!--    </a-space>-->
  </a-card>
</template>

<script lang="ts" setup>
  import { useFfoRoomStore, useStompStore, useUserStore } from '@/store';
  import { computed, reactive, ref } from 'vue';
  import { FfoGameRoom } from '@/store/modules/ffo-room/types';
  import { FfoGamePoemType, FfoGameRoomReqVO } from '@/api/flying-flower-order';
  import ffoRoom from '@/store/modules/ffo-room';
  import FfoForm from '@/components/ffo/ffo-form.vue';

  const ffoRoomStore = useFfoRoomStore();
  const userStore = useUserStore();
  const stompStore = useStompStore();

  const roomDisplay = computed(() => {
    return ffoRoomStore.ffoRoom.display ? '公开' : '隐私';
  });
  const roomState = computed(() => {
    if (ffoRoomStore.ffoRoom.ffoStateType === 'PLAYING') {
      return '游戏中';
    }
    return '等待中';
  });
  const lingIndex = computed(() => {
    return ffoRoomStore.ffoRoom.allowWordInAny ? '任意位置' : '固定位置';
  });

  const constantSentenceLength = computed(() => {
    return ffoRoomStore.ffoRoom.constantSentenceLength ? '固定' : '不固定';
  });

  const poemType = computed(() => {
    if (ffoRoomStore.ffoRoom.ffoGamePoemType === 'ONLY_ANCIENTS_POEM') {
      return '仅允许古诗';
    }
    if (ffoRoomStore.ffoRoom.ffoGamePoemType === 'ONLY_SELF_CREAT') {
      return '仅自己创作';
    }
    return '任意';
  });

  const isHomeowner = computed(() => {
    return (
      ffoRoomStore.ffoRoom.homeowner.username === userStore.userInfo.username
    );
  });

  const ffoModalVisible = ref(false);
  const ffoRoomForm: FfoGameRoomReqVO = reactive({
    ...ffoRoomStore.ffoRoom,
  } as FfoGameRoomReqVO);
  const openUpdateView = () => {
    Object.assign(ffoRoomForm, ffoRoomStore.ffoRoom);
    // @ts-ignore 由于组件不能接受布尔类型，所以转换为字符型
    // eslint-disable-next-line vue/no-mutating-props
    ffoRoomForm.allowWordInAny = String(ffoRoomForm.allowWordInAny);
    // @ts-ignore 由于组件不能接受布尔类型，所以转换为字符型
    // eslint-disable-next-line vue/no-mutating-props
    ffoRoomForm.constantSentenceLength = String(
      ffoRoomForm.constantSentenceLength
    );
    // @ts-ignore 由于组件不能接受布尔类型，所以转换为字符型
    // eslint-disable-next-line vue/no-mutating-props
    ffoRoomForm.display = String(ffoRoomForm.display);
    console.log('ffoRoomForm = ', ffoRoomForm);
    ffoModalVisible.value = true;
  };
  const updateGameRoom = () => {
    stompStore.getClient().send(
      `/app/ffo/${ffoRoomStore.ffoRoom.id}/update`,
      {},
      JSON.stringify({
        name: ffoRoomForm.name,
        maxPlayers: ffoRoomForm.maxPlayers,
        keyword: ffoRoomForm.keyword,
        allowWordInAny: ffoRoomForm.allowWordInAny,
        playerPreparationSecond: ffoRoomForm.playerPreparationSecond,
        maxSentenceLength: ffoRoomForm.maxSentenceLength,
        constantSentenceLength: ffoRoomForm.constantSentenceLength,
        display: ffoRoomForm.display,
        ffoGamePoemType: ffoRoomForm.ffoGamePoemType,
      })
    );
  };
</script>

<style scoped>
  .ffo-room-info-list {
    display: flex;
    flex-direction: row;
  }

  .ffo-room-info-list p {
    margin: 7px;
  }

  .ffo-room-item {
  }
</style>
