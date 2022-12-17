<template>
  <a-card :bordered="false">
    <a-space :size="54">
      <a-upload
        :file-list="fileList"
        :headers="{
          Authorization: getAuthorization(),
        }"
        :show-file-list="false"
        :show-upload-button="true"
        accept="image/png, image/jpeg"
        :action="userAvatarUploadUrl"
        list-type="picture-card"
        @change="uploadChange"
        @success="uploadSuccess"
      >
        <template #upload-button>
          <a-avatar :size="100" class="info-avatar">
            <template #trigger-icon>
              <icon-camera />
            </template>
            <img
              v-if="fileList.length"
              :src="fileList[0].url"
              style="object-fit: cover"
            />
          </a-avatar>
        </template>
      </a-upload>
      <a-descriptions
        :column="2"
        :data="renderData"
        :label-style="{
          width: '140px',
          fontWeight: 'normal',
          color: 'rgb(var(--gray-8))',
        }"
        :value-style="{
          width: '200px',
          paddingLeft: '8px',
          textAlign: 'left',
        }"
        align="right"
        layout="inline-horizontal"
      >
        <template #label="{ label }">{{ $t(label) }} :</template>
      </a-descriptions>
    </a-space>
  </a-card>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';
  import type {
    FileItem,
    RequestOption,
  } from '@arco-design/web-vue/es/upload/interfaces';
  import { getAuthorization } from '@/utils/auth';
  import type { DescData } from '@arco-design/web-vue/es/descriptions/interface';
  import { getUser, UserResVO } from '@/api/user';
  import { useRoute } from 'vue-router';
  import { Message } from '@arco-design/web-vue';

  const route = useRoute();
  const userAvatarUploadUrl = ref(`/api/user/${route.params.username}/avatar`);
  const userVo: UserResVO = reactive({
    username: '',
    nickname: '',
    email: '',
    avatar: '',
    roles: [],
  });

  const file = computed(() => {
    return {
      uid: '-2',
      name: 'avatar.png',
      url: userVo.avatar,
    };
  });
  const renderData = computed(() => {
    return [
      {
        label: '用户名',
        value: userVo.username,
      },
      {
        label: '昵称',
        value: userVo.nickname,
      },
      {
        label: '邮箱',
        value: userVo.email,
      },
      {
        label: '角色',
        value: userVo.roles,
      },
    ] as DescData[];
  });

  const init = async () => {
    const { data } = await getUser(route.params.username as string);
    Object.assign(userVo, data);
    console.log('userVo', userVo);
  };
  init();

  const fileList = ref<FileItem[]>([file]);
  const uploadChange = (fileItemList: FileItem[], fileItem: FileItem) => {
    fileList.value = [fileItem];
  };

  const uploadSuccess = (fileItem: FileItem) => {
    Message.success('上传成功');
  };
</script>

<style lang="less" scoped>
  .arco-card {
    padding: 14px 0 4px 4px;
    border-radius: 4px;
  }

  :deep(.arco-avatar-trigger-icon-button) {
    width: 32px;
    height: 32px;
    line-height: 32px;
    background-color: #e8f3ff;

    .arco-icon-camera {
      margin-top: 8px;
      color: rgb(var(--arcoblue-6));
      font-size: 14px;
    }
  }
</style>
