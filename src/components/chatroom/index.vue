<template>
  <a-typography-title :heading="4">聊天室</a-typography-title>
  <div class="chatroom">
    <a-space direction="vertical" fill>
      <a-card hoverable :style="{ height: '300px' }">
        <div class="msg-list-content">
          <div
            v-for="msg in msgList"
            :key="msg.username + msg.time"
            class="msg-content"
          >
            <a-avatar>
              <img alt="avatar" :src="msg.avatar" />
            </a-avatar>
            <div class="nickname-content">
              <div class="nickname"
                >{{ msg.nickname }}: {{ msg.username }} - {{ msg.time }}</div
              >
              <div class="text-content">
                <a-typography-paragraph
                  style="text-align: justify; word-break: break-word"
                >
                  {{ msg.content }}
                </a-typography-paragraph>
              </div>
            </div>
          </div>
        </div>
      </a-card>
      <a-space>
        <a-textarea v-model="inputVal" :max-length="255"></a-textarea>
        <a-button type="primary" @click="sendMessages">发送信息</a-button>
      </a-space>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onBeforeUnmount, reactive, watch } from 'vue';
  import Stomp from '@stomp/stompjs';
  import { useUserStore, useStompStore } from '@/store';
  import { IFrame } from '@stomp/stompjs/src/i-frame';

  const inputVal = ref('hello');
  const userStore = useUserStore();

  const props = defineProps<{
    roomId: string;
  }>();

  interface MessageDTO {
    username: string;
    nickname: string;
    avatar: string;
    content: string;
    time: string;
  }

  const msgList: MessageDTO[] = reactive([]);
  const receiveMsg = (message: IFrame) => {
    console.log('消息', message.body);
    msgList.unshift(JSON.parse(message.body));
  };

  const stompStore = useStompStore();

  stompStore.initClient();
  // console.log("stompStore.connected 是否连接: ", stompStore.connected)
  // if (stompStore.getClient().connected) {
  //   console.log("stompStore.getClient().connected 是否连接: ", stompStore.getClient().connected)
  //   stompStore.getClient().subscribe(`/user/${userStore.userInfo.username}/game_room/messages`, receiveMsg)
  // }
  watch(
    () => stompStore.connected,
    (newConnected) => {
      if (newConnected)
        stompStore
          .getClient()
          .subscribe(
            `/user/${userStore.userInfo.username}/game_room/messages`,
            receiveMsg
          );
    }
  );

  const sendMessages = () => {
    console.log('content = ', inputVal.value);
    stompStore
      .getClient()
      .send(
        `/app/chatroom/${props.roomId}`,
        {},
        JSON.stringify({ content: inputVal.value })
      );
  };

  onBeforeUnmount(() => {
    stompStore.getClient().disconnect();
  });
</script>

<style scoped>
  .chatroom {
    width: 400px;
  }

  .msg-list-content {
    display: flex;
    flex-direction: column-reverse;
    height: 280px;
    overflow: auto;
  }

  .msg-content {
    display: flex;
    margin: 4px 0 4px 0;
  }

  .nickname-content {
    margin-left: 5px;
  }

  .nickname-content > .nickname {
    display: flex;
  }

  .nickname-content > .text-content {
    display: flex;
    width: 300px;
    background-color: #e5e5e5;
    border-radius: 5px;
  }
</style>
