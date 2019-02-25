<template>
  <v-card>
    <v-toolbar color="cyan" dark>
      <v-btn v-if="!isMain" icon class="hidden-xs-only" @click="browserBack">
        <v-icon>arrow_back</v-icon>
      </v-btn>
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
    'browserBack',
    'isMain',
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

<style scoped lang="stylus">
.ml-minus
  margin-left -24px
</style>
