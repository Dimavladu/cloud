<template>
  <v-btn
      :color="color"
      :class="extraStyle"
      icon>
    <v-icon>{{ icon }}</v-icon>
  </v-btn>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    icon:{
      type: String,
      default: 'Кнэпка'
    },
    extraStyle:{
      type: String,
      default: ''
    },
  }
}
</script>