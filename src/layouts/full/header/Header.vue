<script setup lang="ts">
import { ref,computed } from "vue";
import { profile } from "./data";
import MessageIcon from "@/assets/icons/header/MessageIcon.vue";
import NotificationIcon from "@/assets/icons/header/NotificationIcon.vue";
import ProfileIcon from "@/assets/icons/header/ProfileIcon.vue";
import AdminIcon from '@/assets/icons/header/Profile/AdminIcon.vue'
import { useDisplay } from 'vuetify'
import LogOutIcon from '@/assets/icons/header/Profile/LogOutIcon.vue'
import { useRouter } from "vue-router";
import { getUserAuth, isRole } from "@/helper";
import { ROLES } from "@/interfaces/Role/Role.enum";
import { formatNumber } from "@/helper";
import BlueStarkIcon from '@/assets/icons/header/Profile/BlueStarkIcon.vue'

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

const fullname = computed(()=>{
  const user = getUserAuth()
  return `${user.first_name} ${user.last_name ?? ''}`
})

const xelerCop = computed(()=> {
  return formatNumber(500000) + ' XLRP'
})
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
                {{$t('header.hi')}}
              </template>
              <template #subtitle>
                <h2 class="text-white mt-1 ">{{ fullname }}</h2>
              </template>
              <template v-slot:append>
                <AdminIcon v-if="isRole(ROLES.ADMIN)"/>

              </template>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact" class="ma-0 px-0">
            <v-list-item class="pa-0 ma-0" v-if="isRole(ROLES.USER)">
                <template #title>
                  <span class="text-xeler-cop font-weight-bold">
                    {{ xelerCop }}
                  </span>
                </template>
                <template #prepend>
                  <VAvatar class="pa-0 ma-0">
                    <VIcon :icon="BlueStarkIcon"></VIcon>
                  </VAvatar>
                </template>
              </v-list-item>
              <v-list-item class=" pa-0 ma-0 text-item-menu" v-for="(item, i) in userprofile" :key="i" :value="item"
                :title="item.title">
                <template #prepend>
                  <VAvatar class="pa-0 ma-0">
                    <VIcon :icon="item.icon"></VIcon>
                  </VAvatar>
                </template>
              </v-list-item>
          </v-list>

          <v-card-actions class="pa-0 ma-0" style="background-color: #DFE3E887;">
            <v-list color="transparent" density="compact" class="pa-0 ma-0 w-100">
                <v-list-item @click="logout" class="pa-0 ma-0 text-item-menu" :title="$t('header.log-out')">
                  <template #prepend>
                    <VAvatar class="pa-0 ma-0">
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
<style lang="scss">

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

.text-xeler-cop{
  color: #20ABE6;
}

.v-list {
  background: transparent;
}
</style>