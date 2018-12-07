<template>
  <TestPanel3Column title="単語" backPath="dichoticListeningTest" :tests=tests />
</template>

<script>
import Api from '../../services/Api';

export default {
  data: () => ({
    tests: [],
  }),
  async created() {
    const result = (await Api.get('/dichotic-listening-test/word')).data;
    this.tests = result;
  },
}
</script>