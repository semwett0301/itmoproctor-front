import {onMounted, ref} from "vue";

export function useAsyncGet(asyncFunction, isList = false, onMount = false, mountParams = []) {
    const data = ref({});
    const error = ref("");

    async function getWrapper() {
        const args = onMount ? mountParams : arguments

        await asyncFunction(...args)
            .then(r => {
                if (isList) {
                    data.value = r.data.rows
                } else {
                    data.value = r.data
                }
            })
            .catch(e => {
                error.value = e.message !== undefined ? e.message : e
            })
    }


    if (onMount) {
        onMounted(getWrapper)
        return {
            data,
            error
        }
    }

    return {
        data,
        error,
        getWrapper
    }
}
