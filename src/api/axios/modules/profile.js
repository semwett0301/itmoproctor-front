export default function (instance){
    return {
        async getProfileById(user_id) {
            return instance.get(`profile/${user_id}`)
        },

        getProfileBySession() {
            return instance.get("profile");
        },

        updateProfile(user_id, data) {
            return instance.put(`profile/${user_id}`, data)
        }
    }
}
