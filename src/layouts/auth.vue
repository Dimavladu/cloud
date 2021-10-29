<template>
  <div class="">
    <v-main>
      <router-view/>
    </v-main>
  </div>

</template>
<script>
export default {
  created() {
    console.log('created')
  }
}
</script>