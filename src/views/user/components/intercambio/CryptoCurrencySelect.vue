<template>
    <VRow class="mt-3">
        
        <VCol 
            class="cursor-pointer" 
            cols="12"
            :lg="$vuetify.display.width <1400 ? 12 : 6"
            md="12"
            v-for="currency, i in wallets" 
            :key="i"
            @click="emit(currency)"
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
                    
                    <div :class="$vuetify.display.xs ? 'text-18' : 'text-20'"  class=" text-table w-100 d-flex justify-space-around align-center">
                        <div class="">
                            <VImg v-if="getImageCurrency(currency)" :src="(getImageCurrency(currency) as string)" width="50"></VImg>
                            <VIcon v-else icon="mdi-bitcoin" size="50"></VIcon>
                        </div>
                        <div class=""> {{ currency.attributes.name }} </div>
                        <div class=""> {{ getFormatPrice(currency)}} </div>
                    </div>
                    
                </VCard>

            </VHover>
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
import { formatNumber } from "@/helper";
import type { Currency } from "@/interfaces/Currency/Currency.model";
import { WalletStore } from "@/stores/WalletStore"
import { computed } from 'vue'
const walletStore = WalletStore()

const wallets = computed(():Currency[]=>{
    if(walletStore.currencyTicker.length == 0 || walletStore.currencies.length == 0) return []
    
    const codes = walletStore.currencyTicker.map(i => {
        if(import.meta.env.VITE_ENV_NETWORK == 'testnet'){
            return 't'+i.symbol.toLocaleLowerCase()
        }
        return i.symbol.toLocaleLowerCase()
    });
    console.log('codes',codes);
    return walletStore.currencies.filter((i) => codes.includes(i.attributes.symbol))
})
// Promise.all([
    walletStore.getCurrencies(),
    walletStore.getCurrencyTicker()
// ]).then(()=>{
// })

const emit = (currency: Currency) => {
    if(walletStore.currencyTicker.length == 0)return
    emits('update:model-value',currency)
}
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

    return formatNumber(priceCurrencyTicker,',','.') + ' '+str

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