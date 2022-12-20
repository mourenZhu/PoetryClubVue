<template>
  <div class="container">
    <Breadcrumb :items="['管理员面板', '公告列表']" />
    <a-card class="general-card" title="公告">
      <a-row>
        <a-col :flex="1">
          <a-form
            :label-col-props="{ span: 6 }"
            :model="searchForm"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="title" label="标题">
                  <a-input
                    v-model="searchForm.title"
                    placeholder="输入标题搜索"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="content" label="公告内容">
                  <a-input
                    v-model="searchForm.content"
                    placeholder="输入内容搜索"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider direction="vertical" style="height: 84px" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space :size="18" direction="vertical">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-table
        :bordered="false"
        :data="renderData"
        :pagination="pagination"
        row-key="id"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column data-index="id" title="ID" />
          <a-table-column data-index="title" title="标题" />
          <a-table-column data-index="createTime" title="创建时间" />
          <a-table-column data-index="updateTime" title="更新时间" />
          <a-table-column title="详情">
            <template #cell="{ record }">
              <a-space>
                <a-button type="primary" @click="toPage(record.id)">
                  修改
                </a-button>
                <a-button
                  type="primary"
                  status="danger"
                  @click="delAnn(record.id)"
                >
                  删除
                </a-button>
              </a-space>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import useLoading from '@/hooks/loading';
  import { useUserStore } from '@/store';
  import { reactive, ref } from 'vue';
  import { Pagination } from '@/types/global';
  import { useRouter } from 'vue-router';
  import {
    AnnouncementTitleResVo,
    delAnnouncement,
    PageTitleParams,
    pageTitleVo,
  } from '@/api/announcement';
  import { Message } from '@arco-design/web-vue';

  const { loading, setLoading } = useLoading(true);
  const userStore = useUserStore();
  const searchForm = reactive({
    title: '',
    content: '',
  });

  const renderData = ref<AnnouncementTitleResVo[]>([]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });

  const fetchData = async (
    params: PageTitleParams = {
      title: '',
      content: '',
      pageNum: 0,
      pageSize: 20,
    }
  ) => {
    setLoading(true);
    try {
      params.title = searchForm.title;
      params.content = searchForm.content;
      const { data } = await pageTitleVo(params);
      console.log('data = ', data);
      renderData.value = data.content;
      pagination.current = params.pageNum + 1;
      pagination.total = data.totalElements;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  function search() {
    fetchData();
  }

  fetchData();

  const onPageChange = (current: number) => {
    fetchData({ pageNum: current - 1 });
  };

  const router = useRouter();

  function toPage(id: string) {
    router.push({
      name: 'AnnouncementUpdate',
      params: {
        id,
      },
    });
  }

  async function delAnn(id: string) {
    const { data } = await delAnnouncement(id);
    if (data) {
      Message.success('删除成功');
      renderData.value.splice(
        renderData.value.findIndex((value) => {
          return value.id === id;
        }),
        1
      );
    }
  }
</script>

<style scoped></style>
