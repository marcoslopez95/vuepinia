<template>
    <v-app>
        <NavBar />

        <v-main :class="isMobile ? 'px-2' : 'px-10'">
            <div style="max-width: 1200px;" class="mx-auto">
                <FirstElement />
                <!-- Contenido principal de tu aplicación -->
                <SecondElement />
                <VSpacer class="my-3"> </VSpacer>
                <ThreeElement />
            </div>

            <VSpacer class="my-3"> </VSpacer>
            <FourElement />
            <FiveElement />

            <VRow class="text-table">
                <VCol class="text-center">
                    <span class="text-h5">
                        Dudas? Preguntas? visita nuestro
                        <span class="text-primary">help desk</span>
                    </span>
                </VCol>
            </VRow>
        </v-main>
        <FooterComponent />
    </v-app>
</template>

<script setup lang="ts">
import NavBar from "./Home/NavBar.vue";
import FirstElement from "./Home/FirstElement.vue";
import SecondElement from "./Home/SecondElement.vue";
import ThreeElement from "./Home/ThreeElement.vue";
import FourElement from "./Home/FourElement.vue";
import FiveElement from "./Home/FiveElement.vue";
import FooterComponent from "@/layouts/full/FooterComponent.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { ref } from "vue";
const isMobile = ref(useDisplay().smAndDown);
</script>
