<template>
  <TestPanel4Column title="1.5倍速" backPath="fastsoundListeningTest" :tests=tests />
</template>

<script>
import Api from '../../services/Api';

export default {
  data: () => ({
    tests: [],
  }),
  async created() {
    const result = (await Api.get('/fastsound-listening-test/fast')).data;
    this.tests = result;
  },
}
</script>