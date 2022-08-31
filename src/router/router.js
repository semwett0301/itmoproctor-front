import {createRouter, createWebHistory} from "vue-router";
import Authorization from "@/components/unauthorized/authorization/Authorization";
import store from "@/store/index"
import auth_config from "@/config/auth-config"
import Installing from "@/components/unauthorized/installing/Installing";
import Student from "@/components/student/Student";
import Proctor from "@/components/proctor/Proctor";
import Admin from "@/components/admin/Admin";
import studentModule from "@/router/modules/student-module";
import adminModule from "@/router/modules/admin-module";
import moduleModifier from "@/utils/modifiers/router-module-modifier"
import request from "@/api/axios/request";

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
        component: Admin,
        children: [
            ...moduleModifier(adminModule, "admin")
        ]
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
        await request.profile.getProfileBySession()
            .then(r => {
                store.dispatch('user/setUserInfo', r.data);
            })
            .catch(() => {
                console.log("Данные не были обновлены")
                store.commit("setIsDefault", false)
            })
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
