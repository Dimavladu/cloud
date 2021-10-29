<template>
  <div>
  <v-container>
    <h5 class="text-h5 font-weight-light my-4">Пользователь</h5>
    <v-divider/>
    <v-form class="mx-auto" v-model="valid">
      <v-container>
        <v-row>
          <v-col
          cols="12"
          md="4">
            <v-text-field
                v-model="name"
                label="Имя"
                :counter="10"
                :rules="nameRules"
                hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col
          cols="12"
          md="4">
            <v-text-field
                v-model="lastName"
                label="Фамилия"
                :counter="20"
                :rules="lastNameRules"
                hide-details="auto"
            ></v-text-field>
          </v-col>
          <v-col
          cols="12"
          md="4">
            <v-text-field
                v-model="email"
                label="E-mail"
                :rules="emailRules"
                hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
            color="primary"
            elevation="9"
        >Обновить</v-btn>
      </v-container>
    </v-form>
  </v-container>
  </div>
</template>

<script>

export default {
  data: () => ({
    valid: false,
    name: 'Дмитрий',
    lastName: 'Владышников',
    email: 'dimavladu1@mail.ru',
    nameRules: [
      v => !!v || 'Введите Имя.',
      v => (v && v.length >= 3) || `Минимально доспустимо 3 символа`,
      v => (v && v.length <= 10) || `Максимум доспустимо 10 символов`
    ],
    lastNameRules: [
      v => !!v || 'Введите вашу Фамилию.',
      v => (v && v.length >= 3) || `Минимально доспустимо 3 символа`,
      v => (v && v.length <= 20) || `Максимум доспустимо 10 символов`
    ],
    emailRules: [
      v => !!v || 'Введите ваш e-mail.',
      v => /.+@.+/.test(v) || `Введите корректный E-mail`,
    ],
  }),
  components: {}
}
</script>

<style scoped>

</style>