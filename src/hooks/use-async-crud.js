import {onMounted, ref} from "vue";

export function useAsyncCrud(asyncFunction, isList = false, onMount = false, params = []) {
    const data = ref([]);

    const functionWrapper = async () => {
        await asyncFunction(...params)
            .then(r => {
                console.log(r);
                if (isList) {
                    data.value = r.data.rows
                } else {
                    data.value = r.data
                }
            })
            .catch(e => {
                console.log(`Асинхронная функция не выполнена\nПолучена ошибка ${e}`)
            })
    }

    if (onMount) {
        onMounted(functionWrapper)
        return data
    } else {
        return {
            data,
            functionWrapper
        }
    }
}
