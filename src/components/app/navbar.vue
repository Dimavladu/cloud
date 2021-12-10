<template>
  <div>
    <v-app-bar app color="primary" dark height="65" class="pr-3">
      <v-row>
        <v-col class="my-auto d-flex align-baseline" cols="5" md="3" offset="1" @click="changeBeer">
          <img v-if="beer" class="my-auto pb-1" height="45" src="https://psv4.userapi.com/c532036/u108566543/docs/d4/02815d48a845/beer.gif?extra=_RZS-utCjs9x3mNDozI0cAlxmfW4jxChhNVRJwRt1pIGwimjI8Tcq-_RPdJFdJk-0DCEAmjT_6bkoLojEI57_ZmPG7A717cxWQ1L_vBgO6wFeWHoGLzaBL1zK49UJUR10OW6P6EzosFdTXfTD10dxrSBtbfy" alt="1">
          <img v-else class="my-auto pb-1" height="45" src="https://sun9-1.userapi.com/impg/8z11l5sZq7cPWQ4ZsrS4l-roFTXQrIGySL69dA/5Q2R-65cKeQ.jpg?size=100x100&quality=96&sign=db2dd7a1c66c8cf2d119c2787f743749&type=album" alt="1">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-progress-linear
                  color="light-blue"
                  class="ml-2 my-auto"
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
        <v-spacer/>
        <v-col cols="auto" >
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
<!--        <v-col cols="1" />-->
      </v-row>
    </v-app-bar>
<!--    <v-bottom-navigation-->
<!--        :value="value"-->
<!--        color="primary"-->
<!--        absolute-->
<!--    >-->
<!--      <div v-for="item in navItems">-->
<!--        <v-btn @click="$router.push(item.path)">-->
<!--          <span>{{item.name}}</span>-->
<!--          <v-icon>{{item.icon}}</v-icon>-->
<!--        </v-btn>-->
<!--      </div>-->
<!--    </v-bottom-navigation>-->
    <snackbar/>
<!--    <v-alert text color="indigo" class="p-fixed" width="300">-->
<!--      <h3 class="text-h5">-->
<!--        Lorem Ipsum-->
<!--      </h3>-->
<!--      <div class="">123</div>-->
<!--      <v-divider-->
<!--          class="my-4 info"-->
<!--          style="opacity: 0.22"-->
<!--      ></v-divider>-->
<!--    </v-alert>-->
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
<!--            <v-col class="pa-0 my-auto" cols="2">-->
<!--              <v-btn x-small class="float-right" icon>-->
<!--                <v-icon v-text="'mdi-close'"/>-->
<!--              </v-btn>-->
<!--            </v-col>-->
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
    changeBeer(){
      this.$store.dispatch('auth/setBeer')
    }
  },

  data: () => ({
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
      beer: 'auth/beer',
      progressFiles: 'file/fileProgress',
      showFileProgress: 'file/showFileProgress'
    }),
    diskSize(){
      return this.user.usedSpace/(this.user.diskSpace/100)
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


