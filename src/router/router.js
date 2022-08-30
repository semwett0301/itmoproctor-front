import {createRouter, createWebHistory} from "vue-router";
import Authorization from "@/components/unauthorized/authorization/Authorization";
import store from "@/store/index"
import auth_config from "@/config/auth-config"
import Installing from "@/components/unauthorized/installing/Installing";
import Student from "@/components/student/Student";
import Proctor from "@/components/proctor/Proctor";
import Admin from "@/components/admin/Admin";
import studentModule from "@/router/modules/student-module";
import moduleModifier from "@/utils/modifiers/router-module-modifier"

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
        component: Student,
        children: [
            ...moduleModifier(studentModule, "student")
        ]
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
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach(async (to, from, next) => {
    if (to.name === "dist") {
        next()
    }

    const user = store.state.user.user_info

    if (user.isDefault) {
        await store.dispatch("user/updateUserInfo")
    }

    const roleNames = Object.values(auth_config.roles);
    const userRole = user.role
    const userRoleName = auth_config.roles[userRole];
    if (roleNames.indexOf(userRoleName) !== -1) {
        if (to.name !== undefined && to.name.indexOf(userRoleName) !== -1) {
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
