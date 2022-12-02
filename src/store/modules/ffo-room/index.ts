import { defineStore } from 'pinia';
import { getAuthorization } from '@/utils/auth';
import Stomp, { IMessage } from '@stomp/stompjs';
import stompClient from '@/api/stomp-client';
import { reactive, ref, watch } from 'vue';
import { FfoGameRoom } from '@/store/modules/ffo-room/types';

const useFfoRoomStore = defineStore('ffoRoom', () => {
  const ffoRoom: FfoGameRoom = reactive<FfoGameRoom>({
    id: '',
    name: '',
    maxPlayers: 0,
    keyword: '',
    allowWordInAny: false,
    playerPreparationSecond: 0,
    maxSentenceLength: 0,
    constantSentenceLength: false,
    display: false,
    ffoStateType: 'WAITING',
    ffoGamePoemType: 'ONLY_ANCIENTS_POEM',
    homeowner: {
      username: '',
      nickname: '',
      avatar: '',
    },
    users: [],
  });

  function update(fr: FfoGameRoom) {
    Object.assign(ffoRoom, fr);
  }

  return { ffoRoom, update };
});

export default useFfoRoomStore;
