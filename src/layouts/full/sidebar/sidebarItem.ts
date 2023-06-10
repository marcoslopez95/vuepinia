import DashboardIconVue from "@/assets/icons/sidebar/DashboardIcon.vue";
import TransactionsIcon from "@/assets/icons/sidebar/TransactionsIcon.vue"
import FileIcon from "@/assets/icons/sidebar/FileIcon.vue"
import AccountingIcon from "@/assets/icons/sidebar/AccountingIcon.vue"
import UserIcon from "@/assets/icons/sidebar/UserIcon.vue"
import TiendaIcon from "@/assets/icons/sidebar/TiendaIcon.vue"
import ConfigurationIcon from "@/assets/icons/sidebar/ConfigurationIcon.vue"
import type { SidebarItem } from "@/interfaces/SidebarItems.interface";

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: DashboardIconVue,
    to: "Dashboard",
  },
  {
    title: "Transacciones",
    icon: TransactionsIcon,
    to: "",
    children: [
      {
        title: 'Pendientes',
        to: ''
      },
      {
        title: 'Tomadas',
        to: ''
      },
      {
        title: 'Aprobadas',
        to: ''
      },
      {
        title: 'Todas',
        to: ''
      },
    ]
  },
  {
    title: "Kyc",
    icon: FileIcon,
    to: "admin-kyc",
  },
  {
    title: "Contabilidad",
    icon: AccountingIcon,
    to: "Alerts",
  },
  {
    title: "Usuarios",
    icon: UserIcon,
    to: "admin-users",
  },
  {
    title: "Tienda",
    icon: TiendaIcon,
    to: "Alerts",
  },
  {
    title: "Seguridad",
    icon: 'mdi-security',
    to: "",
    children: [
      {
        title: 'Roles',
        to: 'admin-roles',
      },
      {
        title: 'Permisos',
        to: 'admin-permissions',
      },
    ]
  },
  {
    title: 'Tipos de Documentos',
    icon: 'mdi-security',
    to: "admin-type-documents",
  },
  {
    title: "Configuración",
    icon: ConfigurationIcon,
    to: "Alerts",
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