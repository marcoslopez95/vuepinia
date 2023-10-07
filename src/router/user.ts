import { ROLES } from "@/interfaces/Role/Role.enum"
import type { RouteRecordRaw } from "vue-router"
import { checkedRole } from "./middleware"

const security: RouteRecordRaw[] = []

const generals: RouteRecordRaw[] = [
    {
        name: "user-timeline",
        path: "/user/timeline/:numTransaction",
        props: true,
        component: () =>
            import("@/views/user/Timeline/TimelineView.vue"),
        meta: {
            roles: [
                ROLES.USER
            ]
        },
        beforeEnter: checkedRole
    },
    {
        name: "user-check-buy",
        path: "/user/check-buy/:numTransaction",
        props: true,
        component: () =>
            import("@/views/user/Compra/CheckBuy/CheckBuy.vue"),
        meta: {
            roles: [
                ROLES.USER
            ]
        },
        beforeEnter: checkedRole
    },
    {
        name: "user-check-sell",
        path: "/user/check-sell/:numTransaction",
        props: true,
        component: () =>
            import("@/views/user/Venta/CheckBuy/CheckBuy.vue"),
        meta: {
            roles: [
                ROLES.USER
            ]
        },
        beforeEnter: checkedRole
    },
    {
        name: "user-buy",
        path: "/user/buy",
        component: () =>
            import("@/views/user/Compra/CompraView.vue"),
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
            import("@/views/user/Venta/VentaView.vue"),
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
            import("@/views/user/transactions/TransactionsView.vue"),
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
            import("@/views/user/Refer/UserReferredView.vue"),
        meta: {
            roles: [
                ROLES.USER
            ]
        },
        beforeEnter: checkedRole
    },
    {
        name: "user-referred-list",
        path: "/user/referred-list",
        component: () =>
            import("@/views/user/Refer/UsersReferredList.vue"),
        meta: {
            roles: [
                ROLES.USER
            ]
        },
        beforeEnter: checkedRole
    },
    {
        name: "wallet-xcop",
        path: "/wallet-xcop",
        component: () =>
            import("@/views/user/walletXCOP/WalletXCOPView.vue"),
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
            import("@/views/user/Profile.vue"),
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

