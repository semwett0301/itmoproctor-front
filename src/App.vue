<template>
  <div>
    <Authorization/>
  </div>
</template>

<script>
import Authorization from "@/components/unauthorized/authorization/Authorization";
export default {
  name: 'App',
  components: {Authorization},
  mounted() {
    this.$store.dispatch("user/updateUserInfo")
  }
}
</script>

<style>

</style>
