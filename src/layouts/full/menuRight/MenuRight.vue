<template>
    <div>
        <CurrencyStadistics />
        <KycUnverified v-if="kycAccept !== '1'" class="mt-6"/>
    </div>
</template>

<script setup lang="ts">
import CurrencyStadistics from './CurrencyStadistics/CurrencyStadistics.vue'
import KycUnverified from './KycUnverified/KycUnverified.vue'

const kycAccept = localStorage.getItem('kyc')
</script>

<style scoped lang="scss"></style>