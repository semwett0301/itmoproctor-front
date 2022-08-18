export default function (instance){
    return {
        getProfile(user_id) {
            return instance.get(`profile/${user_id}`)
        },

        updateProfile(user_id, data) {
            return instance.put(`profile/${user_id}`, data)
        }
    }
}
