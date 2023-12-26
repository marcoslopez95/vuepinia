<template>
    <VRow class="d-flex justify-center">
        <VCol>
            <div
                :class="$vuetify.display.xs ? '' : 'd-flex justify-center'"
                class=""
            >
                <div
                    style="width: 170px"
                    class="text-table"
                    :class="$vuetify.display.xs ? 'mx-auto' : ''"
                >
                    <TextTareaComponent
                        v-model="amountFiat"
                        :events="eventsFiat"
                        :rules="[onlyNumbers]"
                        name=""
                        appendText="COP"
                    >
                    </TextTareaComponent>
                </div>
                <div
                    class="my-auto mx-3 pt-6 text-center"
                    cols="1"
                    style="font-size: 1.5rem"
                >
                    <div
                        :class="$vuetify.display.xs ? 'mx-auto' : ''"
                        class="border-degree"
                        style="
                            border-radius: 100% !important;
                            width: 35px;
                            height: 35px;
                        "
                    >
                        =
                    </div>
                </div>
                <div
                    style="width: 170px"
                    :class="$vuetify.display.xs ? 'mx-auto' : ''"
                >
                    <TextTareaComponent
                        v-model="amountCrypto"
                        :events="eventsCrypto"
                        :rules="[onlyNumbers]"
                        name=""
                        :appendText="priceSelect?.symbol"
                    >
                    </TextTareaComponent>
                </div>
            </div>
            <div class="w-100 mt-10 text-center font-weight-bold text-table">
                {{ calculadora.amountCrypto }}
                {{ priceSelect?.symbol }} equivalente apróximado a
                {{ calculadora.amountUsd }} USD
            </div>

            <div
                v-if="validationForLimit"
                class="w-100 text-center font-weight-bold text-error"
            >
                Transacción mínima {{ formatNumber(minAmount, ",", ".") }} COP
                <br />
                Se cobrará un adicional de
                {{
                    formatNumber(
                        generalData?.attributes.administrative_fee as number,
                        ",",
                        "."
                    )
                }}
                COP
            </div>
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
import InputComponent from "@/components/InputComponent.vue";
import TextTareaComponent from "@/components/TextTareaComponent.vue";
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
import { GeneralConfiguration } from "@/stores/GeneralConfiguration";

const generalConfiguration = GeneralConfiguration();
const { generalData } = storeToRefs(generalConfiguration);
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
    (e: "montoFiat", value: string): void;
}>();

const helper = helperStore();

const calculadoraWithFees = reactive<
    Pick<Calculator, "amountFiat" | "amountCrypto" | "amountUsd">
>({
    amountCrypto: 0,
    amountFiat: 0,
    amountUsd: 0,
});

const validationForLimit = computed(() => {
    let value1;
    const administrative_fee = ((generalData.value?.attributes.administrative_fee as number) ?? 0)
    if(calculadora.amountFiat < administrative_fee){
        value1 = calculadora.amountFiat
    }else{
        value1 = calculadora.amountFiat - administrative_fee
    }
    const value2 = props.minAmount
    return value1 < value2
});
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
        amountFiat.value = amountFormat(event,1);
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
        amountCrypto.value = amountFormat(event, 7);
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
const amountCrypto = ref<string>("0,00000");

const updateCrypto = () => {
    let feesInFiat = 0;

    const montoFiat = transformAmount(amountFiat.value);
    emits("montoFiat", montoFiat.toFixed(2));
    if (montoFiat < (props.minAmount as number)) {
        feesInFiat = generalData.value?.attributes.administrative_fee as number;
    }

    const montoFiatWithFees = montoFiat + feesInFiat;

    calculadora.amountFiat = montoFiatWithFees;

    const division = montoFiat / (priceSelect.value?.buy ?? 1);
    const montoCrypto = division.toFixed(8);

    const divisionWithFees = montoFiatWithFees / (priceSelect.value?.buy ?? 1);
    const montoCryptoWithFees = divisionWithFees.toFixed(8);

    calculadora.amountCrypto = montoCryptoWithFees;

    amountCrypto.value = montoCrypto;

    calculadora.amountUsd = (
        parseFloat(montoCryptoWithFees) * oficialValue.value
    ).toFixed(2);

    emits("update:model-value", calculadora);
};

const updateFiat = () => {
    let feesInCrypto = 0;

    const montoCrypto = transformAmount(amountCrypto.value);
    const montoFiat = montoCrypto * (priceSelect.value?.buy ?? 1);
    emits("montoFiat", montoFiat.toFixed(2));
    if (montoFiat < (props.minAmount as number)) {
        feesInCrypto =
            (generalData.value?.attributes.administrative_fee as number) /
            (calculadora.criptoOficial as number);
    }

    const montoCryptoWithFees = montoCrypto + feesInCrypto;
    console.log("esto", montoCryptoWithFees, montoCrypto, feesInCrypto);
    const montoFiatWithFees =
        montoCryptoWithFees * (priceSelect.value?.buy ?? 1);
    const montoUsd = (montoCryptoWithFees * oficialValue.value).toFixed(2);

    calculadora.amountCrypto = montoCryptoWithFees;
    calculadora.amountFiat = montoFiatWithFees;
    calculadora.amountUsd = montoUsd;

    amountFiat.value = montoFiat.toFixed(2);

    emits("update:model-value", calculadora);
};

watch(
    () => calculadora.amountFiat,
    (nuevo) => {
        if (
            nuevo > (generalData.value?.attributes.administrative_fee as number)
        ) {
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
