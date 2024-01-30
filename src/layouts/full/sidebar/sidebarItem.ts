import type {  SidebarItem } from "@/interfaces/SidebarItems.interface";
import adminItems from "./items/AdminItems";
import userItems from './items/UserItems'
import DashboardIconVue from "@/assets/icons/sidebar/DashboardIcon.vue";
import { ROLES } from "@/interfaces/Role/Role.enum";
import { AVALAIBLE_PERMISSIONS } from "@/permissions.const";
import { SETTINGS } from "@/enums/Permissions.enum";
const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: DashboardIconVue,
    to: "Dashboard",
    // roles: [
    //   ROLES.ADMIN
    // ],
    permiss_reference: SETTINGS.REFERENCE,
    permiss: [
      SETTINGS.DASHBOARD
    ]
},
  ...adminItems,
  ...userItems
];

export default sidebarItems;
