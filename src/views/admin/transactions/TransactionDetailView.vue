<template>
    <div v-if="!numTransaction && !order">No existe transaction con ese numero</div>
    <div v-else>
        <VRow>
            <div class="font-weight-bold text-table">
                Detalles transacción: <span class="text-primary">{{ order?.attributes.tranx_no }}</span>
            </div>
        </VRow>
        <VRow>
            <VCol>
                <general-detail></general-detail>
                <user-detail class="mt-3"></user-detail>
            </VCol>
            <VCol></VCol>
        </VRow>
    </div>
</template>

<script setup lang="ts">
import { TransactionStore } from '@/stores/TransactionStore';
import { storeToRefs } from 'pinia';
import GeneralDetail from './TransactionDetail/GeneralDetail.vue';
import UserDetail from '@/views/admin/transactions/TransactionDetail/UserDetail.vue'
import { reactive } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue';

const props = defineProps<{
    numTransaction: string;
}>();
const transactionStore = TransactionStore()
const { order } = storeToRefs(transactionStore)

transactionStore.getOrderByNum(props.numTransaction)

</script>

<style scoped></style>
