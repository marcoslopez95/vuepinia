<template>
    <VCard class="v-text-field__slot d-flex flex-column">
        <!-- <VCardTitle class="" style="font-size: 25px; height: 58px;"> -->
        <!-- </VCardTitle> -->
        <div
            class="mt-5 mb-0 text-center text-primary mx-0 pb-0 px-0"
            style="font-size: 23px"
        >
            {{ $t("views.menu-right.preview-order.title") }}
        </div>
        <VCardText class="px-3 pt-0 my-auto text-left text-table text-18">
            <div class="my-6 d-flex" style="justify-content: space-between">
                <span>Cantidad:</span>
                <span class="">
                    {{ confirmOrderStore.form.amount_currency }}
                    {{
                        getCurrencyById(
                            confirmOrderStore.form.currency_id as number
                        ).attributes.abbreviation.toLocaleUpperCase()
                    }}
                </span>
            </div>
            <div
                v-if="confirmOrderStore.form.type == OrderTypes.COMPRA"
                class="my-6 d-flex"
                style="justify-content: space-between"
            >
                <span>Pesos a pagar :</span>
                <span class="">
                    {{
                        formatNumber(
                            parseFloat(
                                confirmOrderStore.form.total_exchange_local
                            )
                        )
                    }}
                    COP
                </span>
            </div>
            <div
                class="my-6 d-flex align-center"
                style="justify-content: space-between"
            >
                <span>Doláres:</span>
                <div class="align-center justify-center d-flex">
                    <v-tooltip text="Valor Apróximado">
                        <template v-slot:activator="{ props }">
                            <VIcon
                                v-bind="props"
                                class="mt-0 pt-0 mr-1"
                                size="20"
                                :icon="InformationIcon"
                                color="primary"
                            />
                        </template>
                    </v-tooltip>
                    <span class="">
                        {{ confirmOrderStore.form.total_exchange_reference }}
                        USD
                    </span>
                </div>
            </div>
            <div
                v-if="confirmOrderStore.form.type == OrderTypes.COMPRA"
                class="my-6 d-flex"
                style="justify-content: space-between"
            >
                <span>Fee Mineros:</span>
                <span class="">
                    {{ transactionStore.feeMiner }}
                    {{ transactionStore.order?.attributes.fee }} USD
                </span>
            </div>

            <div
                v-if=" totalLocal  < (generalData?.attributes.order_fee_limit as number)"
                class="my-6 d-flex"
                style="justify-content: space-between"
            >
                <span>Fee administrativo:</span>
                <div class="align-center justify-center d-flex">
                    <v-tooltip text="Comisíon por monto inferior al mínimo">
                        <template v-slot:activator="{ props }">
                            <VIcon
                                class="mt-0 mr-1 pt-0"
                                :icon="QuestionIcon"
                                color="primary"
                                size="20"
                                v-bind="props"
                            />
                        </template>
                    </v-tooltip>

                    <span class="">
                        {{
                            formatNumber(
                                parseFloat(transactionStore.feeAdministrative)
                            )
                        }}
                        COP
                        <!-- {{ transactionStore.order?.attributes.fee }} -->
                    </span>
                </div>
            </div>
            <div
                
                class="py-6 d-flex border-t"
                style="justify-content: space-between"
            >
                <span>Pesos a Recibir:</span>
                <span class="">
                    {{
                        formatNumber(
                            parseFloat(
                                confirmOrderStore.form.fiat_received
                            )
                        )
                    }}
                    COP
                </span>
            </div>
            <div
                @click="form.xcop_payment = !form.xcop_payment"
                class="w-100 cursor-pointer px-1 d-flex align-center justify-start"
                style="gap: 15px"
            >
                <VCheckbox
                    v-model="form.xcop_payment"
                    color="primary"
                    hide-details
                    density="compact"
                    id="xcop"
                >
                    <template #label>
                        <div
                           
                            class="text-table"
                            style="opacity: 1 !important"
                        >
                            Usar XCOP para los fees
                        </div>
                    </template>
                </VCheckbox>
            </div>
        </VCardText>
        <VCardActions class="bg-primary text-white py-4 px-3">
            <VImg
                v-if="getIconOfCurrency"
                :src="getIconOfCurrency"
                width="60"
                height="60"
            >
            </VImg>
            <VIcon v-else :icon="BtcIcon" size="60" />
            <VSpacer></VSpacer>
            <p class="text-h5 font-weight-bold ml-1">
                {{ confirmOrderStore.form.amount_currency }}
                {{
                    getCurrencyById(
                        confirmOrderStore.form.currency_id as number
                    ).attributes.abbreviation.toLocaleUpperCase()
                }} 
            </p>
        </VCardActions>
    </VCard>
</template>

<script setup lang="ts">
import { TransactionStore } from "@/stores/TransactionStore";
import BtcIcon from "@/views/Home/PricingCards/BtcIcon.vue";
import { formatNumber } from "@/helper";
import { ConfirmOrderStore } from "@/views/user/Compra/CompraStore";
import { WalletStore } from "@/stores/WalletStore";
import type { Currency } from "@/interfaces/Currency/Currency.model";
import { computed } from "vue";
import InformationIcon from "@/assets/icons/InformationIcon.vue";
import QuestionIcon from "@/assets/icons/QuestionIcon.vue";
import { OrderTypes } from "@/enums/OrderTypes.enum";
import { GeneralConfiguration } from "@/stores/GeneralConfiguration";
import { storeToRefs } from "pinia";

const generalConfiguration = GeneralConfiguration();
const { generalData } = storeToRefs(generalConfiguration);
const transactionStore = TransactionStore();
const confirmOrderStore = ConfirmOrderStore();
const { form } = storeToRefs(confirmOrderStore);
const walletStore = WalletStore();

const totalLocal = parseFloat(confirmOrderStore.form.total_exchange_local);

const getCurrencyById = (currency_id: number): Currency => {
    return walletStore.currencies.find(
        (currency) => currency.id == currency_id
    )!;
};

const getIconOfCurrency = computed(() => {
    const currency = getCurrencyById(
        confirmOrderStore.form.currency_id as number
    );
    if (currency.relationships?.images?.length == 0) return false;
    return currency.relationships?.images![0].attributes.aws_url ?? false;
});
</script>

<style>
label.v-label {
    opacity: 1 !important;
}
</style>
