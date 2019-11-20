<template>
<base-layout class="favorites">
    <h1>Список избранных фото</h1>
    <!--<b-alert show v-if="favorites.length === 0">Список пуст</b-alert>-->
    <dogs-list :photos="favorites"></dogs-list>
</base-layout>
</template>

<script>
import DogsList from '../components/DogsList.vue';
import BaseLayout from '../components/BaseLayout.vue';

export default {
  components: {
    DogsList,
    BaseLayout,
  },
  computed: {
    favorites() {
      return this.$store.state.favorites;
    },
  },
};
</script>

<style scoped>

</style>
