<template>
  <div>
    <InputText placeholder="username" v-model="username"/>
    <InputText placeholder="password" v-model="password" type="password"/>
    <Button label="Залупа" @click="login"/>
    <h1>{{id}}</h1>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import request from "@/api/axios/request";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Authorization",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    ...mapActions({
      setUserInfo: "user/setUserInfo",
      updateUserInfo: "user/updateUserInfo"
    }),

    async login() {
      await request.auth.login({
        username: this.username,
        password: this.password
      }).then(r => {
        this.setUserInfo(r.data)
      }).catch(e => {
        console.log(e)
      })
    }
  },
}
</script>

<style scoped>

</style>
