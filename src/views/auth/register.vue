<template>
  <div class="">
    <v-container>
      <v-sheet
          class="mx-auto"
          color="white"
          width="400"
          elevation="16"
      >
        <v-card-title class="ma-3">
          Регистрация
        </v-card-title>
        <v-row class="mx-5">
          <v-col
              cols="10"
              md="12">
            <v-text-field
                label="Имя"
                :counter="10"
                hide-details="auto"
            ></v-text-field>
            <v-text-field
                label="Фамилия"
                :counter="20"
                hide-details="auto"
            ></v-text-field>
            <v-text-field
                label="Email"
                :counter="10"
                hide-details="auto"
            ></v-text-field>
            <v-text-field
                label="Пароль"
                :counter="10"
                hide-details="auto"
            ></v-text-field>
          </v-col>
        </v-row>

        <div class="d-flex">
          <v-btn class="ma-5"
                 @click.stop="$router.push('/login')"
                 text>
            Войти
          </v-btn>
          <v-btn
              class="float-end primary ma-5"
              @click="$router.push('/login')"
          >Зарегистрироваться</v-btn>
        </div>
      </v-sheet>
    </v-container>
  </div>
</template>
<script>
export default {

}
</script>