import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/dichotic-listening-test',
      name: 'dichoticListeningTest',
      component: () => import('./views/DichoticListeningTest/Index.vue'),
    },
    {
      path: '/dichotic-listening-test/single-ear-single-sound',
      name: 'singleEarSingleSound',
      component: () => import('./views/DichoticListeningTest/SingleEarSingleSound.vue'),
    },
    {
      path: '/dichotic-listening-test/single-ear-single-word',
      name: 'singleEarSingleWord',
      component: () => import('./views/DichoticListeningTest/SingleEarSingleWord.vue'),
    },
    {
      path: '/dichotic-listening-test/single-sound',
      name: 'singleSound',
      component: () => import('./views/DichoticListeningTest/SingleSound.vue'),
    },
    {
      path: '/dichotic-listening-test/word',
      name: 'word',
      component: () => import('./views/DichoticListeningTest/Word.vue'),
    },
    {
      path: '/dichotic-listening-test/sentence',
      name: 'sentence',
      component: () => import('./views/DichoticListeningTest/Sentence.vue'),
    },
    {
      path: '/fastsound-listening-test',
      name: 'fastsoundListeningTest',
      component: () => import('./views/FastSoundListeningTest/Index.vue'),
    },
    {
      path: '/fastsound-listening-test/normal',
      name: 'normal',
      component: () => import('./views/FastSoundListeningTest/Normal.vue'),
    },
    {
      path: '/fastsound-listening-test/fast',
      name: 'fast',
      component: () => import('./views/FastSoundListeningTest/Fast.vue'),
    },
    {
      path: '/fastsound-listening-test/moreFast',
      name: 'moreFast',
      component: () => import('./views/FastSoundListeningTest/MoreFast.vue'),
    },
    {
      path: '/both-ears-alternating-test',
      name: 'bothEarsAlternatingTest',
      component: () => import('./views/BothEarsAlternatingTest/Index.vue'),
    },
    {
      path: '/multiple-sound-listening-test',
      name: 'multipleSoundListeningTest',
      component: () => import('./views/MultipleSoundListeningTest/Index.vue'),
    },
  ],
});
