<template>
<div class="login">
  <v-row>
    <v-col sm="4" class="ma-auto">
      <v-form @submit.prevent="signIn" class="elevation-5 pa-4">
        <h1>Вход</h1>
        <v-divider></v-divider>
        <v-text-field label="Ваш email" v-model.trim="email" />
        <v-text-field label="Ваш пароль" type="password" v-model.trim="password" />
        <v-row>
          <v-col>
            <v-btn type="submit" color="primary">Вход</v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col class="text-right">
            <v-btn to="/register" color="default">Регистрация</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</div>
</template>

<script>

import { SIGNIN } from '../store/action.type';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async signIn() {
      console.log('signIn');
      await this.$store.dispatch(SIGNIN, {
        email: this.email,
        password: this.password,
      });
      this.$router.push({ name: 'home' });
    },
  },
  beforeCreate() {
    if (this.$store.state.user.uid !== null) {
      this.$router.push({ name: 'home' });
    }
  },
};
</script>

<style scoped>

</style>
