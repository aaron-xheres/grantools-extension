import {reactive} from 'vue';
import * as CONST from '@/const';

export const dataStore = reactive({
  currentPageType: CONST.PAGE_TYPE.NULL,
  refreshAttack: false,
  refreshSummon: false,
  lastStartedStage: '',
  repeatStageCounter: 0,
});
