<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex offset-xs2 xs8>
        <ListPanel :title="title" :inspections="inspections" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    title: '早口音声聴取検査',
    inspections: [
      {
        title: '通常発話文',
        divider: true,
        path: 'normal',
      },
      {
        title: '1.5倍速',
        divider: true,
        path: 'fast',
      },
      {
        title: '2倍速',
        divider: true,
        path: 'moreFast',
      },
      {
        title: '戻る',
        divider: false,
        path: 'home',
      },
    ],
  }),
};
</script>

<style>
</style>
