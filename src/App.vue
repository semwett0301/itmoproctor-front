<template>
  <div>
    <router-view/>
    <Button label="Выход" @click="logout"/>
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

</style>
