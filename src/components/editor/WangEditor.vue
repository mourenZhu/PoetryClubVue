<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      :default-config="toolbarConfig"
      :editor="editorRef"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <Editor
      v-model="valueHtml"
      :default-config="editorConfig"
      :mode="mode"
      style="height: 500px; overflow-y: hidden"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
  import '@wangeditor/editor/dist/css/style.css'; // 引入 css
  import {
    onBeforeUnmount,
    ref,
    shallowRef,
    onMounted,
    Ref,
    UnwrapRef,
  } from 'vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import { IDomEditor, IEditorConfig } from '@wangeditor/editor';

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();

  // 内容 HTML
  const valueHtml = ref('');

  // 模拟 ajax 异步获取内容
  // onMounted(() => {
  //   setTimeout(() => {
  //     valueHtml.value = '';
  //   }, 1500);
  // });

  const mode = ref('default');

  const toolbarConfig = {};
  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {
      uploadImage: {
        base64LimitSize: 14 * 1024 * 1024,
      },
    },
  };

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });

  const handleCreated = (editor: IDomEditor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };

  const handleChange = (editor: IDomEditor) => {};

  defineExpose({
    valueHtml,
  });
</script>

<style scoped></style>
