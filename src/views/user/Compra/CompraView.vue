<template>
    <h3 class="text-primary">
        {{ $t('views.buy.title') }}
    </h3>
    <p class="text-table text-18">
        Selecciona la moneda que deseas comprar, luego de seleccionar podrás elegir el método de pago.
    </p>
    <CryptoCurrencySelect
        v-model="currency"
    >
    </CryptoCurrencySelect>
    <PaymentMethods 
        v-if="currency" 
        v-model="paymentMethod">
        </PaymentMethods>
    <component 
        v-if="paymentMethod"
        :is="detailPaymentMethod!"
        :itemsDetails="itemsDetails"
        v-model="itemDetailSelected"
        ></component>
</template>

<script setup lang="ts">
import type { Currency } from '@/interfaces/Currency/Currency.model';
import CryptoCurrencySelect from '../components/intercambio/CryptoCurrencySelect.vue';
import PaymentMethods from './../components/intercambio/PaymentMethods.vue'
import { ref } from 'vue';
import type { PaymentMethod } from '@/interfaces/PaymentMethod/PaymentMethod.model';
import { PAYMENT_METHODS_AVAILABLE } from '@/enums/PaymentMethod.enum';
import BankComponent from './../components/intercambio/PaymentMethods/BankComponent.vue'
import EfectyComponent from './../components/intercambio/PaymentMethods/EfectyComponent.vue'
import OtherComponent from './../components/intercambio/PaymentMethods/OtherComponent.vue'
import { computed } from 'vue';
import { watch } from 'vue';
import type { BankAccount } from '@/interfaces/CompanyAccount/BankAccount/BankAccount.model';
import type { EfectyAccount } from '@/interfaces/CompanyAccount/EfectyAccount/EfectyAccount.model';
import type { OtherAccount } from '@/interfaces/CompanyAccount/OtherAccount/OtherAccount.model';
import { helperStore } from '@/helper';

const helper = helperStore()
const currency = ref<Currency|null>(null)
const paymentMethod = ref<PaymentMethod|null>(null)
const itemsDetails = ref<BankAccount | EfectyAccount | OtherAccount | null>()
const itemDetailSelected = ref<BankAccount | EfectyAccount | OtherAccount | null>()
const detailPaymentMethod = computed(() => {
    if(!paymentMethod.value) return null
    
    getDetailsForPaymentMethod()
    switch(paymentMethod.value.id){
        case PAYMENT_METHODS_AVAILABLE.BANK:
            return BankComponent;
        case PAYMENT_METHODS_AVAILABLE.EFECTY:
            return EfectyComponent;
        case PAYMENT_METHODS_AVAILABLE.OTHER:
            return OtherComponent
    }
})

watch(currency, () => paymentMethod.value = null)
watch(paymentMethod, () => {
    itemsDetails.value = null
    itemDetailSelected.value = null
})

const getDetailsForPaymentMethod = async () => {
    const params = {
        payment_type_id: paymentMethod.value!.id
    }
    const res = await helper.http('company/account','get',{params})
    itemsDetails.value = res.data.response
    
}
</script>

<style scoped></style>