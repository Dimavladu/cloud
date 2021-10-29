<template>
  <div>
    <navbar/>
    <v-main>
      <router-view/>
    </v-main>
  </div>
</template>
<script>
import navbar from "@/components/app/navbar";

export default {
  name:'main',
  components: {navbar}

}
</script>