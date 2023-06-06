import DashboardIconVue from "@/assets/icons/sidebar/DashboardIcon.vue";
import TransactionsIcon from "@/assets/icons/sidebar/TransactionsIcon.vue"
import FileIcon from "@/assets/icons/sidebar/FileIcon.vue"
import AccountingIcon from "@/assets/icons/sidebar/AccountingIcon.vue"
import UserIcon from "@/assets/icons/sidebar/UserIcon.vue"
import TiendaIcon from "@/assets/icons/sidebar/TiendaIcon.vue"
import type { SidebarItem } from "@/interfaces/SidebarItems.interface";

const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: DashboardIconVue,
    to: "/dashboard",
  },
  {
    title: "Transacciones",
    icon: TransactionsIcon,
    to: "#",
    children: [
      {
        title: 'Pendientes',
        to: '#'
      },
      {
        title: 'Tomadas',
        to: '#'
      },
      {
        title: 'Aprobadas',
        to: '#'
      },
      {
        title: 'Todas',
        to: '#'
      },
    ]
  },
  {
    title: "Kyc",
    icon: FileIcon,
    to: "/ui-components/alert",
  },
  {
    title: "Contabilidad",
    icon: AccountingIcon,
    to: "/ui-components/alert",
  },
  {
    title: "Usuarios",
    icon: UserIcon,
    to: "/ui-components/alert",
  },
  {
    title: "Tienda",
    icon: TiendaIcon,
    to: "/ui-components/alert",
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