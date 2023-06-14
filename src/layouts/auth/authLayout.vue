<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref } from "vue";
import { useDisplay } from 'vuetify'
const drawer = ref(undefined || true);
const innerW = ref(useDisplay().smAndDown);
</script>

<template>
    <v-app>
        <v-main >
            <v-container fluid class="h-100 w-100 bg-sidebar ">
                <RouterView />
            </v-container>
        </v-main>
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