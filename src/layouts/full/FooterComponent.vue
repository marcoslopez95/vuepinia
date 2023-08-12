<template>
    <VFooter>
        <div class="w-100 text-center">
            <div class="d-flex justify-center">
                <VIcon title="Telegram" color="table-icon" :icon="TelegramIcon" />
                <VIcon title="Instagram" color="table-icon" icon="mdi-instagram" />
                <VIcon title="Twitter" color="table-icon" icon="mdi-twitter" />
                <VIcon title="Facebook" color="table-icon" icon="mdi-facebook" />
            </div>
            <span class="text-table-icon">
                {{dayjs().year()}} Xeler Go Todos los derechos reservados
            </span>
        </div>
    </VFooter>
</template>

<script setup lang="ts">
import TelegramIcon from '@/assets/icons/layout/footer/TelegramIcon.vue'
import dayjs from 'dayjs';

</script>

<style scoped></style>