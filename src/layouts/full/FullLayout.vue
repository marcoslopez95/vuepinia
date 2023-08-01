<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import SidebarVue from "./sidebar/Sidebar.vue";
import HeaderVue from "./header/Header.vue";
import { useDisplay } from "vuetify";
import LogoDark from "./logo/LogoDark.vue";
import MenuRightVue from "./menuRight/MenuRight.vue";
import FooterComponent from "./FooterComponent.vue";
import { getUserAuth } from "@/helper";
import { ROLES } from "@/interfaces/Role/Role.enum";

const drawer = ref(undefined || true);
const innerW = ref(useDisplay().smAndDown);

onMounted(() => {
    if (innerW.value) {
        drawer.value = !drawer.value;
    }
});

const userRole = getUserAuth().roles[0].name;
</script>

<template>
    <v-app>
        <!-- ---------------------------------------------- -->
        <!---Sidebar -->
        <!-- ---------------------------------------------- -->
        <v-navigation-drawer
            location="left"
            :permanent="$vuetify.display.mdAndUp"
            elevation="10"
            app
            v-model="drawer"
            :style="'z-index:1004'"
            :class="innerW ? 'mt-16' : 'mt-0'"
            class="bg-sidebar"
        >
            <SidebarVue />
        </v-navigation-drawer>
        <!-- ---------------------------------------------- -->
        <!---Header -->
        <!-- ---------------------------------------------- -->
        <v-app-bar
            elevation="0"
            class="v-topbar"
            :class="{ 'bg-navbar-mobile': innerW }"
        >
            <v-app-bar-nav-icon
                class="hidden-md-and-up"
                @click="drawer = !drawer"
                color="white"
            />
            <div class="px-3 pt-9 pb-5" v-if="innerW">
                <LogoDark />
            </div>
            <v-spacer />
            <!-- ---------------------------------------------- -->
            <!-- User Profile -->
            <!-- ---------------------------------------------- -->
            <HeaderVue />
        </v-app-bar>

        <!-- ---------------------------------------------- -->
        <!---Page Wrapper -->
        <!-- ---------------------------------------------- -->
        <v-main class="">
            <v-container fluid class="page-wrapper">
                <RouterView />
            </v-container>
        </v-main>

        <v-navigation-drawer
            location="right"
            rail
            rail-width="340"
            border="0"
            :permanent="$vuetify.display.mdAndUp"
            app
            v-model="drawer"
            >
            <MenuRightVue
                v-if="!innerW && userRole !== ROLES.ADMIN"
                class="pr-4 pt-4"
            />
        </v-navigation-drawer>
        <FooterComponent />
    </v-app>
</template>
<style lang="scss">
@import "@/scss/variables.scss";

.bg-navbar-mobile {
    background-color: $color-primary !important;
}
/*@media (min-width: 1024px) {
    .page-wrapper {
        padding: 30px;
        max-width: 55%;
    }
}
@media (width: 1024px) {
  .page-wrapper {
      padding: 30px;
      max-width: 400px;
  }
}*/
</style>
