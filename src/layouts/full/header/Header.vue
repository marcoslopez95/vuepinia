<script setup lang="ts">
import { ref } from "vue";
import { profile } from "./data";
import MessageIcon from "@/assets/icons/header/MessageIcon.vue";
import NotificationIcon from "@/assets/icons/header/NotificationIcon.vue";
import ProfileIcon from "@/assets/icons/header/ProfileIcon.vue";
import { useDisplay } from 'vuetify'
import { computed } from "vue";
import LogOutIcon from '@/assets/icons/header/Profile/LogOutIcon.vue'
import { useRouter } from "vue-router";

const router = useRouter()
const isMobile = ref(useDisplay().smAndDown);
const userprofile = ref(profile);

const existNotifications = ref(true)
const existMessages = ref(true)

const colorIcons = computed(() => {
  return isMobile.value ? 'text-white' : 'text-disabled mt-2'
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push({name: 'Login'})
}
</script>

<template>
  <div class="mr-8">

    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <div class="d-flex align-center" :class="[!isMobile ? 'gap-icon-web' : 'gap-icon-mobile']">
      <MessageIcon :class="colorIcons" :active="existNotifications" />
      <NotificationIcon :class="colorIcons" :active="existMessages" />
      <!-- ---------------------------------------------- -->
      <v-menu anchor="bottom end" origin="auto" min-width="300">
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" class="pa-0" elevation="0" color="transparent">
            <!-- <v-avatar size="35"> -->
            <ProfileIcon style="color:#5043E9" />
            <!-- </v-avatar> -->
          </v-btn>
        </template>

        <v-card min-width="250" elevation="50" class="rounded-xl">
          <v-list class="bg-sidebar text-white font-weight-bold">
            <v-list-item>
              <template #title>
                Hola!
              </template>
              <template #subtitle>
                <h2 class="text-white mt-1 ">Admin</h2>
              </template>
              <template v-slot:append>
                <svg width="40" height="46" viewBox="0 0 40 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_0_1)">
                    <path
                      d="M28.3333 18.3333C28.9 18.3333 29.45 18.4 30 18.4833V10.45L17.5 5L5 10.45V18.6333C5 26.2 10.3333 33.2833 17.5 35C18.4167 34.7833 19.3 34.4667 20.1667 34.0833C19.0167 32.45 18.3333 30.4667 18.3333 28.3333C18.3333 22.8167 22.8167 18.3333 28.3333 18.3333Z"
                      fill="white" />
                    <path
                      d="M28.3332 21.6665C24.6498 21.6665 21.6665 24.6498 21.6665 28.3332C21.6665 32.0165 24.6498 34.9998 28.3332 34.9998C32.0165 34.9998 34.9998 32.0165 34.9998 28.3332C34.9998 24.6498 32.0165 21.6665 28.3332 21.6665ZM28.3332 23.9665C29.3665 23.9665 30.1998 24.8165 30.1998 25.8332C30.1998 26.8498 29.3498 27.6998 28.3332 27.6998C27.3165 27.6998 26.4665 26.8498 26.4665 25.8332C26.4665 24.8165 27.2998 23.9665 28.3332 23.9665ZM28.3332 32.9165C26.7832 32.9165 25.4332 32.1498 24.5998 30.9665C24.6832 29.7665 27.1165 29.1665 28.3332 29.1665C29.5498 29.1665 31.9832 29.7665 32.0665 30.9665C31.2332 32.1498 29.8832 32.9165 28.3332 32.9165Z"
                      fill="white" />
                  </g>
                  <path
                    d="M9.72 45L7.1 38.33H5.64L3.02 45H4.35L4.84 43.71H7.9L8.39 45H9.72ZM7.57 42.68H5.17L6.37 39.5L7.57 42.68ZM14.8585 45V38.33H13.8085V40.84C13.4285 40.32 12.8685 40.05 12.2585 40.05C11.0185 40.05 10.1185 41.02 10.1185 42.58C10.1185 44.18 11.0285 45.12 12.2585 45.12C12.8885 45.12 13.4385 44.82 13.8085 44.34V45H14.8585ZM12.5685 44.19C11.7285 44.19 11.1985 43.52 11.1985 42.58C11.1985 41.65 11.7285 40.98 12.5685 40.98C13.0585 40.98 13.5785 41.27 13.8085 41.63V43.54C13.5785 43.9 13.0585 44.19 12.5685 44.19ZM23.1991 45V41.51C23.1991 40.53 22.6891 40.05 21.8091 40.05C21.0791 40.05 20.4391 40.5 20.1691 40.93C20.0091 40.41 19.5691 40.05 18.8491 40.05C18.1091 40.05 17.4791 40.53 17.2691 40.82V40.17H16.2191V45H17.2691V41.62C17.4891 41.31 17.9191 40.98 18.3891 40.98C18.9591 40.98 19.1791 41.33 19.1791 41.85V45H20.2291V41.62C20.4391 41.3 20.8791 40.98 21.3491 40.98C21.9191 40.98 22.1491 41.33 22.1491 41.85V45H23.1991ZM25.0889 39.58C25.4489 39.58 25.7389 39.29 25.7389 38.93C25.7389 38.57 25.4489 38.28 25.0889 38.28C24.7289 38.28 24.4389 38.57 24.4389 38.93C24.4389 39.29 24.7289 39.58 25.0889 39.58ZM25.6089 45V40.17H24.5589V45H25.6089ZM31.291 45V41.6C31.291 40.61 30.771 40.05 29.731 40.05C28.971 40.05 28.341 40.44 28.021 40.82V40.17H26.971V45H28.021V41.62C28.271 41.3 28.731 40.98 29.261 40.98C29.851 40.98 30.241 41.22 30.241 41.98V45H31.291Z"
                    fill="white" />
                  <defs>
                    <clipPath id="clip0_0_1">
                      <rect width="40" height="40" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

              </template>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list>
              <v-list-item class="text-item-menu" v-for="(item, i) in userprofile" :key="i" :value="item"
                :title="item.title" rounded="lg">
                <template #prepend>
                  <VAvatar>
                    <VIcon :icon="item.icon"></VIcon>
                  </VAvatar>
                </template>
              </v-list-item>
          </v-list>

          <v-card-actions class="pa-0 ma-0" style="background-color: #DFE3E887;">
            <v-list color="transparent" density="compact">
                <v-list-item @click="logout" class="py-0 ma-0 text-item-menu" title="Logout">
                  <template #prepend>
                    <VAvatar>
                      <VIcon :icon="LogOutIcon"></VIcon>
                    </VAvatar>
                  </template>
              </v-list-item>

            </v-list>
          </v-card-actions>
        </v-card>
      </v-menu>
    </div>

  </div>
</template>
<style >
.gap-icon-web {
  gap: 32px;
}

.gap-icon-mobile {
  gap: 12px;
}

.v-list-item-subtitle {
  opacity: 1 !important;
}

.text-item-menu {
  color: #8B2CF5;
}

.v-list {
  background: transparent;
}
</style>