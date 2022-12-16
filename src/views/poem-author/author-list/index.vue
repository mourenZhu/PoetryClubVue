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
                <a-form-item field="name" label="作者">
                  <a-input
                    v-model="poemSearchForm.name"
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
                <a-form-item field="description" label="作者描述">
                  <a-input
                    v-model="poemSearchForm.description"
                    placeholder="输入作者描述"
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
          <a-table-column data-index="id" title="id" width="100" />
          <a-table-column data-index="name" title="名字" width="150" />
          <a-table-column data-index="era" title="朝代" width="150" />
          <a-table-column data-index="description" title="描述">
            <template #cell="{ record }">
              {{ record.description }}
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
  import useLoading from '@/hooks/loading';
  import { useUserStore } from '@/store';
  import { reactive, ref } from 'vue';
  import { listPoem, PoemParams, PoemResVo } from '@/api/poem';
  import { Pagination } from '@/types/global';
  import { useRouter } from 'vue-router';
  import { AuthorParams, listAuthor } from '@/api/author';

  const { loading, setLoading } = useLoading(true);
  const userStore = useUserStore();
  const poemSearchForm = reactive({
    name: '',
    era: '',
    description: '',
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
    params: AuthorParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      params.name = poemSearchForm.name;
      params.era = poemSearchForm.era;
      params.description = poemSearchForm.description;
      const { data } = await listAuthor(params);
      console.log('data = ', data);
      renderData.value = data.content;
      pagination.current = params.current;
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
