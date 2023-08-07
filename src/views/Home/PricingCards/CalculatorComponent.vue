<template>
    <VCard class="h-100 v-text-field__slot">
        <VCardTitle
            class="text-center"
            :class="[!xs ? 'bg-primary' : 'text-primary']"
            :style="[xs ? 'font-size:18px' : '']"
        >
            {{ $t("views.home.calculator.title") }}
        </VCardTitle>
        <VCardText class="px-3 border-primary">
            <VRow dense class="d-flex justify-space-between px-4">
                <div
                    :style="[xs ? 'font-size:11px!important' : '']"
                    style="width: 90px"
                >
                    <SwitchComponent
                        v-model="isSell"
                        title-on="Vender"
                        title-off="Comprar"
                        color-off="purple"
                        color-on="red-300"
                        :width-ball="24"
                    >
                    </SwitchComponent>
                </div>
                <div
                    :style="[xs ? 'font-size:11px!important' : '']"
                    style="width: 90px"
                >
                    <SwitchComponent
                        v-model="isBank"
                        title-on="Banco"
                        title-off="Efectivo"
                        color-off="green"
                        color-on="blue-sky"
                        :width-ball="24"
                    >
                    </SwitchComponent>
                </div>
            </VRow>
            <VRow dense>
                <VCol style="max-width: 170px" class="mx-auto">
                    <SelectComponent
                        v-model="cryptoSelect"
                        height="33px"
                        :items="currencies"
                        item-title="attributes.name"
                        item-value="id"
                        name=""
                    ></SelectComponent>
                </VCol>
            </VRow>
            <div class="mx-4">
                <VRow dense>
                    <VCol>
                        <InputComponent
                            v-model="amountFiat"
                            :events="eventsFiat"
                            :rules="[onlyNumbers]"
                            :disabled="!cryptoSelect"
                            name="Pesos"
                        ></InputComponent>
                    </VCol>
                </VRow>
                <VRow dense>
                    <VCol>
                        <InputComponent
                            v-model="amountCrypto"
                            :events="eventsCrypto"
                            :rules="[onlyNumbers]"
                            :disabled="!cryptoSelect"
                            name=""
                        ></InputComponent>
                    </VCol>
                </VRow>
            </div>
        </VCardText>
        <VCardActions
            class="pa-0"
            :class="[!xs ? 'bg-primary text-white' : 'text-primary mb-3']"
        >
            <VRow class="d-flex align-center my-1 justify-center">
                <div>
                    <VImg
                        v-if="walletStore.cryptoHaveImage(cryptoSelected)"
                        inline
                        width="50px"
                        :src="(walletStore.cryptoHaveImage(cryptoSelected) as string)"
                    >
                    </VImg>
                </div>
                <div class="text-center">
                    <p
                        :style="[`font-size: ${!xs ? 30 : 20}px;`]"
                        class="font-weight-bold"
                    >
                        <span v-if="amountCrypto">
                            {{ parseFloat(amountCrypto).toFixed(5) }}
                            {{
                                cryptoSelected?.attributes.abbreviation.toLocaleUpperCase()
                            }}
                        </span>
                        <span v-else> 0 </span>
                        <!-- {{ priceSelect }} -->
                    </p>
                    <p style="font-size: 10px">
                        equivalente a <b>{{ calculadora.amountUsd }} USD</b>
                    </p>
                    <p style="font-size: 10px">Aproximadamente</p>
                </div>
            </VRow>
        </VCardActions>
    </VCard>
</template>

<script setup lang="ts">
import InputComponent from "@/components/InputComponent.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import SwitchComponent from "@/components/SwitchComponent.vue";
import { computed } from "vue";
import { ref, reactive } from "vue";
import { onMounted } from "vue";
import BtcIcon from "./BtcIcon.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { WalletStore } from "@/stores/WalletStore";
import type { EventComponent } from "@/interfaces/Components.helper";
import {
    amountFormat,
    keyPressIsNumber,
    onlyNumbers,
    transformAmount,
} from "@/validator";
import type { Calculator } from "@/interfaces/Calculadora.interface";
import type { CurrencyTicker } from "@/interfaces/Ticker/Ticker.model";
import { storeToRefs } from "pinia";
import type { Currency } from "@/interfaces/Currency/Currency.model";
import { watch } from "vue";
import { formatNumber } from "@/helper";

const { xs } = useDisplay();
const isSell = ref(false);
const walletStore = WalletStore();
const { currencies, currencyTicker: prices } = storeToRefs(walletStore);
const buyOrSell = computed(() => (isSell.value == true ? "Comprar" : "Vender"));
const emits = defineEmits<{
    (e: "update:model-value", value: Calculator): void;
    (e: "noPrice"): void;
    (e: "amountPermitted", value: boolean): void;
}>();
const isBank = ref(false);
const efectyOrBank = computed(() =>
    isBank.value == true ? "Efectivo" : "Banco"
);

const amountFiat = ref<string>("");
const amountCrypto = ref<string>("");

const cryptoSelect = ref<"" | number>("");

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

const priceSelect = ref<undefined | CurrencyTicker>();
const cryptoSelected = ref<Currency | undefined>();
watch(cryptoSelect, (nuevo,viejo) => {
    if (nuevo != "") {
        cryptoSelected.value = currencies.value.find(
            (currency) => currency.id == cryptoSelect.value
        )!;
        priceSelect.value = prices.value.find((price) => {
            const symbol = price.symbol.toLocaleUpperCase();
            const abbreviation =
                cryptoSelected.value!.attributes.abbreviation.toUpperCase();

            return abbreviation.includes(symbol);
        });
        calculadora.criptoOficial = priceSelect.value?.oficial ?? 1;
        oficialValue.value =
            calculadora.criptoOficial /
            parseFloat(priceSelect.value?.trm ?? "1");
        calculadora.tasaCompra = oficialValue.value;
        calculadora.localOficial = priceSelect.value?.oficial ?? 1;
        if(amountFiat.value){
            updateCrypto()
        }
    }
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
const oficialValue = ref(1);

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
</script>

<style scoped lang="scss">
.image-container {
    // display: inline-block;
    border: 5px solid #ffffff;
    border-radius: 50%; /* Ajusta el valor según tus necesidades */
    overflow: hidden;
}

.image-container img {
    display: block;
    width: 100%;
    height: auto;
}
</style>
