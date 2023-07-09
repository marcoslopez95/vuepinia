<template>
    <VRow class="mt-3">
        
        <VCol 
            class="cursor-pointer" 
            cols="6" 
            v-for="currency, i in walletStore.currencies" 
            :key="i"
            @click="emits('update:model-value',currency)"
        >
            <VHover v-slot="{ isHovering, props }">
                <VCard 
                v-bind="props"
                    class=" rounded-lg pa-3 border-orange"
                    :class="[isHovering || modelValue?.id == currency.id  ? 'bg-orange2 ' : '']"
                    >
                    
                    <VRow class="font-weight-bold text-table">
                        <VCol class="my-auto">
                            <VIcon icon="mdi-bitcoin" size="40"></VIcon>
                        </VCol>
                        <VCol class="my-auto"> {{ currency.attributes.name }} </VCol>
                        <VCol class="my-auto"> Precio </VCol>
                    </VRow>
                    
                </VCard>

            </VHover>
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
import type { Currency } from "@/interfaces/Currency/Currency.model";
import { WalletStore } from "@/stores/WalletStore"
const walletStore = WalletStore()
walletStore.getCurrencies()

const emits = defineEmits<{
    (e:'update:model-value',value: Currency):void
}>()

defineProps<{
    modelValue: any
}>()
</script>

<style scoped lang="scss">
.border-orange {
    border: 2px solid orange
}

.bg-orange2 {
    background-color: rgba(233, 182, 42, 0.274);
}
</style>