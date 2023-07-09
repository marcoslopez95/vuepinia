import { defineStore, storeToRefs } from "pinia";
import type { Currency } from "@/interfaces/Currency/Currency.model";
import { helperStore } from "@/helper";
import { ref } from "vue";
import { CURRENCY_TYPES } from "@/enums/CurrencyTypes.enum";

export const WalletStore = defineStore('wallet', () => {
    const helper = helperStore()

    const currencies = ref<Currency[]>([])
    const getCurrencies = async () => {
        const res = await helper.http('currency','get',{
            params:{
                type_currency_id: CURRENCY_TYPES.CRYPTO
            }
        })
        currencies.value = res.data.response as Currency[];
    }
    return {
        currencies,
        getCurrencies
    }
})