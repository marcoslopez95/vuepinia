import type {  SidebarItem } from "@/interfaces/SidebarItems.interface";
import adminItems from "./items/AdminItems";
import userItems from './items/UserItems'
import DashboardIconVue from "@/assets/icons/sidebar/DashboardIcon.vue";
const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    icon: DashboardIconVue,
    to: "Dashboard",
    roles: []
},
  ...adminItems,
  ...userItems
];

export default sidebarItems;