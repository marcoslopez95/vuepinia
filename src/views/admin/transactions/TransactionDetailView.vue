<template>
    <div v-if="!numTransaction && !order">No existe transaction con ese numero</div>
    <div v-else>
        <VRow>
            <div class="text-18 font-weight-bold text-table">
                Detalles transacción: <span class="text-primary">{{ order?.attributes.tranx_no }}</span>
            </div>
        </VRow>
        <VRow dense>
            <VCol/>
            <VCol class="d-flex justify-center text-table font-weight-bold">
                <div class="cursor-pointer d-flex align-center" @click="showDetailPayment = !showDetailPayment">
                    <VIcon  :class="showDetailPayment? '' : 'rotate-270'" :icon="SelectIcon" />
                    <span>Mostrar Detalle</span>
                </div>
            </VCol>
        </VRow>
        <VRow>
            <VCol>
                <general-detail></general-detail>
                <user-detail class="mt-3"></user-detail>
                <div>
                    <UploadImageComponent :sizeImage="421" style="width: 421px" text="Subir comprobante de pago" v-model="voucher" />
                </div>
            </VCol>
            <VCol>
                <div class="mx-auto" v-if="showDetailPayment" style="max-width: 400px;">
                    <PaymentDetail  />
                    <div class="my-5" />
                    <CronometerComponent />
                </div>
            </VCol>
        </VRow>
    </div>
</template>

<script setup lang="ts">
import { TransactionStore } from '@/stores/TransactionStore';
import { storeToRefs } from 'pinia';
import GeneralDetail from './TransactionDetail/GeneralDetail.vue';
import UserDetail from '@/views/admin/transactions/TransactionDetail/UserDetail.vue'
import UploadImageComponent from '@/views/user/Kyc/components/UploadImageComponent.vue';
import SelectIcon from '@/assets/icons/SelectIcon.vue'
import PaymentDetail from '@/views/admin/transactions/TransactionDetail/PaymentDetail.vue'
import CronometerComponent from '@/views/admin/transactions/TransactionDetail/CronometerComponent.vue'
import { reactive } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';

const props = defineProps<{
    numTransaction: string;
}>();
const transactionStore = TransactionStore()
const { order } = storeToRefs(transactionStore)

transactionStore.getOrderByNum(props.numTransaction)
const voucher = ref<Blob | undefined>()

const showDetailPayment = ref(true)
</script>

<style scoped>

</style>
