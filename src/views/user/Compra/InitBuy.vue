<template>
    <div :class="!$vuetify.display.mdAndDown ? 'border-degree px-5 pt-5 pb-16' : ''" class="">
        <div class="text-primary font-22 text-left">
            {{ $t("views.buy.title") }}
        </div>
        <p class="text-table text-18 text-left">
            Selecciona la moneda que deseas comprar, luego de seleccionar podrás
            elegir el método de pago.
        </p>
        <CryptoCurrencySelect v-model="currency"> </CryptoCurrencySelect>
    </div>

    <PaymentMethods v-if="currency" v-model="paymentMethod"> </PaymentMethods>
    <component
        v-if="paymentMethod"
        :is="detailPaymentMethod!"
        :itemsDetails="itemsDetails"
        v-model="itemDetailSelected"
    >
    </component>
    <div class="mt-5" v-if="itemDetailSelected">
        <h3 class="text-primary">
            {{ $t("views.buy.amount") }}
        </h3>
        <p class="text-table text-18">
            Ingresa la cantidad a calcular, puedes usar cualquiera de los campos
            para hacer el cálculo
        </p>
        <CalculadoraComponent
            v-model="calculatorValue"
            @update:model-value="(value) => (calculatorValue = value)"
            :currency="currency!"
            @no-price="noPrice"
            :minAmount="200000"
            @amount-permitted="(value) => (amountPermitted = value)"
        >
        </CalculadoraComponent>
        <VRow>
            <VCol class="text-center my-6">
                <VBtnPrimary
                    :disabled="!amountPermitted"
                    @click="clickInContinue"
                >
                    {{ $t("general-views.continue") }}
                </VBtnPrimary>
            </VCol>
        </VRow>
    </div>
</template>

<script setup lang="ts">
import type { Currency } from "@/interfaces/Currency/Currency.model";
import CryptoCurrencySelect from "../components/intercambio/CryptoCurrencySelect.vue";
import PaymentMethods from "./../components/intercambio/PaymentMethods.vue";
import { ref } from "vue";
import type { PaymentMethod } from "@/interfaces/PaymentMethod/PaymentMethod.model";
import { PAYMENT_METHODS_AVAILABLE } from "@/enums/PaymentMethod.enum";
import BankComponent from "./../components/intercambio/PaymentMethods/BankComponent.vue";
import EfectyComponent from "./../components/intercambio/PaymentMethods/EfectyComponent.vue";
import OtherComponent from "./../components/intercambio/PaymentMethods/OtherComponent.vue";
import { computed } from "vue";
import { watch, reactive } from "vue";
import type { BankAccount } from "@/interfaces/CompanyAccount/BankAccount/BankAccount.model";
import type { EfectyAccount } from "@/interfaces/CompanyAccount/EfectyAccount/EfectyAccount.model";
import type { OtherAccount } from "@/interfaces/CompanyAccount/OtherAccount/OtherAccount.model";
import { helperStore } from "@/helper";
import CalculadoraComponent from "../components/intercambio/CalculadoraComponent.vue";
import { ConfirmOrderStore } from "./CompraStore";
import type { Calculator } from "@/interfaces/Calculadora.interface";
import { storeToRefs } from "pinia";

const confirmOrderStore = ConfirmOrderStore();
const { form } = storeToRefs(confirmOrderStore);
const emits = defineEmits<{
    (e: "click:continue"): void;
}>();

const helper = helperStore();
const currency = ref<Currency | null>(null);
const paymentMethod = ref<PaymentMethod | null>(null);
const itemsDetails = ref<BankAccount | EfectyAccount | OtherAccount | null>();
const itemDetailSelected = ref<
    BankAccount | EfectyAccount | OtherAccount | null
>();
const detailPaymentMethod = computed(() => {
    if (!paymentMethod.value) return null;

    getDetailsForPaymentMethod();
    switch (paymentMethod.value.id) {
        case PAYMENT_METHODS_AVAILABLE.BANK:
            return BankComponent;
        case PAYMENT_METHODS_AVAILABLE.EFECTY:
            return EfectyComponent;
        case PAYMENT_METHODS_AVAILABLE.OTHER:
            return OtherComponent;
    }
});

watch(currency, () => (paymentMethod.value = null));
watch(paymentMethod, () => {
    itemsDetails.value = null;
    itemDetailSelected.value = null;
});

const getDetailsForPaymentMethod = async () => {
    if (paymentMethod.value!.id === PAYMENT_METHODS_AVAILABLE.BANK) {
        const res = await helper.http("banks/account/actives");
        itemsDetails.value = res.data.response;
        return;
    }
    const params = {
        payment_type_id: paymentMethod.value!.id,
    };
    const res = await helper.http("company/account", "get", { params });
    itemsDetails.value = res.data.response;
};

const amountPermitted = ref(false);
const calculatorValue = ref<Calculator>({
    amountFiat: 0,
    amountCrypto: 0,
    amountUsd: 0,
    tasaCompra: 0,
    tasaVenta: 0,
    criptoOficial: 0,
    localOficial: 0,
});
const noPrice = () => {
    helper.showNotify(
        "Problema con la moneda, por favor contactar al administrador",
        { type: "error" }
    );
    currency.value = null;
};

const clickInContinue = () => {
    form.value.account_delivery_id = itemDetailSelected.value!.id;
    form.value.currency_id = currency.value!.id;
    form.value.payment_type_id = paymentMethod.value!.id;
    form.value.total_exchange_local =
        calculatorValue.value.amountFiat.toFixed(2);
    form.value.currency_price = (
        calculatorValue.value.tasaCompra as number
    ).toFixed(8);
    form.value.exchange_reference = (
        calculatorValue.value.criptoOficial as number
    ).toFixed(2);
    form.value.total_exchange_reference = parseFloat(
        calculatorValue.value.amountUsd as string
    ).toFixed(2);
    form.value.exchange_local = (
        calculatorValue.value.localOficial as number
    ).toFixed(2);
    form.value.total_exchange_local =
        calculatorValue.value.amountFiat.toFixed(2);
    form.value.amount_currency = parseFloat(
        calculatorValue.value.amountCrypto as string
    ).toFixed(8);
    form.value.received_amount = (
        parseFloat(form.value.amount_currency as string) +
        parseFloat(form.value.fee as string)
    ).toFixed(8);
    emits("click:continue");
};
</script>

<style scoped></style>
