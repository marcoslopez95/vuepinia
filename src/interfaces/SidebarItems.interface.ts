import type { ROLES } from '@/interfaces/Role/Role.enum'
export declare interface SidebarItem {
    title: string
    icon: any
    to: string
    children?: SidebarChildren[]
    roles: ROLES[]
}


export declare interface SidebarChildren extends Omit<SidebarItem, 'children'| 'icon'>{}