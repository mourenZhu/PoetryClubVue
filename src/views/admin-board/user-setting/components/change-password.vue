<template>
  <a-form
    ref="formRef"
    :label-col-props="{ span: 8 }"
    :model="formData"
    :wrapper-col-props="{ span: 16 }"
    class="form"
  >
    <a-form-item
      :rules="[
        {
          required: true,
          message: '必须输入新密码',
        },
        {
          type: 'string',
          maxLength: 30,
          minLength: 6,
        },
      ]"
      field="newPassword"
      label="新密码"
    >
      <a-input-password
        v-model="formData.newPassword"
        placeholder="请输入新密码"
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="validate"> 修改密码</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { adminChangePassword } from '@/api/user-center';
  import { Message } from '@arco-design/web-vue';
  import useUser from '@/hooks/user';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const { logout } = useUser();
  const formRef = ref<FormInstance>();
  const formData = ref({
    newPassword: '',
  });
  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      // do some thing
      // you also can use html-type to submit
      try {
        await adminChangePassword(route.params.username as string, {
          newPassword: formData.value.newPassword,
        });
        Message.info('修改成功');
      } catch (e) {
        //
      } finally {
        //
      }
    }
  };
</script>

<style scoped>
  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>
