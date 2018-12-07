<template>
  <TestPanel4Column title="2倍速" backPath="fastsoundListeningTest" :tests=tests />
</template>

<script>
import Api from '../../services/Api';

export default {
  data: () => ({
    tests: [],
  }),
  async created() {
    const result = (await Api.get('/fastsound-listening-test/more-fast')).data;
    this.tests = result;
  },
}
</script>