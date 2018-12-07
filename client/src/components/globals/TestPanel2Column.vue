<template>
  <div>
    <v-card>
      <v-toolbar color="cyan" dark>
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
    </v-card>

    <v-list>
      <v-layout text-xs-center wrap>
        <v-flex xs3>
          <v-btn
            :large="true"
            class="btn-custom"
            :disabled="played"
            @click="back"
             >戻</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn
            color="info"
            :large="true"
            class="btn-custom"
            :disable="ready"
            @click="play"
             >再生</v-btn>
          <audio id="sound">
            <source :src="sound" type="audio/wav">
          </audio>
        </v-flex>
        <v-flex xs3>
          <v-btn
            :large="true"
            class="btn-custom"
            :disabled="played"
            @click="next"
             >次</v-btn>
        </v-flex>
      </v-layout>
      <v-layout text-xs-center wrap>
        <v-flex xs6>
          <v-btn
            :large="true"
            color="error"
            class="btn-custom"
            :disabled="!played"
            @click="wrong"
             >誤答</v-btn>
        </v-flex>
        <v-flex xs6>
          <v-btn
            :large="true"
            color="success"
            class="btn-custom"
            :disabled="!played"
            @click="correct"
             >正答</v-btn>
        </v-flex>
      </v-layout>
    </v-list>

    <v-list>
      <v-layout>
        <v-flex xs-6>
          <v-list-tile
          >
            <v-list-tile-content>
              <v-list-tile-title>ファイル名</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider
          ></v-divider>
        </v-flex>
        <v-flex xs-6>
          <v-list-tile
          >
            <v-list-tile-content>
              <v-list-tile-title>状態</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider
          ></v-divider>
        </v-flex>
      </v-layout>
      <template v-for="(test, index) in tests">
        <v-layout>
          <v-flex xs-6>
            <v-list-tile
              :key="test.filename"
              :class="cursor === index ? 'active' : 'disactive'"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="test.filename"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider
              v-if="test.divider"
              :key="index"
            ></v-divider>
          </v-flex>
          <v-flex xs-6>
            <v-list-tile
              :key="test.filename"
              :class="cursor === index ? 'active' : 'disactive'"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="test.status"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider
              v-if="test.divider"
              :key="index"
            ></v-divider>
          </v-flex>
        </v-layout>
      </template>
    </v-list>
  </div>
</template>

<script>
const internalNext = (tests, cursor) => {
  const test = tests.slice(cursor + 1, tests.lenght).find(test => test.status === '');

  if (test == null || test.cursor == null) return internalBack(tests, cursor + 1);
  return test.cursor;
};

const internalBack = (tests, cursor) => {
  const test = tests.slice(0, cursor).filter(test => test.status === '').pop();

  if (test == null || test.cursor == null) return internalNext(tests, cursor - 1);
  return test.cursor;
};

const answer = (data) => {
  const finish = data.tests.find(test => test.status === '') == null;

  if (finish) {
    alert('Finished!!');
    data.$router.push({
        name: data.backPath,
      });
    return;
  }

  data.played = false;
  data.cursor = internalNext(data.tests, data.cursor);
};

export default {
  props: [
    'title',
    'backPath',
    'tests',
  ],
  data: () => ({
    cursor: 0,
    sound: '',
    played: false,
    ready: false,
  }),
  watch: {
    cursor: function () {
      if (this.tests == null || this.tests.length === 0) return;
      this.sound = this.tests[this.cursor].fullpath;
    },
  },
  methods: {
    play() {
      const audio = document.getElementById('sound');
      audio.load();
      audio.play();
      this.played = true;
      this.tests[this.cursor].status = '再生中';
    },
    next() {
      if (this.tests.length === this.cursor + 1) return;
      this.played = false;
      this.cursor = internalNext(this.tests, this.cursor);
    },
    back() {
      if (this.cursor === 0) return;
      this.played = false;
      this.cursor = internalBack(this.tests, this.cursor);
    },
    wrong() {
      this.tests[this.cursor].status = '誤答';
      answer(this);
    },
    correct() {
      this.tests[this.cursor].status = '正答';
      answer(this);
    },
  },
  updated() {
    this.sound = this.tests[this.cursor].fullpath;
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
