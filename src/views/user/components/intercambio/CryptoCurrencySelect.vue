<template>
    <VRow class="mt-3">
        
        <VCol 
            class="cursor-pointer" 
            cols="12"
            sm="6"
            lg="6"
            md="12"
            v-for="currency, i in walletStore.currencies" 
            :key="i"
            @click="emits('update:model-value',currency)"
        >
            <VHover v-slot="{ isHovering, props }">
                <VCard 
                    v-bind="props"
                    style="min-height: 70; max-height: 70;"
                    class="h-100 rounded-lg pa-3 border-orange d-flex"
                    :class="[isHovering || modelValue?.id == currency.id  ? 'bg-orange2 ' : '']"
                    :style="{
                        'background-color': getColorHover(isHovering,currency),
                        'border': `2px solid ${currency.attributes.color ?? 'black'}`
                    }
                    "
                    >
                    
                    <VRow class="font-weight-bold text-table">
                        <VCol class="my-auto">
                            <VImg v-if="getImageCurrency(currency)" :src="(getImageCurrency(currency) as string)" width="40"></VImg>
                            <VIcon v-else icon="mdi-bitcoin" size="40"></VIcon>
                        </VCol>
                        <VCol class="my-auto"> {{ currency.attributes.name }} </VCol>
                        <VCol class="my-auto"> {{ getFormatPrice(currency)}} </VCol>
                    </VRow>
                    
                </VCard>

            </VHover>
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
import { formatNumber } from "@/helper";
import type { Currency } from "@/interfaces/Currency/Currency.model";
import { WalletStore } from "@/stores/WalletStore"
const walletStore = WalletStore()
walletStore.getCurrencies()
walletStore.getCurrencyTicker()

const emits = defineEmits<{
    (e:'update:model-value',value: Currency):void
}>()

const props = defineProps<{
    modelValue: any
}>()

const getImageCurrency = (currency: Currency): string | boolean => {
    if(currency.relationships?.images?.length == 0) return false
    return currency.relationships!.images![0].attributes.aws_url
}

const getColorHover = (isHovering:boolean |undefined, currency: Currency) => {
    if(isHovering || props.modelValue?.id == currency.id){
        return currency.attributes.color ?? 'rgba(233, 182, 42, 0.274)'
    }
    return ''
}

const getFormatPrice = (currency:Currency) => {
    let str = 'COP '
    const priceCurrencyTicker = walletStore.getCurrencyTickerByAbbreviation(currency.attributes.abbreviation)?.oficial ?? null
    if(!priceCurrencyTicker) return str

    return str + formatNumber(priceCurrencyTicker,',','.')

}
</script>

<style scoped lang="scss">
.border-orange {
    border: 2px solid orange
}

.bg-orange2 {
    background-color: rgba(233, 182, 42, 0.274);
}
</style>