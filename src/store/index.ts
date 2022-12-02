import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useStompStore from './modules/stomp';
import useFfoRoomStore from './modules/ffo-room';
import useFfoGameStore from './modules/ffo-game';

const pinia = createPinia();

export {
  useAppStore,
  useUserStore,
  useTabBarStore,
  useStompStore,
  useFfoRoomStore,
  useFfoGameStore,
};
export default pinia;
