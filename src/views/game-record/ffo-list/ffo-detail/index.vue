<template>
  <div class="container">
    <Breadcrumb :items="['游戏记录', '飞花令记录', ffoId]" />
    <a-card class="general-card" title="飞花令记录">
      <div>
        <ffo-game-conf-info :data="ffoGameData"></ffo-game-conf-info>
      </div>
      <div class="ffo-center">
        <div class="ffo-sentences">
          <ffo-sentences :data="ffoGameData.userSentences"></ffo-sentences>
        </div>
        <div class="ffo-user-ranking">
          <ffo-user-ranking-list
            :data="ffoGameData.userInfos"
          ></ffo-user-ranking-list>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { reactive, ref } from 'vue';
  import {
    FfoGamePoemType,
    FfoGameResVo,
    FfoGameUserInfoResVo,
    FfoGameUserSentenceResVo,
    getFfo,
  } from '@/api/flying-flower-order';
  import FfoGameConfInfo from '@/views/game-record/ffo-list/ffo-detail/components/ffo-game-conf-info.vue';
  import FfoSentences from '@/views/game-record/ffo-list/ffo-detail/components/ffo-sentences.vue';
  import FfoUserRankingList from '@/views/game-record/ffo-list/ffo-detail/components/ffo-user-ranking-list.vue';

  const route = useRoute();
  const ffoId = ref<string>(route.params.ffoId as string);
  const ffoGameData: FfoGameResVo = reactive({} as FfoGameResVo);

  const init = async () => {
    const { data } = await getFfo(ffoId.value);
    data.userSentences.reverse();
    Object.assign(ffoGameData, data);
    // console.log('ffoGameData = ', ffoGameData)
  };

  init();
</script>

<style scoped>
  .ffo-center {
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 20px 0 20px 0;
  }

  .ffo-sentences {
    width: 40%;
  }

  .ffo-user-ranking {
    width: 40%;
  }
</style>
