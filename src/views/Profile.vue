<template>
  <base-layout class="profile">
    <h1>{{ $route.meta.title }}</h1>
    <v-divider></v-divider>
    <v-form @submit.prevent="sendForm">
      <v-row>
        <v-col sm="4">
          <v-alert v-if="showError" class="my-6" type="error">Форма заполнена не корректно</v-alert>
          <v-text-field
            v-model="userName"
            label="Ваше имя"
            :error-messages="nameErrors"
            @input="$v.userName.$touch()"
            @blur="$v.userName.$touch()"
          />
          <v-select :items="cities" v-model="city" label="Город"/>
          <v-select item-value="lang" item-text="title" :items="languages" label="Язык"/>
          <v-text-field
            :error-messages="emailErrors"
            label="Ваш email"
            v-model="email"
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          />
          <v-text-field v-mask="phoneMask" label="Ваш телефон"/>
          <v-radio-group label="Пол" row>
            <v-radio label="Мужской" value="male"/>
            <v-radio label="Женский" value="female"/>
          </v-radio-group>
          <v-switch label="Получать уведомления о новых собаках"/>
          <v-slider v-model="height" min="10" max="150" thumb-label="always">
            <template #label>
              Рост собаки ({{ height }} см)
            </template>
          </v-slider>
          <v-menu
            v-model="showDatePicker"
            :close-on-content-click="false"
            min-width="280px"
          >
            <template #activator="{ on }">
              <v-text-field
                label="Дата рождения"
                persistent-hint
                readonly
                v-on="on"
                :value="formattedBirthday"
              ></v-text-field>
            </template>
            <v-date-picker
              first-day-of-week="1"
              v-model="birthday"
              @input="showDatePicker = false"
            />
          </v-menu>
          <v-btn type="submit">Сохранить</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </base-layout>
</template>
<script>
import { mask } from 'vue-the-mask';
import { validationMixin } from 'vuelidate';
import {
  required,
  maxValue,
  minValue,
  email,
} from 'vuelidate/lib/validators';
import BaseLayout from '../components/BaseLayout.vue';

const russianLetters = value => /^[а-я]{2,25}$/i.test(value);

export default {
  components: {
    BaseLayout,
  },
  directives: {
    mask,
  },
  mixins: [validationMixin],
  data() {
    return {
      cities: ['Санкт-Петербург', 'Москва', 'Екатеринбург', 'Казань', 'Челяба'],
      city: 'Санкт-Петербург',
      languages: [
        {
          lang: 'en',
          title: 'English',
        },
        {
          lang: 'ru',
          title: 'Russian',
        },
      ],
      height: 10,
      showDatePicker: false,
      birthday: '',
      phoneMask: '+7 (###) ###-##-##',
      userName: '',
      showError: false,
      showSuccess: false,
      email: '',
    };
  },
  computed: {
    formattedBirthday() {
      return this.birthday.split('-').reverse().join('.');
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.userName.$dirty) return errors;
      if (!this.$v.userName.required) errors.push('Заполните имя!');
      if (!this.$v.userName.russianLetters) errors.push('Имя должно содержать только кириллицу!');
      if (!this.$v.userName.russianLetters) errors.push('Имя должно содержать только кириллицу!');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      if (!this.$v.email.required) errors.push('Заполните почтовый адрес!');
      if (!this.$v.email.email) errors.push('Введите корректный email!');
      return errors;
    },
  },
  validations: {
    height: {
      required,
      minValue: minValue(10),
      maxValue: maxValue(150),
    },
    userName: { required, russianLetters },
    email: { required, email },
  },
  methods: {
    sendForm() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.showError = true;
      } else {
        this.showSuccess = true;
      }

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    },
  },
};
</script>
