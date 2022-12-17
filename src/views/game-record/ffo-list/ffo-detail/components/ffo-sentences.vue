<template>
  <div class="ffo-content-list">
    <div v-for="item in data" :key="item.createTime" class="ffo-content">
      <a-avatar>
        <img :src="item.userVo.avatar" alt="avatar" />
      </a-avatar>
      <div class="ffo-name-and-sentence">
        <div>{{ item.userVo.nickname }} - {{ item.createTime }}</div>
        <div class="ffo-sentence-text">
          <a-typography-paragraph
            style="text-align: justify; word-break: break-word"
          >
            {{ item.sentence }}
          </a-typography-paragraph>
        </div>
        <div>
          <a-tag v-if="item.sentenceJudgeType === 'SUCCESS'" color="green">
            {{ getSentenceJudgeType(item.sentenceJudgeType) }}
          </a-tag>
          <a-tag v-else color="red">
            {{ getSentenceJudgeType(item.sentenceJudgeType) }}
          </a-tag>
          <a-popover v-if="item.userVotes.length !== 0" title="投票详情">
            <a-tag color="blue">{{ getVtoV(item.userVotes) }}</a-tag>
            <template #content>
              <p v-for="vote in item.userVotes" :key="vote.userVo.username">
                {{ vote.userVo.nickname }} : {{ getVoteType(vote.ffoVoteType) }}
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
</template>

<script lang="ts" setup>
  import { FfoGameUserSentenceResVo } from '@/api/flying-flower-order';
  import { computed, ref } from 'vue';
  import { getSentenceJudgeType, getVtoV, getVoteType } from '@/utils/ffoUtil';

  const props = defineProps<{
    data: FfoGameUserSentenceResVo[];
  }>();

  const sentences = computed(() => {
    return props.data.slice().reverse();
  });
  // console.log('飞花令句子', props.data)
</script>

<style scoped>
  .ffo-content-list {
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
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
</style>
