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
          message: '必须输入旧密码',
        },
      ]"
      field="oldPassword"
      label="旧密码"
    >
      <a-input v-model="formData.oldPassword" placeholder="请输入旧密码" />
    </a-form-item>
    <a-form-item
      :rules="[
        {
          required: true,
          message: '必须输入旧密码',
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
    <a-form-item
      :rules="[
        {
          required: true,
          message: '必须输入密码',
        },
        {
          type: 'string',
          maxLength: 30,
          minLength: 6,
        },
        {
          type: 'string',
          match: new RegExp(formData.newPassword),
        },
      ]"
      field="validatePassword"
      label="再次输入密码"
    >
      <a-input-password
        v-model="formData.validatePassword"
        placeholder="再次输入密码"
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="validate"> 修改密码 </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { changePassword } from '@/api/user-center';
  import { Message } from '@arco-design/web-vue';
  import useUser from '@/hooks/user';

  const { logout } = useUser();
  const formRef = ref<FormInstance>();
  const formData = ref({
    oldPassword: '',
    validatePassword: '',
    newPassword: '',
  });
  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      // do some thing
      // you also can use html-type to submit
      try {
        await changePassword({
          oldPassword: formData.value.oldPassword,
          newPassword: formData.value.newPassword,
        });
        Message.info('修改成功');
        await logout();
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
