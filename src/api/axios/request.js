import instance from "@/api/axios/init/instance";
import profile from "@/api/axios/modules/profile";
import auth from "@/api/axios/modules/auth";

export default {
    auth: auth(instance),
    profile: profile(instance)
}

