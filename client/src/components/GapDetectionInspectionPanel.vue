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
          :class="{ active: activeNo[0] }"
          :disabled="!played"
          @click="answer(0)"
          >No. 1</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn
          :large="true"
          class="btn-custom"
          :class="{ active: activeNo[1] }"
          :disabled="!played"
          @click="answer(1)"
          >No. 2</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn
          :large="true"
          class="btn-custom"
          :class="{ active: activeNo[2] }"
          :disabled="!played"
          @click="answer(2)"
          >No. 3</v-btn>
      </v-flex>
      <v-flex xs3>
        <v-btn
          :large="true"
          class="btn-custom"
          :class="{ active: activeNo[3] }"
          :disabled="!played"
          @click="answer(3)"
          >No. 4</v-btn>
      </v-flex>
    </v-layout>

    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-btn
          :large="true"
          class="btn-custom"
          :disabled="!played"
          @click="answer(-1)"
          >不明 / 該当なし</v-btn>
      </v-flex>
    </v-layout>

    <v-layout text-xs-center wrap>
      <v-flex xs12>
        <v-btn
          :large="true"
          color="info"
          class="btn-custom"
          :disabled="ready"
          @click="play"
          >{{playStatus}}</v-btn>
        <audio id="sound">
          <source :src="sound" type="audio/wav">
        </audio>
      </v-flex>
    </v-layout>

    <v-list>
      <v-layout mt-4 justify-center wrap>
        <v-flex xs2>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>回答数</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs4>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>使用ファイル名</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs2>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>乱数値</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs2>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>選択値</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-flex>
        <v-flex xs2>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>結果</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
      <div class="result-list">
        <template v-for="result in resultList">
          <v-layout>
              <v-flex xs2>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{result.answerNumber}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs4>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{result.filename}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs2>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{result.correctIndex}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs2>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{result.selectedNumber}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs2>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>{{result.result}}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
          </v-layout>
        </template>
      </div>
    </v-list>
  </div>
</template>

<script>
import Api from '../services/Api';
import { arrayShuffle } from '../services/Array';

function sleep(msec) {
  return new Promise(resolve => setTimeout(resolve, msec));
}

async function intervalFunc(callback, soundIndexies) {
  const interval = 1300;
  for (let i = 0; i < 4; i++) {
    callback(soundIndexies[i], i);
    await sleep(interval);
  }
}

const levelBlockMap = [8, 4, 2, 1];

export default {
  props: [
    'title',
    'backPath',
    'inspections',
  ],
  data: () => ({
    sound: '',
    soundList: [],
    soundIndex: 17,
    soundIndexies: [],
    correctIndex: 0,
    played: false,
    ready: false,
    previousAnswer: false,
    activeNo: [],
    playStatus: "準備中",
    levelBlock: 0,
    resultList: [],
    answerNumber: 0,
  }),
  methods: {
    async play() {
      const audio = document.getElementById('sound');
      const soundIndexies = Array.from( {length: 4} ).map(() => 0);
      this.correctIndex = this.played ? this.correctIndex : Math.floor(Math.random() * 4);
      soundIndexies[this.correctIndex] = this.soundIndex;
      const playSound = (soundIndex, playNumber) => {
        const audio = document.getElementById('sound');

        if (playNumber !== 0) this.activeNo[playNumber - 1] = false;
        this.activeNo[playNumber] = true;
        this.$forceUpdate();

        this.sound = this.soundList[soundIndex].fullpath;
        audio.load();
        audio.play();
      }

      this.playStatus = "再生中";
      await intervalFunc(playSound, soundIndexies);

      this.activeNo[3] = false;
      this.$forceUpdate();
      this.played = true;
      this.playStatus = "再生";
    },
    answer(number) {
      this.played = false;
      this.answerNumber += 1;
      const correct = this.correctIndex === number;

      this.resultList.unshift({
        answerNumber: this.answerNumber,
        filename: this.soundList[this.soundIndex].filename,
        correctIndex: this.correctIndex + 1,
        selectedNumber: number + 1,
        result: correct ? '正' : '誤'
      });

      if (correct) {
        this.correct();
      }
      else {
        this.wrong();
      }

      if (this.levelBlock === 4) return this.finish();

      if (this.soundIndex < 1) this.soundIndex = 1;
      if (this.soundIndex > 17) this.soundIndex = 17;
    },
    correct() {
      if (this.previousAnswer) {
        this.soundIndex -= levelBlockMap[this.levelBlock];
        this.previousAnswer = false;
      }
      else this.previousAnswer = true;
    },
    wrong() {
      this.previousAnswer = false;
      this.soundIndex += levelBlockMap[this.levelBlock];
      this.levelBlock += 1;
    },
    finish() {
      alert(`最終レベル: L${this.soundIndex - 1}`);
      this.$router.push({
        name: this.backPath,
      });
    },
    browserBack() {
      this.$router.push({
        name: this.backPath,
      });
    },
  },
  async mounted() {
    this.soundList = (await Api.get('/gap-detection-inspection')).data;
    this.playStatus = "再生";
  },
};
</script>

<style scoped lang="stylus">
.btn-custom
  width 90%
.active
  border solid 2px #F50057 !important
.selected
  background #f50057 !important
  color #fff
</style>
