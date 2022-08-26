<template>
  <component :is="modal"/>
</template>

<script>
export default {
  name: "ModalView",
  props: {
    modal: Object
  }
}
</script>

<style scoped>

</style>
