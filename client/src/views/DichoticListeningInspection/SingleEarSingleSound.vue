<template>
  <InspectionPanel2Column
    title="単耳単音節"
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
    const result = (await Api.get('/dichotic-listening-inspection/single-ear-single-sound')).data;
    this.inspections = result;
  },
};
</script>
