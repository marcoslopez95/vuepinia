<template>
    <div class="rounded-xl color-border-degree">
        <div class="w-100 text-center" style="margin-top: -13px">
            <label class="mx-auto bg-white px-4 text-primary font-weight-bold">
                Valores basados en TRM
                <h4 v-if="coins.length == 0" class="bg-down"> No Existe información ahora</h4>
                <!-- <h4 class="bg-down"> {{bool}}</h4> -->
            </label>
            <div v-for="(coin, i) in coins" :key="i">
                <div
                    class="d-flex text-left text-table justify-space-around px-3 py-4 align-center"
                >
                    <!-- <div> -->
                        <VImg :src="coin.icon" width="25px" inline />
                    <!-- </div> -->
                    <div class="" style="width: 80px;" >
                        <span class="text-18 ml-2" > {{ coin.name }}</span>
                    </div>
                    <div class="d-inline-block align-center" style="width: 100px;">
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
                    <div class="text-left d-inline-block text-primary" style="width: 120px;">
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
import { onMounted, onUnmounted } from "vue";

const walletStore = WalletStore();
walletStore.getCurrencies();
walletStore.getCurrencyTicker();

const { coins} = storeToRefs(walletStore);
const { colors,colorsText, orientationArrow } = walletStore
const now = ref(dayjs());
let interval:any;
const bool = ref(false)
onMounted(() => {
    // coins.value = setCoins()

    interval = setInterval(async() => {
        await walletStore.getCurrencies();
        await walletStore.getCurrencyTicker();
        // coins.value = setCoins()
        bool.value = !bool.value
    },60000)
})

onUnmounted(() => {
    clearInterval(interval)
})
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
