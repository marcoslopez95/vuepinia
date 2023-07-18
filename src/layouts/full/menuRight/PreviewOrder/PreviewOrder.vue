<template>
    <VCard class="v-text-field__slot d-flex flex-column" style="height: 446px">
        <h3 class="text-center text-primary">
            {{ $t("views.menu-right.preview-order.title") }}
        </h3>
        <VCardText class="px-3 my-auto text-left text-table text-20 font-weight-bold">
            <div class="my-6 d-flex " style="justify-content: space-between ;">
                <span>Cantidad:</span>
                <span class="">
                    {{ transactionStore.order?.attributes.amount_currency }}
                </span>
            </div>
            <div class="my-6 d-flex " style="justify-content: space-between ;">
                <span>Pesos:</span>              
                <span class="">
                    {{ transactionStore.order?.relationships?.currencyExchangeOrder.attributes.total_exchange_local }}
                </span>
            </div>
            <div class="my-6 d-flex " style="justify-content: space-between ;">

                <span>Doláres:</span>            
                <span class="">
                    {{ transactionStore.order?.relationships?.currencyExchangeOrder.attributes.total_exchange_reference }}
                </span>
            </div>
            <div class="my-6 d-flex " style="justify-content: space-between ;">

                <span>Fee Mineros:</span>        
                <span class="">
                    {{ transactionStore.order?.attributes.fee }}
                </span>
            </div>
            <div class="my-6 d-flex " style="justify-content: space-between ;">

                <span>Fee administrativo:</span> 
                <span class="">
                    {{ transactionStore.order?.attributes.fee }}

                </span>
            </div>
        </VCardText>
        <VCardActions class="bg-primary text-white py-4">
            <VIcon :icon="BtcIcon" size="60" />
            <p class="text-h5 font-weight-bold ml-4">0.110001 BTC</p>
        </VCardActions>
    </VCard>
</template>

<script setup lang="ts">
import { TransactionStore } from "@/stores/TransactionStore";
import BtcIcon from "@/views/Home/PricingCards/BtcIcon.vue";

const transactionStore = TransactionStore()
</script>

<style scoped></style>
