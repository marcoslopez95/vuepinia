import { helperStore } from "@/helper";
import type { Currency } from "@/interfaces/Currency/Currency.model";
import type { CurrencyType } from "@/interfaces/CurrencyType/CurrencyType.model";
import type { PaymentMethod } from "@/interfaces/PaymentMethod/PaymentMethod.model";
import { defineStore } from "pinia";
import { ref } from "vue";

export const CurrencyStore = defineStore('currency', () => {
    const helper = helperStore()
    const currencyTypes = ref<CurrencyType[]>([])
    const getCurrencyTypes = async () => {
        const res = await helper.http('type/currency','get')
        currencyTypes.value = res.data.response as CurrencyType[]
    }
    
    return {
        currencyTypes,
        getCurrencyTypes
    }
})

export const haveCurrencyImage = (currency?:Currency): string| false => {
    if(!currency) return false
    const images = currency.relationships?.images
    if(!images || images.length == 0) return false
    return images[0].attributes.aws_url
}