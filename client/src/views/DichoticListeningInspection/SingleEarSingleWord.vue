<template>
  <InspectionPanel2Column
    title="単耳単語"
    backPath="dichoticListeningInspection"
    :inspections=inspections />
</template>

<script>
import Api from '../../services/ApiService';

export default {
  data: () => ({
    inspections: [],
  }),
  async created() {
    const result = (await Api.get('/dichotic-listening-inspection/single-ear-single-word')).data;
    this.inspections = result;
  },
};
</script>
