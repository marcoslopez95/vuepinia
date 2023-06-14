import type { SidebarItem } from "@/interfaces/SidebarItems.interface"
import { ROLES } from '@/interfaces/Role/Role.enum'
import BuyIcon from "@/assets/icons/sidebar/user/BuyIcon.vue"
import SellIcon from "@/assets/icons/sidebar/user/SellIcon.vue"
import TransactionIcon from "@/assets/icons/sidebar/user/TransactionIcon.vue"
import ReferredIcon from "@/assets/icons/sidebar/user/ReferredIcon.vue"

const items: SidebarItem[] = [
    {
        title: "Comprar",
        icon: BuyIcon,
        to: "",
        roles: [
            ROLES.USER,
        ],
    },
    {
        title: "Vender",
        icon: SellIcon,
        to: "",
        roles: [
            ROLES.USER,
        ],
    },
    {
        title: "Transacciones",
        icon: TransactionIcon,
        to: "",
        roles: [
            ROLES.USER,
        ],
    },
    {
        title: "Referidos",
        icon: ReferredIcon,
        to: "",
        roles: [
            ROLES.USER,
        ],
    },
    
]
export default items