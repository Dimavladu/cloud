<template>
  <div>
    <v-card class="mx-auto">
      <slot/>
      <v-list subheader two-line>
        <v-list-item
            @click=""
            v-for="folder in folders"
            :key="folder.title"
        >
          <v-list-item-avatar>
            <v-icon class="lighten-1"
                    :class="folder.color ? folder.color : 'grey'"
                    dark>
              mdi-folder
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="folder.title"></v-list-item-title>
            <v-list-item-subtitle v-text="folder.subtitle"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action @click.stop="test(folder.title)">
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon>
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </template>
              <span>test</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>

        <v-divider inset></v-divider>

        <v-list-item
            v-for="file in files"
            :key="file.title"
            @click=""
        >
          <v-list-item-avatar>
            <v-icon
                :class="file.color"
                dark
                v-text="file.icon"
            ></v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="file.title"></v-list-item-title>

            <v-list-item-subtitle v-text="file.subtitle"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action @click.stop="test(file.title)">
            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on" icon>
                  <v-icon color="grey lighten-1">mdi-information</v-icon>
                </v-btn>
              </template>
              <span>test</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
    <div class="d-flex">
      <v-btn
          color="primary"
          class="mx-auto mt-5">
        Загрузить
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    files: Array,
    folders: Array
  },
  methods:{
      test(title){
        console.log(title)
      }
  },
  components:{}
}
</script>

<style scoped>

</style>