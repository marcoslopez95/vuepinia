<template>
    <div class="border-degree">
        <div
            class="mx-4 my-2"
            v-if="order?.attributes.type == OrderTypes.VENTA"
        >
            <div class="">
                <VImg
                    v-if="
                        itemHaveImages(
                            bankAccount?.relationships?.bank?.relationships
                                ?.images
                        )
                    "
                    :src="(itemHaveImages(bankAccount?.relationships?.bank?.relationships?.images) as string)"
                    width="200"
                    class="mx-auto"
                >
                </VImg>
                <div v-else>
                    {{
                        bankAccount?.relationships?.bank?.attributes.name ?? ""
                    }}
                </div>
            </div>
            <div class="text-18 text-table text-left mt-2">
                Titular: {{ bankAccount?.attributes.beneficiary }}<br />
                Documento:
                {{ bankAccount?.attributes.identification_document }} <br />
                Número de Cuenta: {{ bankAccount?.attributes.account_number }}
                <br />
                Banco: {{ bankAccount?.relationships?.bank?.attributes.name }}
                <br />
                Tipo de Cuenta:
                {{
                    bankAccount?.relationships?.typeAccountBank.attributes.name
                }}
            </div>
        </div>
        <div class="py-4 px-2 text-table" style="font-size: 20px;">
            <VRow dense class="text-left ">
                <VCol class="py-0 " >Nombre Titular:</VCol>
                <VCol class="py-0 tet-primary w-25">
                    <div class="d-flex justify-space-between ">
                        <div class="text-primary">
                            {{ bankAccount?.attributes.beneficiary }}
                        </div>
                        <div>
                            <VTooltip location="top">
                                <template #activator="{props}">
                                    <VIcon v-bind="props" :icon="ChangeCheckedIcon" color="primary" />
                                </template>
                                Cambiar Cuenta
                            </VTooltip>
                        </div>
                    </div>
                </VCol>
            </VRow>
            <VRow dense class="text-left ">
                <VCol class="py-0 " >Número de cuenta:</VCol>
                <VCol class="py-0 " >
                    {{ bankAccount?.attributes.account_number }}
                </VCol>
            </VRow>
            <VRow dense class="text-left ">
                <VCol class="py-0 " >Banco:</VCol>
                <VCol class="py-0 " >
                    {{ bankAccount?.relationships?.bank.attributes.name }}
                </VCol>
            </VRow>
            <VRow dense class="text-left ">
                <VCol class="py-0 " >Cantidad Comprada:</VCol>
                <VCol class="py-0 text-primary">
                    {{ formatNumber(
                        parseFloat(order?.relationships?.currencyExchangeOrder.attributes.total_exchange_local!)
                        )
                    }} COP
                </VCol>
            </VRow>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { BankAccountClient } from "@/interfaces/CompanyAccount/BankAccount/BankAccount.model";
import { TransactionStore } from "@/stores/TransactionStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { formatNumber, itemHaveImages } from "@/helper";
import { OrderTypes } from "@/enums/OrderTypes.enum";
import ChangeCheckedIcon from '@/assets/icons/ChangeCheckedIcon.vue'

const transactionStore = TransactionStore();
const { order } = storeToRefs(transactionStore);
const bankAccount = computed(() => {
    if (!order.value) return undefined;
    return order.value.relationships?.account_delivery as BankAccountClient;
});
</script>

<style scoped lang="scss">

</style>
