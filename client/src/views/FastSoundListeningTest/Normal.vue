<template>
  <TestPanel4Column title="通常発話文" backPath="fastsoundListeningTest" :tests=tests />
</template>

<script>
import Api from '../../services/Api';

export default {
  data: () => ({
    tests: [],
  }),
  async created() {
    const result = (await Api.get('/fastsound-listening-test/normal')).data;
    this.tests = result;
  },
}
</script>