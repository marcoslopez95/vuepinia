import { ROLES } from "@/interfaces/Role/Role.enum"
import type { RouteRecordRaw } from "vue-router"
import { checkedRole, checkedVerificationsUser } from "./middleware"
import { VERIFICATEDS } from "@/interfaces/User/User.enum"

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
            ],
            verificateds: [
                VERIFICATEDS.EMAIL,
                VERIFICATEDS.PHONE
            ]
        },
        beforeEnter: [
            checkedRole,
            checkedVerificationsUser
        ]
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
            ],
            verificateds: [
                VERIFICATEDS.EMAIL,
                VERIFICATEDS.PHONE
            ]
        },
        beforeEnter: [
            checkedRole,
            checkedVerificationsUser
        ]
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
            ],
            verificateds: [
                VERIFICATEDS.EMAIL,
                VERIFICATEDS.PHONE
            ]
        },
        beforeEnter: [
            checkedRole,
            checkedVerificationsUser
        ]
    },
    {
        name: "user-buy",
        path: "/user/buy",
        component: () =>
            import("@/views/user/Compra/CompraView.vue"),
        meta: {
            roles: [
                ROLES.USER
            ],
            verificateds: [
                VERIFICATEDS.EMAIL,
                VERIFICATEDS.PHONE
            ]
        },
        beforeEnter: [
            checkedRole,
            checkedVerificationsUser
        ]
    },
    {
        name: "user-sell",
        path: "/user/sell",
        component: () =>
            import("@/views/user/Venta/VentaView.vue"),
        meta: {
            roles: [
                ROLES.USER
            ],
            verificateds: [
                VERIFICATEDS.EMAIL,
                VERIFICATEDS.PHONE
            ]
        },
        beforeEnter: [
            checkedRole,
            checkedVerificationsUser
        ]
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
            ],
            verificateds: [
                VERIFICATEDS.EMAIL,
                VERIFICATEDS.PHONE
            ]
        },
        beforeEnter: [
            checkedRole,
            checkedVerificationsUser
        ]
    },
]

const configurations: RouteRecordRaw[] = [
    {
        name: "user-profile",
        path: "/user/profile",
        redirect:{ name: 'user-personal-data'},
        component: () =>
            import("@/views/user/Profile.vue"),
        children: [
            {
                name: 'user-personal-data',
                path: 'personal-data',
                component: () => import('@/views/user/Profile/PersonalData.vue')
            },
            {
                name: 'user-wallets',
                path: 'wallets',
                component: () => import('@/views/user/wallet/WalletView.vue')
            },
            {
                name: 'user-bank-accounts',
                path: 'bank-accounts',
                component: () => import('@/views/user/Accounts/Bank/BankAccountView.vue')
            },
            {
                name: 'user-other-accounts',
                path: 'other-accounts',
                component: () => import('@/views/user/Accounts/Other/OtherAccountView.vue')
            },
            {
                name: 'user-referreds',
                path: 'referreds',
                component: () => import('@/views/user/Refer/ReferredView.vue')
            },
            {
                name: 'user-password',
                path: 'password',
                component: () => import('@/views/admin/profile/PasswordTab.vue')
            },
            {
                name: 'user-kyc',
                path: 'kyc',
                component: () => import('@/views/user/Kyc/KycView.vue')
            },
        ],
        meta: {
            roles: [
                ROLES.USER
            ]
        },
        beforeEnter: checkedRole
    },
    {
        name: "bussiness",
        path: "/user/bussiness",
        component: () =>
            import("@/views/user/Bussiness/IndexComponent.vue"),
        meta: {
            roles: [
                ROLES.USER
            ],
            verificateds: [
                VERIFICATEDS.EMAIL,
                VERIFICATEDS.PHONE
            ]
        },
        beforeEnter: [
            checkedRole,
            checkedVerificationsUser
        ]
    },
]
export default [
    ...security,
    ...generals,
    ...configurations,
]

