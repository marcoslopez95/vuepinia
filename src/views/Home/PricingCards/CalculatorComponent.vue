<template>
    <VCard elevation="15">
        <div :class="showBuy ? 'degradado-buy' : 'degradado-sell'">
            <div class="d-flex justify-lg-space-between" style="height: 70px">
                <div
                    class="my-auto mx-auto font-weight-bold cursor-pointer"
                    :class="showBuy ? 'text-white bg-primary' : 'text-primary'"
                    @click="showBuy = true"
                >
                    <span class="">Comprar</span>
                </div>
                <div class="d-flex">
                    <div
                        class="barra"
                        :class="!showBuy ? 'bg-white' : 'bg-primary'"
                    ></div>
                    <div
                        class="barra"
                        :class="showBuy ? 'bg-white' : 'bg-primary'"
                    ></div>
                </div>
                <div
                    class="my-auto mx-auto font-weight-bold cursor-pointer"
                    :class="!showBuy ? 'text-white bg-primary' : 'text-primary'"
                    @click="showBuy = false"
                >
                    Vender
                </div>
            </div>
        </div>
        <div
            class="bg-primary"
            :class="showBuy ? 'rounded-te-lg' : 'rounded-ts-lg'"
        >
            <div class="d-flex flex-column"  :class="showBuy ? 'flex-column' : 'flex-column-reverse'">

            <div class="px-2 py-3">
                <div
                    class="d-flex justify-space-between align-center rounded-10 elevation-4 bg-white"
                >
                    <VRow dense class="d-flex align-center">
                        <VCol>
                            <VTextField
                                bg-color="white"
                                hide-details
                                id="algo"
                                class="font-22 probando"
                                :disabled="!cryptoSelect"
                                style="padding-left: 0px"
                                :label="showBuy ? 'Pagas' : 'Recibes'"
                                variant="solo"
                                placeholder="0.00"
                                active
                                rounded="10"
                                flat
                                v-model="amountFiat"
                                v-on="eventsFiat"
                            >
                            </VTextField>
                        </VCol>
                        <VCol cols="5" class="mr-3">
                            <div
                                class="bg-inactive-select rounded-lg d-flex align-center gap-2 justify-center py-1"
                                style="height: 44px"
                            >
                                <VIcon :icon="ColombiaIcon" />
                                <span
                                    class="font-weight-semibold text-20 text-table-2"
                                    >COP</span
                                >
                            </div>
                        </VCol>
                    </VRow>
                </div>
            </div>
            <div class="px-2 py-3">
                <div
                    class="d-flex justify-space-between align-center rounded-10 elevation-4 bg-white"
                >
                    <VRow dense class="d-flex align-center">
                        <VCol >
                            <VTextField
                                bg-color="white"
                                hide-details
                                class="font-22"
                                :label="showBuy ?'Recibes' : 'Vendes'"
                                variant="solo"
                                placeholder="0.00"
                                active
                                rounded="10"
                                flat
                                :disabled="!cryptoSelect"
                                color="table-2"
                                v-model="amountCrypto"
                                v-on="eventsCrypto"
                            >
                            </VTextField>
                        </VCol>
                        <VCol cols="5" class="mr-3">
                            <VSelect
                                v-model="cryptoSelect"
                                density="compact"
                                hide-details
                                :items="currencies"
                                variant="solo"
                                item-value="id"
                                item-title="attributes.name"
                                flat
                                id="selectCrypto"
                                single-line
                                rounded="lg"
                                bg-color="#f7f7f7"
                                menu-icon=""
                                :menu="vModelMenu"
                                @update:menu="(v) => (vModelMenu = v)"
                            >
                                <template #selection="{ index, item }">
                                    <!-- <div
                                        class="d-flex h-100 w-100 align-center font-weight-semibold gap-2"
                                    > -->
                                    <VImg
                                        inline
                                        v-if="itemHaveImages((item.raw as Currency).relationships?.images)"
                                        :src="itemHaveImages((item.raw as Currency).relationships?.images) as string"
                                        sizes="20px"
                                    ></VImg>
                                    <span
                                        class="font-weight-semibold text-20 text-table-2"
                                        
                                    >
                                        {{
                                            (
                                                item.raw as Currency
                                            ).attributes?.abbreviation?.toUpperCase() ??
                                            "Seleccione"
                                        }}
                                    </span>
                                    <!-- </div> -->
                                </template>

                                <template #item="{ item, props, index }">
                                    <v-divider class="mb-2"></v-divider>

                                    <v-list-item
                                        @click="
                                            cryptoSelect = item.raw.id;
                                            vModelMenu = false;
                                        "
                                    >
                                        <template v-slot:prepend>
                                            <VImg
                                                v-if="itemHaveImages((item.raw as Currency).relationships?.images)"
                                                :src="itemHaveImages((item.raw as Currency).relationships?.images) as string"
                                                sizes="25px"
                                            ></VImg>
                                        </template>
                                        <span class="ml-2">
                                            {{ item.title }}
                                        </span>
                                    </v-list-item>
                                </template>
                            </VSelect>
                        </VCol>
                    </VRow>
                </div>
            </div>
            </div>

            <VCardActions class="px-1 mx-1 d-flex justify-center">
                <div class="text-center">
                    <span v-if="amountCrypto">
                        Equivalente a
                        <b> {{ formatNumber(parseFloat(calculadora.amountUsd as string)) }} USD</b> apróximadamente
                    </span>
                    <span v-else>
                        Seleccione una moneda e Ingrese una cantidad
                    </span>
                </div>
            </VCardActions>
        </div>
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
import ColombiaIcon from "@/assets/icons/ColombiaIcon.vue";
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
import { formatNumber, itemHaveImages } from "@/helper";

const { smAndDown: isMobile,xs } = useDisplay();
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
watch(cryptoSelect, (nuevo, viejo) => {
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
        if (amountFiat.value) {
            updateCrypto();
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

const showBuy = ref(true);
const changeOrientation = computed(() => (showBuy.value ? 1.5 : -1.5));

const vModelMenu = ref(false);

watch(showBuy, (nuevo, viejo) => {});

const fontSizeForInputs = computed(() => isMobile.value ? '21px' : '22px')
</script>

<style lang="scss">
@import "@/scss/variables.scss";

.v-field__input {
    font-size: v-bind("fontSizeForInputs");
    color: #4F4F5B;
    &#algo{
        --v-field-padding-end: 0px!important;
    }
    #selectCrypto{
        --v-field-padding-start: 0px!important;
    }
}
$side: v-bind("changeOrientation");
.degradado-buy {
    background: linear-gradient(50deg, $color-primary 51%, #ffffff 49%);
}
.degradado-sell {
    background: linear-gradient(-50deg, $color-primary 49%, #ffffff 51%);
}

.barra {
    border-radius: 16px;
    background-color: red;
    transform: skewX(calc($side * 15deg));
    width: 30px;
}

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

.bg-inactive-select {
    background-color: #f7f7f7;
}
</style>
