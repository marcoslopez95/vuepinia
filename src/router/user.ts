import { ROLES } from "@/interfaces/Role/Role.enum"
import type { RouteRecordRaw } from "vue-router"
import { checkedRole } from "./middleware"

const security: RouteRecordRaw[] = []

const generals: RouteRecordRaw[] = [
    {
        name: "user-buy",
        path: "/user/buy",
        component: () =>
            import("@/views/admin/kyc/Kyc.vue"),
        meta: {
            roles: [
                ROLES.USER
            ]
        },
        beforeEnter: checkedRole
    },
    {
        name: "user-sell",
        path: "/user/sell",
        component: () =>
            import("@/views/admin/users/UsersView.vue"),
        meta: {
            roles: [
                ROLES.USER
            ]
        },
        beforeEnter: checkedRole
    },
    {
        name: "user-transactions",
        path: "/user/transactions",
        component: () =>
            import("@/views/admin/users/UsersView.vue"),
        meta: {
            roles: [
                ROLES.USER
            ]
        },
        beforeEnter: checkedRole
    },
    {
        name: "user-referred",
        path: "/user/referred",
        component: () =>
            import("@/views/admin/users/UsersView.vue"),
        meta: {
            roles: [
                ROLES.USER
            ]
        },
        beforeEnter: checkedRole
    },
]

const configurations: RouteRecordRaw[] = [
    {
        name: "user-profile",
        path: "/user/profile",
        component: () =>
            import("@/views/admin/configurations/ConfigurationView.vue"),
        meta: {
            roles: [
                ROLES.USER
            ]
        },
        beforeEnter: checkedRole
    },
]
export default [
    ...security,
    ...generals,
    ...configurations,
]

