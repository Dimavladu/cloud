<template>
  <v-app v-if="$route.meta.layout === 'main'">
    <Main>
      <router-view/>
    </Main>
  </v-app>
  <v-app v-else-if="$route.meta.layout === 'auth'">
    <Auth>
      <router-view/>
    </Auth>
  </v-app>
</template>

<script>
import Main from '@/layouts/Main'
import Auth from '@/layouts/auth'

import route from 'vue-router'
export default {
  methods:{
    test(){
      console.log(this.$route.meta.layout)
    }
  },
  components: {Main, Auth}

};
</script>
