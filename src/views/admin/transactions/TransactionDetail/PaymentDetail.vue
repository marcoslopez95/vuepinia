<template>
    <div class="border-degree text-left text-18">
        <div>Tipo de transacción:</div>
        <div>
            {{ order?.attributes.type }}
        </div>
        <div>Tipo de Pago:</div>
        <div>
            {{ order?.relationships?.payment.attributes.name }}
        </div>
        <div>Moneda:</div>
        <div>
            {{ order?.relationships?.currency.attributes.name }}
        </div>
        <div>Dirección de envío:</div>
        <div
            class="cursor-pointer d-flex align-center justify-space-between"
            @click="openTool"
        >
            <VTooltip
                v-model="tooltip"
                location="top"
                attach="#algo"
                :open-on-focus="false"
                :open-on-hover="false"
                close-on-content-click
            >
                <template #activator="{ props }">
                    <span style="font-size: 16px">{{
                        order?.attributes.address_send
                    }}</span>
                    <VIcon
                        v-bind="props"
                        color="primary"
                        :icon="CopyIcon"
                        size="20"
                    />
                </template>
                <span>Copiado</span>
            </VTooltip>
        </div>
        <div>
            Cantidad:
            <div class="d-inline-block float-end">
                {{
                    formatNumber(
                        parseFloat(
                            order?.relationships?.currencyExchangeOrder
                                .attributes.total_exchange_local!
                        )
                    )
                }}
                COP
            </div>
        </div>
        <div>
            Comisión:
            <div class="d-inline-block float-end">
                {{ formatNumber(parseFloat(order?.attributes.fee!)) }} USD
            </div>
            <div class="my-3 d-flex justify-center align-center" style="gap:5px">
                <!-- <div> -->
                    <VImg
                    inline
                        v-if="
                            itemHaveImages(
                                order?.relationships?.currency.relationships
                                    ?.images
                            )
                        "
                        :src="(itemHaveImages(order?.relationships?.currency.relationships?.images) as string)"
                        height="30"
                    ></VImg>
                <!-- </div> -->
                <div class="font-weight-bold" style="font-size: 30px">
                    {{
                        formatCrypoAmount(
                            order?.attributes.amount_currency as string
                        )
                    }}
                    {{ 
                        order?.relationships?.currency.attributes.abbreviation.toLocaleUpperCase()
                     }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CopyIcon from "@/assets/icons/CopyIcon.vue";
import { copyToClipboard, formatCrypoAmount, formatNumber, itemHaveImages } from "@/helper";
import { TransactionStore } from "@/stores/TransactionStore";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { ref } from "vue";

const transacionStore = TransactionStore();
const { order } = storeToRefs(transacionStore);
const tooltip = ref(false);
const openTool = () => {
    tooltip.value = true;
    copyToClipboard(order.value!.attributes.address_send!);
};

watch(tooltip, (nuevo, viejo) => {
    if (nuevo === true) {
        const intervalToolTip = setInterval(() => {
            tooltip.value = false;
            clearInterval(intervalToolTip);
        }, 3000);
    }
});
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";
.border-degree {
    >div {
        padding-left: 14px;
        padding-right: 14px;
    }
    > div:first-child {
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }
    > div:nth-child(odd) {
        color: $color-primary;
        background-color: $backgound-table-odd;
    }
    > div:nth-child(even) {
        color: $color-gray-dark;
    }
}
</style>
