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
            :disabled="!played || inspections[cursor].statuses[0] !== ''"
            @click="answer(0, '誤答')"
             >誤答 1</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :large="true"
            color="success"
            class="btn-custom"
            :disabled="!played || inspections[cursor].statuses[0] !== ''"
            @click="answer(0, '正答')"
             >正答 1</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :large="true"
            color="error"
            class="btn-custom"
            :disabled="!played || inspections[cursor].statuses[1] !== ''"
            @click="answer(1, '誤答')"
             >誤答 2</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :large="true"
            color="success"
            class="btn-custom"
            :disabled="!played || inspections[cursor].statuses[1] !== ''"
            @click="answer(1, '正答')"
             >正答 2</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :large="true"
            color="error"
            class="btn-custom"
            :disabled="!played || inspections[cursor].statuses[2] !== ''"
            @click="answer(2, '誤答')"
             >誤答 3</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :large="true"
            color="success"
            class="btn-custom"
            :disabled="!played || inspections[cursor].statuses[2] !== ''"
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
      <template v-for="(inspection, index) in inspections">
        <v-layout>
          <v-flex xs6>
            <v-list-tile
              :key="inspection.filename"
              :class="cursor === index ? 'active' : 'disactive'"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="inspection.filename"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider
              v-if="inspection.divider"
              :key="index"
            ></v-divider>
          </v-flex>
          <v-flex xs2>
            <v-list-tile
              :key="inspection.filename"
              :class="cursor === index ? 'active' : 'disactive'"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="inspection.statuses[0]"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider
              v-if="inspection.divider"
              :key="index"
            ></v-divider>
          </v-flex>
          <v-flex xs2>
            <v-list-tile
              :key="inspection.filename"
              :class="cursor === index ? 'active' : 'disactive'"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="inspection.statuses[1]"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider
              v-if="inspection.divider"
              :key="index"
            ></v-divider>
          </v-flex>
          <v-flex xs2>
            <v-list-tile
              :key="inspection.filename"
              :class="cursor === index ? 'active' : 'disactive'"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="inspection.statuses[2]"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-divider
              v-if="inspection.divider"
              :key="index"
            ></v-divider>
          </v-flex>
        </v-layout>
      </template>
    </v-list>
  </div>
</template>

<script>
const internalNext = (inspections, cursor) => {
  const inspection = inspections.slice(cursor + 1, inspections.lenght).find(inspection => inspection.statuses.some(status => status === ''));

  if (inspection == null || inspection.cursor == null) return internalBack(inspections, cursor + 1);
  return inspection.cursor;
};

const internalBack = (inspections, cursor) => {
  const inspection = inspections.slice(0, cursor).filter(inspection => inspection.statuses.some(status => status === '')).pop();

  if (inspection == null || inspection.cursor == null) return internalNext(inspections, cursor - 1);
  return inspection.cursor;
};

export default {
  props: [
    'title',
    'backPath',
    'inspections',
  ],
  data: () => ({
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
    answer(index, result) {
      const origin = this.inspections[this.cursor].statuses;
      this.inspections[this.cursor].statuses = origin.map((s, i) => {
        if (i === index) return result;
        return s;
      });

      if (this.inspections[this.cursor].statuses.some(status => status === '')) return;

      const finish = this.inspections.find(inspection => !inspection.statuses.every(status => status !== '')) == null;

      if (finish) {
        alert('Finished');
        this.$router.push({
          name: this.backPath,
        });
        return;
      }

      this.played = false;
      this.cursor = internalNext(this.inspections, this.cursor);
    }
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
