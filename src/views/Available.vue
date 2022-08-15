<template>
  <div>
    <v-container class="">
      <h5 class="text-h5 font-weight-light my-4">Доступные мне</h5>
        <v-divider/>
        <files :files="files" :folders="folders" />
    </v-container>
  </div>
</template>

<script>
import files from '../components/files/files'

export default {
  data: () =>({
   
  }),
  components: {files}
}
</script>

<style scoped>

</style>