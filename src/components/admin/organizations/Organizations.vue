<template>
  <h1>{{dataList}}</h1>
</template>

<script>
import request from "@/api/axios/request";
import {useDataList} from "@/hooks/useDataList";

export default {
// eslint-disable-next-line vue/multi-word-component-names
  name: "Organizations",

  setup() {
    const getOrganizations = async () => {
      return await request.admin.getListOfOrganizations()
    }

    const dataList = useDataList(getOrganizations)

    return {
      dataList
    }
  }
}

</script>

<style scoped>

</style>
