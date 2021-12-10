<template>
  <div>
    <v-container>
      <h5 class="text-h5 font-weight-light ml-4 my-4 justify-start">
        Пользователь
      </h5>
      <v-divider/>
      <v-form class="mx-auto">
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                  label="Имя"
                  v-model="user.name"
                  :error-messages="$v.$error ? nameErrors: []"
              />
            </v-col>
            <v-col cols="12" md="4">
            <v-text-field
                  label="Фамилия"
                  v-model="user.surname"
                  :error-messages="$v.$error ? surnameErrors: []"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                  label="Email"
                  v-model.trim="user.email"
                  :error-messages="$v.$error ? emailErrors: []"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <div class="d-flex justify-space-between">
        <v-bottom-sheet
            class="mx-auto"
            v-model="sheet"
            persistent
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                class="ml-4"
                color="primary"
                elevation="9"
                @click="onSubmit"
            >Обновить
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
          </template>
          <v-sheet class="text-center" height="200px">
            <v-container>
              <v-text-field
                  type="password"
                  v-model.trim="user.password"
                  label="Введите ваш пароль"
                  :error-messages="$v.$error ? passwordErrors: []"
              />
              <v-card-text v-if="message">{{message}}</v-card-text>
              <div class="d-flex justify-space-around">
                <v-btn
                    class="my-3"
                    text color="error"
                    @click="clear"
                    v-text="'Отменить'"
                />
                <v-btn
                    class="my-3"
                    text color="primary"
                    @click="onSubmit"
                    v-text="'Обновить'"
                />
              </div>
            </v-container>
          </v-sheet>
        </v-bottom-sheet>

        <v-bottom-sheet
            class="mx-auto"
            v-model="passSheet"
            persistent
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                elevation="9"
                class="mr-4"
                @click="changePassword"
                outlined
            >Изменить пароль
            </v-btn>
          </template>
          <v-sheet class="text-center" height="250px">
            <v-container>
              <v-text-field
                  type="password"
                  v-model.trim="user.password"
                  label="Введите старый пароль"
                  :error-messages="$v.$error ? passwordErrors: []"
              />
              <v-text-field
                  type="password"
                  v-model.trim="user.newPassword"
                  label="Введите новый пароль"
                  :error-messages="$v.$error ? newPasswordErrors: []"
              />
              <v-card-text v-if="message">{{message}}</v-card-text>
              <div class="d-flex justify-space-around">
                <v-btn
                    class="my-3"
                    text color="error"
                    @click="clear"
                    v-text="'Отменить'"
                />
                <v-btn
                    class="my-3"
                    text color="primary"
                    @click="changePassword"
                    v-text="'Обновить'"
                />
              </div>
            </v-container>
          </v-sheet>
        </v-bottom-sheet>
      </div>
    </v-container>
  </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {email, required, minLength, helpers} from 'vuelidate/lib/validators'

const alpha = helpers.regex('alpha', /^[a-zA-ZА-Яа-я]*$/)

export default {
  mixins: [validationMixin],
  data: () => ({
    sheet: false,
    passSheet: false,
  }),
  validations:{
    user:{
      name: {required, alpha},
      surname: {required, alpha},
      email: {required, email},
      password: {required, minLength: minLength(8)},
      newPassword: {required, minLength: minLength(8)},
    }
  },
  methods:{
    clear(){
      this.user.password = ''
      this.user.newPassword = ''
      this.sheet = false
      this.passSheet = false
    },
    async onSubmit(){
      this.$v.$touch()
      if(!this.nameErrors.length && !this.surnameErrors.length &&
          !this.emailErrors.length && !this.passwordErrors.length) {
        const payload = {
          email: this.user.email,
          password: this.user.password,
          name: this.user.name,
          surname: this.user.surname
        }
        await this.$store.dispatch("auth/updateUserInfo", payload)
        if (!this.message){
          this.sheet = false
          this.clear()
        }
      }
      else if(
          !this.nameErrors.length &&
          !this.surnameErrors.length &&
          !this.emailErrors.length ){
            this.sheet = !this.sheet
      }
    },
    async changePassword(){
      this.$v.$touch()
      this.passSheet = true
      if(!this.passwordErrors.length && !this.newPasswordErrors.length){
        const payload = {
          password: this.user.password,
          newPassword: this.user.newPassword
        }
        await this.$store.dispatch("auth/changePassword", payload)
        if (!this.message){
          this.clear()
          this.passSheet = false
        }
      }
    }
  },
  computed:{
    nameErrors () {
      const errors = []
      if(!this.$v.user.name.required) errors.push('Введите имя')
      if(!this.$v.user.name.alpha) errors.push('Имя должно быть корректно')
      return errors
    },
    surnameErrors () {
      const errors = []
      if(!this.$v.user.surname.required) errors.push('Введите фамилию')
      if(!this.$v.user.surname.alpha) errors.push('Фамилия должна быть корректна')
      return errors
    },
    emailErrors () {
      const errors = []
      if(!this.$v.user.email.email) errors.push('Введите корректный e-mail')
      if(!this.$v.user.email.required) errors.push('Введите E-mail')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.user.password.required) errors.push('Введите пароль')
      if (!this.$v.user.password.minLength) errors.push('Пароль должен быть не меньше 8 символов')
      return errors
    },
    newPasswordErrors () {
      const errors = []
      if (!this.$v.user.newPassword.required) errors.push('Введите пароль')
      if (!this.$v.user.newPassword.minLength) errors.push('Пароль должен быть не меньше 8 символов')
      return errors
    },
    message(){return this.$store.state.auth.authMessage},
    user(){return this.$store.state.auth.user}
  },
  async mounted(){
  },
  components: {}
}
</script>

<style scoped>

</style>