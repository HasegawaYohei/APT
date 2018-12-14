<template>
  <div>
    <v-card>
      <v-toolbar color="cyan" dark>
        <v-btn icon class="hidden-xs-only" @click="browserBack">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
    </v-card>

    <v-layout text-xs-center wrap>
      <v-flex xs3>
        <v-btn
          :large="true"
          class="btn-custom"
          :disabled="played"
          @click="back"
          >No. 1</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn
          :large="true"
          class="btn-custom"
          :disabled="played"
          @click="back"
          >No. 2</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn
          :large="true"
          class="btn-custom"
          :disabled="played"
          @click="back"
          >No. 3</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn
          :large="true"
          class="btn-custom"
          :disabled="played"
          @click="back"
          >No. 4</v-btn>
      </v-flex>
    </v-layout>

    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-btn
          :large="true"
          class="btn-custom"
          :disabled="played"
          @click="back"
          >不明 / 該当なし</v-btn>
      </v-flex>
    </v-layout>

    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-btn
          :large="true"
          class="btn-custom"
          :disabled="!played"
          @click="back"
          >決定</v-btn>
      </v-flex>
    </v-layout>

    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-btn
          :large="true"
          color="info"
          class="btn-custom"
          :disabled="played"
          @click="wrong"
          >再生</v-btn>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
const internalNext = (inspections, cursor) => {
  const inspection = inspections.slice(cursor + 1, inspections.lenght).find(inspection => inspection.status === '');

  if (inspection == null || inspection.cursor == null) return internalBack(inspections, cursor + 1);
  return inspection.cursor;
};

const internalBack = (inspections, cursor) => {
  const inspection = inspections.slice(0, cursor).filter(inspection => inspection.status === '').pop();

  if (inspection == null || inspection.cursor == null) return internalNext(inspections, cursor - 1);
  return inspection.cursor;
};

const answer = (data) => {
  const finish = data.inspections.find(inspection => inspection.status === '') == null;

  if (finish) {
    alert('Finished!!');
    data.$router.push({
      name: data.backPath,
    });
    return;
  }

  data.played = false;
  data.cursor = internalNext(data.inspections, data.cursor);
};

export default {
  props: [
    'backPath',
    'inspections',
  ],
  data: () => ({
    title: 'ギャップ検出',
    cursor: 0,
    sound: '',
    played: false,
    ready: false,
  }),
  watch: {
    cursor: function () {
      if (this.inspections == null || this.inspections.length === 0) return;
      this.sound = this.inspections[this.cursor].fullpath;
    },
  },
  methods: {
    play() {
      const audio = document.getElementById('sound');
      audio.load();
      audio.play();
      this.played = true;
      this.inspections[this.cursor].status = '再生中';
    },
    next() {
      if (this.inspections.length === this.cursor + 1) return;
      this.played = false;
      this.cursor = internalNext(this.inspections, this.cursor);
    },
    back() {
      if (this.cursor === 0) return;
      this.played = false;
      this.cursor = internalBack(this.inspections, this.cursor);
    },
    wrong() {
      this.inspections[this.cursor].status = '誤答';
      answer(this);
    },
    correct() {
      this.inspections[this.cursor].status = '正答';
      answer(this);
    },
    browserBack() {
      this.$router.push({
        name: this.backPath,
      });
    },
  },
  updated() {
    this.sound = this.inspections[this.cursor].fullpath;
    this.ready = true;
  },
};
</script>

<style scoped lang="stylus">
.btn-custom
  width 90%
.active
  background-color #BBDEFB
</style>
