<template>
    <v-app>
        <NavBar />

        <v-main class="px-10">
            <FirstElement />
            <!-- Contenido principal de tu aplicación -->
            <SecondElement />
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import NavBar from './Home/NavBar.vue';
import FirstElement from './Home/FirstElement.vue';
import SecondElement from './Home/SecondElement.vue';
</script>
