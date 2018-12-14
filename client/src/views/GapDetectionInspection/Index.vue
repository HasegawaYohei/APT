<template>
  <div>
    <GapDetectionInspectionPanel
    backPath="home" />
  </div>
</template>

<script>
import Api from '../../services/Api';
import GapDetectionInspectionPanel from '../../components/GapDetectionInspectionPanel.vue';

export default {
  data: () => ({
  }),
  components: { GapDetectionInspectionPanel }
};
</script>
