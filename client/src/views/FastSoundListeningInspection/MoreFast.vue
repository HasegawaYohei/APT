<template>
  <InspectionPanel4Column
    title="2倍速"
    backPath="fastsoundListeningInspection"
    :inspections=inspections />
</template>

<script>
import Api from '../../services/Api';

export default {
  data: () => ({
    inspections: [],
  }),
  async created() {
    const result = (await Api.get('/fastsound-listening-inspection/more-fast')).data;
    this.inspections = result;
  },
};
</script>
