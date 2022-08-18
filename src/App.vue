<template>
  <div>
    <button @click="login">fsdfdsfdsfde</button>
  </div>
</template>

<script>

import request from "@/api/axios/request";

export default {
  name: 'App',
  methods: {
    async login() {
      await request.auth.login({
        username: "student1",
        password: "zstudent1"
      }).then(r => {
        console.log(r)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style>

</style>
