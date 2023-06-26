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
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import NavBar from './Home/NavBar.vue';
import FirstElement from './Home/FirstElement.vue';
import SecondElement from './Home/SecondElement.vue';
import ThreeElement from './Home/ThreeElement.vue';
</script>
