import type { DefineComponent } from "vue"

export declare interface SidebarItem {
    title: string
    icon: any
    to: string
    children?: SidebarItem[]
}