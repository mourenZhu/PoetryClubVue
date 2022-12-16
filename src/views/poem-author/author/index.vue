<template>
  <div class="container">
    <Breadcrumb :items="['诗人', authorId]" />
    <div class="author-card">
      <div>
        <h4>{{ authorVo.name }}</h4>
      </div>
      <div>{{ authorVo.era }}</div>
      <div> </div>
      <div>{{ '\xa0\xa0' + authorVo.description }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { reactive, ref } from 'vue';
  import { AuthorResVo, getAuthor } from '@/api/author';

  const route = useRoute();
  const authorId = ref<string>(route.params.id as string);

  const authorVo: AuthorResVo = reactive({
    id: '',
    name: '',
    era: '',
    description: '',
  });

  getAuthor(authorId.value).then((res) => {
    Object.assign(authorVo, res.data);
  });
</script>

<style scoped>
  .author-card {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;

    /* justify-content: flex-end; */
  }

  .author-card div {
    display: flex;
    justify-content: center;
    margin: 0 40px 18px 40px;
  }
</style>
