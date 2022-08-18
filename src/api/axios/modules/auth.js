export default function (instance){
    return {
        login(data) {
            return instance.post('/profile', data, {
                withCredentials: false
            })
        },
        logout(user_id) {
            return instance.delete(`/profile/${user_id}`)
        }
    }
}
