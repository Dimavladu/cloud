<template>
  <div class="">
    <v-container>
      <v-card
          class="mx-auto mt-10"
          elevation="16"
          max-width="400"
          outlined
      >
        <v-card-title class="ml-4" v-text="'Восстановление пароля'"/>
          <v-text-field
              class="mx-8 mb-5"
              label="Email"
              v-model.trim="email"
              :error-messages="$v.$error ? emailErrors: []"
          />
        <v-card-text class="ml-4 tex" v-if="$store.state.auth.passMessage">
          {{$store.state.auth.passMessage}}
        </v-card-text>
        <div class="d-flex justify-space-around">
          <v-btn class="ml-4 mb-5" @click.stop="$router.push('/login')" v-text="'Войти'"/>
          <v-btn class="float-end primary mr-3 mb-5" @click="restorePassword" v-text="'Отправить'"/>
        </div>
      </v-card>
    </v-container>
  </div>
</template>
<script>

import {validationMixin} from "vuelidate";
import {email, required} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data: () =>({
    email: ''
  }),
  methods:{
    async restorePassword(){
      this.$v.$touch()
      if (!this.emailErrors.length){
        const payload = {email: this.email}
        await this.$store.dispatch('auth/restorePassword', payload)
      }
    }
  },
  validations: {
    email: {required, email},
  },
  computed:{
    emailErrors () {
      const errors = []
      if(!this.$v.email.email) errors.push('Введите корректный e-mail')
      if(!this.$v.email.required) errors.push('Введите E-mail')
      return errors
    },
  }

}
</script>