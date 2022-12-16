<template>
  <div class="container">
    <Breadcrumb :items="['古诗', poemId]" />
    <div class="poem-card">
      <div>
        <h2>{{ poemVo.title }}</h2>
      </div>
      <div> {{ poemVo.author.name }} ({{ poemVo.author.era }}) </div>
      <div style="display: flex; flex-direction: column; width: 100%">
        <div
          v-for="(item, index) in getSentenceList(poemVo.content)"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
      <div>{{ getCnPoemType(poemVo.poemType) }}</div>
      <div>
        <a-space wrap>
          <a-tag v-for="item in poemVo.tags" :key="item" color="green">
            {{ item }}
          </a-tag>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { reactive, ref } from 'vue';
  import { getPoem, PoemResVo } from '@/api/poem';
  import { getSentenceList, getCnPoemType } from '@/utils/poemUtil';

  const route = useRoute();
  const poemId = ref<string>(route.params.poemId as string);

  const poemVo: PoemResVo = reactive({
    id: '',
    author: { id: '', name: '', era: '', description: '' },
    title: '',
    content: '',
    poemType: 'UNKNOWN',
    tags: [],
  });

  getPoem(poemId.value).then((res) => {
    Object.assign(poemVo, res.data);
  });
</script>

<style scoped>
  .poem-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;

    /* justify-content: flex-end; */
  }

  .poem-card div {
    display: flex;
    justify-content: center;
    margin-bottom: 18px;
  }
</style>
