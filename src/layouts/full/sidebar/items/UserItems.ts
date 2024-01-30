import type { SidebarItem } from "@/interfaces/SidebarItems.interface"
import { ROLES } from '@/interfaces/Role/Role.enum'
import BuyIcon from "@/assets/icons/sidebar/user/BuyIcon.vue"
import SellIcon from "@/assets/icons/sidebar/user/SellIcon.vue"
import TransactionIcon from "@/assets/icons/sidebar/user/TransactionIcon.vue"
import ReferredIcon from "@/assets/icons/sidebar/user/ReferredIcon.vue"
import WalletIconVue from "@/assets/icons/WalletIcon.vue"
import { ORDERS, SETTINGS, ROLES as ROLES_P, USERS, BUSSINESS, WALLET_XCOP } from "@/enums/Permissions.enum"

const items: SidebarItem[] = [
    {
        title: "Comprar",
        icon: BuyIcon,
        permiss_reference: ORDERS.REFERENCE,
        permiss: [
            ORDERS.BUY
        ],
        to: "user-buy",
        // roles: [
        //     ROLES.USER,
        // ],
    },
    {
        title: "Vender",
        icon: SellIcon,
        to: "user-sell",
        permiss_reference: ORDERS.REFERENCE,
        permiss: [
            ORDERS.SELL
        ],
        // roles: [
        //     ROLES.USER,
        // ],
    },
    {
        title: "Wallet XCOP",
        icon: WalletIconVue,
        // permiss_reference: WALLET_XCOP.REFERENCE,
        permiss: [
            WALLET_XCOP.REFERENCE
        ],
        to: "wallet-xcop",
        // roles: [
        //     ROLES.USER,
        // ],
    },
    {
        title: "Transacciones",
        icon: TransactionIcon,
        permiss_reference: ORDERS.REFERENCE,
        permiss: [
            ORDERS.ONLY_USER
        ],
        to: "user-transactions",
        // roles: [
        //     ROLES.USER,
        // ],
    },
    {
        title: "Referidos",
        icon: ReferredIcon,
        permiss_reference: USERS.REFERENCE,
        permiss: [
            USERS.REFERREDS
        ],
        to: "user-referred-list",
        // roles: [
        //     ROLES.USER,
        // ],
    },
    {
        title: "Conf. Empresas",
        icon: 'mdi-account-tie',
        // permiss_reference: BUSSINESS.REFERENCE,
        permiss: [
            BUSSINESS.REFERENCE
        ],
        to: "bussiness",
        // roles: [
        //     ROLES.USER,
        // ],
    },
    
]
export default items