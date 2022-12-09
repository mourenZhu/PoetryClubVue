import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { FfoGameRoom } from '@/store/modules/ffo-room/types';
import { useUserStore } from '../user';

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

  const userStore = useUserStore();

  function update(fr: FfoGameRoom) {
    Object.assign(ffoRoom, fr);
  }

  function isHomeowner(): boolean {
    return ffoRoom.homeowner.username === userStore.username;
  }

  return { ffoRoom, update, isHomeowner };
});

export default useFfoRoomStore;
