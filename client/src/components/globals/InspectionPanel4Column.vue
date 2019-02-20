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
            :disabled="!played || audioList[cursor].statuses[0] !== ''"
            @click="answer(0, '誤答')"
             >誤答 1</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :large="true"
            color="success"
            class="btn-custom"
            :disabled="!played || audioList[cursor].statuses[0] !== ''"
            @click="answer(0, '正答')"
             >正答 1</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :large="true"
            color="error"
            class="btn-custom"
            :disabled="!played || audioList[cursor].statuses[1] !== ''"
            @click="answer(1, '誤答')"
             >誤答 2</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :large="true"
            color="success"
            class="btn-custom"
            :disabled="!played || audioList[cursor].statuses[1] !== ''"
            @click="answer(1, '正答')"
             >正答 2</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :large="true"
            color="error"
            class="btn-custom"
            :disabled="!played || audioList[cursor].statuses[2] !== ''"
            @click="answer(2, '誤答')"
             >誤答 3</v-btn>
        </v-flex>
        <v-flex xs2>
          <v-btn
            :large="true"
            color="success"
            class="btn-custom"
            :disabled="!played || audioList[cursor].statuses[2] !== ''"
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
      <div class="result-list">
        <template v-for="(audio, index) in audioList">
          <v-layout :key="index">
            <v-flex xs6>
              <v-list-tile
                :key="audio.filename"
                :class="cursor === index ? 'active' : 'disactive'"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-html="audio.filename"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider
                v-if="audio.divider"
                :key="index"
              ></v-divider>
            </v-flex>
            <v-flex xs2>
              <v-list-tile
                :key="audio.filename"
                :class="cursor === index ? 'active' : 'disactive'"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-html="audio.statuses[0]"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider
                v-if="audio.divider"
                :key="index"
              ></v-divider>
            </v-flex>
            <v-flex xs2>
              <v-list-tile
                :key="audio.filename"
                :class="cursor === index ? 'active' : 'disactive'"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-html="audio.statuses[1]"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider
                v-if="audio.divider"
                :key="index"
              ></v-divider>
            </v-flex>
            <v-flex xs2>
              <v-list-tile
                :key="audio.filename"
                :class="cursor === index ? 'active' : 'disactive'"
              >
                <v-list-tile-content>
                  <v-list-tile-title v-html="audio.statuses[2]"></v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-divider
                v-if="audio.divider"
                :key="index"
              ></v-divider>
            </v-flex>
          </v-layout>
        </template>
      </div>
    </v-list>
  </div>
</template>

<script>
import { remote } from 'electron';
import { internalBack, internalNext } from '../../services/InspectionServie.js';

export default {
  props: [
    'title',
    'backPath',
    'audioList',
  ],
  data: () => ({
    cursor: 0,
    sound: '',
    played: false,
    ready: false,
    audioBufferList: [],
  }),
  watch: {
    cursor: function () {
      if (this.audioList == null || this.audioList.length === 0) return;
      this.sound = this.audioList[this.cursor].fullpath;
    },
  },
  methods: {
    async play() {
      const context = new AudioContext();
      const audioBuffer = this.audioBufferList.find(audioBuffer => audioBuffer.filename === this.audioList[this.cursor].filename);
      const buffer = await (async audioBuffer => {
        if (audioBuffer) return audioBuffer.buffer;
        else {
          const buffer = await context.decodeAudioData(this.audioList[this.cursor].data.buffer).catch(err => console.dir(err));
          this.audioBufferList.push({
            filename: this.audioList[this.cursor].filename,
            buffer,
          });
          return buffer;
        }
      })(audioBuffer);
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.connect(context.destination);
      source.start(0);
      this.played = true;
   },
    next() {
      this.played = false;
      this.cursor = internalNext(this.audioList, this.cursor);
    },
    back() {
      this.played = false;
      this.cursor = internalBack(this.audioList, this.cursor);
    },
    answer(index, result) {
      const origin = this.audioList[this.cursor].statuses;
      this.audioList[this.cursor].statuses = origin.map((status, i) => {
        if (i === index) return result;
        return status;
      });

      if (this.audioList[this.cursor].statuses.some(status => status === '')) return;

      const finish = this.audioList.find(audio => !audio.statuses.every(status => status !== '')) == null;

      if (finish) {
        alert('Finished');
        this.finish();
        this.$router.push({
          name: this.backPath,
        });
        return;
      }

      this.played = false;
      this.cursor = internalNext(this.audioList, this.cursor);
    },
    finish() {
    },
    browserBack() {
      this.$router.push({
        name: this.backPath,
      });
    },
  },
  updated() {
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
