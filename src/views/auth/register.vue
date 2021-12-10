<template>
  <div class="">
    <v-container>
      <v-card
          class="mx-auto mt-10"
          width="400"
          elevation="16"
      >
        <v-card-title class="ml-4">
          Регистрация
        </v-card-title>
        <v-form>
          <v-row class="mx-5">
            <v-col cols="12" @keydown.enter="onSubmit">
              <v-text-field
                  label="Имя"
                  v-model="form.name"
                  :error-messages="$v.$error ? nameErrors: []"
                  />
              <v-text-field
                  label="Фамилия"
                  v-model="form.surname"
                  :error-messages="$v.$error ? surnameErrors: []"
                  />
              <v-text-field
                  label="Email"
                  v-model.trim="form.email"
                  :error-messages="$v.$error ? emailErrors: []"
                  />
              <v-text-field
                  type="password"
                  v-model.trim="form.password"
                  label="Пароль"
                  :error-messages="$v.$error ? passwordErrors: []"
                  />
              <v-text-field
                  type="password"
                  v-model.trim="form.rpassword"
                  label="Повторите пароль"
                  :error-messages="$v.$error ? rpasswordErrors: []"
                  />
            </v-col>
          </v-row>
          <v-card-text class="ml-4" v-if="$store.state.auth.regMessage">{{$store.state.auth.regMessage}}</v-card-text>
          <v-row class="pa-0 ma-0">
            <v-col align="center" cols="12" md="7" offset-md="1">
              <v-btn
                  class="primary"
                  @click="onSubmit"
              >Зарегистрироваться</v-btn>
            </v-col>
            <v-col align="center" cols="12" md="auto">
              <v-btn class="" @click="$router.push('/login')">
                Войти
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-container>

  </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {email, required, minLength, helpers, sameAs} from 'vuelidate/lib/validators'

const alpha = helpers.regex('alpha', /^[a-zA-ZА-Яа-я]*$/)

export default {
  mixins: [validationMixin],
  data: () =>({
    form:{
      email: '',
      password: '',
      rpassword: '',
      name: '',
      surname: ''
    },
    message: ''
  }),
  methods: {
    async onSubmit(){
      this.$v.$touch()
      if(
          !this.nameErrors.length &&
          !this.surnameErrors.length &&
          !this.emailErrors.length &&
          !this.passwordErrors.length &&
          !this.rpasswordErrors.length) {
        const payload = {
          email: this.form.email,
          password: this.form.password,
          name: this.form.name,
          surname: this.form.surname,
        }
        await this.$store.dispatch('auth/register', payload)
      }
    }
  },
  validations: {
    form:{
      name: { required, alpha },
      surname: { required, alpha },
      email: { required, email },
      password: {required, minLength: minLength(8)},
      rpassword: {required, sameAs: sameAs('password')}
    }
  },
  computed:{
    nameErrors () {
      const errors = []
      if(!this.$v.form.name.required) errors.push('Введите имя')
      if(!this.$v.form.name.alpha) errors.push('Имя должно быть корректно')
      return errors
    },
    surnameErrors () {
      const errors = []
      if(!this.$v.form.surname.required) errors.push('Введите фамилию')
      if(!this.$v.form.name.alpha) errors.push('Имя должно быть корректно')
      return errors
    },
    emailErrors () {
      const errors = []
      if(!this.$v.form.email.email) errors.push('Введите корректный e-mail')
      if(!this.$v.form.email.required) errors.push('Введите E-mail')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.form.password.required) errors.push('Введите пароль')
      if (!this.$v.form.password.minLength) errors.push('Пароль должен быть не меньше 8 символов')
      return errors
    },
    rpasswordErrors () {
      const errors = []
      if(!this.$v.form.rpassword.required) errors.push('Введите пароль')
      if(!this.$v.form.rpassword.sameAs) errors.push('Пароли должны совпадать')
      return errors
    },
    message(){return this.$store.state.auth.regMessage}
  }
}
</script>