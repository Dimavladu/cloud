<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="toggle = !toggle"/>
      <v-toolbar-title class="font-weight-light d-flex">
        <v-icon class="mx-2">mdi-glass-mug-variant</v-icon>
        BR-cloud
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
            @click.stop="$router.push('/user')"
            class="mx-2"
        >
          <v-avatar color="primary" size="48">
            <span class="white--text text-h5" v-text="user.initials"/>
          </v-avatar>
        </v-btn>
        <v-list-item-content >
          <v-list-item-title class="text-h6" v-text="user.name"/>
          <v-list-item-subtitle v-text="user.role"/>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon color="red"
                  @click="$router.push('/login')">
            mdi-exit-to-app
          </v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-list nav dense>
        <v-list-item-group active-class="primary--text text--accent-4">
          <v-list-item
              v-for="(item, i) in listItems"
              @click="$router.push(item.path)"
              :key="i">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
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
        path: '/available'
      },
      {
        name: 'О нас',
        icon: 'mdi-information',
        path: '/about'
      },
    ]
  }),
}
</script>

<style scoped>

</style>