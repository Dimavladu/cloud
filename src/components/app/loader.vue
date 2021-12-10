<template>
  <div class="d-flex">
    <v-progress-circular
        class="mx-auto mt-200"
        :size="70"
        :width="7"
        color="purple"
        indeterminate
    />
  </div>
</template>

<script>
export default {
  // props:{
  //   color:{
  //     type: String,
  //     default: 'purple'
  //   }
  // }
}

</script>
<style scoped>
.mt-200{
  margin-top: 200px;
}
</style>