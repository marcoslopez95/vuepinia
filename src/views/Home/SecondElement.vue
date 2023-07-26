<template>
    <VRow class="d-flex align-center">
        <VCol sm="8" cols="9" v-if="!isMobile">
            <VRow>
                <VCol sm="4" lg="3" cols="3" v-for="currency, i in currencies" :key="i">
                    <VCard elevation="5" class="">
                        <VCardText class="px-5 py-4">
                            <VRow>
                                <VImg inline width="50px" :src="currency.image"></VImg>
                                <VCol class="d-flex">
                                    <div class="mr-4">
                                        <span class="font-weight-bold text-dark">{{ currency.name }}</span> <br>
                                        <span class="text-table">{{ currency.abbreviation }}</span>
                                    </div>
                                    <VBtn elevation="0" size="small" :flat="false"
                                        style="width: 24px!important; height: 24px;" class="rounded"
                                        :class="`bg-${colors[currency.band]}`" icon>
                                        <VIcon 
                                            icon="mdi-arrow-down" 
                                            :class="`arrow-${colors[currency.band]}`" 
                                            :style="`
                                                transform: rotate(${orientationArrow[currency.band]}deg);
                                            `">
                                        </VIcon>
                                    </VBtn>
                                </VCol>
                            </VRow>
                            <VRow>
                                <VCol cols="12" class="text-h6 font-weight-bold mb-0 pb-0">
                                    COP {{ formatNumber(currency.price) }}
                                </VCol>
                                <VCol cols="12" class="font-weight-bold mt-0 pt-0"
                                    :class="`text-${colorsText[currency.band]}`">
                                    {{ currency.porcent }} %
                                </VCol>
                            </VRow>
                            <VRow>
                                <VCol class="text-center text-caption">
                                    <p style="font-size: 10px; white-space: break-spaces; line-height: .8rem;">
                                        Ultima actualizacion: 2023-01-27 T: 18:54 UTC <br />
                                        Valor Aproximado basado en TRM
                                    </p>
                                </VCol>
                            </VRow>
                        </VCardText>
                    </VCard>
                </VCol>
            </VRow>
        </VCol>
        <VCol  
            class="h-100"
            :sm="isMobile?12:4" 
            :cols="isMobile ? 12 :3" 
            :class="isMobile? 'mx-1' : ''"
            >
            <CalculatorComponent 
                class="mx-auto" 
                style="max-height: 401;"
                :style="[
                    `max-width:${xs ? 240 : 275}px`
                ]">
            </CalculatorComponent>
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
import BtcIcon from '@/assets/images/home/BtcIcon.png'
import { formatNumber } from '@/helper';
import CalculatorComponent from './PricingCards/CalculatorComponent.vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { ref } from 'vue'
const {
    smAndDown:isMobile,
    xs
    } = useDisplay()

const currencies: currenciesHome[] = [
    {
        abbreviation: 'BTC',
        name: 'Bitcoin',
        price: 100000,
        porcent: 0.05,
        band: 'same',
        image: BtcIcon
    },
    {
        abbreviation: 'BTC',
        name: 'Bitcoin',
        price: 100000,
        porcent: 0.05,
        band: 'down',
        image: BtcIcon
    },
    {
        abbreviation: 'BTC',
        name: 'Bitcoin',
        price: 100000,
        porcent: 0.05,
        band: 'down',
        image: BtcIcon
    },
    {
        abbreviation: 'BTC',
        name: 'Bitcoin',
        price: 100000,
        porcent: 0.05,
        band: 'same',
        image: BtcIcon
    },
    {
        abbreviation: 'BTC',
        name: 'Bitcoin',
        price: 100000,
        porcent: 0.05,
        band: 'same',
        image: BtcIcon
    },
    {
        abbreviation: 'BTC',
        name: 'Bitcoin',
        price: 100000,
        porcent: 0.05,
        band: 'up',
        image: BtcIcon
    },
    {
        abbreviation: 'BTC',
        name: 'Bitcoin',
        price: 100000,
        porcent: 0.05,
        band: 'same',
        image: BtcIcon
    },
    {
        abbreviation: 'BTC',
        name: 'Bitcoin',
        price: 100000,
        porcent: 0.05,
        band: 'up',
        image: BtcIcon
    },
]

const colors = {
    same: 'same',
    up: 'up',
    down: 'down'
}

const colorsText = {
    same: 'table',
    up: 'success',
    down: 'error'
}
const orientationArrow = {
    same: '-90',
    up: '180',
    down: '0'
}


interface currenciesHome {
    name: string
    abbreviation: string
    price: number
    image: string
    porcent: number
    band: 'same' | 'up' | 'down'
}
</script>

<style scoped lang="scss">
@import '@/scss/variables.scss';

.border-primary{
    border: 2px solid;
    border-color: $color-primary;
}
.bg-down {
    background-color: #FF707033 !important;
}

.arrow-down {
    color: #FF7070 !important;
}


.bg-same {
    background-color: #D3C9C933 !important;
}

.arrow-same {
    color: #3D3D3C !important;
}


.bg-up {
    background-color: #95FF7033 !important;
}

.arrow-up {
    color: #2B5517 !important;
}
</style>