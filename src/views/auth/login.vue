<template>
    <div class="">
      <v-container>
        <v-sheet
            class="mx-auto"
            color="white"
            elevation="16"
            height="300"
            width="400"
        >
          <v-card-title class="ma-3">
            Логин
          </v-card-title>
           <v-row class="mx-5">
             <v-col
                 cols="10"
                 md="12">
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
                     @click.stop="$router.push('/register')"
                     text>
                Зарегистрироваться
              </v-btn>
              <v-btn
                  class="float-end primary ma-5"
                  @click="$router.push('/')"
              >Войти</v-btn>
            </div>
        </v-sheet>
      </v-container>
    </div>
</template>
<script>
export default {

}
</script>