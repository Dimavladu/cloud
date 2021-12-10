<template>
  <div>
    <v-card class="mx-auto">
      <slot/>
      <v-list  subheader two-line>
        <v-list-item
            v-for="(folder, i) in folders"
            :key="folder.id"
            @click="folder.type === 'dir' ? nextDir(folder.id) : ''"
        >
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark v-text="'mdi-folder'"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="folder.name"/>
            <v-list-item-subtitle v-text="folder.date.slice(0, 10)"/>
          </v-list-item-content>

          <v-list-item-action
              @click.stop="folder.dialog = true">
            <my-btn color="red" icon="mdi-delete-forever"/>
          </v-list-item-action>
          <v-dialog @keydown.enter="deleteFile(folder.id, [i, folder])" v-model="folder.dialog" max-width="290">
            <v-card>
              <v-card-title class="text-h5" v-text="folder.name"/>
              <v-card-text v-text="'Вы действительно хотите удалить эту папку?'"/>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                    class="mb-2"
                    @click="deleteFile(folder.id, [i, folder])"
                    color="red "
                    v-text="'Удалить'"/>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>

        <v-divider v-if="thisFiles.length"/>
        <v-list-item v-if="thisFiles.length" v-for="(file, i) in thisFiles" :key="file.id">
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark icon v-text="'mdi-file-document-outline'"/>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="file.name"/>
            <v-list-item-subtitle v-text="file.date.slice(0, 10)"/>
          </v-list-item-content>
          <v-list-item-action-text class="mx-3" v-text="fileSize(file.size)"/>
          <v-list-item-action @click.stop="$store.dispatch('file/downloadFile', file)">
            <my-btn color="green" icon="mdi-download"/>
          </v-list-item-action>
          <v-list-item-action @click.stop="file.dialog = true">
            <my-btn color="red" icon="mdi-delete-forever"/>
          </v-list-item-action>
          <v-dialog @keydown.enter="deleteFile(file.id, [i, file])" v-model="file.dialog" max-width="290">
            <v-card>
              <v-card-title class="text-h5" v-text="file.name"/>
              <v-card-text v-text="'Вы действительно хотите удалить этот файл?'"/>
              <v-card-actions>
                <v-spacer/>
                <v-btn
                    @click="deleteFile(file.id, [i, file])"
                    color="red "
                    v-text="'Удалить'"/>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-list-item>
      </v-list>
    </v-card>

  </div>
</template>
<script>
import myBtn from './my-btn'

export default {
  props: {
    files: Array
  },
  computed:{
    folders(){return this.files.filter(file => file.type === "dir")},
    thisFiles(){return this.files.filter(file => file.type !== "dir")},
    icons(type){
      Object.entries(this.icons).forEach(([i, icon])=>{
        console.log(i)
        console.log(icon)
      })
      console.log(type)
      return type
    }
    // isDeleteFolderDialog(){
    //   this.deleteFolderDialog.length = this.folders.length
    //   return this.deleteFolderDialog.fill(false)
    // },
    // isDeleteFileDialog(){
    //   this.deleteFileDialog.length = this.thisFiles.length
    //   return this.deleteFileDialog.fill(false)
    // }
  },
  data: () =>({
    downloadDialog: false,
    icons: {
      pptx: 'mdi-file-powerpoint',
      ppt: 'mdi-file-powerpoint'
    }
  }),
  methods:{

      fileSize(size) {
        if (size >= 1024) return (size / 1024).toFixed(2) + ' Мб'
        else if (size >= 1024 ** 2) return (size / 1024 ** 2).toFixed(2) + ' Гб'
        else return size.toFixed(2) + ' Кб'
      },
      nextDir(id){
        this.$emit('nextDir', id)
      },
      deleteFile(id, [i, file]){
        this.files[i].dialog = false
        this.$store.dispatch('file/deleteFile', [id, file])
      }
  },
  components:{myBtn}
}
</script>

<style scoped>

</style>