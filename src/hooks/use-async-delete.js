import {ref} from "vue";

export function useAsyncGet(asyncFunction, deletedObjectId) {

    const error = ref('');

    async function deleteWrapper() {
        await asyncFunction(deletedObjectId)
            .catch(e => {
                error.value = e.message !== undefined ? e.message : e
            })
    }

    return {
        deleteWrapper,
        error
    }
}
