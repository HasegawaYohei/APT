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

    <v-layout text-xs-center mt-3 wrap>
      <v-flex xs3>
        <v-btn
          color="error"
          :large="true"
          class="btn-custom"
          @click="answer(false)"
            >誤答</v-btn>
      </v-flex>
      <v-flex xs6>
        <v-btn
          class="btn-custom"
          :large="true"
          :disabled="played"
          @click="reOrder"
          >番号再生成</v-btn>
          <audio id="sound">
            <source :src="sound" type="audio/wav">
          </audio>
      </v-flex>
      <v-flex xs3>
        <v-btn
          color="success"
          :large="true"
          class="btn-custom"
          @click="answer(true)"
            >正答</v-btn>
      </v-flex>
    </v-layout>
    <v-layout text-xs-center justify-center mt-3 wrap>
      <v-flex xs12>
        <v-btn
          color="info"
          class="btn-custom"
          :large="true"
          :disabled="!ready"
          @click="play"
          >再生</v-btn>
        <audio id="sound">
          <source :src="sound" type="audio/wav">
        </audio>
      </v-flex>
    </v-layout>
    <div v-if="ready">
      <v-layout text-xs-center justify-center mt-3 wrap>
        <v-flex xs1>
          S/N 条件
        </v-flex>
        <v-flex xs1>
          +10dB
        </v-flex>
        <v-flex xs1>
          +5dB
        </v-flex>
        <v-flex xs1>
          0dB
        </v-flex>
        <v-flex xs1>
          -5dB
        </v-flex>
        <v-flex xs1>
          -10dB
        </v-flex>
        <v-flex xs1>
          -15dB
        </v-flex>
      </v-layout>
      <template v-for="(row, i) in inspectionTable">
        <v-layout text-xs-center justify-center mt-3 wrap :key="i">
          <v-flex xs1></v-flex>
          <v-flex xs1 v-for="(inspection, j) in row">
            <div
              :style="{
                background: inspection.label === '済' ? '#fff' : getRgb(remainingInspectionNumber, inspection.label),
                color: '#252525',
                fontSize: '18px',
                padding: '8px 0'
              }"
            >
              {{inspection.label}}
            </div>
          </v-flex>
        </v-layout>
      </template>

      <v-layout>
        <v-flex xs4>
          <v-list>
            <v-layout wrap>
              <v-flex xs9>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>ファイル名</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs3>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>結果</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
            <div class="result-list">
              <template v-for="(result, index) in resultList">
                <v-layout :key="index">
                  <v-flex xs9>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{result.filename}}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                  </v-flex>
                  <v-flex xs3>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{result.result}}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-divider></v-divider>
                  </v-flex>
                </v-layout>
              </template>
            </div>
          </v-list>
        </v-flex>
        <v-flex xs8>
          <v-list>
            <v-layout wrap>
              <v-flex xs3>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>S/N 条件</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs3>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>正答数</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs3>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>誤答数</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs3>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>正答率</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
            <template v-for="(result, index) in resultMapList">
              <v-layout :key="index" wrap>
                <v-flex xs3>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{result.condition}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs3>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{result.correctNumber}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs3>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{result.wrongNumber}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                </v-flex>
                <v-flex xs3>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title>{{result.correctPercent()}}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                  <v-divider></v-divider>
                </v-flex>
              </v-layout>
            </template>
          </v-list>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import Api from '../services/Api';
import { arrayShuffle, flatten, splitArray } from '../services/Array';

function buildInspections(sounds) {
  return sounds.map(sound => {
    return {
      sound,
      done: false,
    };
  });
}

function buildInspectionTable(inspections, remainingInspectionNumber) {
  const numberArray = arrayShuffle(Array.from( {length: remainingInspectionNumber } ).map((_, i) => i));
  const labeledInspections = inspections.map(inspection => {
    return {
      inspection,
      label: inspection.done ? "済" : numberArray.pop()
    };
  });

  return splitArray(labeledInspections, 6);
}

function updateInspectionTableLabel(inspectionTable) {
  return inspectionTable.map(labeledInspectionArray => {
    return labeledInspectionArray.map(labeledInspection => {
      return {
        inspection: labeledInspection.inspection,
        label: labeledInspection.inspection.done ? "済" : labeledInspection.label - 1
      };
    });
  });
}

function recordAnswer(a, b) {

}

export default {
  props: [
    'title',
    'backPath',
  ],
  data: () => ({
    ready: false,
    played: false,
    sound: '',
    currentInspection: null,
    inspections: [],
    inspectionTable: [],
    resultList: [],
    resultMapList: [
      {
        condition: "+10dB",
        correctNumber: 0,
        wrongNumber: 0,
        correctPercent: 0,
        correctPercent() {
          if (!(this.correctNumber || this.wrongNumber)) return 0;
          return (this.correctNumber / (this.correctNumber + this.wrongNumber)) * 100;
        },
      },
      {
        condition: "+05dB",
        correctNumber: 0,
        wrongNumber: 0,
        correctPercent() {
          if (!(this.correctNumber || this.wrongNumber)) return 0;
          return (this.correctNumber / (this.correctNumber + this.wrongNumber)) * 100;
        },
      },
      {
        condition: "+00dB",
        correctNumber: 0,
        wrongNumber: 0,
        correctPercent() {
          if (!(this.correctNumber || this.wrongNumber)) return 0;
          return (this.correctNumber / (this.correctNumber + this.wrongNumber)) * 100;
        },
      },
      {
        condition: "-05dB",
        correctNumber: 0,
        wrongNumber: 0,
        correctPercent() {
          if (!(this.correctNumber || this.wrongNumber)) return 0;
          return (this.correctNumber / (this.correctNumber + this.wrongNumber)) * 100;
        },
      },
      {
        condition: "-10dB",
        correctNumber: 0,
        wrongNumber: 0,
        correctPercent() {
          if (!(this.correctNumber || this.wrongNumber)) return 0;
          return (this.correctNumber / (this.correctNumber + this.wrongNumber)) * 100;
        },
      },
      {
        condition: "-15dB",
        correctNumber: 0,
        wrongNumber: 0,
        correctPercent() {
          if (!(this.correctNumber || this.wrongNumber)) return 0;
          return (this.correctNumber / (this.correctNumber + this.wrongNumber)) * 100;
        },
      },
    ],
    remainingInspectionNumbern: 36,
    answerNumber: 0,
  }),
  methods: {
    play() {
      const audio = document.getElementById('sound');

      this.currentInspection = this.currentInspection ? this.currentInspection : flatten(this.inspectionTable).find(v => v.label === 0);

      if (!this.played) {
        this.played = true;
        this.resultList.unshift({
          filename: this.currentInspection.inspection.sound.filename,
        });
      }

      this.currentInspection.label = "再"
      this.sound = this.currentInspection.inspection.sound.fullpath;
      audio.load();
      audio.play();
    },
    reOrder() {
      this.inspectionTable = buildInspectionTable(this.inspections, this.remainingInspectionNumber)
    },
    browserBack() {
      this.$router.push({
        name: this.backPath,
      });
    },
    answer(isCorrect) {
      this.currentInspection.inspection.done = true;
      this.remainingInspectionNumber -= 1;
      this.inspectionTable = updateInspectionTableLabel(this.inspectionTable);
      this.resultList[0].result = isCorrect ? '正' : '誤';
      const condition = this.currentInspection.inspection.sound.filename.match(/(\+|\-)[0-9]{1,2}dB/)[0];
      const resultMap = this.resultMapList.find(resultMap => resultMap.condition === condition);

      this.answerNumber += 1;
      this.currentInspection = null;
      this.played = false;

      if (isCorrect) resultMap.correctNumber += 1;
      else resultMap.wrongNumber += 1;
    },
    getRgb(remainingInspectionNumber, inspectionNumber) {
      const n = ((remainingInspectionNumber - inspectionNumber) / remainingInspectionNumber) * 255;
      return `rgb(${285 - n},${375 - n},${255})`;
    },
    getReverseRgb(remainingInspectionNumber, inspectionNumber) {
      const n = 255 - ((remainingInspectionNumber - inspectionNumber) / remainingInspectionNumber) * 255;
      return `rgb(${n},${n},${0})`;
    },
  },
  async mounted() {
    const sounds = (await Api.get('/the-word-under-noise-inspection')).data;
    this.remainingInspectionNumber = sounds.length;
    this.inspections = buildInspections(sounds);
    this.inspectionTable = buildInspectionTable(this.inspections, this.remainingInspectionNumber);
    this.ready = true;
  },
};
</script>

<style scoped lang="stylus">
.btn-custom
  width 90%
</style>
