<template>
    <v-app>
        <NavBar />

        <v-main class="px-10">
            <FirstElement />
            <!-- Contenido principal de tu aplicación -->
            <SecondElement />
            <VSpacer class="my-3">
            </VSpacer>
            <ThreeElement />
            <VSpacer class="my-3">
            </VSpacer>
            <FourElement />
        </v-main>
        <FooterComponent />
    </v-app>
</template>

<script setup lang="ts">
import NavBar from './Home/NavBar.vue';
import FirstElement from './Home/FirstElement.vue';
import SecondElement from './Home/SecondElement.vue';
import ThreeElement from './Home/ThreeElement.vue';
import FourElement from './Home/FourElement.vue'
import FooterComponent from '@/layouts/full/FooterComponent.vue';

</script>
