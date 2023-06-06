import type { DefineComponent } from "vue"

export declare interface SidebarItem {
    title: string
    icon: any
    to: string
    children?: SidebarChildren[]
}

export declare interface SidebarChildren extends Omit<SidebarItem, 'children'| 'icon'>{}