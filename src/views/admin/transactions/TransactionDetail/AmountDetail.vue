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
            <div class="d-flex justify-center align-center" style="gap: 20px;">
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
                <div class="font-weight-bold" style="font-size: 30px;">
                    {{
                        formatCrypoAmount(
                            order?.attributes.amount_currency as string
                        )
                    }}
                </div>
            </div>
            <div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { formatNumber, formatCrypoAmount, itemHaveImages } from "@/helper";
import { TransactionStore } from "@/stores/TransactionStore";
import { storeToRefs } from "pinia";
import CopyComponent from "@/components/CopyComponent.vue";

const transactionStore = TransactionStore();
const { order } = storeToRefs(transactionStore);
</script>

<style scoped></style>
