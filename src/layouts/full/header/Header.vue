<script setup lang="ts">
import { ref } from "vue";
import { profile } from "./data";
import MessageIcon from "@/assets/icons/header/MessageIcon.vue";
import NotificationIcon from "@/assets/icons/header/NotificationIcon.vue";
import ProfileIcon from "@/assets/icons/header/ProfileIcon.vue";
import { useDisplay } from 'vuetify'
import { computed } from "vue";

const isMobile = ref(useDisplay().smAndDown);
const userprofile = ref(profile);

const existNotifications = ref(true)
const existMessages = ref(true)

const colorIcons = computed(()=>{
  return isMobile.value ? 'text-white' : 'text-disabled'
})
</script>

<template>
  <div class="mr-8">
    
    <!-- ---------------------------------------------- -->
    <!-- User Profile -->
    <div class="d-flex align-center" :class="[!isMobile ? 'gap-icon-web' : 'gap-icon-mobile']">
      <MessageIcon :class="colorIcons" :active="existNotifications" />

      <NotificationIcon :class="colorIcons" :active="existMessages"  />
      <ProfileIcon style="color:#5043E9" />

    </div>
    <!-- ---------------------------------------------- -->
    <!-- <v-menu anchor="bottom end" origin="auto" min-width="300">
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          class="pa-0 px-1"
          elevation="0"
          color="transparent"
          plain
          :ripple="false"
        >
          <v-avatar size="35">
            <img src="@/assets/images/users/user2.jpg" alt="Julia" />
          </v-avatar>
        </v-btn>
      </template>

      <v-list class="pa-6" elevation="10" rounded="lg">
        <v-list-item
          class="pa-3 mb-2"
          v-for="(item, i) in userprofile"
          :key="i"
          :value="item"
          :title="item.title"
          :subtitle="item.desc"
          rounded="lg"
        >
         
        </v-list-item>
        <v-btn block color="secondary" variant="tonal" class="mt-4 py-4"
          >Logout</v-btn
        >
      </v-list>
    </v-menu> -->
  </div>
</template>
<style>
.gap-icon-web{
  gap: 32px;
}
.gap-icon-mobile{
  gap: 12px;
}

</style>