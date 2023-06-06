<script setup lang="ts">
import { ref, watch } from "vue";
import sidebarItems from "./sidebarItem";
import LogoDark from "../logo/LogoDark.vue";
import { useRoute, useRouter } from "vue-router";
import type { StyleValue } from "vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const sidebarMenu = ref(sidebarItems);
const verifyWidthWindow = ref(useDisplay().mdAndUp)
const router = useRouter()

const isActiveForBorder = (to: string): StyleValue => {
    return {
      // Add a CSS Custom Property
      ['display' as any]: to == router.currentRoute.value.path ? 'block' : 'none'
    };
}

const isActiveForItem = (to:string): string => {
  return to == router.currentRoute.value.path ? 'active-item' : 'text-white'
}

type TypeActive = 'border'| 'item';
</script>

<template>
  <div class="bg-sidebar h-100">
    <!-- ---------------------------------------------- -->
    <!---Logo part -->
    <!-- ---------------------------------------------- -->
    <div class="px-10 pt-9 pb-5" v-if="verifyWidthWindow">
      <LogoDark/>
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div class="scrollnavbar ">
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
              :to="item.to" 
              rounded="lg" 
              class="w-100"
              :active="false"
              >
              <!-- <v-list-item-avatar start class="v-list-item-avatar--start"> -->
            <template v-slot:prepend>
              <VAvatar>
                <v-icon :class="isActiveForItem(item.to)">
                  <Component :is="item.icon" />
                </v-icon>
              </VAvatar>
            </template>

            <!-- </v-list-item-avatar> -->
            <v-list-item-title :class="isActiveForItem(item.to)">
                {{ item.title }}
              </v-list-item-title>

            </v-list-item>
            <div class="active-bar" :style="isActiveForBorder(item.to)"></div>
          </div>
        </template>
      </v-list>
    </div>
    <!-- <div class="pa-4 ma-4 bg-light-primary rounded-lg text-center">
        <img src="@/assets/images/sidebar-buynow-bg.svg" />
        <h4 class="font-weight-regular mb-3">Get Template for Free</h4>
        <v-btn class="mb-2" href="https://www.wrappixel.com/templates/flexy-vuejs-admin-free/" block>Download Free</v-btn>
        <v-btn
          color="info"
          href="https://www.wrappixel.com/templates/flexy-vuetify-dashboard/"
          block
          >Check Pro</v-btn
        >
      </div> -->
  </div>
</template>
<style lang="scss">
@import "@/scss/variables.scss";

.active-item{
  color: $item-active-sidebar !important;
}
.bg-sidebar {
  background: linear-gradient(180deg, #5043E9 6.77%, #16B4E6 77.6%);
}

.active-bar {
  width: 6.14px;
  height: auto;
  background-color: $item-active-sidebar;
  margin-left: -6.14px;
  border-radius: 4px 0 0 4px;
}
</style>