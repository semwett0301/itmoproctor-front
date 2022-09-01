export default function (instance){
    return {
        getListOfOrganizations() {
            return instance.get('admin/organizations')
        }
    }
}
