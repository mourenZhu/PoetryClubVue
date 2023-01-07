<template>
  <div class="container">
    <Breadcrumb :items="['管理员面板', '修改公告']" />
    <a-form ref="formRef" layout="vertical" :model="formData">
      <a-card title="公告表格" class="general-card">
        <a-form-item label="ID">
          <a-input v-model="formData.id" disabled></a-input>
        </a-form-item>
        <a-form-item
          label="标题"
          field="title"
          :rules="[{ required: true, message: '必须输入标题' }]"
        >
          <a-input v-model="formData.title"></a-input>
        </a-form-item>
        <a-form-item label="内容">
          <WangEditor ref="editorRef"></WangEditor>
        </a-form-item>
      </a-card>
      <div class="actions">
        <a-space>
          <a-button type="primary" :loading="loading" @click="onSubmitClick">
            {{ $t('groupForm.submit') }}
          </a-button>
        </a-space>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import {
    AnnouncementPostVo,
    AnnouncementPutVo,
    getAnnouncement,
    postAnnouncement,
    putAnnouncement,
  } from '@/api/announcement';
  import useLoading from '@/hooks/loading';
  import WangEditor from '@/components/editor/WangEditor.vue';
  import { Message } from '@arco-design/web-vue';
  import { useRoute } from 'vue-router';

  const formRef = ref<FormInstance>();
  const editorRef = ref<InstanceType<typeof WangEditor> | null>();
  const { loading, setLoading } = useLoading();
  const route = useRoute();
  const formData: AnnouncementPutVo = reactive({
    id: '',
    title: '',
    content: '',
  });

  async function init() {
    const { data } = await getAnnouncement(route.params.id as string);
    formData.id = data.id;
    formData.title = data.title;
    // @ts-ignore
    editorRef.value.valueHtml = data.content;
  }
  init();

  const onSubmitClick = async () => {
    const res = await formRef.value?.validate();
    console.log(editorRef.value?.valueHtml);
    if (!res) {
      setLoading(true);
      // @ts-ignore
      formData.content = editorRef.value?.valueHtml;
      console.log(formData);
      const { data } = await putAnnouncement(formData);
      if (data) {
        Message.success('修改成功');
      }
      setLoading(false);
    }
  };
</script>

<style scoped>
  .container {
    padding: 0 20px 40px 20px;
    overflow: hidden;
  }

  .actions {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    height: 60px;
    padding: 14px 20px 14px 0;
    text-align: right;
    background: var(--color-bg-2);
  }
</style>
