<template>
  <a-form :model="props.data">
    <a-form-item
      :rules="[
        { required: true, message: '必须输入房间名称' },
        { minLength: 1, message: 'must be greater than 5 characters' },
      ]"
      :validate-trigger="['change', 'input']"
      field="name"
      label="房间名称"
    >
      <a-input v-model="form.name" placeholder="请输入房间名称" />
    </a-form-item>
    <a-form-item field="maxPlayers" label="最大游戏人数">
      <a-input-number
        v-model="form.maxPlayers"
        :max="10"
        :min="1"
        mode="button"
      />
    </a-form-item>
    <a-form-item
      :rules="[
        { required: true, message: '必须输入令' },
        { minLength: 1, message: '必须输入令' },
      ]"
      :validate-trigger="['change', 'input']"
      field="keyword"
      label="令"
    >
      <a-input v-model="form.keyword" :max-length="1"></a-input>
    </a-form-item>
    <a-form-item field="allowWordInAny" label="令可以在任意位置">
      <a-radio-group v-model="form.allowWordInAny">
        <a-radio value="true">是</a-radio>
        <a-radio value="false">否</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item field="playerPreparationSecond" label="玩家每回合准备时间(秒)">
      <a-input-number
        v-model="form.playerPreparationSecond"
        :min="15"
        mode="button"
      />
    </a-form-item>
    <a-form-item field="maxSentenceLength" label="句子的最大长度">
      <a-input-number
        v-model="form.maxSentenceLength"
        :max="10"
        :min="4"
        mode="button"
      />
    </a-form-item>
    <a-form-item field="constantSentenceLength" label="只允许说一样长度的句子">
      <a-radio-group v-model="form.constantSentenceLength">
        <a-radio value="true">是</a-radio>
        <a-radio value="false">否</a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item field="ffoGamePoemType" label="诗类型">
      <a-select v-model="form.ffoGamePoemType" placeholder="请选择诗类型">
        <a-option :value="FfoGamePoemType.ONLY_SELF_CREAT">仅自由创作</a-option>
        <a-option :value="FfoGamePoemType.ONLY_ANCIENTS_POEM">仅古诗</a-option>
        <a-option :value="FfoGamePoemType.ALL">都可以</a-option>
      </a-select>
    </a-form-item>
    <a-form-item field="display" label="房间是否可见">
      <a-radio-group v-model="form.display">
        <a-radio value="true">是</a-radio>
        <a-radio value="false">否</a-radio>
      </a-radio-group>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { FfoGamePoemType, FfoGameRoomReqVO } from '@/api/flying-flower-order';
  import { computed } from 'vue';

  const props = defineProps<{
    data: FfoGameRoomReqVO;
  }>();
  const emit = defineEmits(['update:data']);

  const form = computed({
    get() {
      return props.data;
    },
    set(value) {
      emit('update:data', value);
    },
  });
</script>

<style scoped></style>
