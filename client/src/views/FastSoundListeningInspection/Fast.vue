<template>
  <InspectionPanel4Column
    title="1.5倍速"
    backPath="fastsoundListeningInspection"
    :inspections=inspections />
</template>

<script>
import Api from '../../services/ApiService';

export default {
  data: () => ({
    inspections: [],
  }),
  async created() {
    const result = (await Api.get('/fastsound-listening-inspection/fast')).data;
    this.inspections = result;
  },
};
</script>
