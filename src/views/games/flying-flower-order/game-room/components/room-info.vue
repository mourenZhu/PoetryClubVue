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
        <a-button v-if="isHomeowner" type="primary">修改房间</a-button>
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
  import { useFfoRoomStore, useUserStore } from '@/store';
  import { computed } from 'vue';

  const ffoRoomStore = useFfoRoomStore();
  const userStore = useUserStore();

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
