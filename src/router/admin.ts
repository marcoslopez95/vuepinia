// import { ROLES } from "@/interfaces/Role/Role.enum"
import type { RouteRecordRaw } from "vue-router"
import { checkedPermission } from "./middleware"
import { ROLES, KYC, KYC_BUSSINESS, ORDERS, USERS, WALLET_XCOP, COUNTRIES, DEPARTAMENTS, MUNICIPALITIES, SETTINGS, TYPE_DOCUMENTS, BANKS, CURRENCIES, CURRENCY_TYPES, METHOD_PAYMENTS, PAYMENT_SUBTYPE, TYPE_BANK_ACCOUNTS, SHIPPING_TYPES, PENALTY_TYPES, PAYMENT_NETWORKS, ACCOUNTS, DEPOSIT_EXTERNAL, COMPANY_WALLETS } from "@/enums/Permissions.enum"


const generals: RouteRecordRaw[] = [
  {
    name: "admin-kyc",
    path: "/kyc",
    component: () =>
      import("@/views/admin/kyc/Kyc.vue"),
    meta: {
      permissions: [
        KYC.REFERENCE
      ]
    },
    beforeEnter: checkedPermission
  },
  {
    name: "admin-kyc-bussiness",
    path: "/kyc-bussiness",
    component: () =>
      import("@/views/admin/kycBussiness/Kyc.vue"),
      meta: {
        permissions: [
          KYC_BUSSINESS.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-withdrawal-xcop",
    path: "/withdrawal-xcop",
    component: () =>
      import("@/views/admin/withdrawalXcop/WithdrawalXcopView.vue"),
      meta: {
        permissions: [
          WALLET_XCOP.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-users",
    path: "/users",
    component: () =>
      import("@/views/admin/users/UsersView.vue"),
      meta: {
        permissions: [
          USERS.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
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
        permissions: [
          ORDERS.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-transaction-show",
    path: "/admin/transactions/:numTransaction",
    props: true,
    component: () =>
      import("@/views/admin/transactions/TransactionDetailView.vue"),
      meta: {
        permissions: [
          ORDERS.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
]

const security: RouteRecordRaw[] = [
  {
    name: "admin-configurations-security-roles",
    path: "/configurations/security/roles",
    component: () =>
      import("@/views/admin/security/roles/RolesView.vue"),
      meta: {
        permissions: [
          ROLES.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  }
]

const ubications: RouteRecordRaw[] = [
  {
    name: "admin-configurations-ubications-countries",
    path: "/configurations/ubications/countries",
    component: () =>
      import("@/views/admin/configurations/countries/CountryView.vue"),
      meta: {
        permissions: [
          COUNTRIES.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-configurations-ubications-departaments",
    path: "/configurations/ubications/departaments",
    component: () =>
      import("@/views/admin/configurations/departaments/DepartamentsView.vue"),
      meta: {
        permissions: [
          DEPARTAMENTS.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-configurations-ubications-municipalities",
    path: "/configurations/ubications/municipalities",
    component: () =>
      import("@/views/admin/configurations/municipalities/MunicipalitiesView.vue"),
      meta: {
        permissions: [
          MUNICIPALITIES.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  }
]

const generals_configurations: RouteRecordRaw[] = [
  {
    name: "admin-configurations-generals",
    path: "/configurations/generals",
    component: () =>
      import("@/views/admin/configurations/Generals/ConfigurationGeneralView.vue"),
      meta: {
        permissions: [
          SETTINGS.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-configurations-type-documents",
    path: "/configurations/generals/type-documents",
    component: () =>
      import("@/views/admin/configurations/type-documents/TypeDocumentsView.vue"),
      meta: {
        permissions: [
          TYPE_DOCUMENTS.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-configurations-generals-banks",
    path: "/configurations/generals/banks",
    component: () =>
      import("@/views/admin/configurations/banks/BanksView.vue"),
      meta: {
        permissions: [
          BANKS.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-configurations-generals-currencies",
    path: "/configurations/generals/currencies",
    component: () =>
      import("@/views/admin/configurations/currencies/CurrencyView.vue"),
      meta: {
        permissions: [
          CURRENCIES.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-configurations-generals-type-currencies",
    path: "/configurations/generals/type-currencies",
    component: () =>
      import("@/views/admin/configurations/CurrencyType/CurrencyTypeView.vue"),
      meta: {
        permissions: [
          CURRENCY_TYPES.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-configurations-generals-payment-methods",
    path: "/configurations/generals/payment-methods",
    component: () =>
      import("@/views/admin/configurations/PaymentMethod/PaymentMethodView.vue"),
      meta: {
        permissions: [
          METHOD_PAYMENTS.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-configurations-generals-other-payments",
    path: "/configurations/generals/other-payments",
    component: () =>
      import("@/views/admin/configurations/OtherPayments/OtherPaymentsView.vue"),
      meta: {
        permissions: [
          PAYMENT_SUBTYPE.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-configurations-generals-type-accounts",
    path: "/configurations/generals/type-accounts",
    component: () =>
      import("@/views/admin/configurations/TypeBankAccount/TypeBankAccountView.vue"),
      meta: {
        permissions: [
          TYPE_BANK_ACCOUNTS.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-configurations-generals-shipping-types",
    path: "/configurations/generals/shipping-types",
    component: () =>
      import("@/views/admin/configurations/ShippingTypes/ShippingTypeView.vue"),
      meta: {
        permissions: [
          SHIPPING_TYPES.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-configurations-generals-penalty-type",
    path: "/configurations/generals/penalty-type",
    component: () =>
      import("@/views/admin/configurations/PenaltyTypes/PenaltyTypeView.vue"),
      meta: {
        permissions: [
          PENALTY_TYPES.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-configurations-generals-network-types",
    path: "/configurations/generals/network-types",
    component: () =>
      import("@/views/admin/configurations/NetworkType/NetworkTypeView.vue"),
      meta: {
        permissions: [
          PAYMENT_NETWORKS.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
]

const accounts: RouteRecordRaw[] = [
  {
    name: "admin-configurations-banks-accounts",
    path: "/configurations/banks-accounts",
    component: () =>
      import("@/views/admin/configurations/CompanyAccounts/Bank/BankAccountCompanyView.vue"),
      meta: {
        permissions: [
          ACCOUNTS.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-configurations-efecty-accounts",
    path: "/configurations/efecty-accounts",
    component: () =>
      import("@/views/admin/configurations/CompanyAccounts/Efecty/EfectyAccountCompanyView.vue"),
      meta: {
        permissions: [
          ACCOUNTS.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-configurations-other-accounts",
    path: "/configurations/other-accounts",
    component: () =>
      import("@/views/admin/configurations/CompanyAccounts/Other/OtherAccountCompanyView.vue"),
      meta: {
        permissions: [
          ACCOUNTS.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
  {
    name: "admin-configurations-external-deposits",
    path: "/configurations/external-deposits",
    component: () =>
      import("@/views/admin/configurations/CompanyAccounts/ExternalDeposit/ExternalDeposit.vue"),
      meta: {
        permissions: [
          DEPOSIT_EXTERNAL.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
  },
]

const wallets: RouteRecordRaw[] = [
  {
    name: "admin-configurations-wallets",
    path: "/configurations/wallets",
    component: () =>
      import("@/views/admin/configurations/wallet/WalletView.vue"),
      meta: {
        permissions: [
          COMPANY_WALLETS.REFERENCE
        ]
      },
      beforeEnter: checkedPermission
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
      permissions: [
        SETTINGS.REFERENCE
      ]
    },
    beforeEnter: checkedPermission,
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
      // meta: {
      //   roles: [
      //     SETTINGS.REFERENCE
      //   ]
      // },
      // beforeEnter: checkedPermission,
  },
  {
    name: "activities",
    path: "/activities",
    component: () =>
      import("@/views/admin/activities/ActivitiesView.vue"),
    // meta: {
    //   roles: [
    //     SETTINGS.REFERENCE
    //   ]
    // },
    // beforeEnter: checkedPermission,
  },
]
export default [
  // ...security,
  ...generals,
  ...configurations,
]

