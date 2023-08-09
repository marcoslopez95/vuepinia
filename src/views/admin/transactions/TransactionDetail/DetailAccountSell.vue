<template>
    <div class="border-degree">
        <div class="mx-4 my-2">
            <div>
                <VImg v-if="itemHaveImages(bankAccount?.relationships?.bank?.relationships?.images)" :src="(itemHaveImages(bankAccount?.relationships?.bank?.relationships?.images) as string)"></VImg>
                <div v-else>
                    {{ bankAccount?.relationships?.bank?.attributes.name ?? '' }}
                </div>
            </div>
            <div class="text-18 text-table text-left">
                Titular: {{ bankAccount?.attributes.beneficiary }}<br>
                Documento: {{ bankAccount?.attributes.identification_document }} <br>
                Número de Cuenta: {{ bankAccount?.attributes.account_number }} <br>
                Banco: {{ bankAccount?.relationships?.bank?.attributes.name }} <br>
                Tipo de Cuenta: {{ bankAccount?.relationships?.typeAccountBank.attributes.name }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BankAccountClient } from '@/interfaces/CompanyAccount/BankAccount/BankAccount.model';
import { TransactionStore } from '@/stores/TransactionStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { itemHaveImages } from '@/helper'

const transactionStore = TransactionStore()
const { order } = storeToRefs(transactionStore)
const bankAccount = computed(() => {
    if(!order.value) return undefined
    return order.value.relationships?.account_delivery as BankAccountClient
})

</script>

<style scoped>

</style>