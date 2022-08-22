import {createStore} from "vuex";
import {user_info} from "@/store/modules/user-info";

export default createStore({
    modules: {
        user: user_info
    }
})
