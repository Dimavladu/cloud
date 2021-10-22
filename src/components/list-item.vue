<template>
  <div class="d-flex">
    <v-list-item-icon>
      <v-icon>{{ item.icon }}</v-icon>
    </v-list-item-icon>
    <v-list-item-title>{{ item.name }}</v-list-item-title>
  </div>
</template>

<script>
export default {
  props:{
    item: Object
  }
}
</script>

<style scoped>

</style>