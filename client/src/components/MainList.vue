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
    title: 'APT 検査',
    inspections: [
      {
        title: '両耳分離聴検査',
        path: 'dichoticListeningInspection',
        divider: true,
      },
      {
        title: '早口音声聴取検査',
        path: 'fastsoundListeningInspection',
        divider: true,
      },
      {
        title: 'ギャップ検出閾値検査',
        path: 'gapDetectionInspection',
        divider: true,
      },
      {
        title: '雑音下単語聴取検査',
        divider: true,
      },
      {
        title: '両耳交互聴検査',
        path: 'bothEarsAlternatingInspection',
        divider: true,
      },
      {
        title: '聴覚的注意検査',
        divider: true,
      },
      {
        title: '複数音声下聴取検査',
        path: 'multipleSoundListeningInspection',
        divider: true,
      },
      {
        title: '終了',
        divider: false,
      },
    ],
  }),
};
</script>

<style>
.text-center{
  text-align: center;
}
</style>
