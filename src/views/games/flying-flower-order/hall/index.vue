<template>
  <div class="container">
    <Breadcrumb :items="['游戏列表', '飞花令']" />
    <a-card class="general-card" title="房间查询">
      <a-row>
        <a-col :flex="1">
          <a-form
            :label-col-props="{ span: 6 }"
            :model="searchForm"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="房间Id" field="roomId">
                  <a-input
                    v-model="searchForm.roomId"
                    placeholder="输入房间id"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="令" field="keyword">
                  <a-select
                    v-model="searchForm.keyword"
                    :allow-create="true"
                    :max-length="1"
                  >
                    <a-option
                      v-for="item in commonWords"
                      :key="item.word"
                      :value="item.word"
                    >
                      {{ item.word }} - ({{ item.usageCount }} 次)
                    </a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="令任意位置" field="allowWordInAny">
                  <a-select
                    v-model="searchForm.allowWordInAny"
                    :allow-clear="true"
                  >
                    <a-option :value="'true'">是</a-option>
                    <a-option :value="'false'">否</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="诗类型" field="ffoGamePoemType">
                  <a-select
                    v-model="searchForm.ffoGamePoemType"
                    :allow-clear="true"
                  >
                    <a-option :value="FfoGamePoemType.ONLY_SELF_CREAT"
                      >仅自由创作</a-option
                    >
                    <a-option :value="FfoGamePoemType.ONLY_ANCIENTS_POEM"
                      >仅古诗</a-option
                    >
                    <a-option :value="FfoGamePoemType.ALL">都可以</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="房间状态" field="ffoStateType">
                  <a-select
                    v-model="searchForm.ffoStateType"
                    :allow-clear="true"
                  >
                    <a-option :value="'PLAYING'">游戏中</a-option>
                    <a-option :value="'WAITING'">等待中</a-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider direction="vertical" style="height: 84px" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space :size="18" direction="vertical">
            <a-button type="primary" @click="ffoSearch">
              <template #icon>
                <icon-search />
              </template>
              搜索房间
            </a-button>
            <a-button type="primary" @click="ffoCreateHandleClick">
              <template #icon>
                <icon-relation />
              </template>
              创建房间
            </a-button>
            <a-button type="primary" @click="() => (privacyRoomVisible = true)">
              <template #icon>
                <icon-import />
              </template>
              私有房间
            </a-button>
            <a-modal
              v-model:visible="privacyRoomVisible"
              ok-text="进入私有房间"
              @cancel="() => (privacyRoomVisible = false)"
              @ok="enterPrivacyRoom"
            >
              <a-input v-model="privacyRoomId" placeholder="房间id"></a-input>
            </a-modal>
            <a-modal
              v-model:visible="ffoModalVisible"
              :on-before-ok="ffoCreateHandleBeforeOk"
              ok-text="创建房间"
              @cancel="ffoCreateHandleCancel"
            >
              <template #title> 创建飞花令游戏房间 </template>
              <FfoForm v-model:data="ffoForm"></FfoForm>
            </a-modal>
          </a-space>
        </a-col>
      </a-row>
      <div class="ffo-game-room-list">
        <FfoShowRoom
          v-for="item in ffoGameRoomList"
          :key="item.id"
          :ffo-game-room-res-v-o="item"
          class="ffo-game-room"
        ></FfoShowRoom>
      </div>
      <!--      <Chatroom></Chatroom>-->
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import {
    createFfoGameRoom,
    enterFfoGameRoom,
    FfoGamePoemType,
    FfoGameRoomReqVO,
    FfoGameRoomResVO,
    queryFfoGameRooms,
  } from '@/api/flying-flower-order';
  import FfoShowRoom from '@/views/games/flying-flower-order/hall/components/ffo-show-room.vue';
  import { useUserStore } from '@/store';
  import { useRouter } from 'vue-router';
  import { CommonWordResVO, getCommonWordTop } from '@/api/common-word';
  import FfoForm from '@/components/ffo/ffo-form.vue';

  const router = useRouter();
  const userInfo = useUserStore();

  const commonWords: CommonWordResVO[] = reactive([]);

  getCommonWordTop().then((res) => {
    Object.assign(commonWords, res.data);
    // console.log('commonWords', commonWords);
  });
  const searchForm = reactive({
    roomId: '',
    keyword: '',
    allowWordInAny: '',
    ffoGamePoemType: '',
    ffoStateType: '',
  });

  const ffoGameRoomList = ref<FfoGameRoomResVO[]>([]);
  const ffoModalVisible = ref(false);
  const ffoForm = reactive<FfoGameRoomReqVO>({
    name: `${userInfo.nickname}的游戏房间`,
    maxPlayers: 5,
    keyword: '花',
    allowWordInAny: true,
    playerPreparationSecond: 30,
    maxSentenceLength: 7,
    constantSentenceLength: true,
    display: true,
    ffoGamePoemType: FfoGamePoemType.ONLY_ANCIENTS_POEM,
  });

  const ffoSearch = async () => {
    console.log('searchForm = ', searchForm);
    const { data } = await queryFfoGameRooms(searchForm);
    ffoGameRoomList.value = data;
    // console.log('ffoGameRoomList = ', ffoGameRoomList);
  };

  const ffoCreateHandleClick = () => {
    ffoModalVisible.value = true;
  };

  const ffoCreateHandleCancel = () => {
    ffoModalVisible.value = false;
  };

  const ffoCreateHandleBeforeOk = () => {
    ffoModalVisible.value = false;
    createFfoGameRoom(ffoForm).then((res) => {
      const rooId = res.data;
      router.push({ name: 'ffoGameRoom', params: { roomId: rooId } });
    });
  };

  const privacyRoomVisible = ref(false);
  const privacyRoomId = ref('');
  const enterPrivacyRoom = async () => {
    console.log('privacyRoomId.value', privacyRoomId.value);
    if (privacyRoomId.value !== '') {
      const { data } = await enterFfoGameRoom(privacyRoomId.value);
      if (data) {
        await router.push({
          name: 'ffoGameRoom',
          params: { roomId: privacyRoomId.value },
        });
      }
    }
  };
  const initData = async () => {
    const { data } = await queryFfoGameRooms();
    ffoGameRoomList.value = data;
  };
  initData();

  const checkLocalUserPlaying = () => {};
</script>

<style scoped>
  .ffo-hall-header {
    margin: 10px 0 10px;
  }

  .ffo-game-room-list {
    display: flex;

    /* flex-direction: column; */
    flex-wrap: wrap;
  }

  .ffo-game-room {
    margin: 5px 5px 5px 0;
  }

  .container {
    padding: 0 20px 20px 20px;
  }
</style>
