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
      <v-flex xs12>
        1の後に「9」が出てきたら、スペースキーを押してください
        <div v-if="!played">
          <v-btn
            class="btn-custom"
            :large="true"
            :disabled="!apiDone || !ready"
            @click="play"
            >再生</v-btn>
        </div>
        <div v-else>
          <v-btn
            :large="true"
            class="btn-custom"
            @click="finish"
            >途中終了</v-btn>
        </div>
        <audio id="sound">
          <source :src="sound" type="audio/wav">
        </audio>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
let start = 0;
let play = false;
let isCorrect = false;

document.onkeydown = function(e) {
  if (play === false) return;
  if (e.keyCode !== 32) return;

  const end = performance.now();
  const time = end - start;

  if (isCorrect === true) console.log('correct!');
  else console.log('wrong...');
  console.log(time);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function arrayShuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    let rand = Math.floor( Math.random() * ( i + 1 ) );
    [array[i], array[rand]] = [array[rand], array[i]]
  }

  return array;
}

function flatten(array) {
  return array.reduce((a, c) => {
    return Array.isArray(c) ? a.concat(flatten(c)) : a.concat(c);
  }, []);
}

function buildSoundList(inspections) {
  const correctAnswer = [
    {
      inspection: inspections[0],
      correct: false,
    },
    {
      inspection: inspections[6],
      correct: true,
    },
  ];
  const correctAnswerArray = Array.from({ length: 20 }).map(() => correctAnswer);
  const wrongAnswer1Array = Array.from({ length: 10 }).map(() => {
    return [
      {
        inspection: inspections[0],
        correct: false,
      },
      {
        inspection: inspections[getRandomInt(1, 6)],
        correct: false,
      },
    ];
  });
  const wrongAnswer2Array = Array.from({ length: 10 }).map(() => {
    return [
      {
        inspection: inspections[getRandomInt(1, 6)],
        correct: false,
      },
      {
        inspection: inspections[6],
        correct: false,
      },
    ];
  });
  const wrongAnswer3Array = Array.from({ length: 10 }).map(() => {
    return [
      {
        inspection: inspections[getRandomInt(1, 6)],
        correct: false,
      },
      {
        inspection: inspections[getRandomInt(1, 6)],
        correct: false,
      },
    ];
  });

  return flatten(arrayShuffle(correctAnswerArray.concat(wrongAnswer1Array, wrongAnswer2Array, wrongAnswer3Array)));
}

function sleep(msec) {
  return new Promise(resolve => setTimeout(resolve, msec));
}

async function intervalFunc (callback) {
  const intervals = [
    800,
    1500,
    3000,
  ];

  for (let i = 0; i < 100; i++) {
    let interval = intervals[getRandomInt(0, 3)];
    // await Promise.all([callback(i), sleep(interval)])
    callback(i);
    await sleep(interval);
  }
}

export default {
  props: [
    'title',
    'backPath',
    'apiDone',
    'inspections',
  ],
  data: () => ({
    sound: '',
    soundList: [],
    ready: false,
    played: false,
  }),
  methods: {
    play() {
      play = true;

      const playSound = i => {
        const audio = document.getElementById('sound');
        this.sound = this.soundList[i].inspection.fullpath;
        isCorrect = this.soundList[i].correct;
        audio.load();
        audio.play();
        start = performance.now();
      }

      intervalFunc(playSound);
    },
    finish() {
      alert('Finished!!');
      this.browserBack();
    },
    browserBack() {
      this.$router.push({
        name: this.backPath,
      });
    },
  },
  updated() {
    if (this.ready === true) return;

    this.soundList = buildSoundList(this.inspections);
    this.ready = true;
  },
};
</script>

<style scoped lang="stylus">
.btn-custom
  width 80%
</style>
