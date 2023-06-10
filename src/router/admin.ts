import type { RouteRecordRaw } from "vue-router"

const security: RouteRecordRaw[] = [
  {
    name: "admin-roles",
    path: "/security/roles",
    component: () =>
      import("@/views/admin/security/roles/RolesView.vue"),
  },
  {
    name: "admin-permissions",
    path: "/security/permissions",
    component: () =>
      import("@/views/admin/security/permissions/PermissionsView.vue"),
  },
]

const generals: RouteRecordRaw[] = [
  {
    name: "admin-kyc",
    path: "/kyc",
    component: () =>
      import("@/views/admin/kyc/Kyc.vue"),
  },
  {
    name: "admin-users",
    path: "/users",
    component: () =>
      import("@/views/admin/users/UsersView.vue"),
  },
]

const configurations: RouteRecordRaw[] = [
  {
    name: "admin-type-documents",
    path: "/conf/type-documents",
    component: () =>
      import("@/views/admin/configurations/type-documents/TypeDocumentsView.vue"),
  },
  {
    name: "admin-countries",
    path: "/conf/countries",
    component: () =>
      import("@/views/admin/configurations/countries/CountryView.vue"),
  },
  {
    name: "admin-departaments",
    path: "/conf/departaments",
    component: () =>
      import("@/views/admin/configurations/departaments/DepartamentsView.vue"),
  },
  {
    name: "admin-municipalities",
    path: "/conf/municipalities",
    component: () =>
      import("@/views/admin/configurations/municipalities/MunicipalitiesView.vue"),
  },
]
export default [
  ...security,
  ...generals,
  ...configurations,
]

