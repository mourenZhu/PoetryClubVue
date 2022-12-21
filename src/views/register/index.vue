<template>
  <div class="container">
    <div class="register-form">
      <a-form
        ref="formRef"
        :label-col-props="{ span: 8 }"
        :model="formData"
        :wrapper-col-props="{ span: 16 }"
      >
        <a-form-item
          :rules="[
            {
              required: true,
              message: '必须输入昵称',
            },
            {
              maxLength: 20,
            },
          ]"
          field="nickname"
          label="昵称"
        >
          <a-input v-model="formData.nickname" placeholder="请输入昵称" />
        </a-form-item>
        <a-form-item
          :rules="[
            {
              required: true,
              message: '必须输入用户名',
              maxLength: 30,
            },
          ]"
          field="username"
          label="用户名"
        >
          <a-input v-model="formData.username" placeholder="请输入用户名" />
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
          ]"
          field="password"
          label="密码"
        >
          <a-input-password
            v-model="formData.password"
            placeholder="请输入新密码"
          />
        </a-form-item>
        <a-form-item
          :rules="[
            {
              required: true,
              message: '必须输入检查密码',
            },
            {
              type: 'string',
              maxLength: 30,
              minLength: 6,
            },
            {
              type: 'string',
              match: new RegExp(formData.password),
            },
          ]"
          field="checkPassword"
          label="再次输入密码"
        >
          <a-input-password
            v-model="formData.checkPassword"
            placeholder="再次输入密码"
          />
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="validate"> 点击注册 </a-button>
            <a-button type="outline" @click="toLogin"> 前往登录 </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </div>
    <div class="footer">
      <Footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import Footer from '@/components/footer/index.vue';
  import { reactive, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { register } from '@/api/register';
  import { useRouter } from 'vue-router';

  const formRef = ref<FormInstance>();
  const formData = reactive({
    nickname: '',
    username: '',
    password: '',
    checkPassword: '',
  });

  const router = useRouter();
  const validate = async () => {
    const res = await formRef.value?.validate();
    if (!res) {
      // do some thing
      // you also can use html-type to submit
      try {
        const { data } = await register({
          nickname: formData.nickname,
          username: formData.username,
          password: formData.password,
        });
        if (data) {
          Message.info('注册成功');
          await router.push({ name: 'login' });
        }
      } catch (e) {
        //
      } finally {
        //
      }
    }
  };

  const toLogin = () => {
    router.push({ name: 'login' });
  };
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 700px;
  }

  .register-form {
    display: flex;
    width: 60%;
  }

  .footer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
  }
</style>
