<template>
    <div>

        <PreviewOrder class="mb-5" v-if="isInCheck"/>
        <CurrencyStadistics />
        <KycUnverified v-if="kycAccept !== '1'" class="mt-6"/>
    </div>
</template>

<script setup lang="ts">
import PreviewOrder from './PreviewOrder/PreviewOrder.vue'
import CurrencyStadistics from './CurrencyStadistics/CurrencyStadistics.vue'
import KycUnverified from './KycUnverified/KycUnverified.vue'
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const kycAccept = localStorage.getItem('kyc')
const router = useRouter()
const isInCheck = computed((): boolean =>{
    return router.currentRoute.value.name == 'user-check-buy'
})
</script>

<style scoped lang="scss"></style>