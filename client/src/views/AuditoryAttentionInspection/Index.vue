<template>
  <AuditoryAttentionPanel
    title="聴覚的注意検査"
    backPath="home"
    :apiDone=apiDone
    :inspections=inspections />
</template>

<script>
import Api from '../../services/Api';
import AuditoryAttentionPanel from '../../components/AuditoryAttentionPanel.vue';

export default {
  data: () => ({
    inspections: [],
    apiDone: false,
  }),
  async created() {
    const result = (await Api.get('/auditory-attention-inspection')).data;
    this.inspections = result;
    this.apiDone = true;
  },
  components: { AuditoryAttentionPanel },
};
</script>

<style>
</style>
