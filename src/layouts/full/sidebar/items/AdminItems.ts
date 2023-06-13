import DashboardIconVue from "@/assets/icons/sidebar/DashboardIcon.vue";
import TransactionsIcon from "@/assets/icons/sidebar/TransactionsIcon.vue"
import FileIcon from "@/assets/icons/sidebar/FileIcon.vue"
import AccountingIcon from "@/assets/icons/sidebar/AccountingIcon.vue"
import UserIcon from "@/assets/icons/sidebar/UserIcon.vue"
import TiendaIcon from "@/assets/icons/sidebar/TiendaIcon.vue"
import ConfigurationIcon from "@/assets/icons/sidebar/ConfigurationIcon.vue"
import type { SidebarItem } from "@/interfaces/SidebarItems.interface"
import { ROLES } from '@/interfaces/Role/Role.enum'

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
        to: "",
        roles: [
            ROLES.ADMIN,
        ],
        children: [
            {
                title: 'Pendientes',
                to: '',
                roles: [
                    ROLES.ADMIN,
                ],
            },
            {
                title: 'Tomadas',
                to: '',
                roles: [
                    ROLES.ADMIN,
                ],
            },
            {
                title: 'Aprobadas',
                to: '',
                roles: [
                    ROLES.ADMIN,
                ],
            },
            {
                title: 'Todas',
                to: '',
                roles: [
                    ROLES.ADMIN,
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
    {
        title: "Configuración",
        icon: ConfigurationIcon,
        to: "admin-configurations",
        roles: [
            ROLES.ADMIN,
        ],
    },
]
export default items