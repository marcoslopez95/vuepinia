<template>
    <VApp>
        <RouterView></RouterView>
        <v-overlay
            width="100%"
            height="100%"
            v-model="helper.loading"
            class="overl"
        >
            <div class="w-100 h-100 d-flex justify-center align-center">
                <v-progress-circular
                    indeterminate
                    size="64"
                ></v-progress-circular>
            </div>
        </v-overlay>
        <TwoFactorAuth />
    </VApp>
</template>

<script setup lang="ts">
import TwoFactorAuth from "./components/TwoFactorAuth.vue";
import { RouterView } from "vue-router";
import { getUserAuth, helperStore } from "./helper";
import { ref } from "vue";
import type { EventComponent } from "./interfaces/Components.helper";
import { UserStore } from "./stores/UserStore";
import { storeToRefs } from "pinia";
import type { PermissionAttributes } from "./interfaces/Permission/Permission.model";
const helper = helperStore();
const userStore = UserStore();
const { permiss } = storeToRefs(userStore);
const load = ref(
    // helper.loading
    true
);

userStore.uploadPermiss()
</script>
<style lang="scss">
.v-navigation-drawer__scrim {
    z-index: 1 !important;
}
/*
.overl{
  justify-content: center;
  align-items: center;
  top: 50%;
}*/

%scroll-styles {
    overflow-y: auto;
    scrollbar-width: thin;
    &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        scrollbar-color: rgba(var(--v-theme-primary)) !important;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent !important;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(var(--v-theme-primary));
        transition: background-color 0.2s ease-in-out;
        border-radius: 4px;
        &::-webkit-scrollbar-thumb:hover {
            filter: brightness(1.1) !important;
        }
    }
}
</style>
