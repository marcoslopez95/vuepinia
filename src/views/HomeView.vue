<template>
    <v-app>
        <NavBar />

        <v-main class="px-10">
            <FirstElement />
            <!-- Contenido principal de tu aplicación -->
            <div style="min-height: 1000px;">

            </div>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import NavBar from './Home/NavBar.vue';
import FirstElement from './Home/FirstElement.vue';

</script>
