<template>
    <div class="rounded-xl color-border-degree">
        <div class="w-100 text-center" style="margin-top: -13px">
            <label class="mx-auto bg-white px-4 text-primary font-weight-bold">
                Valores basados en TRM
                <h2 class="" :class="bool ? 'bg-up' : 'bg-down'"> {{ bool }}</h2>
            </label>
            <div v-for="(coin, i) in coins" :key="i">
                <div
                    class="text-left text-table justify-space-between mx-2 py-4"
                >
                    <div class="d-inline-block" style="width: 80px;" >
                        <span class="text-18 ml-2" > {{ coin.name }}</span>
                    </div>
                    <div class="d-inline-block align-center mx-2" style="width: 90px;">
                        <VBtn
                            elevation="0" 
                            size="small"
                            :flat="false"
                            style="width: 24px !important; height: 24px"
                            class="rounded"
                            :class="`bg-${colors[coin.band]}`"
                            icon
                        >
                            <VIcon
                                icon="mdi-arrow-down"
                                :class="`arrow-${colors[coin.band]}`"
                                :style="`
                                        transform: rotate(${
                                            orientationArrow[coin.band]
                                        }deg);
                                    `"
                            >
                            </VIcon>
                        </VBtn>
                        <span
                            class="font-weight-bold mt-0 pt-0 ml-3"
                            :class="`text-${colorsText[coin.band]}`"
                        >
                            {{ coin.porcent }} %
                        </span>
                    </div>
                    <div class="text-left d-inline-block">
                        <span>COP {{ formatNumber(coin.value) }}</span>
                    </div>
                </div>
                <VDivider v-if="(coins.length - 1) > i" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { formatNumber } from "@/helper";
import { WalletStore } from "@/stores/WalletStore";
import { storeToRefs } from "pinia";
import type { Currency } from "@/interfaces/Currency/Currency.model";
import dayjs from "dayjs";
import { onMounted } from "vue";

const walletStore = WalletStore();
walletStore.getCurrencies();
walletStore.getCurrencyTicker();

const { currencies } = storeToRefs(walletStore);
const now = ref(dayjs());

const setCoins = (): Coin[] => {
    return currencies.value
        .filter((currency: Currency) =>
            walletStore.getCurrencyTickerByAbbreviation(
                currency.attributes.abbreviation
            )
        )
        .map((currency: Currency): Coin => {
            const currencyT = walletStore.getCurrencyTickerByAbbreviation(
                currency.attributes.abbreviation
            );
            const images = currency.relationships?.images;
            const coin = coins.value.find((coinI:Coin) => coinI.name == currency.attributes.name)!
            const band: BandCoin = coin ? getBandForCoin(coin,currencyT?.oficial!) : 'same'
            const porcent: string = coin ? getporcentForCoin(coin,currencyT?.oficial!)  : '0.12'
            return {
                name: currency.attributes.name,
                value: currencyT?.oficial ?? 0, 
                up: true,
                icon: images!.length > 0 ? images![0].attributes.aws_url : "",
                band,
                porcent 
            };
        });
}

const coins = ref<Coin[]>([])
const getBandForCoin = (coin:Coin,value:number): BandCoin => {
    // console.log('coin',coin)
    if(coin?.value == value) return 'same'
    return coin?.value > value ? 'up' : 'down'
}
const getporcentForCoin = (coin:Coin,value:number): string => {
    if(coin.value == value) return '0'
    const percent = ((value - coin.value) / coin.value) * 100
    return percent.toFixed(2)
}

const bool = ref(false)
onMounted(() => {
    coins.value = setCoins()

    setInterval(async() => {
        await walletStore.getCurrencies();
        await walletStore.getCurrencyTicker();
        coins.value = setCoins()
        bool.value = !bool.value
    },60000)
})

const colors = {
    same: "same",
    up: "up",
    down: "down",
};

const colorsText = {
    same: "table",
    up: "success",
    down: "error",
};
const orientationArrow = {
    same: "-90",
    up: "180",
    down: "0",
};

interface Coin {
    name: string;
    value: number;
    up: boolean;
    icon: string;
    porcent: string;
    band: BandCoin;
}

type BandCoin = "same" | "up" | "down"
</script>

<style scoped lang="scss">




@import "@/scss/variables.scss";

.border-primary {
    border: 2px solid;
    border-color: $color-primary;
}
.bg-down {
    background-color: #ff707033 !important;
}

.arrow-down {
    color: #ff7070 !important;
}

.bg-same {
    background-color: #d3c9c933 !important;
}

.arrow-same {
    color: #3d3d3c !important;
}

.bg-up {
    background-color: #95ff7033 !important;
}

.arrow-up {
    color: #2b5517 !important;
}





</style>
