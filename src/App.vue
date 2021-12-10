<template>

    <v-app>

      <Main v-if="$route.meta.layout === 'main'">
        <router-view/>
      </Main>
      <Auth v-else-if="$route.meta.layout === 'auth'">
        <router-view/>
      </Auth>
    </v-app>
</template>


<script>
import Main from '@/layouts/Main'
import Auth from '@/layouts/Auth'

export default {
  mounted() {
  },

  components: {Main, Auth}

};
</script>
