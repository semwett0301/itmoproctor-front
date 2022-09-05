export default function (instance){
    return {
        getListOfOrganizations() {
            return instance.get('admin/organizations')
        },

        getOrganization(orgId) {
            return instance.get(`organization/${orgId}`)
        },

        addOrganization(newOrg) {
            return instance.post('organization', newOrg)
        },

        removeOrganization(orgId) {
            return instance.delete(`organization/${orgId}`)
        },

        updateOrganization(orgId, data) {
            return instance.put(`organization/${orgId}`, data)
        }
    }
}
