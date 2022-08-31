import {ref, onMounted} from "vue";

export function useDataList(asyncFunction, params = []) {
    const dataList = ref([]);
    const fetching = async () => {
        await asyncFunction(...params)
            .then(r => {
                if (Array.isArray(r)) {
                    dataList.value = r
                } else {
                    throw TypeError
                }
            })
            .catch(e => {
                throw `Функция не сработала и получила ошибку ${e}`
            })
    }

    onMounted(fetching)

    return dataList
}
