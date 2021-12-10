<template>
  <div>
    <loader v-if="loading"/>
    <v-container v-else-if="!loading">
      <h5 class="text-h5 font-weight-light ml-4 my-4" v-text="'Мои файлы'"/>
        <v-divider/>
      <div class="d-flex align-self-center">
        <v-btn
            v-if="!!currentDir"
            @click.stop="previousDir"
            color="grey"
            class="my-3 ml-5"
            icon>
          <v-icon v-text="'mdi-arrow-left'"/>
        </v-btn>
        <v-btn
            @click.stop="isDialog= true"
            color="primary"
            class="my-3 ml-5"
            icon>
          <v-icon v-text="'mdi-folder-plus'"/>
        </v-btn>
        <v-file-input
            class="ml-6"
            hide-input
            @change="fileUpload"
            multiple
            prepend-icon="mdi-plus"/>
      </div>
      <files v-if="files.length" @nextDir="nextDir" :files="files"/>
      <h6 v-else class="text-h6 font-weight-light text-center" v-text="'Файлов пока нет'"/>
<!--      <files :files="files" :folders="folders"/>-->
    </v-container>
    <v-dialog v-model="isDialog" max-width="290">
      <v-card>
        <v-card-title class="text-h5" v-text='"Новая папка"'/>
          <v-text-field
              @keydown.enter="createDir"
              v-model="dir.name"
              placeholder="Введите название папки"
              class="mx-7"
              :error-messages="message"
          />
        <v-card-actions>
          <v-spacer/>
          <v-btn @click="createDir" color="green darken-1" text v-text="'Создать'"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import files from '../components/files/files'
import myBtn from '../components/files/my-btn'
import loader from '../components/app/loader'
import {mapState} from 'vuex'

export default {
  async mounted(){
    this.loading = true
    await this.changeDir()
    this.loading = false
  },
  watch:{
    async id(){await this.changeDir()},
    isDialog(){
      if(this.isDialog === false){
        this.dir.name = ''
        this.dir.parent = ''
      }
    }
  },
  computed:{
    ...mapState({
      files: state => state.file.files,
      currentDir: state => state.file.currentDir
    }),
    id(){return this.$route.params.id ? this.$route.params.id : ''},
  },
  data: () =>({
    loading: false,
    isDialog: false,
    message: '',
    dir:{
      name: '',
      parent: '',
      type: 'dir'
    }
  }),
  methods:{
    async fileUpload(event){
      const files = [...event]
      for (const file of files) await this.$store.dispatch('file/uploadFile', file)
    },
    async changeDir(){
      if (!!this.id) await this.$store.dispatch('file/getFile', this.id)
      else await this.$store.dispatch('file/getFile')
      this.$store.commit('file/setDir', this.id)
    },
    previousDir(){
      this.$router.go(-1)
    },
    async nextDir(id){
      await this.$store.dispatch('file/getFile', id)
      this.$store.commit('file/setDir', id)
      await this.$router.push({name: 'Folder', params:{id}})
    },
    async createDir(){
      try {
        if (this.dir.name &&
            !this.dir.name.includes('/' || '?' || ':' || '*' || '<' || '>' || '|')){
          this.dir.parent = this.$store.state.currentDir
          await this.$store.dispatch('file/createDir', this.dir)
          this.isDialog = false
        }
        else this.message = 'Введите корректное имя папки'
      }catch (e) {
        console.log(e)
      }
    }
  },
  components: {files, myBtn, loader}
}
</script>

<style scoped>

</style>