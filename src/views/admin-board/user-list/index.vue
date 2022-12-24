<template>
  <div class="container">
    <Breadcrumb :items="['用户', '用户列表']" />
    <a-card class="general-card" title="用户">
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
                <a-form-item field="nickname" label="昵称">
                  <a-input
                    v-model="searchForm.nickname"
                    placeholder="输入昵称搜索"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="username" label="用户名">
                  <a-input
                    v-model="searchForm.username"
                    placeholder="输入用户名搜索"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="email" label="邮箱">
                  <a-input
                    v-model="searchForm.email"
                    placeholder="输入邮箱搜索"
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
          <a-table-column data-index="avatar" title="头像">
            <template #cell="{ record }">
              <a-avatar>
                <img alt="avatar" :src="record.avatar" />
              </a-avatar>
            </template>
          </a-table-column>
          <a-table-column data-index="username" title="用户名" />
          <a-table-column data-index="nickname" title="昵称" />
          <a-table-column data-index="email" title="邮箱" />
          <a-table-column data-index="roles" title="角色" />
          <a-table-column data-index="createTime" title="创建时间" />
          <a-table-column data-index="updateTime" title="更新时间" />
          <a-table-column title="详情">
            <template #cell="{ record }">
              <a-button type="primary" @click="toPage(record.username)"
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
  import { listUser, UserParams, UserResVO } from '@/api/user';

  const { loading, setLoading } = useLoading(true);
  const userStore = useUserStore();
  const searchForm = reactive({
    nickname: '',
    username: '',
    email: '',
  });

  const renderData = ref<UserResVO[]>([]);
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });

  const fetchData = async (
    params: UserParams = { pageNum: 0, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      params.nickname = searchForm.nickname;
      params.username = searchForm.username;
      params.email = searchForm.email;
      const { data } = await listUser(params);
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

  function toPage(username: string) {
    router.push({
      name: 'AdminUserSetting',
      params: {
        username,
      },
    });
  }
</script>

<style scoped></style>
