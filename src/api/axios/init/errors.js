import store from "@/store/index"
import router from "@/router/router";

export default {
    401: () => {
        store.dispatch("user/dropUserInfo")
            .catch(e => {
                throw `Произошла ошибка при возвращении к дефолтному состоянию в поле user внутри storage по причине:\n${e.message}`
            })
        router.push({
            name: "login"
        })
    },
    404: () => {
        return "Запрашиваемый ресурс не найден"
    }
}
