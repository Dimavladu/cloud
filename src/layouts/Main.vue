<template>
  <div>
    <div v-if="loading">
      <loader/>
    </div>
    <div v-else>
        <v-dialog
            v-if="restorePass"
            v-model="restorePass"
            persistent
            max-width="290"
        >
          <v-card>
            <v-card-title class="text-h5" v-text="'Новый пароль'"/>
              <v-text-field
                  type="password"
                  v-model.trim="password"
                  class="mx-7"
                  label="Введите новый пароль"
                  :error-messages="$v.$error ? passwordErrors: []"
              />
            <v-text-field
                  type="password"
                  v-model.trim="rpassword"
                  class="mx-7"
                  label="Повторите новый пароль"
                  :error-messages="$v.$error ? rpasswordErrors: []"
              />
            <v-card-actions>
              <v-spacer/>
              <v-btn
                  color="green darken-1"
                  text
                  @click="onSubmit"
                  v-text="'Изменить'"
              />
            </v-card-actions>
          </v-card>
        </v-dialog>
      <v-main>
        <router-view/>
      </v-main>
      <navbar/>
    </div>
  </div>
</template>
<script>
import navbar from "@/components/app/navbar";
import loader from '../components/app/loader'

import {validationMixin} from "vuelidate";
import {required, minLength, sameAs} from 'vuelidate/lib/validators'

export default {
  data: () =>({
  loading: false,
    test: false,
    password: '',
    rpassword: ''
  }),
  mixins: [validationMixin],
  validations:{
    password: {required, minLength: minLength(8)},
    rpassword: {required, sameAs: sameAs('password')}
  },
  async mounted(){
    this.loading = true
    await this.$store.dispatch('auth/auth')
    this.loading = false
  },
  methods:{
    async onSubmit(){
      this.$v.$touch()
      if(!this.passwordErrors.length && !this.rpasswordErrors.length) {
        await this.$store.dispatch('auth/newPass', {password: this.password})
      }
    }
  },
  computed:{
    restorePass(){return this.$store.state.auth.user.restorePass },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.required) errors.push('Введите пароль')
      if (!this.$v.password.minLength) errors.push('Пароль должен быть не меньше 8 символов')
      return errors
    },
    rpasswordErrors () {
      const errors = []
      if(!this.$v.rpassword.required) errors.push('Введите пароль')
      if(!this.$v.rpassword.sameAs) errors.push('Пароли должны совпадать')
      return errors
    },
  },
  components: {navbar, loader}

}
</script>
