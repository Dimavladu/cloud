<template>
  <div>
    <v-container>
      <h5 class="text-h5 font-weight-light mb-2">Мои файлы</h5>
      <v-divider/>
      <v-card
          class="mx-auto"
      >
        <v-row dense>
          <v-col
              v-for="card in cards"
              :key="card.title"
              :cols="card.flex"
          >
            <v-card height="" class="d-flex justify-center">
              <v-btn icon class="">
                <v-icon large class="align-content-center">
                  mdi-folder
                </v-icon>
              </v-btn>

<!--              <v-card-actions>-->
<!--                <v-spacer></v-spacer>-->
<!--                <v-btn icon>-->
<!--                  <v-icon>mdi-heart</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn icon>-->
<!--                  <v-icon>mdi-bookmark</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn icon>-->
<!--                  <v-icon>mdi-share-variant</v-icon>-->
<!--                </v-btn>-->
<!--              </v-card-actions>-->
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () =>({
    cards: [
      { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 2 },
      // { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 3 },
      // { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 3 },
    ]
  })
}
</script>

<style scoped>

</style>