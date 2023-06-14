<template>
    <div class="rounded-xl color-border-degree">
        <div class="w-100 text-center" style="margin-top: -13px;">
            <label class="mx-auto bg-white px-4 text-primary font-weight-bold">
                Valores basados en TRM
            </label>
            <VList>
                <VListItem class="text-left text-table" density="compact" v-for="coin, i in coins" :key="i">
                    <!-- <template #default> -->
                    <VRow class="ma-0 pa-0 align-center">
                        <VCol class="ma-0 pa-0 ">
                            <span> {{ coin.name }}</span>
                        </VCol>
                        <!-- <VCol class="ma-0 pa-0"> -->
                        <VIcon size="45" class="" :icon="GraphIcon" :color="coin.up ? '#08D110' : '#DC4545'"></VIcon>
                        <!-- </VCol> -->
                        <VCol class="ma-0 pa-0 text-center" style="display: grid;">
                            <span>$ {{ formatNumber(coin.value) }} COP</span>
                            <small class="pa-0" style="color:#08D110"> +1.87%</small>
                        </VCol>
                    </VRow>
                    <!-- </template> -->
                </VListItem>
            </VList>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import GraphIcon from '@/assets/icons/layout/MenuRight/GraphIcon.vue'
import { formatNumber } from '@/helper';
const coins = ref<Coin[]>([
    {
        name: 'Bitcoin',
        value: 450252,
        up: false
    },
    {
        name: 'Ethereum',
        value: 450252,
        up: true
    },
    {
        name: 'Bitcoin Cash',
        value: 450252,
        up: true
    },
    {
        name: 'Litecoin',
        value: 450252,
        up: false
    },
    {
        name: 'Dash',
        value: 450252,
        up: true
    },
    {
        name: 'Usdt',
        value: 450252,
        up: false
    },
])

interface Coin {
    name: string
    value: number
    up: boolean
}
</script>

<style scoped lang="scss"></style>