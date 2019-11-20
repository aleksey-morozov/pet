<template>
  <base-layout class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ul>
      <li v-for="(subbreeds, breed) in $store.state.breeds" :key="breed">
        <router-link :to="getBreedLink(breed)">{{ breed }}</router-link>
        <ul v-if="subbreeds.length > 0">
          <li v-for="item in subbreeds" :key="item">
            <router-link :to="getBreedLink(breed, item)">{{ item }}</router-link>
          </li>
        </ul>
      </li>
    </ul>
  </base-layout>
</template>

<script>
import BaseLayout from '../components/BaseLayout.vue';

export default {
  components: { BaseLayout },
  methods: {
    getBreedLink(name, sub = null) {
      return {
        name: 'breed-page',
        params: {
          name,
          sub,
        },
      };
    },
  },
};
</script>
