import DashboardIconVue from "@/assets/icons/sidebar/DashboardIcon.vue";
import TransactionsIcon from "@/assets/icons/sidebar/TransactionsIcon.vue"
import FileIcon from "@/assets/icons/sidebar/FileIcon.vue"
import AccountingIcon from "@/assets/icons/sidebar/AccountingIcon.vue"
import UserIcon from "@/assets/icons/sidebar/UserIcon.vue"
import TiendaIcon from "@/assets/icons/sidebar/TiendaIcon.vue"
import ConfigurationIcon from "@/assets/icons/sidebar/ConfigurationIcon.vue"
import type {  SidebarItem } from "@/interfaces/SidebarItems.interface";
import { ROLES } from '@/interfaces/Role/Role.enum'
const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: DashboardIconVue,
    to: "Dashboard",
    roles: [
      ROLES.ADMIN,
      ROLES.USER,
      ROLES.AGENT
    ]
  },
  {
    title: "Transacciones",
    icon: TransactionsIcon,
    to: "",
    roles: [
      ROLES.ADMIN,
      ROLES.USER,
      ROLES.AGENT
    ],
    children: [
      {
        title: 'Pendientes',
        to: '',
        roles: [
          ROLES.ADMIN,
          ROLES.USER,
          ROLES.AGENT
        ],
      },
      {
        title: 'Tomadas',
        to: '',
        roles: [
          ROLES.ADMIN,
          ROLES.USER,
          ROLES.AGENT
        ],
      },
      {
        title: 'Aprobadas',
        to: '',
        roles: [
          ROLES.ADMIN,
          ROLES.USER,
          ROLES.AGENT
        ],
      },
      {
        title: 'Todas',
        to: '',
        roles: [
          ROLES.ADMIN,
          ROLES.USER,
          ROLES.AGENT
        ],
      },
    ]
  },
  {
    title: "Kyc",
    icon: FileIcon,
    to: "admin-kyc",
    roles: [
      ROLES.ADMIN,
    ],
  },
  {
    title: "Contabilidad",
    icon: AccountingIcon,
    to: "Alerts",
    roles: [
      ROLES.ADMIN,
    ],
  },
  {
    title: "Usuarios",
    icon: UserIcon,
    to: "admin-users",
    roles: [
      ROLES.ADMIN,
    ],
  },
  {
    title: "Tienda",
    icon: TiendaIcon,
    to: "Alerts",
    roles: [
      ROLES.ADMIN,
    ],
  },
  {
    title: "Seguridad",
    icon: 'mdi-security',
    to: "",
    roles: [
      ROLES.ADMIN,
    ],
    children: [
      {
        title: 'Roles',
        to: 'admin-roles',
        roles: [
          ROLES.ADMIN,
        ],
      },
      {
        title: 'Permisos',
        to: 'admin-permissions',
        roles: [
          ROLES.ADMIN,
        ],
      },
    ]
  },
  // {
  //   title: 'Tipos de Documentos',
  //   icon: 'mdi-security',
  //   to: "admin-type-documents",
  // },
  // {
  //   title: 'Países',
  //   icon: 'mdi-security',
  //   to: "admin-countries",
  // },
  // {
  //   title: 'Departamentos',
  //   icon: 'mdi-security',
  //   to: "admin-departaments",
  // },
  // {
  //   title: 'Municipios',
  //   icon: 'mdi-security',
  //   to: "admin-municipalities",
  // },
  {
    title: "Configuración",
    icon: ConfigurationIcon,
    to: "admin-configurations",
    roles: [
      ROLES.ADMIN,
    ],
  },
  // {
  //   title: "Alert",
  //   icon: "mdi-alert-circle-outline",
  //   to: "/ui-components/alert",
  // },
  // {
  //   title: "Buttons",
  //   icon: "mdi-radiobox-blank",
  //   to: "/ui-components/buttons",
  // },
  // {
  //   title: "Cards",
  //   icon: "mdi-card-outline",
  //   to: "/ui-components/cards",
  // },
  // {
  //   title: "Menus",
  //   icon: "mdi-form-dropdown",
  //   to: "/ui-components/menus",
  // },
  // {
  //   title: "Tables",
  //   icon: "mdi-table",
  //   to: "/ui-components/tables",
  // },
];

export default sidebarItems;