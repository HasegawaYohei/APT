<template>
  <InspectionPanel3Column
    title="文"
    backPath="dichoticListeningInspection"
    :inspections=inspections />
</template>

<script>
import Api from '../../services/Api';

export default {
  data: () => ({
    inspections: [],
  }),
  async created() {
    const result = (await Api.get('/dichotic-listening-inspection/sentence')).data;
    this.inspections = result;
  },
};
</script>
