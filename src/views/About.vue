<template>
  <div class="">
    <v-container >
      <h5 class="text-h5 font-weight-light my-4">О нас</h5>
      <v-row class="d-flex justify-center ao">
        <v-col cols="12" md="2" >
          <v-card>
            <v-img width="160" src="@/assets/creators/1.jpg">
            </v-img>
            <v-card-text>
              <b>Дмитрий</b>
              SCRUM-мастер
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="2">
        <v-card>
            <v-img width="160" src="@/assets/creators/2.jpg">
            </v-img>
          <v-card-text class="mx-auto">
            <b>Дарья</b>
            Владелец продукта
          </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="10" md="2">
          <v-card>
            <v-img src="@/assets/creators/3.jpg">
            </v-img>
            <v-card-text class="mx-auto">
              <b>Александр</b>
              UI/UX Дизайнер
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="10" md="2">
        <v-card>
            <v-img width="160" src="@/assets/creators/4.jpg">
            </v-img>
            <v-card-text class="mx-auto">
              <b>Александр</b>
              Разработчик
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="10" md="2">
        <v-card>
            <v-img width="160" src="@/assets/creators/5.jpg">
            </v-img>
            <v-card-text class="mx-auto">
              <b>Александра</b>
              Разработчик
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-card-title class="text-h5 font-weight-light my-4">
          Описание
        </v-card-title>
        <v-card-text>
          Тут описание
        </v-card-text>
      </v-row>
    </v-container>
  </div>

</template>

<script>

export default {
  data: () =>({
    creators:[
      {
        img: '@/assets/creators/1.jpg',
        place: 'SCRUM-мастер',
        name: 'Дмитрий'
      },
      {
        img: '@/assets/creators/2.jpg',
        place: 'Владелец продукта',
        name: 'Дарья'
      },
      {
        img: '@/assets/creators/3.jpg',
        place: 'Разработчик',
        name: 'Александр'
      },
      {
        img: '@/assets/creators/4.jpg',
        place: 'Разработчик',
        name: 'Александра'
      },
      {
        img: '@/assets/creators/5.jpg',
        place: 'UX/UI Дизайнер',
        name: 'Александр'
      },
    ]

  })
}
</script>

<style scoped>
ao{
  align-items: baseline;
}
</style>