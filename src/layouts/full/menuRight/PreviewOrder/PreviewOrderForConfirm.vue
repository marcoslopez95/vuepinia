<template>
    <VCard class="v-text-field__slot d-flex flex-column" style="height: 446px">
        <h3 class="text-center text-primary">
            {{ $t("views.menu-right.preview-order.title") }}
        </h3>
        <VCardText class="px-3 my-auto text-left text-table text-20 font-weight-bold">
            <div class="my-6 d-flex " style="justify-content: space-between ;">
                <span>Cantidad:</span>
                <span class="">
                    {{  confirmOrderStore.form.amount_currency }}
                    {{  getCurrencyById(confirmOrderStore.form.currency_id as number).attributes.abbreviation.toLocaleUpperCase() }}
                </span>
            </div>
            <div class="my-6 d-flex " style="justify-content: space-between ;">
                <span>Pesos:</span>              
                <span class="">
                    {{ formatNumber(parseFloat(confirmOrderStore.form.total_exchange_local)) }}
                    COP
                </span>
            </div>
            <div class="my-6 d-flex " style="justify-content: space-between ;">

                <span>Doláres:</span>            
                <span class="">
                    {{ confirmOrderStore.form.total_exchange_reference }}
                    USD
                </span>
            </div>
            <div class="my-6 d-flex " style="justify-content: space-between ;">

                <span>Fee Mineros:</span>        
                <span class="">
                    {{ transactionStore.feeMiner }}
                    <!-- {{ transactionStore.order?.attributes.fee }} -->
                </span>
            </div>
            <div class="my-6 d-flex " style="justify-content: space-between ;">

                <span>Fee administrativo:</span> 
                <span class="">
                    {{ transactionStore.feeAdministrative }}
                    <!-- {{ transactionStore.order?.attributes.fee }} -->

                </span>
            </div>
        </VCardText>
        <VCardActions class="bg-primary text-white py-4">
            <VImg v-if="getIconOfCurrency" :src="getIconOfCurrency" width="60" height="60">
            </VImg>
            <VIcon v-else :icon="BtcIcon" size="60" />
            <p class="text-h5 font-weight-bold ml-2">
                {{  confirmOrderStore.form.amount_currency }}
                {{  getCurrencyById(confirmOrderStore.form.currency_id as number).attributes.abbreviation.toLocaleUpperCase() }}
            </p>
        </VCardActions>
    </VCard>
</template>

<script setup lang="ts">
import { TransactionStore } from "@/stores/TransactionStore";
import BtcIcon from "@/views/Home/PricingCards/BtcIcon.vue";
import { formatNumber } from '@/helper'
import { ConfirmOrderStore } from "@/views/user/Compra/CompraStore";
import { WalletStore } from "@/stores/WalletStore";
import type { Currency } from "@/interfaces/Currency/Currency.model";
import { computed } from "vue";
const transactionStore = TransactionStore()
const confirmOrderStore = ConfirmOrderStore();
const walletStore = WalletStore()

const getCurrencyById = (currency_id:number): Currency => {
    return walletStore.currencies.find(currency => currency.id == currency_id)!
}

const getIconOfCurrency = computed(() => {
    const currency = getCurrencyById(confirmOrderStore.form.currency_id as number)
    if(currency.relationships?.images?.length == 0) return false
    return currency.relationships?.images![0].attributes.aws_url ?? false
})
</script>

<style scoped></style>
