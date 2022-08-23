import store from "@/store/index"

export default {
    401: {
        name: "Требуется авторизация",
        callback: () => {
            store.dispatch("user/dropUserInfo")
                .catch(e => {
                    throw `Произошла ошибка при возвращении к дефолтному состоянию в поле user внутри storage по причине:\n${e.message}`
                })
        }
    }
}
