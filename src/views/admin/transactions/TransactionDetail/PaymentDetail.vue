<template>
    <div class="border-degree text-left text-18">
        <div>
            Tipo de transacción:
        </div>
        <div>
            {{ order?.attributes.type }}
        </div>
        <div>
            Tipo de Pago:
        </div>
        <div>
            {{ order?.relationships?.payment.attributes.name }}
        </div>
        <div>
            Moneda:
        </div>
        <div>
            {{ order?.relationships?.currency.attributes.name }}
        </div>
        <div>
            Dirección de envío:
        </div>
        <div class="cursor-pointer d-flex align-center justify-space-between" @click="copyToClipboard(order?.attributes.address_send!)">
            <span>{{ order?.attributes.address_send }}</span>
            <VIcon color="primary" :icon="CopyIcon" size="20" />
        </div>
    </div>
</template>

<script setup lang="ts">
import CopyIcon from '@/assets/icons/CopyIcon.vue';
import { copyToClipboard } from '@/helper';
import { TransactionStore } from '@/stores/TransactionStore';
import { storeToRefs } from 'pinia';

const  transacionStore = TransactionStore()
const { order } = storeToRefs(transacionStore)
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.border-degree{
    div{
        padding-left: 14px;
        padding-right: 14px;
    }
    >div:first-child{
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
    }
    >div:nth-child(odd){
        color: $color-primary;
        background-color: $backgound-table-odd;
    }
    >div:nth-child(even){
        color: $color-gray-dark;
    }
}
</style>