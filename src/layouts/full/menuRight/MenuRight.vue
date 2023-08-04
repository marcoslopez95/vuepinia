<template>
    <div>
        <PreviewOrder class="mb-5" v-if="isInCheck"/>
        <PreviewOrderForConfirm class="mb-5" v-if="transactionStore.showPreviewOrder"/>
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
import PreviewOrderForConfirm from './PreviewOrder/PreviewOrderForConfirm.vue';
import { TransactionStore } from '@/stores/TransactionStore'
const kycAccept = localStorage.getItem('kyc')
const router = useRouter()
const transactionStore = TransactionStore()

const isInCheck = computed((): boolean =>{
    return router.currentRoute.value.name == 'user-check-buy' || 'user-check-sell'
})
</script>

<style scoped lang="scss"></style>