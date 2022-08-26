import {createRouter, createWebHistory} from "vue-router";
import Authorization from "@/components/unauthorized/authorization/Authorization";
import store from "@/store/index"
import auth_config from "@/config/auth-config"
import NotFound from "@/components/unauthorized/errors/NotFound";
import Installing from "@/components/unauthorized/installing/Installing";
import Student from "@/components/student/Student";
import Proctor from "@/components/proctor/Proctor";
import Admin from "@/components/admin/Admin";

const routes = [
    {
        path: "/login",
        name: "unauthorized",
        component: Authorization
    },
    {
        path: "/dist",
        name: "dist",
        component: Installing
    },
    {
        path: "/student",
        name: "student",
        component: Student
    },
    {
        path: "/proctor",
        name: "proctor",
        component: Proctor
    },
    {
        path: "/admin",
        name: "admin",
        component: Admin
    },
    {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: NotFound,
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach(async (to, from, next) => {
    if (to.name === "dist") {
        next();
    }

    await store.dispatch("user/updateUserInfo")

    const user = store.state.user.user_info

    if (auth_config.roles[user.role.toString()] !== undefined) {
        Object.keys(auth_config.roles).forEach(
            role => {
                if (user.role.toString() === role) {
                    if (to.name !== auth_config.roles[role]) {
                        next(auth_config.roles[role])
                    } else {
                        next()
                    }
                }
            }
        )
    } else {
        next("dist")
    }

    // switch (user.role) {
    //     case auth_config.roles.unauthorized:
    //         if (to.name !== "login") {
    //             next("login")
    //         } else {
    //             next()
    //         }
    //         break;
    //
    //     case auth_config.roles.student:
    //         if (!to.name.toString().startsWith("student")) {
    //             next("student");
    //         } else {
    //             next()
    //         }
    //         break;
    //     case auth_config.roles.proctor:
    //         if (!to.name.toString().startsWith("proctor")) {
    //             next("proctor");
    //         } else {
    //             next()
    //         }
    //         break;
    //
    //     case (auth_config.roles.admin || auth_config.roles.system_admin):
    //         if (!to.name.toString().startsWith("admin")) {
    //             next("admin");
    //         }
    //         break;
    //
    //     default:
    //         next("dist")
    //         break;
    // }
})

export default router
