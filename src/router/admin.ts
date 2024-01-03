import { ROLES } from "@/interfaces/Role/Role.enum"
import type { RouteRecordRaw } from "vue-router"
import { checkedRole } from "./middleware"

const security: RouteRecordRaw[] = [
 
  
]

const generals: RouteRecordRaw[] = [
  {
    name: "admin-kyc",
    path: "/kyc",
    component: () =>
      import("@/views/admin/kyc/Kyc.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole
  },
  {
    name: "admin-kyc-bussiness",
    path: "/kyc-bussiness",
    component: () =>
      import("@/views/admin/kycBussiness/Kyc.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole
  },
  {
    name: "admin-withdrawal-xcop",
    path: "/withdrawal-xcop",
    component: () =>
      import("@/views/admin/withdrawalXcop/WithdrawalXcopView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole
  },
  {
    name: "admin-users",
    path: "/users",
    component: () =>
      import("@/views/admin/users/UsersView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    component: () =>
      import("@/views/dashboard/Dashboard.vue"),
  },

  {
    name: "admin-transactions",
    path: "/admin/transactions",
    props: true,
    component: () =>
      import("@/views/admin/transactions/TransactionView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole
  },
  {
    name: "admin-transaction-show",
    path: "/admin/transactions/:numTransaction",
    props: true,
    component: () =>
      import("@/views/admin/transactions/TransactionDetailView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole
  },
]

const configurations: RouteRecordRaw[] = [
  {
    name: "admin-configurations",
    path: "/configurations",
    component: () =>
      import("@/views/admin/configurations/ConfigurationView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole
  },
  {
    name: "admin-profile",
    path: "/admin/profile",
    component: () =>
      import("@/views/admin/profile/ProfileView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole
  },
  {
    name: "activities",
    path: "/activities",
    component: () =>
      import("@/views/admin/activities/ActivitiesView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN,
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

