import { defineStore } from 'pinia';
import { reactive, ref, watch } from 'vue';
import { FfoGame, FfoGameSentenceDTO } from '@/store/modules/ffo-game/types';

const useFfoGameStore = defineStore('ffoGame', () => {
  const ffoGame: FfoGame = reactive<FfoGame>({
    roomId: '',
    maxPlayers: 0,
    keyword: '',
    allowWordInAny: false,
    playerPreparationSecond: 0,
    maxSentenceLength: 0,
    constantSentenceLength: false,
    ffoGamePoemType: 'ONLY_ANCIENTS_POEM',
    userSentences: [],
    homeowner: {
      username: '',
      nickname: '',
      avatar: '',
    },
    users: [],
    playingUsers: [],
    ranking: [],
    createTime: '',
    endTime: '',
  });

  function update(fr: FfoGame) {
    Object.assign(ffoGame, fr);
  }

  function addSentence(sentence: FfoGameSentenceDTO) {
    ffoGame.userSentences.push(sentence);
  }

  return { ffoGame, update, addSentence };
});

export default useFfoGameStore;
