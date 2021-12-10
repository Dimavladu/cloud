<template>
  <div class="text-center" v-if="snackbar">
    <v-snackbar
        v-model="snackbar"
        top
        :timeout="message.timeout"
        :color="message.color">
      {{ message.text }}
    </v-snackbar>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'

export default {
  computed:{
    ...mapGetters({
      message: 'file/fileMessage',
      snackbar: 'file/isFileMessage',
    })
  }
}
</script>