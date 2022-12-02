<template>
  <div class="ffo-game-body">
    <div class="ffo-content-list">
      内容
      <div
        v-for="item in ffoGameStore.ffoGame.userSentences"
        :key="item.createTime"
        class="ffo-content"
      >
        <a-avatar>
          <img alt="avatar" :src="item.user.avatar" />
        </a-avatar>
        <div class="ffo-name-and-sentence">
          <div
            >{{ item.user.nickname }} : {{ item.user.username }} -
            {{ item.createTime }}</div
          >
          <div class="ffo-sentence-text">
            <a-typography-paragraph
              style="text-align: justify; word-break: break-word"
            >
              {{ item.sentence }}
            </a-typography-paragraph>
          </div>
        </div>
      </div>
    </div>
    <div class="ffo-content-right">
      <div>
        <p>下一个回答用户: {{ nextUser.nextUser }}</p>
        <p
          >剩余时间:
          <a-countdown :value="timeLeft"></a-countdown>
        </p>
      </div>
      <div>
        <a-space>
          <a-textarea v-model="sentenceText" :max-length="255"></a-textarea>
          <a-button type="primary" @click="sendSentence">发送飞花令</a-button>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useFfoGameStore, useStompStore, useUserStore } from '@/store';
  import { computed, reactive, ref, watch } from 'vue';
  import { IFrame } from '@stomp/stompjs/src/i-frame';
  import { FfoNextOutputVO } from '@/types/ffo-types';
  import { UserDto } from '@/types/user-dto';

  const userStore = useUserStore();
  const stompStore = useStompStore();
  const ffoGameStore = useFfoGameStore();

  const updateFfoGame = (message: IFrame) => {
    console.log('游戏房间数据: ', message.body);
    ffoGameStore.update(JSON.parse(message.body));
  };

  const receiveSentence = (message: IFrame) => {
    console.log('句子', message.body);
    ffoGameStore.addSentence(JSON.parse(message.body));
  };
  const nextUser: FfoNextOutputVO = reactive<FfoNextOutputVO>({
    nextUser: {} as UserDto,
    nextEndTime: '',
  });
  const updateNext = (message: IFrame) => {
    console.log('下一个回答者', message.body);
    Object.assign(nextUser, JSON.parse(message.body));
  };

  const timeLeft = computed(() => {
    return Date.parse(nextUser.nextEndTime);
  });

  const ffoGameOver = (message: IFrame) => {
    console.log('游戏结束', message.body);
    // ffoGameStore.addSentence(JSON.parse(message.body));
  };

  watch(
    () => stompStore.connected,
    (newConnected) => {
      if (newConnected) {
        stompStore
          .getClient()
          .subscribe(
            `/user/${userStore.userInfo.username}/game/ffo`,
            updateFfoGame
          );
        stompStore
          .getClient()
          .subscribe(
            `/user/${userStore.userInfo.username}/game/ffo/sentence`,
            receiveSentence
          );
        stompStore
          .getClient()
          .subscribe(
            `/user/${userStore.userInfo.username}/game/ffo/next`,
            updateNext
          );
        stompStore
          .getClient()
          .subscribe(
            `/user/${userStore.userInfo.username}/game/ffo/end`,
            ffoGameOver
          );
      }
    }
  );

  const sentenceText = ref<string>('');
  const sendSentence = () => {
    stompStore
      .getClient()
      .send(
        `/app/ffo/${ffoGameStore.ffoGame.roomId}/sentence`,
        {},
        JSON.stringify({ sentence: sentenceText.value })
      );
  };
</script>

<style scoped>
  .ffo-game-body {
    display: flex;
    justify-content: space-around;
  }

  .ffo-content-list {
    display: flex;
    flex-direction: column-reverse;

    /* height: 280px; */
    width: 40%;
    overflow: auto;
  }

  .ffo-content {
    display: flex;
    margin: 4px 0 4px 0;
  }

  .ffo-name-and-sentence {
    margin-left: 5px;
  }

  .ffo-sentence-text {
    display: flex;
    width: 300px;
    background-color: #e5e5e5;
    border-radius: 5px;
  }

  .ffo-content-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40%;
  }
</style>
