<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import SidebarVue from "./sidebar/Sidebar.vue";
import HeaderVue from "./header/Header.vue";
import { useDisplay } from 'vuetify'
import LogoDark from "./logo/LogoDark.vue";
const drawer = ref(undefined || true);
const innerW = ref(useDisplay().smAndDown);

onMounted(() => {
  if (innerW.value) {
    drawer.value = !drawer.value;
  }
});
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
      :class="innerW ? 'mt-16':'mt-0' "
    >
      <SidebarVue />
    </v-navigation-drawer>
    <!-- ---------------------------------------------- -->
    <!---Header -->
    <!-- ---------------------------------------------- -->
    <v-app-bar elevation="0" class="v-topbar" :class="{'bg-navbar-mobile': innerW}">
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
    <v-main>
      <v-container fluid class="page-wrapper">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
<style lang="scss">
@import "@/scss/variables.scss";

.bg-navbar-mobile{
  background-color: $color-primary !important;
}
</style>