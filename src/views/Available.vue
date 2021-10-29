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
    files: [
      {
        color: 'blue',
        icon: 'mdi-file-document',
        subtitle: 'Октябрь 20, 2021',
        title: 'РГР Мат анализ',
      },
      {
        color: 'green',
        icon: 'mdi-file-excel',
        subtitle: 'Октябрь 29, 2021',
        title: 'Ковариация',
      },
      {
        color: 'red',
        icon: 'mdi-file-powerpoint',
        subtitle: 'Октябрь 17, 2021',
        title: 'Управление проектами',
      },
    ],
    folders: [
      {
        subtitle: 'Октябрь 9, 2021',
        color: 'red',
        title: 'Учеба',
      },
      {
        subtitle: 'Октябрь 17, 2021',
        color: 'yellow',
        title: 'Личное',
      },
    ],
  }),
  components: {files}
}
</script>

<style scoped>

</style>