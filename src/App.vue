<template>
  <div>
    <button @click="login">fsdfdsfdsfde</button>
    <button @click="getUser">vcv</button>
    <h1>{{id}}</h1>
  </div>
</template>

<script>

import request from "@/api/axios/request";

export default {
  name: 'App',
  data() {
    return {
      id: 0,
    }
  },
  methods: {
    async login() {
      await request.auth.login({
        username: "student1",
        password: "zstudent1"
      }).then(r => {
        console.log(r.data._id);
        this.id = r.data._id
      }).catch(e => {
        console.log(e)
      })
    },

    async getUser() {
      await request.profile.getProfile(this.id).then(r => console.log(r))
    }
  }
}
</script>

<style>

</style>
