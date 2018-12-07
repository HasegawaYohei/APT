<template>
  <TestPanel4Column title="両耳交互聴検査" backPath="home" :tests=tests />
</template>

<script>
import Api from '../../services/Api';

export default {
  data: () => ({
    tests: [],
  }),
  async created() {
    const result = (await Api.get('/both-ears-alternating-test')).data;
    this.tests = result;
  },
}
</script>