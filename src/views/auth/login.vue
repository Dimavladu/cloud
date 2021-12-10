<template>
    <v-row class="">
      <v-container>
        <v-card
            class="mx-auto mt-10"
            elevation="16"
            max-width="400"
            outlined
        >
          <v-card-title class="ml-4">
            Логин
          </v-card-title>
           <v-row class="mx-5" @keydown.enter="login">
             <v-col cols="12">
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
             </v-col>
           </v-row>
            <v-card-text class="ml-4 tex" v-if="$store.state.auth.authMessage">
              {{$store.state.auth.authMessage}}
            </v-card-text>

            <v-row class="pa-0 ma-0">
              <v-col align="center" cols="12" md="auto" offset-md="1">
                <v-btn
                    class="primary"
                    @click="login"
                >Войти</v-btn>
              </v-col>
              <v-col align="center" cols="12" md="7">
                <v-btn class="" @click.stop="$router.push('/register')">
                  Зарегистрироваться
                </v-btn>
              </v-col>

            </v-row>

          <v-card-text class="ml-4 pt-1 tex">
            Забыли пароль?
            <router-link tag="a" to="/password" v-text="'Восстановить'"/>
          </v-card-text>
        </v-card>
      </v-container>
    </v-row>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {email, required, minLength, } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: '',
      password: ''
    },
  }),
  methods:{
    async login(){
      this.$v.$touch()
      if(!this.emailErrors.length && !this.passwordErrors.length) {
        const payload = {
          email: this.form.email,
          password: this.form.password,
        }
        const res = await this.$store.dispatch('auth/login', payload)
        if (res) this.$router.push('/')
      }
    }
  },
  validations:{
    form: {
      email: { required, email},
      password: {required, minLength: minLength(8)},
    }
  },
  computed:{
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
  }
}
</script>