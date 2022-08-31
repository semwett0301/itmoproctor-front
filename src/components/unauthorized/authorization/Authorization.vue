<template>
  <div class="auth-container">
    <div class="input-container">
      <InputText placeholder="Имя пользователя" v-model="username"/>
      <i class="pi pi-user"></i>
    </div>
    <div class="input-container">
      <InputText placeholder="Пароль" v-model="password" type="password"/>
      <i class="pi pi-lock"></i>
    </div>
    <Button label="Вход" @click="login"/>
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

      this.$router.push("/")
    }
  },
}
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.auth-container * {
  margin-top: 10px;
  width: 20em
}

.auth-container input {
  text-align: center;
  vertical-align: center;
}

.input-container i {
  position: absolute;
  left: 10px;
  top: 25%;

  width: auto;
}

.input-container {
  position: relative;
  width: 20em;
}
</style>
