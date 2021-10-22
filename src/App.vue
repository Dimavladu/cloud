<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="toggle = !toggle"/>
        <v-toolbar-title class="font-weight-light">
          Beer-cloud
        </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
        v-model="toggle"
        absolute
        temporary
    >
      <v-list-item>
        <v-btn
            icon
            x-large
            @click="$router.push('/user')"
            class="mx-2"
        >
          <v-avatar color="primary" size="48">
            <span class="white--text text-h5" v-text="user.initials"/>
          </v-avatar>
        </v-btn>
        <v-list-item-content @click="">
          <v-list-item-title class="text-h6" v-text="user.name"/>
          <v-list-item-subtitle v-text="user.role"/>
        </v-list-item-content>
      </v-list-item>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item
              v-for="(item, i) in listItems"
              @click="$router.push(item.path)"
              :key="i">
            <ListItem :item="item"/>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Files from './components/files'
import ListItem from './components/list-item'

export default {
  name: 'App',

  data: () => ({
    toggle: false,
    user: {
      initials: 'ДВ',
      name: 'Дмитрий',
      lastName: 'Владышников',
      email: 'dimavladu1@mail.ru',
      role: 'Пользователь'
    },
    listItems: [
      {
        name: 'Мой диск',
        icon: 'mdi-home',
        path: '/'
      },
      {
        name: 'Доступные мне',
        icon: 'mdi-account-group',
        path: '/another'
      },
      {
        name: 'О нас',
        icon: 'mdi-information',
        path: '/about'
      },
    ]
  }),
  methods:{
    click(name){
      console.log(name)
    }
  },
  components: {Files, ListItem}
};
</script>
