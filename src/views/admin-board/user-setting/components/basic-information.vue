<template>
  <a-form
    ref="formRef"
    :label-col-props="{ span: 8 }"
    :model="formData"
    :wrapper-col-props="{ span: 16 }"
    class="form"
  >
    <a-form-item
      :label="$t('userSetting.basicInfo.form.label.email')"
      :rules="[
        {
          required: true,
          message: $t('userSetting.form.error.email.required'),
        },
      ]"
      field="email"
    >
      <a-input
        v-model="formData.email"
        :placeholder="$t('userSetting.basicInfo.placeholder.email')"
      />
    </a-form-item>
    <a-form-item
      :label="$t('userSetting.basicInfo.form.label.nickname')"
      :rules="[
        {
          required: true,
          message: $t('userSetting.form.error.nickname.required'),
        },
      ]"
      field="nickname"
    >
      <a-input
        v-model="formData.nickname"
        :placeholder="$t('userSetting.basicInfo.placeholder.nickname')"
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="validate">
          {{ $t('userSetting.save') }}
        </a-button>
        <a-button type="secondary" @click="reset">
          {{ $t('userSetting.reset') }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { adminSaveUserInfo, UserReqVO } from '@/api/user-center';
  import { Message } from '@arco-design/web-vue';
  import { useUserStore } from '@/store';
  import { useRoute } from 'vue-router';
  import { getInitUserResVo, getUser, UserResVO } from '@/api/user';

  const userStore = useUserStore();
  const route = useRoute();
  const formRef = ref<FormInstance>();
  const formData = ref<UserReqVO>({
    email: '',
    nickname: '',
  });

  const init = async () => {
    const { data } = await getUser(route.params.username as string);
    formData.value.email = data.email;
    formData.value.nickname = data.nickname;
  };
  init();

  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      // do some thing
      // you also can use html-type to submit
      try {
        await adminSaveUserInfo(
          route.params.username as string,
          formData.value
        );
        Message.info('修改成功');
      } catch (e) {
        //
      } finally {
        //
      }
    }
  };
  const reset = async () => {
    await formRef.value?.resetFields();
  };
</script>

<style lang="less" scoped>
  .form {
    width: 540px;
    margin: 0 auto;
  }
</style>
