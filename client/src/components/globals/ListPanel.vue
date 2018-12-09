<template>
  <v-card>
    <v-toolbar color="cyan" dark>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-list two-line>
      <template v-for="(item, index) in inspections">

        <v-list-tile
          :key="item.title"
          avatar
          @click="link(item.path)"
        >
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider
          v-if="item.divider"
          :key="index"
        ></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: [
    'title',
    'inspections',
  ],
  data: () => ({
  }),
  methods: {
    link(path) {
      this.$router.push({
        name: path,
      });
    },
  },
};
</script>

<style>
</style>
