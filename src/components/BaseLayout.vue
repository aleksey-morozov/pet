<template>
  <div>
    <v-navigation-drawer v-model="menu.showMenu" app clipped>
      <v-list dense>
        <v-list-item v-for="item in menuItems" :to="item.link" :key="item.link" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      clipped-left
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="toggleDrawer" />
      <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="/profile" text>
        <v-icon>mdi-account</v-icon>
        Личный кабинет
      </v-btn>
      <v-btn @click="logout" text>
        <v-icon>mdi-logout</v-icon>
        Выход
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-card class="pa-6 fill-height" width="100%">
          <slot />
        </v-card>
      </v-container>
    </v-content>
    <v-footer
      color="indigo"
      app
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </div>
</template>

<script>
import { LOAD_BREEDS, LOAD_FAVORITES, SIGNOUT } from '../store/action.type';
import { getDrawerState, saveDrawerState } from '../services/Utils';

export default {
  async created() {
    // параллельно подгружать
    await Promise.all([
      this.$store.dispatch(LOAD_BREEDS),
      this.$store.dispatch(LOAD_FAVORITES),
    ]);
    // это был эксперемент для установки значение, которое не было задано
    // изначально в нашем состоянии
    // получается, что асинхронный created отрабатывает даже позже чем mounted
    this.$set(this.menu, 'showMenu', await getDrawerState());
  },
  data() {
    return {
      menu: {},
    };
  },
  computed: {
    favoriteCount() {
      return this.$store.state.favorites.length;
    },
    menuItems() {
      return [
        { link: '/', text: 'Главная', icon: 'mdi-home' },
        { link: '/favorites', text: `Избранные (${this.favoriteCount})`, icon: 'mdi-star-outline' },
        { link: '/about', text: 'О нас', icon: 'mdi-help' },
      ];
    },
  },
  mounted() {
    document.body.classList.remove('show-preloader');
  },
  methods: {
    async toggleDrawer() {
      this.menu.showMenu = !this.menu.showMenu;
      await saveDrawerState(this.menu.showMenu);
    },
    async logout() {
      await this.$store.dispatch(SIGNOUT);
      await this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style>
  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
