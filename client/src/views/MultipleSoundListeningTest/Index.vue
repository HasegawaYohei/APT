<template>
  <TestPanel4Column title="複数音声下聴取検査" backPath="home" :tests=tests />
</template>

<script>
import Api from '../../services/Api';

export default {
  data: () => ({
    tests: [],
  }),
  async created() {
    const result = (await Api.get('/multiple-sound-listening-test')).data;
    this.tests = result;
  },
}
</script>