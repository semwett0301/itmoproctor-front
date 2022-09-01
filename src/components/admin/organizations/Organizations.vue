<template>
  <div>
        <DataTable :value="organizations" responsiveLayout="scroll">
          <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field">
            <template v-if="col.field === 'code'" #body="slotProps">
              <div class="instock">
                {{slotProps.data.code}}
              </div>
            </template>
          </Column>
        </DataTable>
  </div>
</template>

<script>
import request from "@/api/axios/request";
import {useAsyncCrud} from "@/hooks/use-async-crud";

export default {
// eslint-disable-next-line vue/multi-word-component-names
  name: "Organizations",

  data() {
    return {
      columns: [
        {field: 'code', header: 'Код'},
        {field: 'fullName', header: 'Полное имя'},
        {field: 'shortName', header: 'Сокращенное имя'},
      ]
    }
  },

  setup() {
    const data = useAsyncCrud(request.organizations.getListOfOrganizations, true, true)


    return {
      organizations: data,
    }
  }
}

</script>

<style scoped>
.instock {
  font-weight: 700;
  color: #66BB6A;
}
</style>
