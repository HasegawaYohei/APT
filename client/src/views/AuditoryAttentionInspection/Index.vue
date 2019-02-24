<template>
  <AuditoryAttentionPanel
    :title="title"
    :backPath="backPath"
    :audioDirPath="audioDirPath"
  />
</template>

<script>
import AuditoryAttentionPanel from '../../components/AuditoryAttentionPanel.vue';

export default {
  props: [
    'title',
    'backPath',
    'audioDirPath',
  ],
  components: { AuditoryAttentionPanel },
};
</script>

<style>
</style>
