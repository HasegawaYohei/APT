<template>
  <InspectionPanel4Column
    title="両耳交互聴検査"
    backPath="home"
    :inspections=inspections />
</template>

<script>
import Api from '../../services/ApiService';

export default {
  data: () => ({
    inspections: [],
  }),
  async created() {
    const result = (await Api.get('/both-ears-alternating-inspection')).data;
    this.inspections = result;
  },
};
</script>
