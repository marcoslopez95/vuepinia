<template>
    <VFooter>
        <div class=" text-center">
            <div class="d-flex justify-center">
                <VIcon title="Telegram" color="table" :icon="TelegramIcon" />
                <VIcon title="Instagram" color="table" icon="mdi-instagram" />
                <VIcon title="Twitter" color="table" icon="mdi-twitter" />
                <VIcon title="Facebook" color="table" icon="mdi-facebook" />
            </div>
            <span class="text-table">
                2022 Xeler Go Todos los derechos reservados
            </span>
        </div>
    </VFooter>
</template>

<script setup lang="ts">
import TelegramIcon from '@/assets/icons/layout/footer/TelegramIcon.vue'

</script>

<style scoped></style>