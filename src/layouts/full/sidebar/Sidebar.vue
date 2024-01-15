<script setup lang="ts">
import { ref, watch } from "vue";
import sidebarItems from "./sidebarItem";
import LogoDark from "../logo/LogoDark.vue";
import { useRoute, useRouter } from "vue-router";
import type { StyleValue } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import type { SidebarChildren, SidebarItem } from "@/interfaces/SidebarItems.interface";
import ConfigurationIcon from "@/assets/icons/sidebar/ConfigurationIcon.vue";
import { computed } from "vue";
import { getUserAuth, helperStore } from "@/helper";
import type { ROLES } from "@/interfaces/Role/Role.enum";
import type { CountOrders } from "@/interfaces/Order/Order.model";
import { UserStore } from "@/stores/UserStore";

const userStore = UserStore()
const helper = helperStore()

const sidebarMenu = computed(() => {
    return sidebarItems
        .map((item) => {
            item.children = item.children?.filter((child) =>
                child.roles.length > 0
                    ? child.roles.includes(getUserAuth().roles[0].name as ROLES)
                    : true
            );
            return item;
        })
        .filter((item) =>
            item.roles.length > 0
                ? item.roles.includes(getUserAuth().roles[0].name as ROLES)
                : true
        )
        .filter(
            item => {
                if(item.permiss === '') return true
                return userStore.can('index', item.permiss)
            }
        )
        ;
});
// const sidebarMenu = ref<SidebarItem[]>(sidebarItems);
const verifyWidthWindow = ref(useDisplay().mdAndUp);
const router = useRouter();
const route = useRoute()
const isActiveForBorder = (to: string): StyleValue => {
    return {
        // Add a CSS Custom Property
        ["display" as any]:
            to == router.currentRoute.value.name ? "block" : "none",
    };
};

const isActiveForItem = (to: string): string => {
    return to == router.currentRoute.value.path ? "active-item" : "text-white";
};

type TypeActive = "border" | "item";

const countOrders = ref<CountOrders>({
  cancels: 0,
  done: 0,
  pendings: 0,
  takes: 0,
  total: 0,
})
const getCountOrders = async () => {
  const url = 'order/list/contador'
  const res = await helper.http(url)
  countOrders.value = res.data.response as CountOrders
}

getCountOrders()

const activeSubmenu = (children: SidebarChildren):boolean => 
{
    
    if(route.query.type && route.query.type === children.params?.type)
    {
        return true
    }
    return false
}
</script>

<template>
    <div>
        <!-- ---------------------------------------------- -->
        <!---Logo part -->
        <!-- ---------------------------------------------- -->
        <div class="px-10 pt-9 pb-5" v-if="verifyWidthWindow">
            <LogoDark />
        </div>
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <div class="scrollnavbar">
            <v-list class="pl-2 pr-0" color="transparent">
                <!-- ---------------------------------------------- -->
                <!---Menu Loop -->
                <!-- ---------------------------------------------- -->
                <template v-for="(item, i) in sidebarMenu" :key="i">
                    <!-- ---------------------------------------------- -->
                    <div class="d-flex">
                        <!---Single Item-->
                        <!-- ---------------------------------------------- -->
                        <v-list-item
                            :to="item.to ? { name: item.to } : '#'"
                            rounded="lg"
                            class="w-100"
                            active-class=""
                        >
                            <!-- <v-list-item-avatar start class="v-list-item-avatar--start"> -->
                            <template v-slot:prepend>
                                <VAvatar>
                                    <v-icon
                                        :icon="item.icon"
                                        :class="
                                            false
                                                ? isActiveForItem(item.to)
                                                : 'text-white'
                                        "
                                    >
                                    </v-icon>
                                </VAvatar>
                            </template>

                            <!-- </v-list-item-avatar> -->
                            <v-list-item-title>
                                {{ item.title }}
                            </v-list-item-title>
                        </v-list-item>
                        <div
                            class="active-bar"
                            :style="isActiveForBorder(item.to)"
                        ></div>
                    </div>
                    <v-list
                        v-if="item.children"
                        :lines="false"
                        density="compact"
                        class="ml-7"
                    >
                        <v-list-item
                            v-for="(children, i) in item.children"
                            :key="i"
                            :to="children.to ? { name: children.to, query: children.params } : '#'"
                            :active="activeSubmenu(children)"
                        >
                            <v-list-item-title
                                v-text="children.title"
                            ></v-list-item-title>
                            <template #append>
                                <span
                                    v-if="countOrders[children.reference as keyof CountOrders] > 0"
                                    class="rounded-circle bg-white text-active font-weight-bold d-flex align-center justify-center"
                                    style="width: 30px!important; height: 30px!important;"
                                    >
                                    {{ countOrders[children.reference as keyof CountOrders] }}
                                    </span>
                            </template>
                        </v-list-item>
                    </v-list>
                </template>
            </v-list>
        </div>
    </div>
</template>
<style lang="scss">
@import "@/scss/variables.scss";

.active-item {
    color: $item-active-sidebar !important;
}

.hover-black:hover {
    background-color: none;
}

.active-bar {
    width: 6.14px;
    height: auto;
    background-color: $item-active-sidebar;
    margin-left: -6.14px;
    border-radius: 4px 0 0 4px;
}
</style>
