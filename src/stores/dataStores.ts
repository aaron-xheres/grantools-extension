import {reactive} from 'vue';
import * as CONST from '@/const';

export const dataStore = reactive({
  refreshAttack: false,
  refreshSummon: false,
  lastStartedStage: '',
  currentPageType: CONST.PAGE_TYPE.NULL,
});
