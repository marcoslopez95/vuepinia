<template>
    <VRow class="d-flex justify-center">
        <VCol>
            <div class="d-flex justify-center">
                    <div style="width: 150px;">
                        <InputComponent v-model="amountFiat" @update:model-value="updateCrypto" name="COP"></InputComponent>
                    </div>
                    <div class="my-auto mx-3 pt-6 text-center" cols="1" style="font-size: 1.5rem;">
                        =
                    </div>
                    <div style="width: 150px;">
                        <InputComponent v-model="amountCrypto" @update:model-value="updateFiat" name="Crypto"></InputComponent>
                    </div>
            </div>
            <div class="w-100 text-center font-weight-bold text-table">
                {{ amountCrypto }} {{ priceSelect?.symbol }} equivalente apróximado a {{ calculadora.amountUsd }} USD
            </div>
            <div v-if="calculadora.amountFiat < 200000" class="w-100 text-center font-weight-bold text-error">
                Transacción mínima 200.000 COP
            </div>
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
import InputComponent from '@/components/InputComponent.vue';
import { helperStore } from '@/helper';
import type { Currency } from '@/interfaces/Currency/Currency.model';
import { computed } from 'vue';
import { reactive } from 'vue';
import { ref } from 'vue';

const {
    monedaCrypto
} = defineProps<{
    monedaCrypto: Currency,
}>()
const helper = helperStore()

const calculadora = reactive<{
    amountFiat: number
    amountCrypto: number | string
    amountUsd: number |string
    tasaCompra: number | string
    tasaVenta: number | string
    criptoOficial: number | string
}>({
    amountFiat: 0,
    amountCrypto: 0,
    amountUsd: 1,
    tasaCompra: 1,
    tasaVenta: 1,
    criptoOficial: 1
})

const priceSelect = ref<Price|null>(null)
const oficialValue = ref(1)
const prices = ref<Price[]>([])
const getPrices = async () => {
    const url = 'https://ticker.xeler.io/v1/ticker'
    const res = await helper.http(url)
    prices.value = res.data.data
    priceSelect.value = prices.value[0]
    // priceSelect.value = prices.value.find( price => price.symbol == monedaCrypto.attributes.symbol) ?? null
    calculadora.criptoOficial = priceSelect.value?.oficial ?? 1
    oficialValue.value = calculadora.criptoOficial / (parseFloat(priceSelect.value?.trm?? '1') );
}

getPrices()

const amountFiat = ref(0)
const amountCrypto = ref(0)

const updateCrypto = () => {
    calculadora.amountFiat = amountFiat.value
    const division = amountFiat.value / (priceSelect.value?.buy ?? 1);
    calculadora.amountCrypto = division.toFixed(5);
    amountCrypto.value = parseFloat(calculadora.amountCrypto)
    calculadora.amountUsd = (parseFloat(calculadora.amountCrypto) * oficialValue.value).toFixed(2);
}

const updateFiat = () => {
    calculadora.amountCrypto = amountCrypto.value;
    calculadora.amountFiat = amountCrypto.value * (priceSelect.value?.buy ?? 1);
    calculadora.amountUsd = (calculadora.amountCrypto * oficialValue.value).toFixed(2);
    amountFiat.value = calculadora.amountFiat
}
// --------------
interface Price {
    id: number,
    symbol: string
    name: string
    base: string
    buy: number
    sell: number
    buy_cash: number
    active: boolean
    trm: string
    icono: string
    oficial: number
    oficial_usd: string
}
</script>

<style scoped></style>