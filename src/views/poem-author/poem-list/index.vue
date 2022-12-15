<template>
  <div class="container">
    <Breadcrumb :items="['古诗', '古诗列表']" />
    <a-card class="general-card" title="古诗">
      <a-row>
        <a-col :flex="1">
          <a-form
            :label-col-props="{ span: 6 }"
            :model="poemSearchForm"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="author" label="作者">
                  <a-input
                    v-model="poemSearchForm.author"
                    placeholder="输入作者搜索"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="era" label="朝代">
                  <a-input
                    v-model="poemSearchForm.era"
                    placeholder="输入朝代，如 唐、宋"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="title" label="诗名">
                  <a-input
                    v-model="poemSearchForm.title"
                    placeholder="输入诗名"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="content" label="内容">
                  <a-input
                    v-model="poemSearchForm.content"
                    placeholder="输入内容"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="tags" label="标签">
                  <a-select
                    v-model="poemSearchForm.tags"
                    allow-create
                    multiple
                    placeholder="可自定义输入多个标签"
                  >
                    <a-option>风</a-option>
                    <a-option>花</a-option>
                    <a-option>雪</a-option>
                    <a-option>月</a-option>
                  </a-select>
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
          <a-table-column data-index="id" title="id" width="100" />
          <a-table-column data-index="title" title="诗名" width="150" />
          <a-table-column data-index="author" title="作者" width="150">
            <template #cell="{ record }">
              {{ record.author.name }} ({{ record.author.era }})
            </template>
          </a-table-column>
          <a-table-column data-index="content" title="内容">
            <template #cell="{ record }">
              <div style="display: flex; flex-direction: column; width: 100%">
                <div
                  v-for="(item, index) in getSentenceList(record.content)"
                  :key="index"
                >
                  {{ item }}
                </div>
              </div>
            </template>
          </a-table-column>
          <a-table-column data-index="poemType" title="类型" width="100">
            <template #cell="{ record }">
              {{ cnPoemType(record.poemType) }}
            </template>
          </a-table-column>
          <a-table-column data-index="tags" title="标签" width="100">
            <template #cell="{ record }">
              <a-space wrap>
                <a-tag v-for="item in record.tags" :key="item" color="green">
                  {{ item }}
                </a-tag>
              </a-space>
            </template>
          </a-table-column>
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
  import { useUserStore } from '@/store';
  import { reactive, ref } from 'vue';
  import { Pagination } from '@/types/global';
  import { useRouter } from 'vue-router';
  import { listPoem, PoemParams, PoemResVo, PoemType } from '@/api/poem';
  import { getSentenceList, cnPoemType } from '@/utils/poemUtil';

  const userStore = useUserStore();
  const poemSearchForm = reactive({
    author: '杜甫',
    title: '',
    era: '',
    content: '',
    tags: [],
  });

  const renderData = ref<PoemResVo[]>([]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });

  const fetchData = async (
    params: PoemParams = { current: 1, pageSize: 20 }
  ) => {
    try {
      params.title = poemSearchForm.title;
      params.author = poemSearchForm.author;
      params.content = poemSearchForm.content;
      params.era = poemSearchForm.era;
      params.tags = poemSearchForm.tags;
      const { data } = await listPoem(params);
      console.log('data = ', data);
      renderData.value = data.content;
      pagination.current = params.current;
      pagination.total = data.totalElements;
    } catch (err) {
      // you can report use errorHandler or other
    }
  };

  function search() {
    fetchData();
  }

  fetchData();

  const onPageChange = (current: number) => {
    fetchData({ current });
  };

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
