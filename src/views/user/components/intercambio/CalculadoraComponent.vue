<template>
    <VRow class="d-flex justify-center">
        <VCol>
            <div :class="$vuetify.display.xs ? '' : 'd-flex justify-center'" class="">
                <div 
                    style="width: 170px" class="text-table"
                        :class="$vuetify.display.xs ? 'mx-auto' : ''"
                    >
                    <InputComponent
                        v-model="amountFiat"
                        :events="eventsFiat"
                        :rules="[onlyNumbers]"
                        name=""
                        appendText="COP"
                    >
                    </InputComponent>
                </div>
                <div
                    class="my-auto mx-3 pt-6 text-center"
                    cols="1"
                    style="font-size: 1.5rem"
                >
                    <div
                        :class="$vuetify.display.xs ? 'mx-auto' : ''"
                        class="border-degree "
                        style="border-radius: 100% !important; width: 35px; height: 35px"
                    >
                        =
                    </div>
                </div>
                <div style="width: 170px"
                    :class="$vuetify.display.xs ? 'mx-auto' : ''"
                >
                    <InputComponent
                        v-model="amountCrypto"
                        :events="eventsCrypto"
                        :rules="[onlyNumbers]"
                        name=""
                        :appendText="priceSelect?.symbol"
                    >
                    </InputComponent>
                </div>
            </div>
            <div class="w-100 mt-10 text-center font-weight-bold text-table">
                {{ amountCrypto }} {{ priceSelect?.symbol }} equivalente
                apróximado a {{ calculadora.amountUsd }} USD
            </div>
            <div
                v-if="calculadora.amountFiat < minAmount"
                class="w-100 text-center font-weight-bold text-error"
            >
                Transacción mínima {{ formatNumber(minAmount, ",", ".") }} COP
            </div>
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
import InputComponent from "@/components/InputComponent.vue";
import { formatNumber, helperStore } from "@/helper";
import type { Currency } from "@/interfaces/Currency/Currency.model";
import { computed } from "vue";
import { reactive } from "vue";
import { ref } from "vue";
import type { EventComponent } from "@/interfaces/Components.helper";
import {
    amountFormat,
    transformAmount,
    onlyNumbers,
    keyPressIsNumber,
} from "@/validator";
import { watch } from "vue";
import type { Calculator } from "@/interfaces/Calculadora.interface";
import router from "@/router";
import { WalletStore } from "@/stores/WalletStore";
import { storeToRefs } from "pinia";
import type { CurrencyTicker } from "@/interfaces/Ticker/Ticker.model";

const walletStore = WalletStore();
const { currencyTicker: prices } = storeToRefs(walletStore);
const props = defineProps<{
    currency: Currency;
    modelValue: any;
    minAmount: number;
}>();
const emits = defineEmits<{
    (e: "update:model-value", value: Calculator): void;
    (e: "noPrice"): void;
    (e: "amountPermitted", value: boolean): void;
}>();

const helper = helperStore();

const calculadora = reactive<Calculator>({
    amountFiat: 0,
    amountCrypto: 0,
    amountUsd: 1,
    tasaCompra: 1,
    tasaVenta: 1,
    criptoOficial: 1,
    localOficial: 1,
});

const eventsFiat: EventComponent = {
    keypress: (event: any) => {
        if (!keyPressIsNumber(event) && event.key != "Backscape") {
            event.preventDefault();
            return;
        }
        // amountFiat.value = amountFormat(event)
    },
    keyup: (event: any) => {
        amountFiat.value = amountFormat(event);
        updateCrypto();
    },
};
const eventsCrypto: EventComponent = {
    keypress: (event: any) => {
        if (!keyPressIsNumber(event)) {
            event.preventDefault();
        }
    },
    keyup: (event: any) => {
        amountCrypto.value = amountFormat(event, 8);
        updateFiat();
    },
};

const priceSelect = ref<CurrencyTicker | null>(null);
const oficialValue = ref(1);
// const prices = ref<Price[]>([])
const getPrices = async () => {
    // prices.value = res.data?.data
    priceSelect.value = prices.value[0];
    priceSelect.value =
        prices.value.find(
            (price) =>
                "T" + price.symbol.toLocaleUpperCase() ==
                props.currency.attributes.abbreviation.toUpperCase()
        ) ?? null;
    // if(!priceSelect.value){
    //     emits('noPrice');
    //     return
    // }
    calculadora.criptoOficial = priceSelect.value?.oficial ?? 1;
    oficialValue.value =
        calculadora.criptoOficial / parseFloat(priceSelect.value?.trm ?? "1");
    calculadora.tasaCompra = oficialValue.value;
    calculadora.localOficial = priceSelect.value?.oficial ?? 1;
};

getPrices();

const amountFiat = ref<string>("0,00");
const amountCrypto = ref<string>("0,00000000");

const updateCrypto = () => {
    calculadora.amountFiat = transformAmount(amountFiat.value);

    const division = calculadora.amountFiat / (priceSelect.value?.buy ?? 1);
    calculadora.amountCrypto = division.toFixed(8);
    amountCrypto.value = calculadora.amountCrypto;
    calculadora.amountUsd = (
        parseFloat(calculadora.amountCrypto) * oficialValue.value
    ).toFixed(2);
    emits("update:model-value", calculadora);
};

const updateFiat = () => {
    calculadora.amountCrypto = transformAmount(amountCrypto.value);
    calculadora.amountFiat =
        calculadora.amountCrypto * (priceSelect.value?.buy ?? 1);
    calculadora.amountUsd = (
        calculadora.amountCrypto * oficialValue.value
    ).toFixed(2);
    amountFiat.value = calculadora.amountFiat.toFixed(2);
    emits("update:model-value", calculadora);
};

watch(
    () => calculadora.amountFiat,
    (nuevo) => {
        if (nuevo >= props.minAmount) {
            emits("amountPermitted", true);
            return;
        }
        emits("amountPermitted", false);
        return;
    }
);
// --------------
interface Price {
    id: number;
    symbol: string;
    name: string;
    base: string;
    buy: number;
    sell: number;
    buy_cash: number;
    active: boolean;
    trm: string;
    icono: string;
    oficial: number;
    oficial_usd: string;
}
</script>

<style scoped></style>
