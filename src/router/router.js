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
    const user = store.state.user.user_info

    const roleNames = Object.values(auth_config.roles);
    if (Object.keys(user).length === 0) {
        await store.dispatch("user/updateUserInfo")
        console.log(user)
    }

    const userRole = String(user.role)
    const userRoleName = auth_config.roles[userRole];
    console.log(userRoleName)
    if (roleNames.indexOf(userRoleName) !== -1) {
        if (to.name.indexOf(userRoleName) !== -1) {
            next();
        } else {
            next({
                name: auth_config.roles[userRole]
            })
        }
    } else {
        next("dist")
    }
})

export default router
