<template>
    <h3 class="text-primary">
        {{ $t('views.sell.title') }}
    </h3>
    <p class="text-table text-18">
        Selecciona la moneda que deseas vender, luego de seleccionar podrás elegir el método de pago.
    </p>
    <CryptoCurrencySelect v-model="currency">
    </CryptoCurrencySelect>
    <PaymentMethods v-if="currency" v-model="paymentMethod">
    </PaymentMethods>
    <SelectAccount v-if="paymentMethod && paymentMethod.id != PAYMENT_METHODS_AVAILABLE.EFECTY" 
        :paymentMethod="paymentMethod" 
        v-model="itemDetailSelected">
    </SelectAccount>        
    <div class="mt-5" v-if="itemDetailSelected">
        <h3 class="text-primary">
            {{ $t('views.sell.amount') }}
        </h3>
        <p class="text-table text-18">
            Ingresa la cantidad a calcular, puedes usar cualquiera de los campos para hacer el cálculo
        </p>
        <CalculadoraComponent
        v-model="calculatorValue"
        @update:model-value="(value)=>calculatorValue=value"
        :currency="currency!"
        @no-price="noPrice"
        :minAmount="parseFloat(currency?.attributes.min_buy as string) ?? 0"
        @amount-permitted="(value) => amountPermitted = value"
        >
        </CalculadoraComponent>
        <VRow>
            <VCol v-if="form.total_exchange_local < generalConfiguration.generalData?.attributes.order_fee_limit!" cols="12" class="d-flex justify-center">
                <div>
                    <VCheckbox v-model="form.xcop_payment" label="Pagar Comisión con XCOP"></VCheckbox>
                </div>
            </VCol>
            <VCol class="text-center my-6">
                <VBtnPrimary :disabled="!amountPermitted" @click="clickInContinue">
                    {{ $t('general-views.continue') }}
                </VBtnPrimary>
            </VCol>
        </VRow>
    </div>

</template>

<script setup lang="ts">
import type { Currency } from '@/interfaces/Currency/Currency.model';
import CryptoCurrencySelect from '../components/intercambio/CryptoCurrencySelect.vue';
import PaymentMethods from './../components/intercambio/PaymentMethods.vue'
import { ref } from 'vue';
import type { PaymentMethod } from '@/interfaces/PaymentMethod/PaymentMethod.model';
import { PAYMENT_METHODS_AVAILABLE } from '@/enums/PaymentMethod.enum';
import { watch } from 'vue';
import type { BankAccount } from '@/interfaces/CompanyAccount/BankAccount/BankAccount.model';
import type { OtherAccount } from '@/interfaces/CompanyAccount/OtherAccount/OtherAccount.model';
import { helperStore } from '@/helper';
import CalculadoraComponent from '../components/intercambio/CalculadoraComponent.vue';

import type { Calculator } from '@/interfaces/Calculadora.interface'
import { storeToRefs } from 'pinia';
import SelectAccount from './components/intercambio/PaymentMethods/SelectAccount.vue';
import { ConfirmOrderStore } from '../Compra/CompraStore';
import { GeneralConfiguration } from '@/stores/GeneralConfiguration';

const confirmOrderStore = ConfirmOrderStore()
const { form } = storeToRefs(confirmOrderStore)
const emits = defineEmits<{
    (e:'click:continue'):void
}>()
const generalConfiguration = GeneralConfiguration()
generalConfiguration.getGeneralData();
const helper = helperStore()
const currency = ref<Currency | null>(null)
const paymentMethod = ref<PaymentMethod | null>(null)
const itemsDetails = ref<BankAccount[] | OtherAccount[]>([])
const itemDetailSelected = ref<number | null>()

watch(currency, () => paymentMethod.value = null)
watch(paymentMethod, () => {
    getDetailsForPaymentMethod()
    itemsDetails.value = []
    itemDetailSelected.value = null
})

const getDetailsForPaymentMethod = async () => {
    const params = {
        payment_type_id: paymentMethod.value?.id ?? ''
    }
    const res = await helper.http('client/account', 'get', { params })
    itemsDetails.value = res.data.response
    // .map((item: any) => ({
    //     id:item.id,
    //     attributes: {name: titleSelect(item)}
    // }))
}

const amountPermitted = ref(false)
const calculatorValue = ref<Calculator>({
    amountFiat: 0,
    amountCrypto: 0,
    amountUsd: 0,
    tasaCompra: 0,
    tasaVenta: 0,
    criptoOficial: 0,
    localOficial:0
})
const noPrice = () => {
    helper.showNotify('Problema con la moneda, por favor contactar al administrador',{type:'error'})
    currency.value = null
}

const clickInContinue = () => {
    form.value.account_delivery_id = itemDetailSelected.value!
    form.value.currency_id = currency.value!.id
    form.value.payment_type_id = paymentMethod.value!.id
    form.value.total_exchange_local = calculatorValue.value.amountFiat.toFixed(2)
    form.value.currency_price = (calculatorValue.value.tasaCompra as number).toFixed(8)
    form.value.exchange_reference = (calculatorValue.value.criptoOficial as number).toFixed(2)
    form.value.total_exchange_reference = parseFloat(calculatorValue.value.amountUsd as string).toFixed(2)
    form.value.exchange_local = (calculatorValue.value.localOficial as number).toFixed(2)
    form.value.total_exchange_local = calculatorValue.value.amountFiat.toFixed(2)
    form.value.amount_currency = parseFloat(calculatorValue.value.amountCrypto as string).toFixed(8)
    form.value.received_amount = (parseFloat(form.value.amount_currency as string) + parseFloat(form.value.fee as string)).toFixed(8)
    emits('click:continue')
}
</script>

<style scoped></style>