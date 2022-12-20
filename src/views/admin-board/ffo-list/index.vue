<template>
  <div class="container">
    <Breadcrumb :items="['游戏记录', '飞花令记录']" />
    <a-card class="general-card" title="飞花令记录">
      <a-row>
        <a-col :flex="1">
          <a-form
            :label-col-props="{ span: 6 }"
            :model="ffoSearchForm"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="username" label="用户名">
                  <a-input
                    v-model="ffoSearchForm.username"
                    placeholder="输入用户名搜索"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="keyword" label="令">
                  <a-input
                    v-model="ffoSearchForm.keyword"
                    placeholder="输入令搜索"
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
          <a-table-column data-index="id" title="id" />
          <a-table-column data-index="keyword" title="令" />
          <a-table-column data-index="userInfoEntities" title="前三名">
            <template #cell="{ record }">
              <p v-for="item in getTop3User(record.userInfos)" :key="item.id">
                第 {{ item.ranking }} 名: {{ item.userVo.username }}
              </p>
            </template>
          </a-table-column>
          <a-table-column data-index="userSentenceEntities" title="游戏轮数">
            <template #cell="{ record }">
              {{ record.userSentences.length }}
            </template>
          </a-table-column>
          <a-table-column data-index="createTime" title="开始时间" />
          <a-table-column data-index="endTime" title="结束时间" />
          <a-table-column title="详情">
            <template #cell="{ record }">
              <a-button type="primary" @click="toFfoGame(record.id)"
                >查看详情
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import {
    FfoGameResVo,
    FfoGameUserInfoResVo,
    listFfoGame,
    listUserFfoGame,
  } from '@/api/flying-flower-order';
  import { Pagination } from '@/types/global';
  import { PolicyParams } from '@/api/list';
  import { useRouter } from 'vue-router';

  const ffoSearchForm = reactive({ keyword: '', username: '' });

  const renderData = ref<FfoGameResVo[]>([]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });

  const fetchData = async (
    username = '',
    keyword = '',
    params: PolicyParams = { current: 1, pageSize: 20 }
  ) => {
    try {
      const { data } = await listFfoGame(
        username,
        keyword,
        params.current,
        params.pageSize
      );
      console.log('data = ', data);
      renderData.value = data.content;
      pagination.current = params.current;
      pagination.total = data.totalElements;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  function search() {
    fetchData(ffoSearchForm.username, ffoSearchForm.keyword);
  }

  fetchData();

  const onPageChange = (current: number) => {
    fetchData(ffoSearchForm.username, ffoSearchForm.keyword, {
      ...basePagination,
      current,
    });
  };

  function getTop3User(list: FfoGameUserInfoResVo[]): FfoGameUserInfoResVo[] {
    const data: FfoGameUserInfoResVo[] = [];
    list.forEach((d) => {
      data.splice(d.ranking - 1, 0, d);
    });
    return data.slice(0, 3);
  }

  const router = useRouter();

  function toFfoGame(id: string) {
    router.push({
      name: 'FfoDetail',
      params: {
        ffoId: id,
      },
    });
  }
</script>

<style scoped></style>
