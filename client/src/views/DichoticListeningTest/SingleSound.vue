<template>
  <TestPanel3Column title="単音節" backPath="dichoticListeningTest" :tests=tests />
</template>

<script>
import Api from '../../services/Api';

export default {
  data: () => ({
    tests: [],
  }),
  async created() {
    const result = (await Api.get('/dichotic-listening-test/single-sound')).data;
    this.tests = result;
  },
}
</script>