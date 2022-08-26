<template>
  <div>
    <InputText placeholder="username" v-model="username"/>
    <InputText placeholder="password" v-model="password" type="password"/>
    <Button label="Залупа" @click="login"/>
    <Button label="Пупа" @click="logout"/>
    <h1>{{id}}</h1>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
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
    },
    async logout() {
      await request.auth.logout(this.id)
    }
  },
  computed: {
    ...mapState({
      id: state => state.user.user_info._id,
    })
  }
}
</script>

<style scoped>

</style>
