<template>
  <div>
    <button @click="login">fsdfdsfdsfde</button>
    <button @click="getUser">vcv</button>
    <button @click="logout">vcxzvcx</button>
    <h1>{{ user._id }}</h1>
  </div>
</template>

<script>

import request from "@/api/axios/request";
import {mapState, mapActions} from "vuex"

export default {
  name: 'App',
  methods: {
    ...mapActions({
      setUserInfo: "user/setUserInfo",
      setDefaultUserInfo: "user/setDefaultUserInfo",
      updateUserInfo: "user/updateUserInfo",
      sendUserInfo: "user/sendUserInfo"
    }),
    async login() {
      await request.auth.login({
        username: "student1",
        password: "zstudent1"
      }).then(r => {
        console.log(r.data);
        this.setUserInfo(r.data)
      }).catch(e => {
        console.log(e)
      })
    },
    async logout() {
      await request.auth.logout(this.id);
      this.setDefaultUserInfo();
    },

    async getUser() {
      await this.updateUserInfo;
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user_info,
    })
  }
}
</script>

<style>

</style>
