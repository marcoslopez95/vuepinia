<template>
    <VCard v-if="transactionStore.order" class="v-text-field__slot d-flex flex-column" :style="`height: ${height ?? 446}px`">
        <h3 class="text-center text-primary">
            {{ $t("views.menu-right.preview-order.title") }}
        </h3>
        <VCardText class="px-3 my-auto text-left text-table text-20 font-weight-bold">
            <div class="my-6 d-flex " style="justify-content: space-between ;">
                <span>Cantidad:</span>
                <span class="">
                    {{ transactionStore.order!.attributes.amount_currency }} {{  transactionStore.order!.relationships!.currency.attributes.abbreviation.toLocaleUpperCase() }}
                </span>
            </div>
            <div v-if="transactionStore.order.attributes.type == OrderTypes.COMPRA" class="my-6 d-flex " style="justify-content: space-between ;">
                <span>Pesos:</span>              
                <span class="">
                    {{ formatNumber(parseFloat(transactionStore.order!.relationships!.currencyExchangeOrder.attributes.total_exchange_local)) }}
                    {{ transactionStore.order!.relationships!.currencyExchangeOrder.relationships?.localCurrency.attributes.abbreviation }}

                </span>
            </div>
            <div class="my-6 d-flex " style="justify-content: space-between ;">

                <span>Doláres:</span>            
                <div class="align-center justify-center d-flex">
                    <VIcon class="mt-0 pt-0 mr-1" size="20" :icon="InformationIcon" color="primary" />
                    <span class="">
                        {{ transactionStore.order.relationships?.currencyExchangeOrder.attributes.total_exchange_reference }}
                        USD
                    </span>
                </div>
            </div>
            <div v-if="transactionStore.order.attributes.type == OrderTypes.COMPRA" class="my-6 d-flex " style="justify-content: space-between ;">

                <span>Fee Mineros:</span>        
                <span class="">
                    {{ transactionStore.order?.attributes.fee }}
                </span>
            </div>
            <div class="my-6 d-flex " style="justify-content: space-between ;">

                <span>Fee administrativo:</span> 
                <div class="align-center justify-center d-flex">
                    <VIcon class="mt-0 mr-1 pt-0" :icon="QuestionIcon" color="primary" size="20" />
                    <span class="">
                    {{ transactionStore.order?.attributes.fee }}

                </span>
                </div>
            </div>
            <div v-if="transactionStore.order.attributes.type == OrderTypes.VENTA" class="my-6 d-flex " style="justify-content: space-between ;">
                <span>Pesos a Recibir:</span>              
                <span class="">
                    {{ formatNumber(parseFloat(transactionStore.order.relationships?.currencyExchangeOrder.attributes.total_exchange_local!)) }}
                    COP
                </span>
            </div>
        </VCardText>
        <VCardActions class="bg-primary text-white py-4">
            <VImg 
                v-if="transactionStore.order.relationships?.currency.relationships?.images?.length ?? 0 > 0" 
                    :src="transactionStore.order.relationships?.currency.relationships?.images![0].attributes.aws_url" 
                    width="60" height="60">
            </VImg>
            <VIcon v-else :icon="BtcIcon" size="60" />
            <p class="text-h5 font-weight-bold ml-4">
                {{ transactionStore.order!.attributes.amount_currency }} {{  transactionStore.order!.relationships!.currency.attributes.abbreviation.toLocaleUpperCase() }}
            </p>
        </VCardActions>
    </VCard>
</template>

<script setup lang="ts">
import { TransactionStore } from "@/stores/TransactionStore";
import BtcIcon from "@/views/Home/PricingCards/BtcIcon.vue";
import { formatNumber } from '@/helper'
import { OrderTypes } from "@/enums/OrderTypes.enum";
import InformationIcon from "@/assets/icons/InformationIcon.vue";
import QuestionIcon from "@/assets/icons/QuestionIcon.vue";
const transactionStore = TransactionStore()

const props = defineProps<{
    height?: string
}>()
</script>

<style scoped></style>
