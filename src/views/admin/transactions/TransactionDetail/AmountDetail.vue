<template>
    <div class="border-degree text-table">
        <div class="my-2">
            <div class="d-flex justify-space-around">
                <div>Total a Pagar:</div>
                <div>
                    {{
                        formatNumber(
                            parseFloat(
                                order?.relationships?.currencyExchangeOrder
                                    .attributes.total_exchange_local!
                            )
                        )
                    }}
                </div>
                <div>
                    <copy-component
                        :value="parseFloat(order?.relationships?.currencyExchangeOrder.attributes.total_exchange_local!)"
                    ></copy-component>
                </div>
            </div>
            <div class="d-flex justify-center align-center" style="gap: 20px">
                <div>
                    <VImg
                        v-if="
                            itemHaveImages(
                                order?.relationships?.currency.relationships
                                    ?.images
                            )
                        "
                        :src="(itemHaveImages(order?.relationships?.currency.relationships?.images) as string)"
                        height="30"
                    ></VImg>
                </div>
                <div class="font-weight-bold" style="font-size: 30px">
                    {{
                        formatCrypoAmount(
                            order?.attributes.amount_currency as string
                        )
                    }}
                    <span> {{ order?.relationships?.currency.attributes.abbreviation.toLocaleUpperCase() }}</span>
                </div>
                <div 
                    v-if="verifyCompatibilityShareInNav()"
                    @click="shareInNav(contenShare)" 
                    class="cursor-pointer" 
                    >
                    <VIcon title="Compartir" color="primary" :icon="ShareIcon"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatNumber, formatCrypoAmount, itemHaveImages, verifyCompatibilityShareInNav, shareInNav } from "@/helper";
import { TransactionStore } from "@/stores/TransactionStore";
import { storeToRefs } from "pinia";
import CopyComponent from "@/components/CopyComponent.vue";
import ShareIcon from "@/assets/icons/ShareIcon.vue";
import { computed } from 'vue'
import type { BankAccountClient } from "@/interfaces/CompanyAccount/BankAccount/BankAccount.model";
const transactionStore = TransactionStore();
const { order } = storeToRefs(transactionStore);



const bankAccount = computed(() => {
    if (!order.value) return undefined;
    return order.value.relationships?.account_delivery as BankAccountClient;
});

const contenShare: ShareData = {
    title: 'Transacción: ' + order.value?.attributes.tranx_no,
    text: `
    transacción: ${order.value?.attributes.tranx_no}
    Titular: ${bankAccount.value?.attributes.beneficiary }
    Documento: ${bankAccount.value?.attributes.identification_document }
    Número de Cuenta: ${bankAccount.value?.attributes.account_number }
    Banco:  ${bankAccount.value?.relationships?.bank?.attributes.name }
    Tipo Cuenta: ${bankAccount.value?.relationships?.typeAccountBank.attributes.name }
    Total a Pagar: ${order.value?.relationships?.currencyExchangeOrder.attributes.total_exchange_local!} COP
    Crypto: ${order.value?.relationships?.currency.attributes.abbreviation.toUpperCase()!}
    Total Crypto: ${order.value?.attributes.amount_currency!}
    `
}
</script>

<style scoped></style>
