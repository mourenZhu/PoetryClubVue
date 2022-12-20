<template>
  <div class="container">
    <div class="announcement">
      <a-typography-title>{{ announcementVo.title }}</a-typography-title>
      <div>{{ announcementVo.createTime }}</div>
      <a-divider />
      <div v-html="announcementVo.content"></div>
    </div>
    <div class="announcement-list">
      <a-typography-title :heading="4">公告列表</a-typography-title>
      <!--      <div>{{ announcementVo.createTime }}</div>-->
      <a-divider />
      <a-space direction="vertical">
        <a-link @click="changeAnn('1')"> 诗社公告 </a-link>
        <a-link
          v-for="item in announcementVoList"
          :key="item.id"
          @click="changeAnn(item.id)"
        >
          {{ item.title }}
        </a-link>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {
    AnnouncementResVo,
    AnnouncementTitleResVo,
    getAnnouncement,
    pageTitleVo,
  } from '@/api/announcement';
  import { reactive } from 'vue';

  const announcementVo: AnnouncementResVo = reactive({
    id: '',
    title: '',
    content: '',
    createTime: '',
  });

  const announcementVoList: AnnouncementTitleResVo[] = reactive([]);

  async function init() {
    const { data } = await getAnnouncement('1');
    Object.assign(announcementVo, data);
    const { data: page } = await pageTitleVo({ pageNum: 0, pageSize: 20 });
    Object.assign(announcementVoList, page.content);
  }

  init();

  async function changeAnn(id: string) {
    const { data } = await getAnnouncement(id);
    Object.assign(announcementVo, data);
  }
</script>

<style scoped>
  .container {
    display: flex;
    justify-content: space-around;
    padding: 0 20px 20px 20px;
    background-color: #fff;
  }

  .announcement {
    width: 60%;
  }

  .announcement-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 30%;
  }
</style>
