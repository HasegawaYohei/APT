<template>
  <div>
    <GapDetectionInspectionPanel
      :title="title"
      :backPath="backPath"
      :audioList="audioList"
    />
  </div>
</template>

<script>
import GapDetectionInspectionPanel from '../../components/GapDetectionInspectionPanel.vue';
import { generateAudioList } from '../../services/InspectionService';

export default {
  props: [
    'title',
    'backPath',
    'audioDirPath',
  ],
  data: () => ({
    audioList: [],
  }),
  async created() {
    this.audioList = await generateAudioList(this.audioDirPath);
  },
  components: { GapDetectionInspectionPanel },
};
</script>

<style lang="stylus">
.result-list
  height  610px
  overflow scroll
</style>
