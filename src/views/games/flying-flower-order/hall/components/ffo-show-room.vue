<template>
  <a-card :style="{ width: '360px' }" hoverable>
    <template #title>
      <a-space direction="vertical" size="mini">
        <a-typography-text
          >ID: {{ props.ffoGameRoomResVO.id }}
        </a-typography-text>
        <a-typography-text
          >房间名: {{ props.ffoGameRoomResVO.name }}
        </a-typography-text>
      </a-space>
    </template>
    <template #extra>
      <a-button
        :disabled="props.ffoGameRoomResVO.remainingSeats === 0"
        type="primary"
        @click="clickEnterRoom"
        >加入游戏
      </a-button>
    </template>
    <a-space direction="vertical">
      <a-space>
        <a-typography-text
          >房主: {{ props.ffoGameRoomResVO.homeowner.nickname }}
        </a-typography-text>
        <a-typography-text
          >剩余席位: {{ props.ffoGameRoomResVO.remainingSeats }}
        </a-typography-text>
      </a-space>
      <a-space>
        <a-typography-text
          >令: {{ props.ffoGameRoomResVO.keyword }}
        </a-typography-text>
      </a-space>
      <a-space>
        <a-space>
          <a-typography-text>游戏状态:</a-typography-text>
          <a-tag
            v-if="props.ffoGameRoomResVO.ffoStateType === FfoStateType.WAITING"
            color="green"
            >等待中
          </a-tag>
          <a-tag
            v-if="props.ffoGameRoomResVO.ffoStateType === FfoStateType.PLAYING"
            color="gold"
            >游戏中
          </a-tag>
        </a-space>
        <a-typography-text>游戏类型: {{ gameTypeName }}</a-typography-text>
      </a-space>
    </a-space>
  </a-card>
</template>

<script lang="ts" setup>
  import {
    enterFfoGameRoom,
    FfoGamePoemType,
    FfoGameRoomResVO,
    FfoStateType,
  } from '@/api/flying-flower-order';
  import { computed } from 'vue';
  import { useRouter } from 'vue-router';

  const props = defineProps<{
    ffoGameRoomResVO: FfoGameRoomResVO;
  }>();
  const router = useRouter();

  const gameTypeName = computed(() => {
    if (
      props.ffoGameRoomResVO.ffoGamePoemType ===
      FfoGamePoemType.ONLY_ANCIENTS_POEM
    ) {
      return '仅古诗';
    }
    if (
      props.ffoGameRoomResVO.ffoGamePoemType === FfoGamePoemType.ONLY_SELF_CREAT
    ) {
      return '仅自由创作';
    }
    return '都可以';
  });

  const clickEnterRoom = async () => {
    const { data } = await enterFfoGameRoom(props.ffoGameRoomResVO.id);
    if (data) {
      await router.push({
        name: 'ffoGameRoom',
        params: { roomId: props.ffoGameRoomResVO.id },
      });
    }
  };
</script>

<style scoped></style>
