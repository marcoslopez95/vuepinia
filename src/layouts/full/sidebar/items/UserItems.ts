import type { SidebarItem } from "@/interfaces/SidebarItems.interface"
import { ROLES } from '@/interfaces/Role/Role.enum'
import BuyIcon from "@/assets/icons/sidebar/user/BuyIcon.vue"
import SellIcon from "@/assets/icons/sidebar/user/SellIcon.vue"
import TransactionIcon from "@/assets/icons/sidebar/user/TransactionIcon.vue"
import ReferredIcon from "@/assets/icons/sidebar/user/ReferredIcon.vue"
import WalletIconVue from "@/assets/icons/WalletIcon.vue"
import { ORDERS, SETTINGS, ROLES as ROLES_P } from "@/enums/Permissions.enum"

const items: SidebarItem[] = [
    {
        title: "Comprar",
        icon: BuyIcon,
        permiss: ORDERS.REFERENCE,
        to: "user-buy",
        roles: [
            ROLES.USER,
        ],
    },
    {
        title: "Vender",
        icon: SellIcon,
        to: "user-sell",
        permiss: ORDERS.REFERENCE,
        roles: [
            ROLES.USER,
        ],
    },
    {
        title: "Wallet XCOP",
        icon: WalletIconVue,
        permiss: ORDERS.REFERENCE,
        to: "wallet-xcop",
        roles: [
            ROLES.USER,
        ],
    },
    {
        title: "Transacciones",
        icon: TransactionIcon,
        permiss: ORDERS.REFERENCE,
        to: "user-transactions",
        roles: [
            ROLES.USER,
        ],
    },
    {
        title: "Referidos",
        icon: ReferredIcon,
        permiss: ORDERS.REFERENCE,
        to: "user-referred-list",
        roles: [
            ROLES.USER,
        ],
    },
    {
        title: "Conf. Empresas",
        icon: 'mdi-account-tie',
        permiss: ORDERS.REFERENCE,
        to: "bussiness",
        roles: [
            ROLES.USER,
        ],
    },
    
]
export default items