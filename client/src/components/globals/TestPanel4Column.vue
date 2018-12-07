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
        <v-flex xs2>
          <v-btn
            :large="true"
            color="error"
            class="btn-custom"
            :disabled="!played || tests[cursor].statuses[0] !== ''"
            @click="answer(0, '誤答')"
             >誤答 1</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :large="true"
            color="success"
            class="btn-custom"
            :disabled="!played || tests[cursor].statuses[0] !== ''"
            @click="answer(0, '正答')"
             >正答 1</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :large="true"
            color="error"
            class="btn-custom"
            :disabled="!played || tests[cursor].statuses[1] !== ''"
            @click="answer(1, '誤答')"
             >誤答 2</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :large="true"
            color="success"
            class="btn-custom"
            :disabled="!played || tests[cursor].statuses[1] !== ''"
            @click="answer(1, '正答')"
             >正答 2</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :large="true"
            color="error"
            class="btn-custom"
            :disabled="!played || tests[cursor].statuses[2] !== ''"
            @click="answer(2, '誤答')"
             >誤答 3</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :large="true"
            color="success"
            class="btn-custom"
            :disabled="!played || tests[cursor].statuses[2] !== ''"
            @click="answer(2, '正答')"
             >正答 3</v-btn>
        </v-flex>
      </v-layout>
    </v-list>

    <v-list>
      <v-layout>
        <v-flex xs6>
          <v-list-tile
          >
            <v-list-tile-content>
              <v-list-tile-title>ファイル名</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider
          ></v-divider>
        </v-flex>
        <v-flex xs2>
          <v-list-tile
          >
            <v-list-tile-content>
              <v-list-tile-title>状態 1</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider
          ></v-divider>
        </v-flex>
        <v-flex xs2>
          <v-list-tile
          >
            <v-list-tile-content>
              <v-list-tile-title>状態 2</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider
          ></v-divider>
        </v-flex>
        <v-flex xs2>
          <v-list-tile
          >
            <v-list-tile-content>
              <v-list-tile-title>状態 3</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider
          ></v-divider>
        </v-flex>

      </v-layout>
      <template v-for="(test, index) in tests">
        <v-layout>
          <v-flex xs6>
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
          <v-flex xs2>
            <v-list-tile
              :key="test.filename"
              :class="cursor === index ? 'active' : 'disactive'"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="test.statuses[0]"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider
              v-if="test.divider"
              :key="index"
            ></v-divider>
          </v-flex>
          <v-flex xs2>
            <v-list-tile
              :key="test.filename"
              :class="cursor === index ? 'active' : 'disactive'"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="test.statuses[1]"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider
              v-if="test.divider"
              :key="index"
            ></v-divider>
          </v-flex>
          <v-flex xs2>
            <v-list-tile
              :key="test.filename"
              :class="cursor === index ? 'active' : 'disactive'"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="test.statuses[2]"></v-list-tile-title>
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
  const test = tests.slice(cursor + 1, tests.lenght).find(test => test.statuses.some(status => status === ''));

  if (test == null || test.cursor == null) return internalBack(tests, cursor + 1);
  return test.cursor;
};

const internalBack = (tests, cursor) => {
  const test = tests.slice(0, cursor).filter(test => test.statuses.some(status => status === '')).pop();

  if (test == null || test.cursor == null) return internalNext(tests, cursor - 1);
  return test.cursor;
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
    answer(index, result) {
      const origin = this.tests[this.cursor].statuses;
      this.tests[this.cursor].statuses = origin.map((s, i) => {
        if (i === index) return result;
        return s;
      });

      if (this.tests[this.cursor].statuses.some(status => status === '')) return;

      const finish = this.tests.find(test => !test.statuses.every(status => status !== '')) == null;

      if (finish) {
        alert('Finished');
        this.$router.push({
          name: this.backPath,
        });
        return;
      }

      this.played = false;
      this.cursor = internalNext(this.tests, this.cursor);
    }
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
