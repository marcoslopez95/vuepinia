import type { SidebarItem } from "@/interfaces/SidebarItems.interface"
import { ROLES } from '@/interfaces/Role/Role.enum'
import BuyIcon from "@/assets/icons/sidebar/user/BuyIcon.vue"
import SellIcon from "@/assets/icons/sidebar/user/SellIcon.vue"
import TransactionIcon from "@/assets/icons/sidebar/user/TransactionIcon.vue"
import ReferredIcon from "@/assets/icons/sidebar/user/ReferredIcon.vue"
import WalletIconVue from "@/assets/icons/WalletIcon.vue"

const items: SidebarItem[] = [
    {
        title: "Comprar",
        icon: BuyIcon,
        to: "user-buy",
        roles: [
            ROLES.USER,
        ],
    },
    {
        title: "Vender",
        icon: SellIcon,
        to: "user-sell",
        roles: [
            ROLES.USER,
        ],
    },
    {
        title: "Wallet XCOP",
        icon: WalletIconVue,
        to: "wallet-xcop",
        roles: [
            ROLES.USER,
        ],
    },
    {
        title: "Transacciones",
        icon: TransactionIcon,
        to: "user-transactions",
        roles: [
            ROLES.USER,
        ],
    },
    {
        title: "Referidos",
        icon: ReferredIcon,
        to: "user-referred-list",
        roles: [
            ROLES.USER,
        ],
    },
    
]
export default items