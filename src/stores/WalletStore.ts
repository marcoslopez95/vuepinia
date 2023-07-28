import { defineStore, storeToRefs } from "pinia";
import type { Currency } from "@/interfaces/Currency/Currency.model";
import { helperStore } from "@/helper";
import { ref } from "vue";
import { CURRENCY_TYPES } from "@/enums/CurrencyTypes.enum";
import type { CurrencyTicker } from "@/interfaces/Ticker/Ticker.model";

export const WalletStore = defineStore('wallet', () => {
    const helper = helperStore()

    const currencies = ref<Currency[]>([])
    const getCurrencies = async () => {
        const res = await helper.http('currency', 'get', {
            params: {
                type_currency_id: CURRENCY_TYPES.CRYPTO
            }
        })
        currencies.value = res.data.response as Currency[];
    }

    const currencyTicker = ref<CurrencyTicker[]>([])
    const getCurrencyTicker = ():Promise<CurrencyTicker[]> =>{
        return new Promise(async (resolve, reject) =>{
            const url = 'https://ticker.xeler.io/v1/ticker'
            try{
                const res = await helper.http(url)
                currencyTicker.value = (res.data as resJsonTicker).data
                resolve(currencyTicker.value)
            }catch(e){
                helper.showNotify('Ha ocurrido un error por favor intente mas tarde')
                setInterval(()=>window.location.reload(),5000)
            }
        })
    }

    const getCurrencyTickerByAbbreviation = (abbreviation:string): CurrencyTicker | null => {
        return currencyTicker.value.find(ticker => abbreviation.toLocaleLowerCase()
                                                    .includes(ticker.symbol.toLocaleLowerCase())) ?? null
    }
    return {
        currencies,
        getCurrencies,
        currencyTicker,
        getCurrencyTicker,
        getCurrencyTickerByAbbreviation
    }

    interface resJsonTicker {
        hola: string
        data: CurrencyTicker[]
    }
})