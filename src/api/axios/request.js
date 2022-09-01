import mainInstance from "@/api/axios/init/main-instance";
import profile from "@/api/axios/modules/profile";
import auth from "@/api/axios/modules/auth";
import organizations from "@/api/axios/modules/admin/organizations";

export default {
    auth: auth(mainInstance),
    profile: profile(mainInstance),
    organizations: organizations(mainInstance)
}

