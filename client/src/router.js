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
      path: '/dichotic-listening-inspection',
      name: 'dichoticListeningInspection',
      component: () => import('./views/DichoticListeningInspection/Index.vue'),
    },
    {
      path: '/dichotic-listening-inspection/single-ear-single-sound',
      name: 'singleEarSingleSound',
      component: () => import('./views/DichoticListeningInspection/SingleEarSingleSound.vue'),
    },
    {
      path: '/dichotic-listening-inspection/single-ear-single-word',
      name: 'singleEarSingleWord',
      component: () => import('./views/DichoticListeningInspection/SingleEarSingleWord.vue'),
    },
    {
      path: '/dichotic-listening-inspection/single-sound',
      name: 'singleSound',
      component: () => import('./views/DichoticListeningInspection/SingleSound.vue'),
    },
    {
      path: '/dichotic-listening-inspection/word',
      name: 'word',
      component: () => import('./views/DichoticListeningInspection/Word.vue'),
    },
    {
      path: '/dichotic-listening-inspection/sentence',
      name: 'sentence',
      component: () => import('./views/DichoticListeningInspection/Sentence.vue'),
    },
    {
      path: '/fastsound-listening-inspection',
      name: 'fastsoundListeningInspection',
      component: () => import('./views/FastSoundListeningInspection/Index.vue'),
    },
    {
      path: '/fastsound-listening-inspection/normal',
      name: 'normal',
      component: () => import('./views/FastSoundListeningInspection/Normal.vue'),
    },
    {
      path: '/fastsound-listening-inspection/fast',
      name: 'fast',
      component: () => import('./views/FastSoundListeningInspection/Fast.vue'),
    },
    {
      path: '/fastsound-listening-inspection/moreFast',
      name: 'moreFast',
      component: () => import('./views/FastSoundListeningInspection/MoreFast.vue'),
    },
    {
      path: '/both-ears-alternating-inspection',
      name: 'bothEarsAlternatingInspection',
      component: () => import('./views/BothEarsAlternatingInspection/Index.vue'),
    },
    {
      path: '/multiple-sound-listening-inspection',
      name: 'multipleSoundListeningInspection',
      component: () => import('./views/MultipleSoundListeningInspection/Index.vue'),
    },
  ],
});
