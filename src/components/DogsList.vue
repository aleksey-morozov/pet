<template>
  <v-row>
      <v-col cols="12" sm="6" md="4" xl="3" class="mb-3" v-for="item in photos" :key="item">
          <v-card :img="item" height="300">
              <v-btn
                fab
                absolute
                right
                bottom
                dark
                class="mb-11 fav-btn"
                :color="getFavoritesButtonClass(item)"
                @click="toggleFavorite(item)"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
          </v-card>
      </v-col>
  </v-row>
</template>

<script>
import { TOGGLE_FAVORITE_IMAGE } from '../store/action.type';

export default {
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getFavoritesButtonText(image) {
      return this.$store.state.favorites.includes(image) ? 'Убрать из избранного' : 'В избранное';
    },
    getFavoritesButtonClass(image) {
      return this.$store.state.favorites.includes(image) ? 'red accent-3' : 'blue-grey darken-4';
    },
    async toggleFavorite(image) {
      this.$store.dispatch(TOGGLE_FAVORITE_IMAGE, image);
    },
  },
};
</script>

<style scoped>
  .fav-btn {
    z-index: 2;
  }
</style>
