<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref } from "vue";
import { useDisplay } from 'vuetify'
import LogoLight from '@/assets/images/logos/logo-ligth.svg'
import FooterComponent from "../full/FooterComponent.vue";
import monitor from '@/assets/images/authLayout/monitos2.svg'
const drawer = ref(undefined || true);
const innerW = ref(useDisplay().smAndDown);
</script>

<template>
    <v-app>
        <VRow>
            <VCol cols="8" class="bg-sidebar h-100 ma-0 pa-0 d-flex align-center">
                <div class="mx-auto">
                    <VImg :src="monitor" height="603"/>
                </div>
            </VCol>
            <VCol cols="4" class="ma-0 pa-0">
                <v-main class="px-10">
                    <v-container fluid class="h-100 w-100 ">
                        <VImg class="mb-10 mt-6" height="74px" :src="LogoLight"></VImg>
                        <RouterView />
                    </v-container>
                </v-main>
                <div class="mb-6">
                    <FooterComponent/>
                </div>
            </VCol>
        </VRow>
    </v-app>
</template>
<style lang="scss">
@import "@/scss/variables.scss";

.bg-navbar-mobile {
    background-color: $color-primary !important;
}

// .bg-sidebar {
//     background: linear-gradient(180deg, #5043E9 6.77%, #16B4E6 77.6%);
// }
</style>