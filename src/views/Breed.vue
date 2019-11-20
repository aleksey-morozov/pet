<template>
    <base-layout class="container">
        <h1>Фотография породы {{ breedName }}</h1>
        <p>Вот список фото</p>
        <dogs-list :photos="this.$store.state.photos"/>
    </base-layout>
</template>

<script>
import { LOAD_RANDOM_BREED_PHOTOS } from '../store/action.type';
import DogsList from '../components/DogsList.vue';
import BaseLayout from '../components/BaseLayout.vue';

export default {
  components: {
    DogsList,
    BaseLayout,
  },
  computed: {
    breedName() {
      const { name, sub } = this.$route.params;
      let str = name[0].toUpperCase() + name.slice(1);
      if (sub) {
        str = `${sub[0].toUpperCase() + sub.slice(1)} ${str}`;
      }
      return str;
    },
  },
  async created() {
    await this.$store.dispatch(LOAD_RANDOM_BREED_PHOTOS, this.$route.params);
  },
};
</script>

<style scoped>

</style>
