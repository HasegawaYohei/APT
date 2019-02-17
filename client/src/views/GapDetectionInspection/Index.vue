<template>
  <div>
    <GapDetectionInspectionPanel
    title="ギャップ検出閾値検査"
    backPath="home"
    :inspections=inspections />
  </div>
</template>

<script>
import Api from '../../services/Api';
import GapDetectionInspectionPanel from '../../components/GapDetectionInspectionPanel.vue';

export default {
  data: () => ({
    inspections: [],
  }),
  async created() {
    const result = (await Api.get('/gap-detection-inspection')).data;
    this.inspections = result;
  },
  components: { GapDetectionInspectionPanel }
};
</script>

<style lang="stylus">
.result-list
  height  610px
  overflow scroll
</style>
