<template>
    <div>
        <VRow>
            <VCol cols="4" v-for="bankAccount, i in (itemsDetails as BankAccount[])" :key="i"
                @click="selectItem(bankAccount)">
                <VBtnDegree rounded="lg" :class="{
                    'payment-selected': bankAccount.id == modelValue?.id
                }" color="primary">
                   
                    {{ bankAccount.relationships?.bank.attributes.name }}
                </VBtnDegree>
            </VCol>
        </VRow>
    </div>
</template>

<script setup lang="ts">
import type { BankAccount } from '@/interfaces/CompanyAccount/BankAccount/BankAccount.model';
import { ref } from 'vue';
const { modelValue } = defineProps<{
    itemsDetails: any
    modelValue: any
}>()

const emits = defineEmits<{
    (e: 'update:model-value', value: BankAccount): void
}>()

const selectItem = (item: BankAccount) => {
    emits('update:model-value', item)
    itemSelect.value = item
}
const itemSelect = ref<BankAccount | null>(null)

</script>


<style scoped>
.v-text-field__slot.payment-selected {
    background: none;
}

.payment-selected {
    color: white !important;
}
</style>