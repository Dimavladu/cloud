<template>
  <div class="">
    <v-container>
      <h5 class="text-h5 font-weight-light my-4 justify-start">Мои файлы</h5>
      <v-divider/>
      <files :files="files"/>
    </v-container>
  </div>
</template>

<script>
import files from '../components/files/files'
import myBtn from '../components/files/my-btn'

export default {
  async mounted() {
    this.loading = true
    await this.$store.dispatch('file/getFile', this.$route.params.id)
    this.loading = false
  },
  computed:{
    files(){return this.$store.state.file.files},
  },
  data: () =>({
    loading: false
  }),
  components: {files, myBtn}
}
</script>