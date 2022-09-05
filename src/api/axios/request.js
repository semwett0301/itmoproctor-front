import mainInstance from "@/api/axios/init/main-instance";
import profile from "@/api/axios/modules/profile";
import auth from "@/api/axios/modules/auth";
import organization from "@/api/axios/modules/admin/organization";

export default {
    auth: auth(mainInstance),
    profile: profile(mainInstance),
    organization: organization(mainInstance)
}

