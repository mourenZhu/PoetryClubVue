import { defineStore } from 'pinia';
import { getAuthorization } from '@/utils/auth';
import Stomp, { IMessage } from '@stomp/stompjs';
import stompClient from '@/api/stomp-client';
import { reactive, ref, watch } from 'vue';
import { IFrame } from '@stomp/stompjs/src/i-frame';

const useStompStore = defineStore('stomp', () => {
  let client: Stomp.CompatClient;
  let startedConnect = false;
  const connected = ref<boolean>(false);

  function initClient() {
    if (startedConnect) {
      return;
    }
    startedConnect = true;
    client = stompClient();
    console.log(
      '初始化stomp client, client = ',
      client,
      'startedConnect = ',
      startedConnect,
      'connected = ',
      connected
    );
    if (!client?.connected) {
      console.log('开始连接stomp');
      client?.connect(
        {
          Authorization: getAuthorization(),
        },
        (frame: any) => {
          console.log('stomp 连接成功', frame);
          connected.value = true;
        },
        (err: any) => {
          console.log('stomp 连接失败');
        }
      );
    }
  }

  function getClient(): Stomp.CompatClient {
    return client;
  }

  function disconnect() {
    client.disconnect();
    connected.value = false;
    startedConnect = false;
  }

  return { getClient, disconnect, initClient, connected };
});

export default useStompStore;
