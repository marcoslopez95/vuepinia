import { defineStore, storeToRefs } from "pinia";
import type { Currency } from "@/interfaces/Currency/Currency.model";
import { helperStore } from "@/helper";
import { computed, ref } from "vue";
import { CURRENCY_TYPES } from "@/enums/CurrencyTypes.enum";
import type { CurrencyTicker } from "@/interfaces/Ticker/Ticker.model";
import dayjs from "dayjs";

export const WalletStore = defineStore('wallet', () => {
    const helper = helperStore()

    const currencies = ref<Currency[]>([])
    const getCurrencies = async () => {
        const res = await helper.http('currency', 'get', {
            params: {
                type_currency_id: CURRENCY_TYPES.CRYPTO
            }
        }, '', true)
        currencies.value = res.data.response as Currency[];
        currencies.value.push(...res.data.response as Currency[]);
    }
    const coinsInit = ref<Coin[]>([])

    const dateQueryTicker = ref<string>('')
    const currencyTicker = ref<CurrencyTicker[]>([])
    const getCurrencyTicker = (): Promise<CurrencyTicker[]> => {
        return new Promise(async (resolve, reject) => {
            const url = 'https://ticker.xeler.io/v1/ticker'
            try {
                const res = await helper.http(url, 'get', {}, '', true)
                currencyTicker.value = (res.data as resJsonTicker).data
                dateQueryTicker.value = dayjs().format('YYYY-MM-DD T: HH:mm UTC')
                if(coinsInit.value.length == 0){
                    coinsInit.value = setCoins()
                }
                resolve(currencyTicker.value)
            } catch (e) {
                reject(false)
                helper.showNotify('Ha ocurrido un error por favor intente mas tarde', { type: 'error' })
                setInterval(() => window.location.reload(), 5000)
                // reject('Ha ocurrido un error por favor intente mas tarde')
            } finally {
            }
        })
    }

    const getCurrencyTickerByAbbreviation = (abbreviation: string): CurrencyTicker | null => {
        return currencyTicker.value.find(ticker => abbreviation?.toLocaleLowerCase()
            .includes(ticker.symbol.toLocaleLowerCase())) ?? null
    }


    const colors = {
        same: "same",
        up: "up",
        down: "down-2",
    };

    const colorsText = {
        same: "table",
        up: "ok-2",
        down: "down",
    };
    const orientationArrow = {
        same: "-90",
        up: "180",
        down: "0",
    };

    const coins = computed(()=> setCoins() ?? [])
    const getBandForCoin = (coin:Coin,value:number): BandCoin => {
        // console.log('coin',coin)
        // return 'same'
        if(coin?.value == value) return 'same'
        return value > coin?.value ? 'up' : 'down'
    }
    const getporcentForCoin = (coin:Coin,value:number): string => {
        // return '0'
        if(coin.value == value) return '0'
        const percent = ((value - coin.value) / coin.value) * 100
        if(percent.toFixed(2) == '0.00') return '0.00'
        return percent > 0 ? `+`+percent.toFixed(2) : percent.toFixed(2)
    }
    
const setCoins = (): Coin[] => {
    return currencies.value
        .filter((currency: Currency) =>
            getCurrencyTickerByAbbreviation(
                currency.attributes.abbreviation
            )
        )
        .map((currency: Currency): Coin => {
            const currencyT = getCurrencyTickerByAbbreviation(
                currency.attributes.abbreviation
            );
            const images = currency.relationships?.images;
            const coin = coinsInit.value.find((coinI:Coin) => coinI.name == currency.attributes.name)!
            const band: BandCoin = coin ? getBandForCoin(coin,currencyT?.oficial!) : 'same'
            const porcent: string = coin ? getporcentForCoin(coin,currencyT?.oficial!)  : '0'
            return {
                name: currency.attributes.name,
                value: currencyT?.oficial ?? 0, 
                up: true,
                icon: images!.length > 0 ? images![0].attributes.aws_url : "",
                band,
                porcent,
                abbreviation: currency.attributes.abbreviation
            };
        });
}

const cryptoHaveImage = (currency?: Currency): false | string => {
    if(!currency) return false
    const images = currency.relationships?.images
    if(!images || images.length == 0) return false
    return images[0].attributes.aws_url
}
    return {
        currencies,
        getCurrencies,
        currencyTicker,
        getCurrencyTicker,
        getCurrencyTickerByAbbreviation,
        colors,
        colorsText,
        orientationArrow,
        setCoins,
        coins,
        dateQueryTicker,
        cryptoHaveImage
    }

    interface resJsonTicker {
        hola: string
        data: CurrencyTicker[]
    }

    interface Coin {
        name: string;
        value: number;
        up: boolean;
        icon: string;
        porcent: string;
        band: BandCoin;
        abbreviation: string
    }

    type BandCoin = "same" | "up" | "down"
})