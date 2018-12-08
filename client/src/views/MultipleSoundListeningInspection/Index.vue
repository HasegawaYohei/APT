<template>
  <InspectionPanel4Column title="複数音声下聴取検査" backPath="home" :inspections=inspections />
</template>

<script>
import Api from '../../services/Api';

export default {
  data: () => ({
    inspections: [],
  }),
  async created() {
    const result = (await Api.get('/multiple-sound-listening-inspection')).data;
    this.inspections = result;
  },
};
</script>
