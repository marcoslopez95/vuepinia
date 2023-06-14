<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref, onMounted } from "vue";
import SidebarVue from "./sidebar/Sidebar.vue";
import HeaderVue from "./header/Header.vue";
import { useDisplay } from 'vuetify'
import LogoDark from "./logo/LogoDark.vue";
import MenuRightVue from "./menuRight/MenuRight.vue";
import TelegramIcon from '@/assets/icons/layout/footer/TelegramIcon.vue'
import InstagramIcon from '@/assets/icons/layout/footer/InstagramIcon.vue'
import TwitterIcon from '@/assets/icons/layout/footer/TwitterIcon.vue'
import FacebookIcon from '@/assets/icons/layout/footer/FacebookIcon.vue'

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
      class="bg-sidebar"
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
    <v-main class="d-flex">
      <v-container fluid class="page-wrapper">
        <RouterView />
      </v-container>
      <MenuRightVue v-if="!innerW" class="mr-4 mt-10" style="min-width: 340px; display: block;" />
    </v-main>
    <VFooter>
      <div class="w-100 text-center">
        <div class="d-flex justify-center">
          <VIcon title="Telegram" color="table" :icon="TelegramIcon" />
          <VIcon title="Instagram" color="table" icon="mdi-instagram" />
          <VIcon title="Twitter" color="table" icon="mdi-twitter" />
          <VIcon title="Facebook" color="table" icon="mdi-facebook" />
        </div>
        <span class="font-weight-bold text-table">
          2022 Xeler Go Todos los derechos reservados
        </span>
      </div>
    </VFooter>

  </v-app>
</template>
<style lang="scss">
@import "@/scss/variables.scss";

.bg-navbar-mobile{
  background-color: $color-primary !important;
}

</style>