<template>
    <div v-if="statusKyc" class="d-flex mt-8" style="flex-flow:column ; gap:12px">
        <VAlert v-if="statusKyc === KYC_STATUS.IN_VERIFICATION " type="info">
            {{ $t('views.profile.kyc.alert-verification.in-verification') }}
        </VAlert>
        <VAlert v-if="statusKyc === KYC_STATUS.REJECT " type="error">
            {{ $t('views.profile.kyc.alert-verification.reject') }}
        </VAlert>
        <VAlert v-if="statusKyc === KYC_STATUS.ACCEPT " type="success">
            {{ $t('views.profile.kyc.alert-verification.accept') }}
        </VAlert>
    </div>
</template>

<script setup lang="ts">
import { UserStore } from '@/stores/UserStore'
import { KYC_STATUS } from '@/enums/Kyc.enum'
import { storeToRefs }  from 'pinia'
import { computed } from 'vue'
const userStore = UserStore()
const { userAuth } = storeToRefs(userStore)

const emits = defineEmits<{
    (e: 'existKyc',value: KYC_STATUS | false): void
}>()
const statusKyc = computed((): KYC_STATUS | false =>{
    const status = userAuth.value?.relationships?.kyc.attributes.status ?? false
    emits('existKyc', status)
    return status
})
</script>

<style scoped>

</style>