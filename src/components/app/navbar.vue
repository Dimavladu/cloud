<template>
  <div>
    <v-app-bar app color="primary" dark height="65" class="pr-3">
      <v-container class="d-flex">
        <v-row>
          <v-col class="ml-2 d-flex my-auto" cols="3" md="3">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-progress-linear
                    color="light-blue"
                    class="ml-2 "
                    height="30"
                    :value="diskSize"
                    striped
                    rounded
                    disabled=""
                    v-bind="attrs"
                    v-on="on"
                >
                  <strong v-text="diskSize.toFixed() + '%'"/>
                </v-progress-linear>
              </template>
              <span>{{$store.state.auth.user.usedSpace}}/{{$store.state.auth.user.diskSpace}} Кб</span>
            </v-tooltip>
          </v-col>
          <v-col class="pt-7" cols="5" md="3" offset="1">
           <v-text-field placeholder="Поиск" v-model="search">
  
           </v-text-field>
         </v-col>
          <v-col class="my-auto ml-auto" cols="auto" >
            <v-btn
                v-if="$route.path!=='/user'"
                icon x-large
                @click.stop="$router.push('/user')"
                class="mx-2 "
            >
              <v-avatar color="grey" size="48">
                <span class="white--text text-h5" v-text="initials"/>
              </v-avatar>
            </v-btn>
            <v-btn
                v-else-if="$route.path==='/user'"
                icon
                x-large
                @click.stop="$router.push('/my')"
                class="mx-2"
            >
              <v-icon v-text="'mdi-home'"/>
            </v-btn>
            <v-btn @click="logout" icon>
              <v-icon color="white" v-text="'mdi-exit-to-app'"/>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <snackbar/>

      <v-banner
          v-if="showFileProgress"
          class="p-fixed"
          elevation="10"
          color="blue lighten-5"
          max-width="300px"
      >
        <v-container class="pa-0">
          <v-row class="py-0">
            <v-col class="pa-0">
              <v-btn @click="hideProgress" class="float-right" icon>
                <v-icon v-text="'mdi-close'"/>
              </v-btn>
            </v-col>
          </v-row>
          <v-row
              v-for="file in progressFiles"
              :key="file.id"
              class="mr-1 my-0 pb-1 d-flex"
          >
            <v-col class="py-0" cols="10">
                <div class="my-text" v-text="file.name"/>
                <v-progress-linear :value="file.percent"/>
            </v-col>
          </v-row>
        </v-container>
      </v-banner>
    </div>

</template>

<script>
import snackbar from "./snackbar";
import {mapGetters} from 'vuex'

export default {
  methods:{
    logout(){
      this.$store.commit('auth/logout')
      this.$router.push('/login')
    },
    hideProgress(){
      this.$store.commit('file/changeShowFileProgress', false)
      this.$store.commit('file/clearFileProgress')
      //ПОСЛЕ ЗАКРЫТИЯ БАННЕРА С ЗАГРУЗКОЙ ОН БОЛЬШЕ НЕ ПОЯВЛЯЕТСЯ И ФАЙЛЫ НЕ ЗАГРУЖАЮТСЯ
    },
  },

  data: () => ({
    search: '',
    toggle: false,
    showBanner: false,
    value: 30,
    navItems: [
      {
        name: 'Мой диск',
        icon: 'mdi-home',
        path: '/my'
      },
      {
        name: 'Доступные мне',
        icon: 'mdi-account-group',
        path: '/available'
      }
    ],
  }),
  computed:{
    ...mapGetters({
      user: 'auth/user',
      initials: 'auth/initials',
      progressFiles: 'file/fileProgress',
      showFileProgress: 'file/showFileProgress'
    }),
    diskSize(){
      return this.user.usedSpace/(this.user.diskSpace/100)
    }
  },
  watch:{
    search(search) {
      this.$store.commit('file/setSearch', search)
      }
  },
  components: {snackbar}
}
</script>

<style scoped>
.p-fixed{
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.my-text{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>


