import DashboardIconVue from "@/assets/icons/sidebar/DashboardIcon.vue";
import TransactionsIcon from "@/assets/icons/sidebar/TransactionsIcon.vue"
import FileIcon from "@/assets/icons/sidebar/FileIcon.vue"
import AccountingIcon from "@/assets/icons/sidebar/AccountingIcon.vue"
import UserIcon from "@/assets/icons/sidebar/UserIcon.vue"
import TiendaIcon from "@/assets/icons/sidebar/TiendaIcon.vue"
import ConfigurationIcon from "@/assets/icons/sidebar/ConfigurationIcon.vue"
import type { SidebarItem } from "@/interfaces/SidebarItems.interface"
import { ROLES } from '@/interfaces/Role/Role.enum'
import { KYC, ORDERS, SETTINGS, USERS } from "@/enums/Permissions.enum";

const items: SidebarItem[] = [
    // {
    //     title: "Dashboard",
    //     icon: DashboardIconVue,
    //     to: "Dashboard",
    //     roles: []
    // },
    {
        title: "Transacciones",
        icon: TransactionsIcon,
        to: "admin-transactions",
        permiss: [ORDERS.REFERENCE],
        roles: [
            ROLES.ADMIN,
        ],
        children: [
            {
                title: 'Pendientes',
                permiss: [],
                to: 'admin-transactions',
                // roles: [
                //     ROLES.ADMIN,
                // ],
                reference: 'pendings',
                params: {
                    type: 'pendings'
                }
            },
            {
                title: 'Tomadas',
                permiss: [],
                to: 'admin-transactions',
                // roles: [
                //     ROLES.ADMIN,
                // ],
                reference: 'takes',
                params: {
                    type: 'takes'
                }
            },
            {
                title: 'Aprobadas',
                permiss: [],
                to: 'admin-transactions',
                // roles: [
                //     ROLES.ADMIN,
                // ],
                reference: 'done',
                params: {
                    type: 'dones'
                }
            },
            {
                title: 'Todas',
                permiss: [],
                to: 'admin-transactions',
                // roles: [
                //     ROLES.ADMIN,
                // ],
                reference: 'total'
            },
        ]
    },
    {
        title: "Kyc",
        permiss: [KYC.REFERENCE],
        icon: FileIcon,
        to: "admin-kyc",
        // roles: [
        //     ROLES.ADMIN,
        // ],
    },
    {
        title: "Kyc Empresas",
        permiss: [KYC.REFERENCE],
        icon: 'mdi-badge-account-horizontal-outline',
        to: "admin-kyc-bussiness",
        // roles: [
        //     ROLES.ADMIN,
        // ],
    },
    {
        title: "Retiro XCOP",
        icon: FileIcon,
        to: "admin-withdrawal-xcop",
        permiss: [ORDERS.REFERENCE],
        // roles: [
        //     ROLES.ADMIN,
        // ],
    },
    // {
    //     title: "Contabilidad",
    //     icon: AccountingIcon,
    //     to: "Alerts",
    //     roles: [
    //         ROLES.ADMIN,
    //     ],
    // },
    {
        title: "Usuarios",
        permiss: [USERS.REFERENCE],
        icon: UserIcon,
        to: "admin-users",
        // roles: [
        //     ROLES.ADMIN,
        // ],
    },
    // {
    //     title: "Tienda",
    //     icon: TiendaIcon,
    //     to: "Alerts",
    //     roles: [
    //         ROLES.ADMIN,
    //     ],
    // },
    {
        title: "Configuración",
        permiss: [SETTINGS.REFERENCE],
        icon: ConfigurationIcon,
        to: "admin-configurations",
        // roles: [
        //     ROLES.ADMIN,
        // ],
    },
]
export default items