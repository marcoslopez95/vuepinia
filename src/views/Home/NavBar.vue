<template>
    <VAppBar class="px-10 py-1" elevation="0" :color="currentColor" :style="{
        transition: 'background-color 0.3s ease-in-out'
    }">
        <template #prepend>
            <VIcon 
                size="200px" 
                :color="isScrolled ? 'white' : 'primary'" 
                :icon="LogoLight" />
        </template>
        <!-- Contenido de la barra de navegación -->
        <template #append>
            <LangComponent :class="isScrolled ? 'text-white' : 'text-table'" />
            <VBtnPrimary 
                class="font-weight-bold mr-4" 
                :class="[isScrolled?'text-white' : 'text-table']"
                :variant="isScrolled ? 'flat' : 'plain'" 
                >{{$t('views.login.title')}}</VBtnPrimary>
            <VBtnPrimary
                :color="isScrolled ? 'white':'primary'" 
            >{{$t('views.register.title')}}</VBtnPrimary>
        </template>
    </VAppBar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onMounted, onUnmounted } from 'vue';
import LogoLight from './NavBar/LightLogo.vue'
import LangComponent from '@/components/LangComponent.vue'
import { computed } from 'vue';

const currentColor = ref('transparent')
const handleScroll = () => {
    const scrollTop = window.scrollY;
    const scrollThreshold = 200; // Umbral de desplazamiento para cambiar el estado

    if (scrollTop > scrollThreshold) {
        currentColor.value = 'primary';
    } else {
        currentColor.value = 'white';
    }
}

const isScrolled = computed(()=>{
    return currentColor.value == 'primary'
})

onMounted(() => {
    window.addEventListener('scroll',()=> handleScroll());
})
onUnmounted(() => {
    window.removeEventListener('scroll', () => handleScroll());
})
</script>

<style scoped></style>