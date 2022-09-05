<template>
  <div>
        <DataTable :value="organizations" responsiveLayout="scroll">
          <Column v-for="col of columns" :field="col.field" :header="col.header" :key="col.field" :sortable="true">
            <template v-if="col.field === 'code'" #body="slotProps">
              <div class="instock">
                {{slotProps.data.code}}
              </div>
            </template>
          </Column>
        </DataTable>
    <button @click="removeOrganizationReactive">ABC</button>
  </div>
  {{this.$store.state.user.user_info._id}}
</template>

<script>
import request from "@/api/axios/request";
import {useAsyncGet} from "@/hooks/use-async-get";

export default {
// eslint-disable-next-line vue/multi-word-component-names
  name: "Organizations",

  data() {
    return {
      columns: [
        {field: 'code', header: 'Код'},
        {field: 'fullName', header: 'Полное имя'},
        {field: 'shortName', header: 'Сокращенное имя'},
      ],
      selectedOrganization: "63121171a2ad237362f5000e"
    }
  },

  methods: {
    removeOrganizationReactive() {
      this.organizations = this.organizations.filter(
          elem => elem._id !== this.selectedOrganization
      )

      this.removeOrganization(this.selectedOrganization)
    }
  },

  setup() {
    const getOrganizationListResult = useAsyncGet(request.organization.getListOfOrganizations,  true, true, [0])

    const removOrganization


    return {
      organizations: getOrganizationListResult.data,

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
