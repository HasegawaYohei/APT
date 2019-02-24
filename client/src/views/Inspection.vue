<template>
  <InspectionPanel
    :title="title"
    :backPath="backPath"
    :answerButtonList="answerButtonList"
    :resultListHeader="resultListHeader"
    :audioList="audioList"
    :resultList="resultList"
  />
</template>

<script>
import {
  generateAnswerButtonList,
  generateResultListHeader,
  generateAudioList,
  generateResultList,
} from '../services/InspectionService';

export default {
  props: [
    'title',
    'backPath',
    'columnNumber',
    'audioDirPath',
  ],
  data: () => ({
    ansewrButtonList: [],
    resultListHeader: [],
    audioList: [],
    resultList: [],
  }),
  async created() {
    this.answerButtonList = generateAnswerButtonList(this.columnNumber);
    this.resultListHeader = generateResultListHeader(this.columnNumber);
    this.audioList = await generateAudioList(this.audioDirPath);
    this.resultList = generateResultList(this.audioList, this.columnNumber);
  },
};
</script>
