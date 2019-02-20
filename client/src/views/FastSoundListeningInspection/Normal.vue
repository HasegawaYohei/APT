<template>
  <InspectionPanel4Column
    title="通常発話文"
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
    const result = (await Api.get('/fastsound-listening-inspection/normal')).data;
    this.inspections = result;
  },
};
</script>
