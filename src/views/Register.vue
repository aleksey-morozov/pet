<template>
  <div class="login">
    <v-row>
      <v-col sm="4" class="ma-auto">
        <v-form @submit.prevent="signUp" class="elevation-5 pa-4">
          <h1>Регистрация</h1>
          <v-divider></v-divider>
          <v-alert v-if="successMessage" type="success">{{ successMessage }}</v-alert>
          <v-alert v-if="errorMessage" type="error">{{ errorMessage }}</v-alert>
          <v-text-field label="Ваш email" v-model="email" />
          <v-text-field label="Ваш пароль" v-model="password" type="password" />
          <v-text-field label="Введите пароль еще раз" v-model="passConfirm" type="password" />
          <v-row>
            <v-col>
              <v-btn type="submit" color="primary">Зарегистрироваться</v-btn>
            </v-col>
            <v-spacer></v-spacer>
            <v-col class="text-right">
              <v-btn to="/login" color="default">Вход</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { SIGNUP } from '../store/action.type';

export default {
  data() {
    return {
      email: '',
      password: '',
      passConfirm: '',
      successMessage: '',
      errorMessage: '',
    };
  },
  methods: {
    async signUp() {
      try {
        await this.$store.dispatch(SIGNUP, {
          email: this.email,
          password: this.password,
        });
        this.successMessage = 'Регистрация успешно завершена';
        this.email = '';
        this.password = '';
        this.passConfirm = '';
        setTimeout(() => { this.$router.push({ name: 'home' }); }, 1200);
      } catch (e) {
        this.errorMessage = e.message;
      }
    },
  },
};
</script>

<style scoped>

</style>
