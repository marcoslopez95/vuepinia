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
            class="cursor-pointer w-100 pr-9 d-flex align-center justify-space-between"
            @click="openTool"
        >
            <span class="w-100" style="font-size: 16px">{{
                order?.attributes.address_send
            }}</span>
            <copy-component :value="order?.attributes.address_send!"></copy-component>
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

        <div v-if="order?.attributes.type == OrderTypes.COMPRA">
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
        <div v-if="order?.attributes.type == OrderTypes.VENTA && showDetailAmount">
            <div>
                Titular:
                <div class="d-inline-block float-end">
                    {{ bankAccount?.attributes.beneficiary }}
                </div>
            </div>
            <div>
                Documento:
                <div class="d-inline-block float-end">
                    {{ bankAccount?.attributes.identification_document }} <br />
                </div>
            </div>
            <div>
                Número de Cuenta:
                <div class="d-inline-block float-end">
                    {{ bankAccount?.attributes.account_number }}
                </div>
            </div>
            <div>
                Banco:
                <div class="d-inline-block float-end">
                    <span v-if="bankAccount?.relationships?.bank">
                        Banco: {{ bankAccount?.relationships?.bank?.attributes.name }}
                    </span>
                </div>
            </div>
            <div>
                Tipo Cuenta:
                <div class="d-inline-block float-end">
                    {{
                        bankAccount?.relationships?.typeAccountBank.attributes.name
                    }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CopyIcon from "@/assets/icons/CopyIcon.vue";
import { OrderTypes } from "@/enums/OrderTypes.enum";
import CopyComponent from '@/components/CopyComponent.vue'
import { copyToClipboard, formatCrypoAmount, formatNumber, itemHaveImages } from "@/helper";
import type { BankAccountClient } from "@/interfaces/CompanyAccount/BankAccount/BankAccount.model";
import { TransactionStore } from "@/stores/TransactionStore";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import { ref, computed } from "vue";

const props = defineProps<{
    showDetailAmount?: boolean
}>()

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

const bankAccount = computed(() => {
    if (!order.value) return undefined;
    return order.value.relationships?.account_delivery as BankAccountClient;
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
