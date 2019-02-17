<template>
  <TheWordUnderNoisePanel
    title="雑音下単語聴取検査"
    backPath="home"
    :inspections=inspections />
</template>

<script>
import Api from '../../services/Api';
import TheWordUnderNoisePanel from '../../components/TheWordUnderNoisePanel.vue';

export default {
  data: () => ({
    inspections: [],
  }),
  components: { TheWordUnderNoisePanel },
};
</script>

<style lang="stylus">
.result-list
  height  380px
  overflow scroll
</style>
