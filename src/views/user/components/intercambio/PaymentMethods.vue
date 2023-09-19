<template>
    <div class="my-4">
        <div>
            <h3 class="text-primary">
                {{ $t('views.buy.payment-method') }}
            </h3>
            <p class="text-table text-18">
                Selecciona el método de pago y se mostrará el formulario para ingresar el monto a comprar.
            </p>
        </div>

        <VRow>
            <VCol cols="4" v-for="paymentMethod, i in companyAccountStore.paymentMethods" :key="i"
                @click="emits('update:model-value', paymentMethod)">
                <VBtnDegree class="w-100" rounded="lg" :class="{
                    'payment-selected': paymentMethod.id == modelValue?.id
                }" color="white">
                    {{ paymentMethod.attributes.name }}
                </VBtnDegree>
            </VCol>
        </VRow>
    </div>
</template>

<script setup lang="ts">
import type { PaymentMethod } from '@/interfaces/PaymentMethod/PaymentMethod.model';
import { CompanyAccountStore } from '@/stores/CompanyAccountStore';

const companyAccountStore = CompanyAccountStore()
companyAccountStore.getPaymentMethods()

const emits = defineEmits<{
    (e: 'update:model-value', value: PaymentMethod): void
}>()

defineProps<{
    modelValue: any
}>()
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.v-text-field__slot.payment-selected {
    background: none;
}

.payment-selected {
    color: white !important;
    background-color: $color-primary !important;
}
</style>