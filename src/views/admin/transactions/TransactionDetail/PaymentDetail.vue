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
        <div  class="cursor-pointer d-flex align-center justify-space-between" @click="openTool">
            <VTooltip 
                v-model="tooltip" 
                location="top" 
                attach="#algo"
                :open-on-focus="false"
                :open-on-hover="false"
                close-on-content-click
                
                >
                <template #activator="{ props }">

                    <span>{{ order?.attributes.address_send }}</span>
                    <VIcon v-bind="props" color="primary" :icon="CopyIcon" size="20" />
                </template>
                <span>Copiado</span>

            </VTooltip>
        </div>
    </div>
</template>

<script setup lang="ts">
import CopyIcon from '@/assets/icons/CopyIcon.vue';
import { copyToClipboard } from '@/helper';
import { TransactionStore } from '@/stores/TransactionStore';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import { ref } from 'vue';

const  transacionStore = TransactionStore()
const { order } = storeToRefs(transacionStore)
const tooltip = ref(false)
const openTool = () => {
    tooltip.value = true
    copyToClipboard(order.value!.attributes.address_send!)
}

watch(tooltip, (nuevo,viejo) =>{
    if(nuevo === true) {
        const intervalToolTip = setInterval(()=>{
            tooltip.value = false
            clearInterval(intervalToolTip)
        },3000)
    }
})
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