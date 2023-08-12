<template>
    <VRow dense class="d-flex align-center">
        <VCol sm="8" cols="9" v-if="!isMobile" class="mx-0 px-0">
            <VRow dense>
                <VCol
                    sm="4"
                    lg="3"
                    cols="3"
                    v-for="(coin, i) in coins"
                    :key="i"
                >
                    <VCard
                        elevation="5"
                        class=""
                        style="max-width: 232px; height: 206px"
                    >
                        <VCardText class="px-1 py-4">
                            <div class="px-2">
                                <div dense class="d-flex justify-space-between">
                                    <VImg
                                        inline
                                        width="50"
                                        :src="coin.icon"
                                    ></VImg>
                                    <div
                                        class="mx-0 pl-1 d-flex justify-space-between"
                                    >
                                        <div class="mr-4 text-20">
                                            <span
                                                class="font-weight-bold text-dark text-capitalize"
                                                >{{ coin.name }}</span
                                            >
                                            <br />
                                            <span
                                                class="text-table font-weight-light"
                                                >{{
                                                    coin.abbreviation.toLocaleUpperCase()
                                                }}</span
                                            >
                                        </div>
                                        <div
                                            elevation="0"
                                            style="
                                                width: 24px !important;
                                                height: 24px;
                                            "
                                            class="rounded d-flex justify-center align-center"
                                            color="light"
                                            :class="`bg-${colors[coin.band]}`"
                                            icon
                                        >
                                            <VIcon
                                                icon="mdi-arrow-down"
                                                :color="`${colors[coin.band]}`"
                                                :style="`
                                                transform: rotate(${
                                                    orientationArrow[coin.band]
                                                }deg);
                                            `"
                                            >
                                            </VIcon>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="px-2">
                                <!-- <div dense> -->
                                    <div
                                        class="font-25 text-table-2 font-weight-bold mb-0 pb-0"
                                    >
                                        COP {{ formatNumber(coin.value) }}
                                    </div>
                                    <div
                                        class="font-weight-light mt-0 pt-0 text-20"
                                        :class="`text-${colorsText[coin.band]}`"
                                    >
                                        {{ coin.porcent }} %
                                    </div>
                                <!-- </div> -->
                            </div>
                        </VCardText>
                        <VCardActions class="my-0 py-0">
                            <div dense class=" h-100">
                                <VCol class="text-center text-caption px-0">
                                    <p
                                        style="
                                            font-size: 10px;
                                            white-space: break-spaces;
                                            line-height: 0.8rem;
                                        "
                                    >
                                        Ultima actualizacion: <br />{{
                                            dateQueryTicker
                                        }}
                                        <br />
                                        Valor Aproximado basado en TRM
                                    </p>
                                </VCol>
                            </div>

                        </VCardActions>
                    </VCard>
                </VCol>
            </VRow>
        </VCol>
        <VCol
            class="h-100"
            :sm="isMobile ? 12 : 4"
            :cols="isMobile ? 12 : 3"
            :class="isMobile ? '' : ''"
        >
            <CalculatorComponent
                class="mx-auto"
                style="max-height: 401"
                :style="[`max-width:${xs ? 240 : 275}px`]"
            >
            </CalculatorComponent>
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
import BtcIcon from "@/assets/images/home/BtcIcon.png";
import { formatNumber } from "@/helper";
import CalculatorComponent from "./PricingCards/CalculatorComponent.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { WalletStore } from "@/stores/WalletStore";
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";

const walletStore = WalletStore();
const { dateQueryTicker, coins } = storeToRefs(walletStore);
const { colors, colorsText, orientationArrow } = walletStore;
const { smAndDown: isMobile, xs } = useDisplay();
let interval: any;

onMounted(() => {
    // coins.value = setCoins()
    walletStore.getCurrencies();
    walletStore.getCurrencyTicker();
    interval = setInterval(async () => {
        await walletStore.getCurrencies();
        await walletStore.getCurrencyTicker();
        // coins.value = setCoins()
        // bool.value = !bool.value
    }, 60000);
});

onUnmounted(() => {
    clearInterval(interval);
});
</script>

<style scoped lang="scss">
@import "@/scss/variables.scss";

.border-primary {
    border: 2px solid;
    border-color: $color-primary;
}
.bg-down-2 {
    background-color: #ff707033 !important;
}

.arrow-down-2 {
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
