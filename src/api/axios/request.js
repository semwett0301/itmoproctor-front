import mainInstance from "@/api/axios/init/main-instance";
import profile from "@/api/axios/modules/profile";
import auth from "@/api/axios/modules/auth";

export default {
    auth: auth(mainInstance),
    profile: profile(mainInstance)
}

