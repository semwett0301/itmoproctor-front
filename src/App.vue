<template>
  <div>
    <router-view/>
    <Button class="logout" label="Выход" @click="logout"/>
  </div>
</template>

<script>

import request from "@/api/axios/request";
import {mapState} from "vuex";

export default {
  name: 'App',
  methods: {
    async logout() {
      await request.auth.logout(this.id)
      this.$store.dispatch('user/dropUserInfo')
      this.$router.push({
        path: "/login"
      })
    }
  },
  computed: {
    ...mapState({
      id: state => state.user.user_info._id,
    })
  },
}
</script>

<style>
  .logout {
    margin-top: 20px
  }
</style>
