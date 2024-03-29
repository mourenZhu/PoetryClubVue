<template>
  <div class="ffo-game-body">
    <div class="ffo-content-list">
      <div
        v-for="item in sentenceList"
        :key="item.createTime"
        class="ffo-content"
      >
        <a-avatar>
          <img :src="item.user.avatar" alt="avatar" />
        </a-avatar>
        <div class="ffo-name-and-sentence">
          <div>{{ item.user.nickname }} - {{ item.createTime }}</div>
          <div class="ffo-sentence-text">
            <a-typography-paragraph
              style="text-align: justify; word-break: break-word"
            >
              {{ item.sentence }}
            </a-typography-paragraph>
          </div>
          <div
            v-show="voteVO.currentUser.username !== userStore.username"
            style="display: flex"
          >
            <a-tag v-if="item.sentenceJudgeType === 'SUCCESS'" color="green">
              {{ getSentenceJudgeType(item.sentenceJudgeType) }}
            </a-tag>
            <a-tag v-else color="red">
              {{ getSentenceJudgeType(item.sentenceJudgeType) }}
            </a-tag>
            <a-popover v-if="item.userVotes.length !== 0" title="投票详情">
              <a-tag color="blue">{{ getVtoV(item.userVotes) }}</a-tag>
              <template #content>
                <p v-for="vote in item.userVotes" :key="vote.user.username">
                  {{ vote.user.nickname }} :
                  {{ getVoteType(vote.ffoVoteType) }}
                </p>
              </template>
            </a-popover>
            <a-tag v-if="item.poem" color="blue">
              《{{ item.poem.title }}》 - {{ item.poem.authorName }}
            </a-tag>
          </div>
        </div>
      </div>
    </div>
    <div class="ffo-content-right">
      <div v-show="!isShowVote">
        <p v-if="!ffoGameStore.ffoGame.allowWordInAny">
          {{ ffoGameStore.ffoGame.keyword }} 应 出现在第
          {{ nextKeywordIndex }} 个字
        </p>
        <p>下一个回答用户: {{ nextVO?.nextUser.nickname }}</p>
        <div style="display: flex; justify-content: center">
          <span v-show="!isShowVote" style="display: flex; align-items: center"
            >剩余时间:
          </span>
          <StatisticCountdown :value="timeLeft"></StatisticCountdown>
        </div>
      </div>
      <div v-show="isShowVote">
        <div style="display: flex; justify-content: center">
          <span style="display: flex; align-items: center">投票剩余时间: </span>
          <StatisticCountdown :value="voteTimeLeft"></StatisticCountdown>
        </div>
        <p>当前发言用户: {{ voteVO.currentUser.nickname }}</p>
        <p>当前的句子: {{ voteVO.currentSentence }}</p>
        <a-space v-show="isShowVoteButton">
          <a-button status="success" @click="voteFavorButton">通过</a-button>
          <a-button status="danger" @click="voteOpposeButton">拒绝</a-button>
        </a-space>
      </div>
      <div v-show="isShowSendSentence">
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
  import { FfoGameSentenceDTO } from '@/store/modules/ffo-game/types';
  import {
    FfoNextOutputVO,
    FfoVoteOutputVO,
    FfoVoteType,
  } from '@/types/ffo-types';
  import { postFfoVote } from '@/api/flying-flower-order';
  import { getSentenceJudgeType, getVoteType, getVtoV } from '@/utils/ffoUtil';
  import { StatisticCountdown } from 'ant-design-vue';
  // import 'ant-design-vue/es/message/style/css';

  const userStore = useUserStore();
  const stompStore = useStompStore();
  const ffoGameStore = useFfoGameStore();

  const isShowVote = ref<boolean>(false);
  const isShowVoteButton = ref<boolean>(true);
  const isShowSendSentence = ref<boolean>(false);

  const updateFfoGame = (message: IFrame) => {
    console.log('游戏房间数据: ', message.body);
    ffoGameStore.update(JSON.parse(message.body));
  };

  // 显示给用户看，从1开始，接收到的是从0开始
  const nextKeywordIndex = ref(1);

  const sentenceList = computed<FfoGameSentenceDTO[]>(() => {
    return [...ffoGameStore.ffoGame.userSentences].reverse();
  });

  const receiveSentence = (message: IFrame) => {
    console.log('句子', message.body);
    const sentence: FfoGameSentenceDTO = JSON.parse(message.body);
    isShowVote.value = sentence.sentenceJudgeType === 'WAITING_USERS_VOTE';
    ffoGameStore.addSentence(sentence);
  };
  const nextVO: FfoNextOutputVO = reactive({
    nextUser: {
      username: '',
      nickname: '',
      avatar: '',
    },
    nextEndTime: '',
  });
  // const nextUser: UserDto = reactive<UserDto>({} as UserDto);
  const timeLeft = computed(() => {
    const n = Date.parse(nextVO?.nextEndTime);
    console.log('下一次回答截止时间', n);
    return n;
  });
  const updateNext = (message: IFrame) => {
    console.log('下一个回答者', message.body);
    Object.assign(nextVO, JSON.parse(message.body));
    isShowSendSentence.value = nextVO.nextUser.username === userStore.username;
  };

  const updateKeywordIndex = (message: IFrame) => {
    nextKeywordIndex.value = parseInt(message.body, 10) + 1;
  };

  const voteVO: FfoVoteOutputVO = reactive({
    currentUser: {
      username: '',
      nickname: '',
      avatar: '',
    },
    currentSentence: '',
    speakingTime: '',
    endTime: '',
  });
  const voteTimeLeft = computed(() => {
    const n = Date.parse(voteVO.endTime);
    console.log('投票截止时间', n);
    return n;
  });
  const voteHandle = (message: IFrame) => {
    console.log('接收到投票了', message.body);
    const vote: FfoVoteOutputVO = JSON.parse(message.body);
    isShowVote.value = true;
    isShowSendSentence.value = false;
    isShowVoteButton.value = vote.currentUser.username !== userStore.username;
    Object.assign(voteVO, vote);
  };

  const ffoVote = async (voteType: FfoVoteType) => {
    const { data } = await postFfoVote(ffoGameStore.ffoGame.roomId, {
      ffoVoteType: voteType,
    });
    if (data) {
      isShowVoteButton.value = false;
    }
  };

  const voteFavorButton = () => {
    ffoVote('FAVOR');
  };

  const voteOpposeButton = () => {
    ffoVote('OPPOSE');
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
            `/user/${userStore.userInfo.username}/game/ffo/vote`,
            voteHandle
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
            `/user/${userStore.userInfo.username}/game/ffo/keyword_index`,
            updateKeywordIndex
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
    sentenceText.value = '';
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
    width: 40%;
    height: 280px;
    overflow: auto;
  }

  .ffo-content {
    display: flex;
    margin: 4px 0 4px 0;
  }

  .ffo-name-and-sentence {
    /* display: flex; */
    margin-left: 5px;
  }

  .ffo-sentence-text {
    display: flex;
    width: 250px;
    background-color: #e5e5e5;
    border-radius: 5px;
  }

  .ffo-content-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40%;
  }

  .ffo-content-right div {
    margin: 5px;
  }
</style>
