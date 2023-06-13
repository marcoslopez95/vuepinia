import { ROLES } from "@/interfaces/Role/Role.enum"
import type { RouteRecordRaw } from "vue-router"
import { checkedRole } from "./middleware"

const security: RouteRecordRaw[] = [
  {
    name: "admin-roles",
    path: "/security/roles",
    component: () =>
      import("@/views/admin/security/roles/RolesView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole
  },
  {
    name: "admin-permissions",
    path: "/security/permissions",
    component: () =>
      import("@/views/admin/security/permissions/PermissionsView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole
  },
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
    name: "admin-type-documents",
    path: "/configurations/type-documents",
    component: () =>
      import("@/views/admin/configurations/type-documents/TypeDocumentsView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole
  },
  {
    name: "admin-countries",
    path: "/configurations/countries",
    component: () =>
      import("@/views/admin/configurations/countries/CountryView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole
  },
  {
    name: "admin-departaments",
    path: "/configurations/departaments",
    component: () =>
      import("@/views/admin/configurations/departaments/DepartamentsView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole
  },
  {
    name: "admin-municipalities",
    path: "/configurations/municipalities",
    component: () =>
      import("@/views/admin/configurations/municipalities/MunicipalitiesView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
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

