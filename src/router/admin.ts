import { ROLES } from "@/interfaces/Role/Role.enum"
import type { RouteRecordRaw } from "vue-router"
import { checkedRole } from "./middleware"


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

const security: RouteRecordRaw[] = [
  {
    name: "admin-configurations-security-roles",
    path: "/configurations/security/roles",
    component: () =>
      import("@/views/admin/security/roles/RolesView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  }
]

const ubications: RouteRecordRaw[] = [
  {
    name: "admin-configurations-ubications-countries",
    path: "/configurations/ubications/countries",
    component: () =>
      import("@/views/admin/configurations/countries/CountryView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
  {
    name: "admin-configurations-ubications-departaments",
    path: "/configurations/ubications/departaments",
    component: () =>
      import("@/views/admin/configurations/departaments/DepartamentsView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
  {
    name: "admin-configurations-ubications-municipalities",
    path: "/configurations/ubications/municipalities",
    component: () =>
      import("@/views/admin/configurations/municipalities/MunicipalitiesView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  }
]

const generals_configurations: RouteRecordRaw[] = [
  {
    name: "admin-configurations-generals",
    path: "/configurations/generals",
    component: () =>
      import("@/views/admin/configurations/Generals/ConfigurationGeneralView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
  {
    name: "admin-configurations-type-documents",
    path: "/configurations/generals/type-documents",
    component: () =>
      import("@/views/admin/configurations/type-documents/TypeDocumentsView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
  {
    name: "admin-configurations-generals-banks",
    path: "/configurations/generals/banks",
    component: () =>
      import("@/views/admin/configurations/banks/BanksView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
  {
    name: "admin-configurations-generals-currencies",
    path: "/configurations/generals/currencies",
    component: () =>
      import("@/views/admin/configurations/currencies/CurrencyView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
  {
    name: "admin-configurations-generals-type-currencies",
    path: "/configurations/generals/type-currencies",
    component: () =>
      import("@/views/admin/configurations/CurrencyType/CurrencyTypeView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
  {
    name: "admin-configurations-generals-payment-methods",
    path: "/configurations/generals/payment-methods",
    component: () =>
      import("@/views/admin/configurations/PaymentMethod/PaymentMethodView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
  {
    name: "admin-configurations-generals-other-payments",
    path: "/configurations/generals/other-payments",
    component: () =>
      import("@/views/admin/configurations/OtherPayments/OtherPaymentsView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
  {
    name: "admin-configurations-generals-type-accounts",
    path: "/configurations/generals/type-accounts",
    component: () =>
      import("@/views/admin/configurations/TypeBankAccount/TypeBankAccountView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
  {
    name: "admin-configurations-generals-shipping-types",
    path: "/configurations/generals/shipping-types",
    component: () =>
      import("@/views/admin/configurations/ShippingTypes/ShippingTypeView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
  {
    name: "admin-configurations-generals-penalty-type",
    path: "/configurations/generals/penalty-type",
    component: () =>
      import("@/views/admin/configurations/PenaltyTypes/PenaltyTypeView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
  {
    name: "admin-configurations-generals-network-types",
    path: "/configurations/generals/network-types",
    component: () =>
      import("@/views/admin/configurations/NetworkType/NetworkTypeView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
]

const accounts: RouteRecordRaw[] = [
  {
    name: "admin-configurations-banks-accounts",
    path: "/configurations/banks-accounts",
    component: () =>
      import("@/views/admin/configurations/CompanyAccounts/Bank/BankAccountCompanyView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
  {
    name: "admin-configurations-efecty-accounts",
    path: "/configurations/efecty-accounts",
    component: () =>
      import("@/views/admin/configurations/CompanyAccounts/Efecty/EfectyAccountCompanyView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
  {
    name: "admin-configurations-other-accounts",
    path: "/configurations/other-accounts",
    component: () =>
      import("@/views/admin/configurations/CompanyAccounts/Other/OtherAccountCompanyView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
  {
    name: "admin-configurations-external-deposits",
    path: "/configurations/external-deposits",
    component: () =>
      import("@/views/admin/configurations/CompanyAccounts/ExternalDeposit/ExternalDeposit.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  },
]

const wallets: RouteRecordRaw[] = [
  {
    name: "admin-configurations-wallets",
    path: "/configurations/wallets",
    component: () =>
      import("@/views/admin/configurations/wallet/WalletView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
  }
]

// ----------------------------------------------------
const configurations: RouteRecordRaw[] = [
  {
    name: "admin-configurations",
    path: "/configurations",
    redirect: {
      name: 'admin-configurations-security-roles'
    },
    component: () =>
      import("@/views/admin/configurations/ConfigurationView.vue"),
    meta: {
      roles: [
        ROLES.ADMIN
      ]
    },
    beforeEnter: checkedRole,
    children: [
      ...security,
      ...ubications,
      ...generals_configurations,
      ...accounts,
      ...wallets
    ]
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
  // ...security,
  ...generals,
  ...configurations,
]

